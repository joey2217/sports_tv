import React, { memo, useEffect, useRef } from 'react'
import Hls from 'hls.js'
import { throttle } from '../utils'

interface Props {
  liveUrl?: string
  onEnd?: () => void
  onTimeUpdate?: (seek: number) => void
  seek?: number
}

let hls: Hls
const SEEK_STEP = 5

const HlsPlayer: React.FC<Props> = ({ liveUrl, seek, onEnd, onTimeUpdate }) => {
  const videoEl = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    try {
      const video = videoEl.current
      if (hls != null) {
        hls.destroy()
      }
      if (Hls.isSupported()) {
        hls = new Hls()
        if (video && liveUrl) {
          console.log(liveUrl, 'liveUrl')
          if (hls) {
            hls.attachMedia(video)
            hls.on(Hls.Events.MEDIA_ATTACHED, function () {
              console.log('video and hls.js are now bound together !')
              hls.loadSource(liveUrl)
              hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
                console.log(
                  'manifest loaded, found ' +
                    data.levels.length +
                    ' quality level'
                )
              })
            })
            hls.on(Hls.Events.ERROR, function (event, data) {
              const errorType = data.type
              const errorDetails = data.details
              const errorFatal = data.fatal
              console.error('error', errorType, errorDetails, errorFatal)
            })
            // hls.on(Hls.Events.MANIFEST_PARSED, function () {
            //   video.play();
            // });
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = liveUrl
            video.addEventListener('loadedmetadata', function () {
              video.play()
            })
          }
        }
      }
    } catch (error) {
      console.error(error)
    }
    return () => {
      if (hls) {
        hls.destroy()
      }
    }
  }, [liveUrl])

  useEffect(() => {
    const video = videoEl.current

    const updateTime = () => {
      if (onTimeUpdate && video && video.currentTime > 0) {
        onTimeUpdate(Math.round(video.currentTime))
      }
    }

    const timeupdate = throttle(updateTime, 30 * 1000, { leading: false })

    const onPlay = () => {
      if (video) {
        if (seek != null && seek > 0) {
          video.currentTime = seek
        }
        if (video.paused) {
          video.play()
        }
      }
    }
    const ended = () => {
      if (onEnd) {
        onEnd()
      }
    }

    const move = (dir: 'forward' | 'back') => {
      if (video && video.currentTime > 0) {
        if (dir === 'forward') {
          video.currentTime = video.currentTime + SEEK_STEP
        } else {
          video.currentTime = video.currentTime - SEEK_STEP
        }
        if (video.paused) {
          video.play()
        }
      }
    }

    const togglePlay = () => {
      if (video) {
        if (video.paused) {
          video.play()
        } else {
          video.pause()
        }
      }
    }

    const onkeydown = throttle((e: KeyboardEvent) => {
      if (e.code === 'ArrowRight') {
        move('forward')
      } else if (e.code === 'ArrowLeft') {
        move('back')
      } else if (e.code === 'Space') {
        togglePlay()
      }
    }, 500)

    let startX = 0
    const onTouchStart = (e: TouchEvent) => {
      const touches = e.changedTouches
      if (touches[0]) {
        startX = touches[0].pageX
      }
    }
    const onTouchEnd = (e: TouchEvent) => {
      const touches = e.changedTouches
      if (touches[0]) {
        const endX = touches[0].pageX
        const diff = endX - startX
        if (diff > 10) {
          move('forward')
        } else if (diff < -10) {
          move('back')
        }
      }
    }

    if (video) {
      video.addEventListener('timeupdate', timeupdate)
      video.addEventListener('seeked', updateTime)
      video.addEventListener('pause', updateTime)
      video.addEventListener('loadedmetadata', onPlay)
      video.addEventListener('ended', ended)
      video.addEventListener('touchstart', onTouchStart)
      video.addEventListener('touchend', onTouchEnd)
      document.addEventListener('keydown', onkeydown)
    }
    return () => {
      if (video) {
        video.removeEventListener('timeupdate', timeupdate)
        video.removeEventListener('loadedmetadata', onPlay)
        video.removeEventListener('pause', updateTime)
        video.removeEventListener('ended', ended)
        video.removeEventListener('seeked', updateTime)
        video.removeEventListener('touchstart', onTouchStart)
        video.removeEventListener('touchend', onTouchEnd)
        document.removeEventListener('keydown', onkeydown)
      }
    }
  }, [onEnd, onTimeUpdate, seek])

  return (
    <video
      ref={videoEl}
      controls
      autoPlay
      tabIndex={-1}
      className="outline-none w-full"
    ></video>
  )
}

export default memo(HlsPlayer)

import React, { memo, useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'

interface Props {
  liveUrl?: string
}

let hls: Hls

const HlsPlayer: React.FC<Props> = ({ liveUrl }) => {
  const videoEl = useRef<HTMLVideoElement>(null)
  const [error,setError] = useState('')
  useEffect(() => {
    try {
      const video = videoEl.current
      setError('')
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
              setError(errorType)
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
  }, [liveUrl])

  if (error) {
    return <div className="h-full w-full text-center text-3xl">{error}</div>
  }
  return (
    <video ref={videoEl} controls autoPlay className="h-full w-full"></video>
  )
}

export default memo(HlsPlayer)

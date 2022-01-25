import React, { memo, useEffect, useState } from 'react'
import { Radio } from 'antd'
import { useRouter } from 'next/router'
import HlsPlayer from '../../components/Player/HlsPlayer'
import DataStat from '../../components/Match/DataStat'
import { getMatchDetail } from '../../api/match'
import { IMatch, Live } from '../../types'

const Match: React.FC = () => {
  const router = useRouter()
  const [match, setMatch] = useState<IMatch>()
  const [liveUrls, setLiveUrls] = useState<Live[]>([])
  const [liveUrl, setLiveUrl] = useState<string>('')

  useEffect(() => {
    const { id, type } = router.query
    if (id) {
      getMatchDetail({
        mid: id as string,
        type: type as string,
      }).then((res) => {
        const matchDetail = res.data.data.matchinfo
        setMatch(matchDetail)
        if (matchDetail.status_up != 10) {
          if (matchDetail.live_urls.length > 0) {
            setLiveUrls(res.data.data.matchinfo.live_urls)
            setLiveUrl(res.data.data.matchinfo.live_urls[1].url)
          }
        } else {
          setLiveUrl(matchDetail.video_url)
        }
      })
    }
  }, [router.query])

  return (
    <>
      {match ? (
        <div>
          <div className="text-center">
            <span className="pr-6">{match.status_up_name}</span>
            {match.status_up_name === '完场' ? (
              <span>视频</span>
            ) : (
              <>
                <span>直播:</span>
                <Radio.Group
                  defaultValue={liveUrl}
                  buttonStyle="solid"
                  onChange={(e) => setLiveUrl(e.target.value)}
                >
                  {liveUrls.map((live) => (
                    <Radio.Button key={live.index} value={live.url}>
                      {live.name}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </>
            )}
          </div>
          <div>
            <HlsPlayer liveUrl={liveUrl} />
          </div>
          <div>
            <DataStat mid={match.id} match={match}/>
          </div>
        </div>
      ) : (
        <div>loading</div>
      )}
    </>
  )
}

export default memo(Match)

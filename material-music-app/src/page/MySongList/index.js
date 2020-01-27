import React, { useState, useEffect, useCallback } from 'react'
import { getUserSongList } from '@/api'
import Grid from '@material-ui/core/Grid'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import SongListCard from '@/components/SongListCard'
import useRequest from '@/hook/useRequest'
import useLazyLoad from '@/hook/useLazyLoad'
import { isEmptyObj } from '@/common/utils'
import useHistoryWithName from '@/hook/useHistoryWithName'
import './index.scss'

export default function MySongList() {

  const history = useHistoryWithName()
  const userId = localStorage.getItem('userId')
  
  const [mySongList, setMySongList] = useState([])
  const [collectedSongList, setCollectedSongList] = useState([])
  const [data, loading] = useRequest(useCallback(() => getUserSongList(userId), [userId]))
  const ref = useLazyLoad(loading)

  const handleAddSongList = useCallback(e => {
    e.stopPropagation()
    history.push('/add-song-list')
  }, [history])

  useEffect(() => {
    if (isEmptyObj(data)) return

    const userId = Number.parseInt(localStorage.getItem('userId'))
    setMySongList(data.filter(songList => songList.creatorId === userId))
    setCollectedSongList(data.filter(songList => songList.creatorId !== userId))
  }, [data])

  return (
    <Grid ref={ref} container>
      {!loading && (
        <div style={{width: '100%'}}>
          <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>创建的歌单</Typography>
              <IconButton color="default" onClick={handleAddSongList}>
                <AddIcon />
              </IconButton>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container>
                {mySongList.map(songList => (
                  <Grid className="discovery-song-list-card-wrap" container item xs={4} sm={4} md={3} lg={2} key={songList.id}>
                    <SongListCard
                      id={songList.id}
                      name={songList.name}
                      picUrl={songList.picUrl}
                    />
                  </Grid>
                ))}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel defaultExpanded={true}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>收藏的歌单</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container>
                {collectedSongList.map(songList => (
                  <Grid className="discovery-song-list-card-wrap" container item xs={6} sm={4} md={3} lg={2} key={songList.id}>
                    <SongListCard
                      id={songList.id}
                      name={songList.name}
                      picUrl={songList.picUrl}
                    />
                  </Grid>
                ))}
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      )}
    </Grid>
  )
}
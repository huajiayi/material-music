import React, { useCallback, useEffect, useState } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { useSelector, useDispatch } from 'react-redux'
import { setShowCollectSongPage } from '@/store/common/action'
import { getUserSongList, track } from '@/api'

export default function CollectSong() {

  const dispatch = useDispatch()

  const [mySongList, setMySongList] = useState([])
  const { neteaseId } = useSelector(state => state.musicReducer.currentSong)
  const showCollectSongPage = useSelector(state => state.commonReducer.showCollectSongPage)

  const _setShowCollectSongPage = useCallback(showCollectSongPage => dispatch(setShowCollectSongPage(showCollectSongPage)), [dispatch])
  const handleClose = useCallback(() => {
    _setShowCollectSongPage(false)
  }, [_setShowCollectSongPage])

  const handleCollect = useCallback(songListId => async () => {
    const isSuccess = await track({
      neteaseId,
      songListId
    })

    if(isSuccess) {
      handleClose()
    }
  }, [handleClose, neteaseId])

  useEffect(() => {
    if (showCollectSongPage) {
      const userId = Number.parseInt(localStorage.getItem('userId'))

      getUserSongList(userId).then(data => {
        setMySongList(data.filter(songList => songList.creatorId === userId))
      })
    }
  }, [showCollectSongPage])

  return (
    <div>
      <Dialog
        open={showCollectSongPage}
        onClose={handleClose}
      >
        <DialogTitle>{"收藏到歌单"}</DialogTitle>
        <DialogContent>
          <List>
            {mySongList.map(songList => (
              <ListItem button key={songList.id} onClick={handleCollect(songList.id)}>
                <ListItemAvatar>
                  <Avatar variant="rounded" src={songList.picUrl}>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={songList.name} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  )
}
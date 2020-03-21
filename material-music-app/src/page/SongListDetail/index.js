import React, { useState, useCallback, useEffect } from 'react'
import useLazyLoad from '@/hook/useLazyLoad'
import Avatar from '@material-ui/core/Avatar'
import Hidden from '@material-ui/core/Hidden'
import AppBar from '@material-ui/core/AppBar'
import PlayIcon from '@material-ui/icons/PlayCircleOutline'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TabPanel from '@/components/TabPanel'
import SongCard from '@/components/SongCard'
import { getSongListDetail, subscribeSongList } from '@/api'
import { useRequest } from '@umijs/hooks'
import { useParams, useHistory } from 'react-router-dom'
import moment from 'moment'
import { hasLogin, isEmptyObj } from '@/common/utils'
import { useDispatch } from 'react-redux'
import { setPlayList } from '@/store/music/action'
import Toast from '@/components/Toast'
import Comments from '@/components/Comments'
import './index.scss'

export default function SongListDetail() {

  const { id } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()

  const [canLazy, setCanLazy] = useState(false)
  const [detail, setDetail] = useState({})
  const [value, setValue] = React.useState(0)
  const {data, loading} = useRequest(useCallback(() => getSongListDetail(id), [id]))
  const ref = useLazyLoad(canLazy)

  const _setPlayList = useCallback(playList => dispatch(setPlayList(playList)), [dispatch])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const playAll = () => {
    if(detail.songs && detail.songs.length > 0) {
      _setPlayList(detail.songs)
    }
  }

  const subscribe = async e => {
    e.stopPropagation()
    if (!hasLogin()) {
      Toast.error("请先登录！")
      history.push('/login')
      return
    }

    const isSuccess = await subscribeSongList(detail.id)
    if(isSuccess) {
      setDetail({
        ...detail,
        hasSubscribed: true
      })
    }
  }

  const handleChangeComments = useCallback(newComments => {
    const newDetail = {...detail}
    newDetail.comments = {...newComments}
    setDetail(newDetail)
  },[detail])

  useEffect(() => {
    if(data) {
      data.createTime = moment(data.createTime).format('YYYY-MM-DD')
      setDetail(data)
      setCanLazy(true)
    }
  }, [data])

  return (
    !loading && !isEmptyObj(detail) &&
    <div className="song-list-detail">
      <div className="song-list">
        <div className="img-container">
          <img className="img" src={detail.picUrl} alt="" />
        </div>
        <div className="detail">
          <span className="name">{detail.name}</span>
          <div className="creator">
            <Avatar className="avatar" src={detail.creator.avatarUrl} />
            <span className="nickname">{detail.creator.nickname}</span>
            <Hidden only={['xs', 'sm']}>
              <span>{detail.createTime}</span>&nbsp;创建
        </Hidden>
          </div>
          {detail.description && <span className="description">{detail.description}</span>}
          <Hidden only={['xs', 'sm']}>
            <span className="collect-count">收藏人数：{detail.collectCount}</span>
          </Hidden>
        </div>
      </div>

      <div ref={ref} className="content">
        <AppBar className="appbar" position="static" color="inherit"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
          >
            <Tab label="歌曲列表" />
            <Tab label={`评论(${detail.comments.total})`} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <div className="toolbar" onClick={playAll}>
            <div className="left">
              <PlayIcon />
              <span className="play-all">播放全部(共{detail.songs && detail.songs.length}首)</span>
            </div>
            {!detail.hasSubscribed && (
              <Fab className="btn" size="small" variant="extended" onClick={subscribe}>
                <AddIcon />收藏
            </Fab>
            )}
          </div>
          <div>
            {detail.songs.map((song, index) => (
              <div className="song-card-wrap" key={index}>
                <SongCard
                  id={index}
                  {...song}
                />
              </div>
            ))}
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Comments
            topicId={detail.id}
            topicType={1}
            comments={{...detail.comments}}
            onChange={handleChangeComments} />
        </TabPanel>
      </div>
    </div>
  )
}
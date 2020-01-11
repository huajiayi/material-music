import Discovery from '@/page/Discovery'
import RecommendSongList from '@/page/RecommendSongList'
import RecommendSong from '@/page/RecommendSong'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic'
import QueueMusicIcon from '@material-ui/icons/QueueMusic'

export default {
  global: [{
    name: 'login',
    path: '/login'
  },
  {
    name: 'register',
    path: '/register'
  },
  {
    name: 'profile',
    path: '/profile',
    meta: {
      needLogin: true
    }
  }],
  menu: [{
    name: 'Discovery',
    path: '/',
    exact: true,
    component: Discovery,
    meta: {
      title: '发现音乐',
      icon: MusicNoteIcon
    }
  },
  {
    name: 'RecommendSongList',
    path: '/recommend-song-list',
    exact: false,
    component: RecommendSongList,
    meta: {
      title: '推荐歌单',
      icon: QueueMusicIcon
    }
  },
  {
    name: 'RecommendSong',
    path: '/recommend-song',
    exact: false,
    component: RecommendSong,
    meta: {
      title: '最新音乐',
      icon: LibraryMusicIcon
    }
  }]
}
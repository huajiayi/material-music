import Discovery from '@/page/Discovery'
import RecommendSongList from '@/page/RecommendSongList'
import RecommendSong from '@/page/RecommendSong'
import SongListDetail from '@/page/SongListDetail'
import MySongList from '@/page/MySongList'
import Search from '@/page/Search'
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
  },
  {
    name: 'addSongList',
    path: '/add-song-list',
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
      icon: LibraryMusicIcon
    }
  },
  {
    name: 'RecommendSong',
    path: '/recommend-song',
    exact: false,
    component: RecommendSong,
    meta: {
      title: '最新音乐',
      icon: QueueMusicIcon
    }
  },
  {
    name: 'MySongList',
    path: '/my-song-list',
    exact: false,
    component: MySongList,
    meta: {
      title: '我的歌单',
      icon: LibraryMusicIcon,
      needLogin: true
    }
  }],
  page: [{
    name: 'songList',
    path: '/song-list/:id',
    exact: false,
    component: SongListDetail,
    meta: {
      title: '歌单详情'
    }
  },
  {
    name: 'search',
    path: '/search',
    exact: false,
    component: Search,
    meta: {
      title: '搜索歌曲'
    }
  }]
}
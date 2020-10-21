import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件
const song = () =>
    import ('@/views/Songs')
const get_404 = () =>
    import ('@/views/Get404')
const playlist = () =>
    import ('@/views/Playlist')
const findmusic = () =>
    import ('@/views/Findmusic')
const new_mv = () =>
    import ('@/views/New_MV')
const playlistde = () =>
    import ('@/views/Playlistde')
const mvde = () =>
    import ('@/views/Mvde')

Vue.use(VueRouter)
const routes = [


    // 歌单详情
    {
        path: '/playlistde/:id',
        name: 'playlistde',
        component: playlistde,
        meta: {
            name: '推荐歌单详情'
        }
    },
    // mv播放jiemian
    {
        path: '/mvde',
        name: 'mvde',
        component: mvde,
        meta: {
            name: 'mv详情'
        }
    },

    // 推荐歌单
    {
        path: '/playlist',
        name: 'playlist',
        component: playlist,
        meta: {
            name: '推荐歌单'
        }
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.

    },

    //TODO 发现音乐
    {
        path: '/findmusic',
        name: 'findmusic',
        component: findmusic,
        meta: {
            name: '发现音乐'
        }
    },
    //最新mv
    {
        path: '/new_mv',
        name: 'new_mv',
        component: new_mv,
        meta: {
            name: '最新mv'
        }
    },
    // 404
    {
        path: '*',
        name: 'get_404',
        component: get_404
    },
    {
        path: '/',

        redirect: '/findmusic'
    },
    // 最新音乐
    {
        path: '/song',
        name: 'song',
        component: song,
        meta: {
            name: '最新音乐'
        }
    },


]

const router = new VueRouter({
    mode: 'history',
    routes
})
router.beforeEach((to, from, next) => {
    next()
    window.document.title = to.meta.name
})
export default router
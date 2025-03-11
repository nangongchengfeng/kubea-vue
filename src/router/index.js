// 导入router的路由模式
import { createRouter, createWebHistory } from "vue-router";

// 导入进度条组件
import NProgress from "nprogress";
import "nprogress/nprogress.css";
//导入整体布局
import Layout from "@/layout/Layout";
import nProgress from "nprogress";

// 路由规则

const routes = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/home",
        // 引入布局组件
        component: Layout,
        children: [
            {
                path: "/home",
                name: "概览",
                icon: "fund-outlined",
                meta: { title: "概览", requireAuth: true },
                component: () => import("@/views/home/Home.vue"),
            },
        ],
    },
    {
        path: "/cluster",
        name: "集群",
        component: Layout,
        icon: "cloud-server-outlined",
        children: [
            {
                path: "/cluster/node",
                name: "Node",
                meta: { title: "Node", requireAuth: true },
                component: () => import("@/views/cluster/Node.vue"),
            },
            {
                path: "/cluster/namespace",
                name: "Namespace",
                meta: { title: "Namespace", requireAuth: true },
                component: () => import("@/views/cluster/Namespace.vue"),
            },
            {
                path: "/cluster/pv",
                name: "PV",
                meta: { title: "PV", requireAuth: true },
                component: () => import("@/views/cluster/PV.vue"),
            },
        ],
    },
    {
        path: "/workload",
        name: "工作负载",
        component: Layout,
        icon: "block-outlined",
        children: [
            {
                path: "/workload/pod",
                name: "Pod",
                meta: { title: "Pod", requireAuth: true },
                component: () => import("@/views/workload/Pod.vue"),
            },
            {
                path: "/workload/deployment",
                name: "Deployment",
                meta: { title: "Deployment", requireAuth: true },
                component: () => import("@/views/workload/Deployment.vue"),
            },
            {
                path: "/workload/daemonset",
                name: "Daemonset",
                meta: { title: "Daemonset", requireAuth: true },
                component: () => import("@/views/workload/Daemonset.vue"),
            },
            {
                path: "/workload/statefulset",
                name: "Statefulset",
                meta: { title: "Statefulset", requireAuth: true },
                component: () => import("@/views/workload/Statefulset.vue"),
            },
        ],
    },
];

// 创建路由实例
const router = createRouter({
    // history模式：createWebHistory
    // hash模式：createWebHashHistory
    history: createWebHistory(),
    routes,
});

//递增进度条，这将获取当前状态值并添加0.2直到状态为0.994
NProgress.inc(100)

// easing 动画字符串
// speed 动画速度
// showSpinner 进度环显示隐藏
nProgress.configure({
    easing: 'ease',
    speed: 500,
    showSpinner: false,
})


router.beforeEach((to, next) => {
    // 进度条开始
    nProgress.start()

    // 设置头部
    if (to.meta.title) {
        document.title = to.meta.title
    } else {
        document.title = 'KubeA'
    }
    //放行
    next()
});

router.afterEach(() => {
    // 进度条结束
    nProgress.done()
});

// 抛出路由实例, 在 main.js 中引用
export default router;

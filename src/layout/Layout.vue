<template>
    <a-layout style="background-color: black;">
        <!-- 固钉，以及头部组件 -->
        <a-affix>
            <!-- 布局头部 -->
            <a-layout-header class="header" style="background-color: rgb(31,30,30)">
                <!-- 平台信息 -->
                <!-- float: left 居左的同时，回吧其他元素也放在同一行  -->
                <div style="float: left;">
                    <img style="height: 40px;margin-bottom: 10px;" :src="kubeLog" />
                    <span style="padding:0 50px 0 20px;font-size:25px; font-weight:bold;color:#fff"> KubeA
                    </span>
                </div>

                <!-- 集群信息 -->
                <a-menu theme="dark" style="float: left; width: 400px;line-height: 64px;"
                    v-model:selectedKeys="selectedKeys1" mode="horizontal">
                    <a-menu-item v-for="item in clusterList" :key="item">
                        {{ item }}
                    </a-menu-item>
                </a-menu>


                <!-- 用户信息 -->
                <div style="text-align: right;">
                    <img style="height: 40px;border-radius: 50%;margin-right: 10px;" :src="avatar" />
                    <a-dropdown :overlayStyle="{ paddingTop: '20px' }">
                        <a>
                            Admin
                            <down-outlined />
                        </a>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item>
                                    <a @click="logout()">
                                        退出登录
                                    </a>
                                </a-menu-item>
                                <a-menu-item>
                                    <a>
                                        修改密码
                                    </a>
                                </a-menu-item>

                            </a-menu>
                        </template>
                    </a-dropdown>
                </div>
            </a-layout-header>
        </a-affix>
        <!-- 中部 -->
        <!-- 高度永远是窗口最大高度减去68px，因为68是header的高度 -->
        <a-layout style="height: calc(100vh - 68px); ">
            <!-- 侧边栏，核心 -->
            <!-- collapsed 处理展开和收缩 -->
            <a-layout-sider width="240px" v-model:collapsed="collapsed" collapsible>
                <!-- selectedKeys表示点击选中的栏目,用于a-menu-item -->
                <!-- openKeys表示展开的栏目，用于a-sub-menu -->
                <!-- openChange事件监听 SubMenu 展开/关闭的回调 -->
                <a-menu mode="inline" :selectedKeys="selectedKeys2" :openKeys="openkeys" @openChange="onOpenChange"
                    style="height: 100%; border-right: 0;">
                    <!-- routers是router/index.js中的路由信息 -->
                    <template v-for="menu in routers" :key="menu">

                        <!-- 处理无子路由的情况，也就是单个栏目 -->
                        <!-- routeChange用于路由跳转 -->
                        <a-menu-item v-if="menu.children && menu.children.length === 1" :index="menu.children[0].path"
                            :key="menu.children[0].path" @click="routeChange('item', menu.children[0].path)">

                            <template #icon>
                                <component :is="menu.children[0].icon" />
                            </template>
                            <span>{{ menu.children[0].name }}</span>
                        </a-menu-item>
                        <!-- 处理有子路由的情况，也就是父栏目 -->
                        <a-sub-menu v-else-if="menu.children && menu.children.length > 1" :index="menu.path"
                            :key="menu.path">
                            <template #title>
                                <span>
                                    <component :is="menu.icon" />
                                    <span :class="[collapsed ? 'is-collapse' : '']">{{ menu.name }}</span>
                                </span>
                            </template>
                            <!-- 子栏目（子路由）的处理 -->
                            <a-menu-item v-for="child in menu.children" :key="child.path" :index="child.path"
                                @click="routeChange('sub', child.path)">
                                <span>{{ child.name }}</span>
                            </a-menu-item>
                        </a-sub-menu>
                    </template>
                </a-menu>



            </a-layout-sider>
            <!-- main部分 -->
            <a-layout style="padding: 0 24px; background-color: black;">
                <a-layout-content
                    :style="{ background: 'rgb(31,30,30)', padding: '24px', margin: 0, minHeight: '280px', overflowY: 'auto' }">
                    <router-view></router-view>
                </a-layout-content>

                <!-- 底部 -->

                <a-layout-footer style="text-align: center;">
                    Ant Design ©2025 Created by NanGongChengFeng
                </a-layout-footer>

            </a-layout>
        </a-layout>


    </a-layout>

</template>

<script>
import { onMounted, ref } from 'vue';
import kubeLog from '@/assets/k8s-metrics.png';
import avatar from '@/assets/avator.png';
import { useRouter } from 'vue-router';
export default {
    name: 'Layout',
    // 你的 JavaScript 代码
    setup() {
        const collapsed = ref(false);
        const selectedKeys1 = ref([]);
        const clusterList = ref(['集群1', '集群2', '集群3', '集群4', '集群5', '集群6', '集群7',])

        // 侧边栏的属性
        //  路由信息
        const routers = ref([])
        const selectedKeys2 = ref([])
        const openkeys = ref([])

        const router = useRouter();

        console.log("路由：", router);

        // 获取路由信息，挂载到routers中
        onMounted(() => {
            routers.value = router.options.routes;
        })

        function logout() {
            // 退出登录
            // 移除用户名
            localStorage.removeItem('username');
            // 移除token
            localStorage.removeItem('token');
            // 跳转到登录页
            // router.push('/login');
        }

        function onOpenChange(keys) {
            const latestOpenKey = keys.find(
                (key) => openkeys.value.indexOf(key) === -1
            );
            openkeys.value = latestOpenKey ? [latestOpenKey] : [];
        }

        return {
            collapsed,
            kubeLog,
            avatar,
            selectedKeys1,
            clusterList,
            logout,
            routers,
            selectedKeys2,
            openkeys,
            router,
            onOpenChange
        }
    }

}
</script>

<style>
/* 你的 CSS 代码 */
.ant-layout-footer {
    padding: 5px 50px !important;
    color: rgb(239, 239, 239);
}

.ant-layout-header {
    padding: 0 30px !important;
}
</style>
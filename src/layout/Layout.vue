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
                    <a-dropdown :overlayStyle="{paddingTop: '20px'}">
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
            <a-layout-sider width="240px" v-model:collapsed="collapsed" collapsible>
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
import { ref } from 'vue';
import kubeLog from '@/assets/k8s-metrics.png';
import avatar from '@/assets/avator.png';
// import router from '@/router';
export default {
    name: 'Layout',
    // 你的 JavaScript 代码
    setup() {
        const collapsed = ref(false);
        const selectedKeys1 = ref([]);
        const clusterList = ref(['集群1', '集群2', '集群3', '集群4', '集群5', '集群6', '集群7',])

        function logout() {
            // 退出登录
            // 移除用户名
            localStorage.removeItem('username');
            // 移除token
            localStorage.removeItem('token');
            // 跳转到登录页
            // router.push('/login');
        }

        return {
            collapsed,
            kubeLog,
            avatar,
            selectedKeys1,
            clusterList,
            logout
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
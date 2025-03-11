import { createApp } from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入antd
import Antd from 'ant-design-vue'

// 暗黑风格
import 'ant-design-vue/dist/reset.css';

import * as Icons from '@ant-design/icons-vue'

const app = createApp(App)
for (const i in Icons) {
    app.component(i, Icons[i])
}

app.use(Antd)
app.use(router)
app.mount('#app')

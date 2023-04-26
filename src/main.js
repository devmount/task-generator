// init app
import { createApp } from 'vue';
import App from '@/App.vue';
const app = createApp(App);

// set global properties
app.config.globalProperties.$version = APP_VERSION;

// init dependencies
import ClipboardJS from 'clipboard';
new ClipboardJS('.clip')

// ready? let's go!
app.mount('#app');

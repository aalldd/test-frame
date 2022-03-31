import Vue from 'vue';
import MunicipalCesium from 'municipal-cesium-components';
import 'municipal-cesium-components/dist/municipal-vue-cesium.css';
import VueDraggableResizable from 'vue-draggable-resizable';
import router from './router';
import Service from '@/service/service';
import App from './App.vue';
import './main.less';

Vue.component('vue-draggable-resizable', VueDraggableResizable);
Vue.use(MunicipalCesium);

Vue.config.productionTip = false;
Service.init().then(() => {
    Vue.prototype.$serve = Service;
    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app');
});

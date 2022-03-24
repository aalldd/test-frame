import Vue from 'vue';
import MunicipalCesium from 'municipal-cesium-components';
import 'municipal-cesium-components/dist/municipal-vue-cesium.css';
import 'ant-design-vue/dist/antd.css';
import '@mapgis/webclient-vue-ui/dist-libs/webclient-vue-ui.css';
import '@mapgis/webclient-vue-cesium/dist-libs/webclient-vue-cesium.css';
import VueCesium from '@mapgis/webclient-vue-cesium';
import MapgisUi from '@mapgis/webclient-vue-ui';
import VueDraggableResizable from 'vue-draggable-resizable';
import Antd from 'ant-design-vue';
import router from './router';
import * as echarts from 'echarts';
import Service from '@/service/service';
import App from './App.vue';
import './main.less';

Vue.component('vue-draggable-resizable', VueDraggableResizable);
Vue.use(MunicipalCesium);
Vue.use(VueCesium);
Vue.use(Antd);
Vue.use(MapgisUi);

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
Service.init().then(() => {
    Vue.prototype.$serve = Service;
    new Vue({
        router,
        render: h => h(App)
    }).$mount('#app');
});

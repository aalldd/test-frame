import Vue from 'vue';
import MunicipalCesium from 'municipal-cesium-components'
import 'municipal-cesium-components/dist/municipal-vue-cesium.css';
import 'ant-design-vue/dist/antd.css';
import '@mapgis/webclient-vue-ui/dist-libs/webclient-vue-ui.css';
import '@mapgis/webclient-vue-cesium/dist-libs/webclient-vue-cesium.css';
import VueCesium from '@mapgis/webclient-vue-cesium';
import MapgisUi from '@mapgis/webclient-vue-ui';
import Antd from 'ant-design-vue';
import App from './App.vue';

Vue.use(MunicipalCesium)
Vue.use(VueCesium);
Vue.use(Antd);
Vue.use(MapgisUi);

Vue.config.productionTip = false;


new Vue({
    render: h => h(App),
}).$mount('#app');

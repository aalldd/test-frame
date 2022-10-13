import Vue from 'vue';
import MunicipalCesium from 'municipal-cesium-lib';
import TestFrame from './components/testFrame.vue';
import 'municipal-cesium-lib/dist/municipal-vue-cesium.css';
import MapgisUi from '@mapgis/webclient-vue-ui';
import VueDraggableResizable from 'vue-draggable-resizable';
import Antd from 'ant-design-vue';
import Service from './service/service';
import App from './App.vue';

Vue.component('vue-draggable-resizable', VueDraggableResizable);
Vue.component('test-frame', TestFrame);
Vue.use(MunicipalCesium);
Vue.use(Antd);
Vue.use(MapgisUi);

Vue.config.productionTip = false;
Service.init().then(() => {
	Vue.prototype.$serve = Service;
	new Vue({
		render: (h) => h(App)
	}).$mount('#app');
});

<template>
	<municipal-common-layer
		:height="mapHeight"
		class="mapWrapper"
		:plugin-path="pluginPath"
		:lib-path="libPath"
		@load="webSceneLoad"
		@onM3dLoad="onM3dLoad"
		:m3dInfos="m3dInfos"
		:commonConfig="globalConfig"
	>
		<municipal-tool :wmtsMap="wmtsMap" :cameraView="cameraView"></municipal-tool>
		<municipal-dynacut
			title="开挖分析"
			:drawTools="['square', 'polygon']"
			:drawTextures="drawTextures"
			:layerIndexs="[0, 1]"
		></municipal-dynacut>
		<test-frame />
	</municipal-common-layer>
</template>

<style lang="scss" scoped></style>

<script>
export default {
	data() {
		return {
			// 天地图地址
			pluginPath: '/static/cesium/webclient-cesium-plugin.min.js',
			libPath: '/static/cesium/Cesium.js',
			m3dInfos: [
				{
					maximumMemoryUsage: 1024,
					url: 'http://192.168.12.88:6163/igs/rest/g3d/sx',
					layers: '',
					vueIndex: '0'
				}
			],
			drawTextures: ['/static/cesium/model/wall.jpg', '/static/cesium/model/wall1.jpg'],
			wmtsMap: null,
			cameraView: null,
			vueKey: '1',
			drawItems: ['line'],
			globalConfig: null
		};
	},
	provide() {
		return {
			get Cesium() {
				return window.Cesium;
			},
			get CesiumZondy() {
				return window.CesiumZondy;
			},
			get webGlobe() {
				return this.view;
			},
			get m3ds() {
				return window.m3ds;
			}
		};
	},
	computed: {
		mapHeight() {
			return document.body.clientHeight;
		}
	},
	async mounted() {
		const sysConfig = await this.getSystemConfig('threeD');
		let mapSolution;
		//获取地图配置
		if (sysConfig) {
			if (sysConfig.mapConfigID >= 0) {
				const ms = await this.getMapSolution(sysConfig.mapConfigID);
				mapSolution = ms;
			}
			this.globalConfig = mapSolution?.configJSON?.config3d;
		}
	},
	methods: {
		webSceneLoad(payload) {
			const {
				component: { webGlobe },
				Cesium,
				CesiumZondy
			} = payload;
			this.view = webGlobe;
			window.Cesium = Cesium;
			window.CesiumZondy = CesiumZondy;
		},
		onM3dLoad(payload) {
			window.m3ds = payload.m3ds;
		},
		getWmtsInfo(payload) {
			this.wmtsMap = payload;
		},
		// 获取系统配置
		async getSystemConfig(client) {
			try {
				const { data } = await this.$serve.City.Plugin('Services').get('systemconfig', {
					params: {
						client,
						_ts: Date.now()
					}
				});
				return data;
			} catch (e) {
				console.error(e);
				return null;
			}
		},
		// 获取地图方案
		async getMapSolution(id) {
			try {
				const { data } = await this.$serve.City.Plugin('Services').get('mapsolution', {
					params: {
						id
					}
				});
				if (data && data.length) {
					data[0].configJSON = JSON.parse(data[0].configJSON);
					return data[0];
				}
				return null;
			} catch (e) {
				console.error(e);
				return null;
			}
		}
	}
};
</script>

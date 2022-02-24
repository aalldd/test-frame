<template>
  <municipal-commonLayer :height="mapHeight"
               class="mapWrapper"
               :plugin-path="pluginPath"
               :lib-path="libPath"
               :load="handleLoad"
               :m3dInfos="m3dInfos"
  >
    <municipal-tool :wmtsMap="wmtsMap" :cameraView="cameraView"></municipal-tool>
    <municipal-dynacut title="开挖分析" :drawTools="['square', 'polygon']" :drawTextures="drawTextures" :layerIndexs="[0,1]"></municipal-dynacut>
  </municipal-commonLayer>
</template>

<style lang="scss" scoped>
</style>

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
          url: 'http://192.168.12.200:6163/igs/rest/g3d/lgzh0902',
          layers: '',
          vueIndex: '0'
        }
      ],
      drawTextures: [
          '/static/cesium/model/wall.jpg',
          '/static/cesium/model/wall1.jpg'
        ],
      wmtsMap:null,
      cameraView: {
        destination: {
          x: -2416948.392038159,
          y: 5372543.175879652,
          z: 2444631.2541255946
        },
        orientation: {
          heading: 0.08752,
          pitch: -0.689042,
          roll: 0.0002114284469649675
        }
      }
    };
  },
  computed:{
    mapHeight(){
      return document.body.clientHeight
    }
  },
  methods: {
    handleLoad(payload) {
      const {component: {webGlobe}, Cesium, CesiumZondy} = payload;
      window.webGlobe = webGlobe;
      window.Cesium = Cesium;
      window.CesiumZondy = CesiumZondy;
    },
    onM3dLoad(payload) {
      console.log(payload);
    },
    getWmtsInfo(payload) {
      this.wmtsMap = payload;
    }
  }
};
</script>

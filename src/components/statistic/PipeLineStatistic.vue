<template>
  <div>
    <municipal-pipe-statistic @loadAttrTree="loadAttrTree"
                              :title="title"
                              :loading="loading"
                              :attrData="attrData"
                              @queryStatistic="queryStatistic">
    </municipal-pipe-statistic>
    <municipal-statistic-chart :statistic="statistic"
                               :title="title"
                               :layerType="layerType"
                               v-if="chartVisible"
                               @onClose="onClose">
    </municipal-statistic-chart>
  </div>
</template>

<script>
import Store from "@/store/store";

export default {
  name: "PipeStatisticAna",
  data() {
    return {
      layerType: 'civGeometryPolyline',
      attrData: [],
      loading: false,
      //从服务获取的统计数据，直接给到我的组件即可
      statistic: [],
      chartVisible: false,
      title:'管线统计'
    };
  },
  mounted() {
    this.store = new Store();
  },
  methods: {
    async loadAttrTree(params) {
      const {pipenetNames, hasUNVisible, mapServerName} = params;
      const param = {pipenetNames, hasUNVisible, layerType: this.layerType};
      const data = await this.store.GetShareField(mapServerName, param);
      const fieldTreeData = [{title: '字段', key: '字段', children: []}];
      data.forEach(item => {
        fieldTreeData[0].children.push({title: item, key: item});
      });
      this.attrData = fieldTreeData;
    },
    async queryStatistic(params) {
      this.loading = true;
      const {mapServerName, netNames, fields, geometry, geometryType} = params;
      const param = {
        netNames,
        fields,
        geometry,
        geometryType
      };
      try {
        const dataS = await this.store.GetStatisticsData(mapServerName, param);
        if (!dataS || dataS.length <= 0) {
          this.$message.error('获取统计结果失败');
          this.loading = false;
          return;
        }
        this.statistic = dataS;
        this.chartVisible = true;
        this.loading = false;
      } catch (error) {
        this.$message.error("获取统计结果失败:" + error);
        this.loading = false;
      }
    },
    onClose(){
      this.chartVisible=false
    }
  }
};
</script>

<style scoped>

</style>

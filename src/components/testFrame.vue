<template>
	<div class="flyBox">
		<span class="input-tag">绘制</span>
		<div @click="toggleVisible">click</div>
	</div>
</template>

<script>
import { mapTools } from 'municipal-cesium-lib';
import mockData from './mockdata';
export default {
	inject: ['Cesium', 'CesiumZondy', 'webGlobe'],
	data() {
		return {
			show: false
		};
	},
	watch: {
		show: {
			handler() {
				if (this.show) {
					this.testMapTool();
				} else {
					this.removeEffect();
				}
			},
			immediate: true
		}
	},
	methods: {
		toggleVisible() {
			this.show = !this.show;
		},
		testMapTool() {
			const testUrl = '/static/images/shaoxing/shaoxing-threeD/mapIcons/大口径阀门.png';
			const clusterUrl = '/static/images/shaoxing/shaoxing-threeD/mapIcons/大口径阀门-红.png';
			const optionsTable = {
				useTableStyle: true,
				title: 'test',
				closable: false,
				needTip: true,
				content: [
					{
						name: '瞬时流量',
						value: 2532,
						unit: 'm/h'
					},
					{
						name: '累计流量',
						value: 18010100,
						unit: 'm'
					},
					{
						name: '流速',
						value: 0.456,
						unit: 'm/s'
					}
				]
			};
			const optionsMark = {
				useTitle: true,
				title: 'test',
				closable: false,
				needTip: true
			};
			this.mapController = new mapTools(this.webGlobe);
			const targetData = mockData.map((item, index) => {
				this.mapController.createCommonTip('test', item, optionsTable);
				this.mapController.createCommonTip('test-mark', item, optionsMark);
				return {
					position: item,
					url: testUrl,
					width: 26,
					height: 62,
					id: `test-${index}`
				};
			});
			this.mapController.addManyPoints(targetData, clusterUrl, 50, 5, 'test');
			// 测试添加带文字说明的多边形
			this.mapController.createPoygon(
				mockData,
				'#000',
				0.5,
				'#f0f0f0',
				4,
				'16pt 黑体',
				'#000',
				'test'
			);
			// 测试添加线段
			this.mapController.createLine('test', mockData, false, '#000', 10, false, false);
		},
		removeEffect() {
			if (!this.mapController) {
				this.mapController = new mapTools(this.webGlobe);
			}
			this.mapController.removeLabels();
			this.mapController.removeEnts();
			this.mapController.removeTips();
		}
	}
};
</script>

<style>
.flyBox {
	position: fixed;
	top: 0;
	width: 120px;
	height: 30px;
	background-color: #fff;
	display: flex;
	justify-content: space-around;
}
</style>

<template>
<div class="baidumap">
</div>
</template>

<script>

export default {
    name: 'baidumap',

	data: function data() { 
        return {
            clientWidth: document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth, // 设备的宽度
            clientHeight: document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight, // 设备高度
        } 
    },
	mounted: function mounted() { },

    methods: {
        /**
         * 初始化百度地图
         */
        initBaiduMap: function initBaiduMap() {
            this.mountBaiduMap = new BMap.Map('BaiduMap'); // 创建地图实例  
            this.mountBaiduMap.centerAndZoom(new BMap.Point(114.059560, 22.542860), 13); // 初始化地图，设置中心点坐标(深圳福田) 和地图级别  
            this.mountBaiduMap.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
            this.mountBaiduMap.addControl(new BMap.NavigationControl({
                offset: new BMap.Size(10, 65),
            }));

            // this.renderMarkerPoint();
        },

    }
}

</script>

<style scoped lang="less">
@black1: #303133;
@black2: #606266;
@black3: #909399;
@black4: #C0C4CC;

.baidumap {
    position: relative;
    font-size: 14px;
    width: 100%;
    min-height: 100%;
}

</style>

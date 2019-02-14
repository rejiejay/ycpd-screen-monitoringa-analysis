<template>
<div class="baidumap" :style="`width: ${clientWidth}px; height: ${clientHeight}px;`">
    <div id="BaiduMap" :style="`width: ${clientWidth}px; height: ${clientHeight}px;`">
    </div>
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

	mounted: function mounted() {
        this.initBaiduMap();
    },

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
            
			this.mountBaiduMap.setMapStyle({ 
                features: ["road", "water", "land"], // point（兴趣点）、road（道路）、water（河流）、land（陆地）、building（建筑物）
                style : "dark"  //设置地图风格为高端黑
            });

            this.renderMarkerPoint();
        },

        /**
         * 渲染热力图标记点
         */
        renderMarkerPoint: function renderMarkerPoint() {

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
    height: 100%;
}

</style>

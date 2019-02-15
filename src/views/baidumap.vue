<template>
<div class="baidumap" :style="`width: ${clientWidth}px; height: ${clientHeight}px;`">
    <div id="BaiduMap" :style="`width: ${clientWidth}px; height: ${clientHeight}px;`">
    </div>
</div>
</template>

<script>
// 资源类
import opacity from '@/assets/opacity.svg';
// 工具类
import TimeConver from '@/utils/TimeConver';
// 请求类
import { getDotData, getDotService } from '@/api/index';

export default {
    name: 'baidumap',

	data: function data() { 
        return {
            clientWidth: document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth, // 设备的宽度
            clientHeight: document.body.offsetHeight || document.documentElement.clientHeight || window.innerHeight, // 设备高度
            
            svg: {
                opacity: opacity,
            },

            mountBaiduMap: new BMap.Map('BaiduMap'),

            /**
             * 所有网点
             */
            heatmapList: [
                // {
                //     lng: 114.132955,
                //     lat: 22.667178,
                //     count: 100,
                // },
            ],
        } 
    },

	mounted: function mounted() {
        this.initBaiduMap(); // 初始化百度地图

        this.initMarkerHeatmap(); // 初始化热力图标记点

        
        this.initDotService(); // 初始化网点服务动态数据
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
        },

        /**
         * 初始化热力图标记点 
         */
        initMarkerHeatmap: function initMarkerHeatmap() {
            const _this = this;

            /**
             * 使用 Heatmap 热力图插件
             * 渲染热力图标记点
             */
            function renderMarkerHeatmap() {
                let heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 20 });
                _this.mountBaiduMap.addOverlay(heatmapOverlay);
                heatmapOverlay.setDataSet({data: _this.heatmapList, max: 100});
                heatmapOverlay.show();
            }

            /**
             * 请求获取所有网点数据
             */
            getDotData()
            .then(response => {
                let value = response.data;

                if (value.Code === 200 && !value.Msg) {
                    _this.heatmapList = value.Data.List.map(val => ({
                        lng: val.lng,
                        lat: val.lat,
                        count: 100,
                    }));
                    renderMarkerHeatmap(); // 渲染热力图标记点

                } else {
                    console.error(value);
                    alert(`请求获取所有网点数据失败, 原因: ${value.Msg}`);
                }

            }).catch(error => {
                console.error(error);
                alert(`请求获取所有网点数据失败, 原因: ${error.message}`);
            });
        },

        /**
         * 初始化网点服务动态数据
         */
        initDotService: function initDotService() {
            
            /**
             * 获取网点服务动态数据
             */
            getDotService()
            .then(response => {
                let value = response.data;

                if (value.Code === 200 && !value.Msg) {
                    console.log(value);
                } else {
                    console.error(value);
                    alert(`获取网点服务动态数据, 原因: ${value.Msg}`);
                }

            }).catch(error => {
                console.error(error);
                alert(`获取网点服务动态数据, 原因: ${error.message}`);
            });

            this.renderMarkerAnimation(); // 渲染新增提示的动画
        },

        /**
         * 渲染新增提示的动画
         */
        renderMarkerAnimation: function renderMarkerAnimation() {
            const _this = this;

            function ComplexCustomOverlay(point , marker) {  
                this._point = point;  
                this._marker = marker;  
            }
            
            ComplexCustomOverlay.prototype = new BMap.Overlay();  
            ComplexCustomOverlay.prototype.initialize = function(map) {  
                this._map = map;
                var div = this._div = document.createElement("div");  
                div.style.position = "absolute";    
                var arrow = this._arrow = document.createElement("div");  
                
                arrow.style.position = "absolute";   
                arrow.style.overflow = "hidden";  
                div.appendChild(arrow);  
                arrow.className = "css_animation";    
                
                if(this._marker) {  
                    map.addOverlay(this._marker);  
                }   
            
                map.getPanes().labelPane.appendChild(div);  
                
                return div;  
            }

            ComplexCustomOverlay.prototype.draw = function() {  
                var map = this._map;  
                var pixel = map.pointToOverlayPixel(this._point);  
                this._div.style.left = pixel.x - 25 + "px";  
                this._div.style.top  = pixel.y - 25 + "px";  
            }
            
            ComplexCustomOverlay.prototype.setPosition = function(point) {  
                this._point = point;
                this.draw();
                if (this._marker) {
                    this._marker.setPosition(this._point);  
                }
            }
            
            ComplexCustomOverlay.prototype.getPosition = function() {  
                return this._point ;  
            }
  
            function addMarker(_lon, _lat) {  
                var point = new BMap.Point(_lon, _lat);  
                let myIcon = new BMap.Icon(_this.svg.opacity, new BMap.Size(1, 1));
                var marker = new BMap.Marker(point, { icon: myIcon }); // 创建标注      
                var plex = new ComplexCustomOverlay(point, marker); // 创建标注      
    
                return plex;
            }

            var myAddMarker = addMarker(114.059560, 22.542860);  
            this.mountBaiduMap.addOverlay(myAddMarker);  

            /**
             * 清除动画的方法
             */
            setTimeout(() => {
                var allOverlay = _this.mountBaiduMap.getOverlays();

                allOverlay.map(val => {
                    /**
                     * 判断是否热力图
                     */
                    if (!val.heatmap) {
                        /**
                         * 清除所有除热力图的遮罩物
                         * 也就是动画
                         */
                        _this.mountBaiduMap.removeOverlay(val);
                    }
                });
            }, 3000);

        },
    }
}

</script>

<style lang="less">
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

.css_animation {    
    height: 50px;    
    width: 50px;    
    border-radius: 25px;    
    background: rgba(250, 0, 0, 0.9);    
    transform: scale(0);    
    animation: my_css_animation 3s;    
    animation-iteration-count: 1;
}    

@keyframes my_css_animation {    
    to {
        transform: scale(2);
        background: rgba(0, 0, 0, 0);    
    }
}

</style>

<!-- 养车频道数据监控平台 -->
<template>
    <div class="home" >
        <div id="header">
            <div class="title">
                <img src="../assets/logo.png" alt="">
                <span>养车频道数据监控平台</span>
            </div>
            <div class="city">
                <span>深圳市</span>
            </div>
        </div>
        <div class="flex-start" id="mainBox">
            <div class="map flex-rest" :style="`height: ${clientHeight - 88 - 35}px;`">
                <div class="map-container"><div id="BaiduMap"></div></div>
                
            </div>

            <div class="monitoringData flex-rest">
                <div class="monitoringData-container">
                    <div class="serviceData">
                        <div style="font-size:16px">已完成服务</div>
                        <div class="table">
                            <table width="100%" border="1" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td></td>
                                    <td>类型</td>
                                    <td>洗车</td>
                                    <td>加油</td>
                                    <td>保养</td>
                                    <td>投诉</td>
                                </tr>
                                <tr>
                                    <td>今日订单</td>
                                    <td style="color:#2D61B1">{{serviceData.today_all}}</td>
                                    <td style="color:#2D61B1" v-for="(item,index) in serviceData.today" :key="index">{{item.len}}</td>
                                    <!-- <td></td>
                                    <td></td>
                                    <td></td> -->
                                </tr>
                                <tr>
                                    <td>最近30天</td>
                                    <td style="color:#2D61B1">{{serviceData.near_all}}</td>
                                    <td style="color:#2D61B1" v-for="(item,index) in serviceData.near" :key="index">{{item.len}}</td>
                                    <!-- <td></td>
                                    <td></td>
                                    <td></td> -->
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div class="dot">
                        <div style="marginTop:20px;fontSize:16px;marginBottom:10px">上线网点</div>
                        <table width="100%" border="1" cellspacing="0" cellpadding="0">
                            <tr>
                                <td>全部</td>
                                <td>洗车</td>
                                <td>停车</td>
                                <td>保养</td>
                                <td>加油</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>

                    <div class="dynamic">
                        <div style="marginTop:20px;fontSize:16px;marginBottom:10px">服务动态</div>
                        <ul class="header">
                            <li>时间</li>
                            <li>区域</li>
                            <li>车牌</li>
                            <li>类型</li>
                            <li>网点</li>
                        </ul>
                        <ul class="content">
                            <li class="animated bouncelnRight" v-for="(item,index) in detailsList" :key="index">
                                <span>{{item.whattime.substr(11,20)}}</span>
                                <span>{{item.area}}</span>
                                <span>{{item.carno}}</span>
                                <span>{{item.typedesc}}</span>
                                <span>{{item.dotname}}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
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
    name: 'home',

	data: function data() { 
        return {
            clientWidth: document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth, // 设备的宽度
            clientHeight: window.document.documentElement.clientHeight, //|| window.document.documentElement.clientHeight || window.innerHeight, // 设备高度

            serviceData: {
                today_all:100,
                near_all:200,
                today:[
                   {type:1,len:30},
                   {type:2,len:30},
                   {type:3,len:22},
                   {type:4,len:18},
                ],
                near:[
                   {type:1,len:50},
                   {type:2,len:60},
                   {type:3,len:40},
                   {type:4,len:50},
                ],
                details:[
                    // {
                    //     whattime: "2019-02-15T17:36:00",
                    //     area: "佛山市",
                    //     carno: "粤XVM338",
                    //     type: 1,
                    //     typedesc: "洗车",
                    //     dotname: "佛山大良加油站漫途汽服店",
                    //     lng: 113.249232,
                    //     lat: 22.850989
                    // },
                    {
                        whattime: "2019-02-16T10:10:40",
                        area: "佛山市",
                        carno: "粤XVM338",
                        type: 2,
                        typedesc: "加油",
                        dotname: "佛山大良加油站漫途汽服店",
                        lng: 113.249232,
                        lat: 22.850989
                    },
                    {
                        whattime: "2019-02-16T10:10:05",
                        area: "佛山市",
                        carno: "粤XVM338",
                        type: 2,
                        typedesc: "加油",
                        dotname: "佛山大良加油站漫途汽服店",
                        lng: 113.249232,
                        lat: 22.850989
                    },
                    {
                        whattime: "2019-02-16T10:10:10",
                        area: "佛山市",
                        carno: "粤XVM338",
                        type: 2,
                        typedesc: "加油",
                        dotname: "佛山大良加油站漫途汽服店",
                        lng: 113.249232,
                        lat: 22.850989
                    },
                    {
                        whattime: "2019-02-16T10:10:15",
                        area: "佛山市",
                        carno: "粤XVM338",
                        type: 2,
                        typedesc: "加油",
                        dotname: "佛山大良加油站漫途汽服店",
                        lng: 113.249232,
                        lat: 22.850989
                    },
                    {
                        whattime: "2019-02-16T10:10:20",
                        area: "佛山市",
                        carno: "粤XVM338",
                        type: 2,
                        typedesc: "加油",
                        dotname: "佛山大良加油站漫途汽服店",
                        lng: 113.249232,
                        lat: 22.850989
                    },
                    {
                        whattime: "2019-02-16T10:10:25",
                        area: "佛山市",
                        carno: "粤XVM338",
                        type: 2,
                        typedesc: "加油",
                        dotname: "佛山大良加油站漫途汽服店",
                        lng: 113.249232,
                        lat: 22.850989
                    },
                    {
                        whattime: "2019-02-16T10:10:30",
                        area: "佛山市",
                        carno: "粤XVM338",
                        type: 2,
                        typedesc: "加油",
                        dotname: "佛山大良加油站漫途汽服店",
                        lng: 113.249232,
                        lat: 22.850989
                    },
                    
                ]
            },
            timer: null,
            detailsList: [],
            
            svg: {
                opacity: opacity,
            },

            mountBaiduMap: new BMap.Map('BaiduMap'),

            /**
             * 正在执行标注的动画的数量
             */
            mrkerAnimationingCount: 0,

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

            /**
             * 网点服务动态数据
             */
            dotServiceList: [
                // {
                //     whattime: "2019-02-15T14:00:11.997",
                //     lng: 113.249232,
                //     lat: 22.850989,
                // }
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
            this.mountBaiduMap.addControl(new BMap.NavigationControl());
            
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
            const _this = this;
            
            /**
             * 是否 正在处理网点服务的动态数据
             * 初始化为 未执行
             */
            let isHandleServiceList = false;

            /**
             * 渲染 渲染新增提示的动画
             */
            let initMarkerAnimation = () => {
                // 当前时间戳
                let nowTimestamp = new Date().getTime() - (1000 * 60 * 10); // 减去十分钟，因为数据是延迟，不是实时的
                let nextTimestamp = nowTimestamp + 1000; // 下一秒

                /**
                 * 渲染 渲染新增提示的动画
                 */
                _this.dotServiceList.map(val => {
                    /**
                     * 判断 网点服务的时间 是否在当前的时间
                     */
                    if (nowTimestamp < val.timestamp && nowTimestamp > val.timestamp ) {
                        // 如果是在当前的时间, 则将提示动画渲染到地图上
                        _this.renderMarkerAnimation(val.lng, val.lat);
                    }
                });
            }

            /**
             * 处理 serviceData 表单数据
             */
            let initServiceData = () => {
                let data = _this.serviceData;

                for(let i = 0; i < data.details.length; i++) {
                    let time = parseInt(new Date(data.details[i].whattime).getTime() / 1000);
                    // console.log(time)
                    let date = parseInt(new Date().getTime() / 1000 - 10 * 60); 

                    // console.log('数据时间:'+time+'现在时间'+date)

                    // 数据时间:1550215530997现在时间1550215582074

                    if(time == date){
                        _this.detailsList.unshift(data.details[i]);

                        if (_this.detailsList.length > 5) {
                            _this.detailsList.splice(5, 1);
                        }

                        if(data.details[i].type === 1) {
                            data.today_all++
                            data.near_all++
                            data.today[0].len++
                            data.near[0].len++
                            console.log('洗车')
                        }

                        if(data.details[i].type === 2){
                            data.today_all++
                            data.near_all++
                            data.today[1].len++
                            data.near[1].len++
                            console.log('加油');
                        }
                    }
                }

            }

            /**
             * 处理网点服务动态数据的方法
             */
            function serviceListHandle() {
                /**
                 * 判断是否正在执行，用于保证仅仅执行一次
                 */
                if (isHandleServiceList) {
                    // 如果存在正在执行的情况, 禁止继续执行
                    return false
                }

                isHandleServiceList = true; // 设置为正在处理网点服务的动态数据，防止重复执行

                initMarkerAnimation(); // 渲染 渲染新增提示的动画
                initServiceData(); // 处理 serviceData 表单数据

                // 一秒钟执行一次
                setTimeout(() => {
                    isHandleServiceList = false; // 设置为处理完毕，否则不会继续执行
                    serviceListHandle();
                }, 1000);
            }
            
            /**
             * 获取网点服务动态数据
             */
            getDotService()
            .then(response => {
                let value = response.data;

                if (value.Code === 200 && !value.Msg) {
                    console.log('获取网点服务动态数据', value);
                    _this.dotServiceList = value.Data.details.map(val => ({
                        timestamp: new Date(val.whattime).getTime(),
                        lng: val.lng,
                        lat: val.lat,
                    }));

                    /**
                     * 处理网点数据
                     */
                    _this.serviceData = value.Data;
                    if (_this.serviceData.today.length === 0) {
                        _this.serviceData.today = [
                            { type: 1, len: 0 },
                            { type: 2, len: 0 },
                            { type: 3, len: 0 },
                            { type: 4, len: 0 },
                        ];
                    }

                    serviceListHandle(); // 处理网点服务动态数据的方法

                } else {
                    console.error(value);
                    alert(`获取网点服务动态数据失败, 原因: ${value.Msg}`);
                }

            }).catch(error => {
                console.error(error);
                alert(`获取网点服务动态数据失败, 原因: ${error.message}`);
            });
        },

        /**
         * 渲染新增提示的动画
         */
        renderMarkerAnimation: function renderMarkerAnimation(longitude, latitude) {
            const _this = this;

            _this.mrkerAnimationingCount++; // 每执行一次 正在执行标注的动画的数量 加一

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

            var myAddMarker = addMarker(longitude, latitude);  
            this.mountBaiduMap.addOverlay(myAddMarker);  

            /**
             * 清除动画的方法
             */
            setTimeout(() => {
                /**
                 * 3秒表示执行完毕
                 * 正在执行标注的动画的数量 减一
                 */
                _this.mrkerAnimationingCount--;

                // 判断是否所有 动画是否执行完毕
                if (_this.mrkerAnimationingCount <= 0) {
                    // 所有动画执行完毕的情况下 清空动画标注
                    var allOverlay = _this.mountBaiduMap.getOverlays();

                    allOverlay.map(val => {
                        /**
                         * 判断是否热力图
                         */
                        if (!val.heatmap) {
                            /**
                             * 清除所有除热力图的遮罩物
                             * 也就是所有动画标注
                             */
                            _this.mountBaiduMap.removeOverlay(val);
                        }
                    });
                }

            }, 3000);

        },

    }
}

</script>

<style scoped lang="less">
@black1: #303133;
@black2: #606266;
@black3: #909399;
@black4: #C0C4CC;

.home {
    position: relative;
    font-size: 14px;
    width: 100%;
    min-height: 100%;
    background-color: #0F1729;
    #header {
        height: 88px;
        width: 100%;
        color: #fff;
        background-color: #152038;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 30px;
        box-sizing: border-box;
        .title {
            color: #fff;
            font-size: 24px;
            font-weight: 600;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                height: 50px;
                width: 50px;
                margin-right: 20px;
            }
        }
        .city {
            font-size: 14px;
            width:100px;
            height: 40px;
            border: 1px solid #fff;
            border-radius: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            // position: absolute;
            // right: 30px;
            // top: 2px;
        }
    }
    #mainBox {
        padding-top: 20px;
        box-sizing: border-box;
        font-size: 14px;
        overflow: hidden;

        // 百度地图
        .map .map-container {
            padding: 0px 15px 15px 15px;
            height: 100%;

            #BaiduMap {
                height: 100%;
            }
        }

        .monitoringData {
            // background-color: #ccc;
            color: #c1c7d3;
            padding-bottom: 35px;

            .monitoringData-container {
                padding-right: 30px;
            }

            .serviceData {
               
               .table {
                   table {
                       border-color: #29467c;
                       margin-top: 10px;
                       tr {
                           td:first-child {
                               width: 80px;
                           }
                           td {
                               height: 50px;
                               width: 60px;
                               text-align: center;
                               line-height: 50px;
                           }
                       }
                   }
               }
            }
            .dot {
                table {
                    border-color: #29467c;
                    td {
                        height: 50px;
                        text-align: center;
                        line-height: 50px;
                    }
                }
            }
            .dynamic {
                width: 100%;
                .header {
                    display: flex;
                    border:1px solid #29467c;
                    li {
                        flex: 1;
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        border-right: 1px solid #29467c;
                    }
                    li:last-child{
                        flex:2;
                        border-right: none;
                    }
                }
                .content {
                    li {
                        // width: 100%;
                        display: flex;
                        height: 36px;
                        border: 1px solid #29467c;
                        border-top: none;
                        span {
                            flex:1;
                            // display: block;
                            text-align: center;
                            line-height: 36px;
                            border-right: 1px solid #29467c;
                        }
                        span:last-child {
                            flex:2;
                            border-right: none;
                        }
                    }
                }
            }
        }
    }
}

</style>

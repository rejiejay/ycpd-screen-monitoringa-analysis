<!-- 养车频道数据监控平台 -->
<template>
    <div class="home" >
        <div id="header">
            <div class="title">
                <img src="../assets/logo.png" alt="">
                <span>养车频道数据监控平台</span>
            </div>
            <div class="city">
                <el-dropdown trigger="click" @command="handleCity">
                    <span class="el-dropdown-link">
                        {{districtName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="广东省">广东省</el-dropdown-item>
                        <el-dropdown-item command="深圳市">深圳市</el-dropdown-item>
                        <el-dropdown-item command="广州市">广州市</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="flex-start" id="mainBox">
            <div class="map flex-rest" :style="`height: ${clientHeight - 88 - 35}px;`">
                <div class="map-container">
                    <div id="BaiduMap"></div>

                    <div class="map-style-select">
                        <el-radio-group v-model="mapStyle" size="medium">
                            <el-radio-button label="serviceDynamic">服务动态</el-radio-button>
                            <el-radio-button label="siteMap">网点地图</el-radio-button>
                        </el-radio-group>
                    </div>
                    
                    <div class="map-server-type">
                        <el-radio-group v-model="serverType" size="medium">
                            <el-radio-button label="all">全部</el-radio-button>
                            <el-radio-button label="baoyang">保养</el-radio-button>
                            <el-radio-button label="xiche">洗车</el-radio-button>
                            <el-radio-button label="jiayou">加油</el-radio-button>
                            <el-radio-button label="tingche">停车</el-radio-button>
                        </el-radio-group>
                    </div>
                </div>
            </div>

            <div class="monitoringData flex-rest">
                <div class="monitoringData-container">
                    <div class="serviceData">
                        <div style="font-size:18px;color=#7C8BB3;font-weight:bold">已完成服务</div>
                        <div class="table">
                            <table width="100%" border="1" cellspacing="0" cellpadding="0">
                                <tr style="backgroundColor:#121C32">
                                    <td></td>
                                    <td>类型</td>
                                    <td>洗车</td>
                                    <td>加油</td>
                                    <td>保养</td>
                                    <td>投诉</td>
                                </tr>
                                <tr>
                                    <td style="backgroundColor:#121C32">今日订单</td>
                                    <td style="color:#2D61B1">{{serviceData.today_all}}</td>
                                    <td style="color:#2D61B1" v-for="(item,index) in serviceData.today" :key="index">{{item.len}}</td>
                                    <!-- <td></td>
                                    <td></td>
                                    <td></td> -->
                                </tr>
                                <tr>
                                    <td style="backgroundColor:#121C32">最近30天</td>
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
                        <div style="marginTop:20px;fontSize:18px;marginBottom:10px;color=#7C8BB3;font-weight:bold">上线网点</div>
                        <table width="100%" border="1" cellspacing="0" cellpadding="0">
                            <tr style="backgroundColor:#121C32">
                                <td>全部</td>
                                <td>洗车</td>
                                <td>停车</td>
                                <td>保养</td>
                                <td>加油</td>
                            </tr>
                            <tr style="color:#2D61B1">
                                <td>{{heatmapFrom.all}}</td>
                                <td>{{heatmapFrom.xiche}}</td>
                                <td>{{heatmapFrom.tingche}}</td>
                                <td>{{heatmapFrom.baoyang}}</td>
                                <td>{{heatmapFrom.jiayou}}</td>
                            </tr>
                        </table>
                    </div>

                    <div class="dynamic">
                        <div style="marginTop:20px;fontSize:18px;marginBottom:10px;color=#7C8BB3;font-weight:bold">服务动态</div>
                        <ul style="backgroundColor:#121C32" class="header">
                            <li>时间</li>
                            <li>区域</li>
                            <li>车牌</li>
                            <li>类型</li>
                            <li>网点</li>
                        </ul>
                        <ul class="content">
                            <transition-group name="slide-fade" tag='span'> 
                                <li v-for="item in detailsList" :key="item.id">    
                                    <span>{{item.whattime.substr(11,20)}}</span>
                                    <span>{{item.area}}</span>
                                    <span>{{item.carno}}</span>
                                    <span>{{item.typedesc}}</span>
                                    <span>{{item.dotname}}</span>       
                                </li>  
                            </transition-group>
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
import radialGradient from '@/assets/radialGradient.svg';
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
                    {
                        whattime: "2019-02-16T10:50:40",
                        area: "佛山市",
                        carno: "粤XVM338",
                        type: 2,
                        typedesc: "加油",
                        dotname: "佛山大良加油站漫途汽服店",
                        lng: 113.249232,
                        lat: 22.850989
                    },
                    {
                        whattime: "2019-02-16T11:12:46",
                        area: "佛山市",
                        carno: "粤XVM338",
                        type: 2,
                        typedesc: "加油",
                        dotname: "佛山大良加油站漫途汽服店",
                        lng: 113.249232,
                        lat: 22.850989
                    },
                    {
                        whattime: "2019-02-16T11:12:10",
                        area: "佛山市",
                        carno: "粤XVM338",
                        type: 2,
                        typedesc: "加油",
                        dotname: "佛山大良加油站漫途汽服店",
                        lng: 113.249232,
                        lat: 22.850989
                    },
                    {
                        whattime: "2019-02-16T11:12:15",
                        area: "佛山市",
                        carno: "粤XVM338",
                        type: 2,
                        typedesc: "加油",
                        dotname: "佛山大良加油站漫途汽服店",
                        lng: 113.249232,
                        lat: 22.850989
                    },
                    {
                        whattime: "2019-02-16T11:12:20",
                        area: "佛山市",
                        carno: "粤XVM338",
                        type: 2,
                        typedesc: "加油",
                        dotname: "佛山大良加油站漫途汽服店",
                        lng: 113.249232,
                        lat: 22.850989
                    },
                    {
                        whattime: "2019-02-16T11:12:25",
                        area: "佛山市",
                        carno: "粤XVM338",
                        type: 2,
                        typedesc: "加油",
                        dotname: "佛山大良加油站漫途汽服店",
                        lng: 113.249232,
                        lat: 22.850989
                    },
                    {
                        whattime: "2019-02-16T11:12:30",
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

            districtName: '深圳市', // 行政区域
            
            svg: {
                opacity: opacity,
                radialGradient: radialGradient,
            },

            mountBaiduMap: new BMap.Map('BaiduMap'),
            /**
             * 地图样式
             * @prop {string} serviceDynamic 服务动态图
             * @prop {string} siteMap 网点地图
             */
            mapStyle: 'serviceDynamic',
            /**
             * 服务类型
             * @prop {string} all 全部
             * @prop {string} baoyang 保养
             * @prop {string} xiche 洗车
             * @prop {string} jiayou 加油
             * @prop {string} tingche 停车
             */
            serverType: 'all',

            /**
             * 正在执行标注的动画的数量
             */
            mrkerAnimationingCount: 0,

            /**
             * 所有网点
             */
            dotData: [
                // {
                //     address: "广东省广州市花都区狮岭大道东7号之20典典养车汇航店",
                //     area: "广东广州",
                //     channel: "ycpd",
                //     contactphone: "13533888189",
                //     dotid: 180711010001883650,
                //     dotname: "典典养车汇航店",
                //     is_baoyang: 1,
                //     is_jiayou: 0,
                //     is_tingche: 0,
                //     is_xiche: 1,
                //     lat: 23.44978,
                //     lng: 113.19573,
                //     status: 1,
                // }
            ],
            /**
             * 热力图 以及网点图
             */
            dotHeatMapList: [
                // {
                //     lng: 114.132955,
                //     lat: 22.667178,
                //     count: 100,
                // },
            ],

            /**
             * 网点表单
             */
            heatmapFrom: {
                all: 0,
                baoyang: 0,
                jiayou: 0,
                tingche: 0,
                xiche: 0,
            },

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

    watch: {
        /**
         * 地图样式
         * @prop {string} serviceDynamic 服务动态图
         * @prop {string} siteMap 网点地图
         */
        mapStyle: function mapStyle(newMapStyle) {
            this.initMarkerMap();
        },

        /**
         * 服务类型
         * @prop {string} all 全部
         * @prop {string} baoyang 保养
         * @prop {string} xiche 洗车
         * @prop {string} jiayou 加油
         * @prop {string} tingche 停车
         */
        serverType: function serverType(newServerType) {
        },
    },

    mounted: function mounted() {
        this.initBaiduMap(); // 初始化百度地图

        this.ajaxsGetDotData(); // 获取网点数据

        this.initDotService(); // 初始化网点服务动态数据
    },

    methods: {
        /**
         * 初始化百度地图
         */
        initBaiduMap: function initBaiduMap() {
            this.mountBaiduMap = new BMap.Map('BaiduMap', { enableMapClick: false }); // 创建地图实例，关闭底图可点功能
            this.mountBaiduMap.centerAndZoom(new BMap.Point(114.059560, 22.542860), 11); // 初始化地图，设置中心点坐标(深圳福田) 和地图级别  
            this.mountBaiduMap.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
            
            this.mountBaiduMap.setMapStyle({ 
                features: ["road", "water", "land"], // point（兴趣点）、road（道路）、water（河流）、land（陆地）、building（建筑物）
                style : "dark",  //设置地图风格为高端黑
            });
        },

        /**
         * 点击选择省份
         */        
        handleCity: function handleCity(districtName) {
            this.districtName = districtName;
            this.clearAllOverlay(true);
            this.renderBoundary(true);
        },

        /**
         * 渲染省份以及定位
         * @param {Bollen} 是否刷新中中心点
         */
        renderBoundary: function renderBoundary(isRefreshCenter) {
            const _this = this;
            let districtName = this.districtName;

            /**
             * 根据省份获取定位
             */
            var myGeo = new BMap.Geocoder();     
            // 将地址解析结果显示在地图上，并调整地图视野    
            myGeo.getPoint(districtName, function(point){      
                if (point) {
                    let zoom = 11; // 层级默认为 11
                    if (districtName === '广东省') {
                        zoom = 9;
                    }

                    _this.mountBaiduMap.centerAndZoom(point, zoom);
                }      
            });

            /**
             * 下面 渲染区域
             * 参考 https://my.oschina.net/u/3227847/blog/828908
             */
            var blist = [];
            var bdary = new BMap.Boundary();
            bdary.get(this.districtName, function (rs) {       //获取行政区域
                var count = rs.boundaries.length; // 行政区域的点有多少个

                // 未能获取当前输入行政区域
                if (count === 0) {
                    alert('未能获取当前输入行政区域');
                    return;
                }

                for (var i = 0; i < count; i++) {
                    blist.push({ points: rs.boundaries[i], name: _this.districtName });
                };
                
                drawBoundary();
            });

            function drawBoundary() {
                // 包含所有区域的点数组
                var pointArray = [];

                /*画遮蔽层的相关方法
                *思路: 首先在中国地图最外画一圈，圈住理论上所有的中国领土，然后再将每个闭合区域合并进来，并全部连到西北角。
                *      这样就做出了一个经过多次西北角的闭合多边形*/
                // 定义中国东南西北端点，作为第一层
                var pNW = { lat: 59.0, lng: 73.0 }
                var pNE = { lat: 59.0, lng: 136.0 }
                var pSE = { lat: 3.0, lng: 136.0 }
                var pSW = { lat: 3.0, lng: 73.0 }
                // 向数组中添加一次闭合多边形，并将西北角再加一次作为之后画闭合区域的起点
                var pArray = [];
                pArray.push(pNW);
                pArray.push(pSW);
                pArray.push(pSE);
                pArray.push(pNE);
                pArray.push(pNW);
                // 循环添加各闭合区域
                for (var i = 0; i < blist.length; i++) {
                    // 添加显示用标签层
                    var label = new BMap.Label(blist[i].name, { offset: new BMap.Size(20, -10) });
                    label.hide();
                    _this.mountBaiduMap.addOverlay(label);

                    // 添加多边形层并显示
                    var ply = new BMap.Polygon(blist[i].points, { strokeWeight: 5, strokeColor: "#FF0000", fillOpacity: 0.01, fillColor: " #FFFFFF" }); // 建立多边形覆盖物
                    ply.name = blist[i].name;
                    ply.label = label;
                    _this.mountBaiduMap.addOverlay(ply);

                    // 将点增加到视野范围内
                    var path = ply.getPath();
                    pointArray = pointArray.concat(path);
                    // 将闭合区域加到遮蔽层上，每次添加完后要再加一次西北角作为下次添加的起点和最后一次的终点
                    pArray = pArray.concat(path);
                    pArray.push(pArray[0]);
                }
            }
            
        },

        /**
         * 获取所有网点数据
         */
        ajaxsGetDotData: function ajaxsGetDotData() {
            const _this = this;

            /**
             * 请求获取所有网点数据
             */
            getDotData()
            .then(response => {
                let value = response.data;

                if (value.Code === 200 && !value.Msg) {
                    _this.dotData = value.Data.List;

                    _this.heatmapFrom = {
                        all: value.Data.all,
                        baoyang: value.Data.baoyang,
                        jiayou: value.Data.jiayou,
                        tingche: value.Data.tingche,
                        xiche: value.Data.xiche,
                    }
                    _this.initMarkerMap(); // 初始化地图标记点

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
         * 初始化地图标记点 
         */
        initMarkerMap: function initMarkerMap() {
            const _this = this;
            this.mountBaiduMap.clearOverlays(); // 先清空所有的热力点
            this.renderBoundary(); // 渲染省份以及定位

            /**
             * 使用 Heatmap 热力图插件
             * 渲染热力图标记点
             */
            function renderMarkerHeatmap() {
                let heatmapOverlay = new BMapLib.HeatmapOverlay({ "radius": 20 });
                _this.mountBaiduMap.addOverlay(heatmapOverlay);
                heatmapOverlay.setDataSet({data: _this.dotHeatMapList, max: 100});
                heatmapOverlay.show();
            }

            /**
             * 网点地图
             */
            function renderMarkerDotmap() {
                for (let i = 0; i < _this.dotHeatMapList.length; i++) {
                
                    if (_this.dotHeatMapList[i].lng && _this.dotHeatMapList[i].lat) {
                        let myPoint = new BMap.Point(_this.dotHeatMapList[i].lng, _this.dotHeatMapList[i].lat); // 当前位置点
                        let myIcon = new BMap.Icon( _this.svg.radialGradient, new BMap.Size(20, 20)); // 图标
                        let myMarker = new BMap.Marker(myPoint, { icon: myIcon }); // 标记
                        myMarker.class = 'dotHeatMap';
                        _this.mountBaiduMap.addOverlay(myMarker);
                    }
                }
            }

            this.dotHeatMapList = this.dotData.map(val => ({
                lng: val.lng,
                lat: val.lat,
                count: 60,
            }));

            /**
             * 判断是否渲染热力图
             */
            if (this.mapStyle === 'serviceDynamic') {

                renderMarkerHeatmap(); // 渲染热力图标记点
            } else {

                renderMarkerDotmap(); // 渲染网点地图
            }
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
             * 遮罩动画的类
             */
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
  
            /**
             * 新增遮罩动画的方法
             */
            function addComplexMarker(_lon, _lat) {  
                var point = new BMap.Point(_lon, _lat);  
                let myIcon = new BMap.Icon(_this.svg.opacity, new BMap.Size(1, 1));
                var marker = new BMap.Marker(point, { icon: myIcon }); // 创建标注
                marker.class = 'district';  
                var plex = new ComplexCustomOverlay(point, marker); // 创建标注      
    
                return plex;
            }

            /**
             * 初始化提示的动画
             */
            function renderMarkerAnimation(longitude, latitude) {
                _this.mrkerAnimationingCount++; // 每执行一次 正在执行标注的动画的数量 加一
                
                let myAddMarker = addComplexMarker(longitude, latitude);  
                _this.mountBaiduMap.addOverlay(myAddMarker);  

                /**
                 * 清除动画的方法
                 */
                setTimeout(function () {
                    /**
                     * 3秒表示执行完毕
                     * 正在执行标注的动画的数量 减一
                     */
                    _this.mrkerAnimationingCount--;

                    // 判断是否所有 动画是否执行完毕
                    if (_this.mrkerAnimationingCount <= 0) {
                        // 所有动画执行完毕的情况下 清空动画标注
                        _this.clearAllOverlay();
                    }

                }, 3000);
            }

            /**
             * 出身新增提示的动画
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
                     * 网点服务的时间 大于当前时间 小于下次的时间
                     */
                    if (val.timestamp > nowTimestamp && val.timestamp < nextTimestamp ) {
                        // 如果是在当前的时间, 则将提示动画渲染到地图上
                        renderMarkerAnimation(val.lng, val.lat);
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
                        let newdetails = data.details[i];
                        newdetails.id = Math.random();

                        _this.detailsList.unshift(newdetails);

                        if (_this.detailsList.length > 5) {
                            _this.detailsList.splice(5, 1);
                        }

                        if (data.details[i].type === 1) {
                            data.today_all++
                            data.near_all++
                            data.today[0].len++
                            data.near[0].len++
                            // console.log('洗车')
                        }

                        if (data.details[i].type === 2){
                            data.today_all++
                            data.near_all++
                            data.today[1].len++
                            data.near[1].len++
                            // console.log('加油');
                        }

                        if (data.details[i].type === 3){
                            data.today_all++
                            data.near_all++
                            data.today[2].len++
                            data.near[2].len++
                            // console.log('保养');
                        }

                        if (data.details[i].type === 4){
                            data.today_all++
                            data.near_all++
                            data.today[3].len++
                            data.near[3].len++
                            // console.log('投诉');
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
            let ajaxgetDotService = () => {
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

                        // 10分钟执行一次
                        setTimeout(() => {
                            ajaxgetDotService();
                        }, 1000 * 60 * 10);

                    } else {
                        console.error(value);
                        alert(`获取网点服务动态数据失败, 原因: ${value.Msg}`);
                    }

                }).catch(error => {
                    console.error(error);
                    alert(`获取网点服务动态数据失败, 原因: ${error.message}`);
                });

            }

            ajaxgetDotService();
        },

        /**
         * 清空 除热力图外 所有标注
         * @param {boolen} isClearBoundary 是否清除省份的界限
         */
        clearAllOverlay: function clearAllOverlay(isClearBoundary) {
            const _this = this;
            let districtName = this.districtName;

            var allOverlay = this.mountBaiduMap.getOverlays();

            allOverlay.map(val => {

                /**
                 * 先判断是否清除 省份的界限
                 */
                if (isClearBoundary) {
                    /**
                     * 如果清除的情况下
                     * 判断是否热力图
                     */
                    if (!val.heatmap) {
                        /**
                         * 清除所有除热力图的遮罩物
                         * 也就是所有动画标注
                         */
                        _this.mountBaiduMap.removeOverlay(val);
                    }

                } else {
                    // 不清除省份
                    /**
                     * 先判断是否省份
                     */
                    if (val.content !== districtName && val.name !== districtName) {
                        // 不是省份的情况下，再判断是否热力图
                        if (!val.heatmap) {
                            _this.mountBaiduMap.removeOverlay(val);
                        }
                    }
                }
            });
        },
    },
}

</script>

<style lang="less">
@black1: #303133;
@black2: #606266;
@black3: #909399;
@black4: #C0C4CC;
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter 
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(-20px);
}
.slide-fade-leave-to {
    opacity: 0;
    transition: all 0s;
    
}

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
            color:#9DA7C3;
            font-size: 14px;
            width:100px;
            height: 40px;
            border: 1px solid #7C8BB3;
            border-radius: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            // position: absolute;
            // right: 30px;
            // top: 2px;

            .el-dropdown {
                color: #fff;
            }
        }
    }
    #mainBox {
        padding-top: 20px;
        box-sizing: border-box;
        font-size: 14px;
        overflow: hidden;

        // 百度地图
        .map .map-container {
            position: relative;
            padding: 0px 15px 15px 15px;
            height: 100%;

            #BaiduMap {
                height: 100%;
            }

            .map-style-select {
                position: absolute;
                left: 25px;
                top: 10px;
                z-index: 1;
            }

            .map-server-type {
                position: absolute;
                right: 25px;
                top: 10px;
                z-index: 1;
            }
        }

        .monitoringData {
            // background-color: #ccc;
            color: #9DA7C3;
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
                        min-height: 36px;
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

// 地图闪烁动画
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

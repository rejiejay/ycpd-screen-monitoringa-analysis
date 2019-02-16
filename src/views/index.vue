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
        <div id="mainBox">
            <div class="map">

            </div>
            <div class="monitoringData">
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
</template>

<script>

export default {
    name: 'home',

	data: function data() { 
        return {
            clientWidth: document.body.offsetWidth || document.documentElement.clientWidth || window.innerWidth, // 设备的宽度
            clientHeight: window.document.documentElement.clientHeight, //|| window.document.documentElement.clientHeight || window.innerHeight, // 设备高度

            serviceData:{
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
                        whattime: "2019-02-15T17:36:40",
                        area: "佛山市",
                        carno: "粤XVM338",
                        type: 2,
                        typedesc: "加油",
                        dotname: "佛山大良加油站漫途汽服店",
                        lng: 113.249232,
                        lat: 22.850989
                    },
                    {
                        whattime: "2019-02-15T17:36:05",
                        area: "佛山市",
                        carno: "粤XVM338",
                        type: 2,
                        typedesc: "加油",
                        dotname: "佛山大良加油站漫途汽服店",
                        lng: 113.249232,
                        lat: 22.850989
                    },
                    {
                        whattime: "2019-02-15T17:36:10",
                        area: "佛山市",
                        carno: "粤XVM338",
                        type: 2,
                        typedesc: "加油",
                        dotname: "佛山大良加油站漫途汽服店",
                        lng: 113.249232,
                        lat: 22.850989
                    },
                    {
                        whattime: "2019-02-15T17:36:15",
                        area: "佛山市",
                        carno: "粤XVM338",
                        type: 2,
                        typedesc: "加油",
                        dotname: "佛山大良加油站漫途汽服店",
                        lng: 113.249232,
                        lat: 22.850989
                    },
                    {
                        whattime: "2019-02-15T17:36:20",
                        area: "佛山市",
                        carno: "粤XVM338",
                        type: 2,
                        typedesc: "加油",
                        dotname: "佛山大良加油站漫途汽服店",
                        lng: 113.249232,
                        lat: 22.850989
                    },
                    {
                        whattime: "2019-02-15T17:36:25",
                        area: "佛山市",
                        carno: "粤XVM338",
                        type: 2,
                        typedesc: "加油",
                        dotname: "佛山大良加油站漫途汽服店",
                        lng: 113.249232,
                        lat: 22.850989
                    },
                    {
                        whattime: "2019-02-15T17:57:30",
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
            timer:null,
            detailsList:[],
        } 
    },
    mounted: function mounted() { },
    
    created() {
        let data = this.serviceData
        this.timer = window.setInterval(()=>{
            for(let i=0;i<data.details.length;i++){
                let time = parseInt(new Date(data.details[i].whattime).getTime()/1000) 
                console.log(time)
                let date = parseInt(new Date().getTime()/1000-10*60) 

                console.log('数据时间:'+time+'现在时间'+date)

                // 数据时间:1550215530997现在时间1550215582074

                if(time==date){
                    this.detailsList.unshift(data.details[i])
                    if(this.detailsList.length>5){
                        this.detailsList.splice(5,1)
                    }
                    if(data.details[i].type===1){
                        data.today_all++
                        data.near_all++
                        data.today[0].len++
                        data.near[0].len++
                        console.log('洗车')
                    }
                    if(data.details[i].type===2){
                        data.today_all++
                        data.near_all++
                        data.today[1].len++
                         data.near[1].len++
                        console.log('加油')
                    }
                }
            }
        },1000)

        
         
    },

    methods: {

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
        padding-bottom: 35px;
        .monitoringData {
            width: 50%;
            float:right;
            // background-color: #ccc;
            padding-right: 30px;
            color: #c1c7d3;
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

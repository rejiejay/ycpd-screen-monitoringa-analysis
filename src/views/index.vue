<!-- 养车频道数据监控平台 -->
<template>
    <div class="home" :style="'height:'+clientHeight+'px'">
        <div id="header">
            <div class="title">
                养车频道数据监控平台
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
                    <div style="font-size:24px">已完成服务</div>
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
                                <td>{{clearCarData}}</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>最近30天</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </div>

                <div class="dot">
                    <div style="marginTop:20px;fontSize:22px;marginBottom:20px">上线网点</div>
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
                    <div style="marginTop:20px;fontSize:22px;marginBottom:20px">服务动态</div>
                    <ul class="header">
                        <li>时间</li>
                        <li>区域</li>
                        <li>车牌</li>
                        <li>类型</li>
                        <li>网点</li>
                    </ul>
                    <ul class="content">
                        <li>
                            <span>11:11:12</span>
                            <span>深圳市龙岗区</span>
                            <span>粤B12345</span>
                            <span>加油</span>
                            <span>某某某某服务网点</span>
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
                today:{
                    total:1000,     // 总数
                    clearCar:{      // 洗车
                        total:415,
                        data:[
                            {time:'17:51',number:1},
                            {time:'17:52',number:1},
                            {time:'17:53',number:1},
                            {time:'17:54',number:1},
                            {time:'17:55',number:1},
                        ]
                    },
                    gas:300,        // 加油   
                    maintain:200,   // 保养
                    Complaint:100,  // 投诉
                },
                // 近30天
                nearly30Days:{
                    total:2000,     // 总数
                    clearCar:800,   // 洗车
                    gas:600,        // 加油   
                    maintain:400,   // 保养
                    Complaint:200,  // 投诉
                }
            },

            clearCarData:'',
            timer:null
        } 
    },
    mounted: function mounted() { },
    
    created() {
        console.log(this.clientHeight)
         let data = this.serviceData.today
         let clearCarOldTotal = data.clearCar.total-data.clearCar.data.length
         this.clearCarData = clearCarOldTotal
         console.log(clearCarOldTotal)

        
        this.timer = window.setInterval(()=>{

            let basetotal = data.clearCar.total-data.clearCar.data.length;

            for(let i=0;i<data.clearCar.data.length;i++){
                console.log(111)
                console.log(data.clearCar.data[i].time)
                let date = new Date()
                let hour =  date.getHours()
                let min = date.getMinutes()
                let allMin = hour*60+min-10
                
                let thistime = data.clearCar.data[i].time;
                let thishour =  parseInt(thistime.split(':')[0]);
                let thismin =  parseInt(thistime.split(':')[1]);
                let thisallMin = thishour*60+thismin;
                console.log(allMin,thisallMin)

                if (allMin > thisallMin) {
                    basetotal += data.clearCar.data[i].number
                } 
                this.clearCarData = basetotal
            }
        },60000)

        
         
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
    // min-height: 100%;
    background-color: #04073c;
    #header {
        height: 88px;
        width: 100%;
        color: #fff;
        .title {
            color: #fff;
            font-size: 30px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .city {
            width:6%;
            height: 40px;
            border: 1px solid #fff;
            border-radius: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            right: 30px;
            top: 2px;
        }
    }
    #mainBox {
        .monitoringData {
            width: 50%;
            float:right;
            // background-color: #ccc;
            color: #c1c7d3;
            .serviceData {
               .table {
                   table {
                       border-color: #29467c;
                       margin-top: 20px;
                       tr {
                           td:first-child {
                               width: 80px;
                           }
                           td {
                               height: 50px;
                               width: 60px;
                               text-align: center;
                               line-height: 40px;
                           }
                       }
                   }
               }
            }
            .dot {
                table {
                    border-color: #29467c;
                    td {
                        height: 60px;
                        text-align: center;
                        line-height: 60px;
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
                        height: 60px;
                        line-height: 60px;
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
                        height: 40px;
                        border: 1px solid #29467c;
                        border-top: none;
                        span {
                            flex:1;
                            // display: block;
                            text-align: center;
                            line-height: 40px;
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

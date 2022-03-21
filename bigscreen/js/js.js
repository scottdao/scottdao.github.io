
$(function () {

const titleChartStyle = {
    color:'#fff',
    fontWeight:400,
    fontSize:14
}
echarts_1();
echarts_5();
platIcons()
let flag = false
// 切换地区
$('#pro-btn').click(function(){
    // console.log($(this))
    // flag = false
    if(flag){
        flag = false
        $(this).html('四川省：21市州')
    }else{
        flag = true
        $(this).html('全国')
    }
})
platCharts()
function platCharts(){
        var myChart = echarts.init(document.getElementById('classFiled'));
        let option = {
       //  backgroundColor: '#00265f',
         tooltip: {
             trigger: 'axis',
             axisPointer: {
                 type: 'shadow'
             }
         },
         title: {
             text: '应用分类',
             top:0,
             // backgroundColor: 'rgba(255, 255,255,1)'
             textStyle:{
                 ...titleChartStyle
             }
         },
         grid: {
             left: '10px',
             top:'40px',
             right: '0',
             bottom: '0',
            containLabel: true
         },
         xAxis: [{
             type: 'category',
             data:[
               '网络约车类',
               '网络购物类',
               '母婴电商类',
               '旅游服务类',
               '餐饮外卖类',
               "交通票务类",
               '演出票务类', 
               '租车服务类',
               '婚恋交友类',
               '邮件快递类',
               '生活服务类', 
               '问诊医药类',
               '生鲜电商类',
               '视频文娱类',
               '工具游戏类'
             ],
             axisLine: {
                 show: true,
                //  axisLabel:{'interval':0,rotate:30}
              lineStyle: {
                     color: "rgba(255,255,255,.1)",
                     width: 1,
                     type: "solid"
                 },
             },
             
             axisTick: {
                 show: false,
             },
            axisLabel:  {
                interval: 0,
                rotate:50,
                show: true,
                splitNumber: 15,
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
            },
         }],
         yAxis: [{
             type: 'value',
             axisLabel: {
                //formatter: '{value} %'
                 show:true,
                  textStyle: {
                          color: "rgba(255,255,255,.6)",
                         fontSize: '12',
                     },
             },
             axisTick: {
                 show: false,
             },
             axisLine: {
                 show: true,
                 lineStyle: {
                     color: "rgba(255,255,255,.1	)",
                     width: 1,
                     type: "solid"
                 },
             },
             splitLine: {
                 lineStyle: {
                    color: "rgba(255,255,255,.1)",
                 }
             }
         }],
         series: [{
             type: 'bar',
             data:[23,24,10,9,3,10,15,19,12,13,9,10,35,44, 9],
             barWidth:'35%', //柱子宽度
             lineStyle: {
                 
                 normal: {
                     color: '#0184d5',
                     width: 2
                 }
             },
            // barGap: 1, //柱子之间间距
             itemStyle: {
                 normal: {
                     color:'#2f89cf',
                     opacity: 1,
                     barBorderRadius: 5,
                 }
             }
         }
         ]
    };
           
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}
function setIconsAnimation(list){
    list.forEach(item=>{
        $('.plat-icon-list').append($(`
            <li class="icon-list-li ani-${item.index}">
                <div class='list-li-img' title='${item.name}'>
                ${
                    item.type=== 'img'?`<img src='../icons/${item.icon}.png' />`:`<svg class="icon" aria-hidden="true">
                        <use xlink:href="#${item.icon}"></use>
                    </svg>`
                }
                </div>
            
            </li>
        `))
    })
}
function platIcons(){
    window.fetch('../json/icon.json').then(res=>res.json()).then(response=>{
        let totalList = response.icons
          setIconsAnimation(totalList)
          requestAnimationFrame((timestamp)=>setScrollAni('platIconsList', timestamp))
        $('.platNum').html(response.icons.length)
        $('.platTitle').html(response.title)
    })
}

let urlPath = 'http://jrdongcha-test.idatafun.com/jrdongcha/api/research/researchList'
let params = {
    pageNo: 1,
    pageSize: 3,
    type: "hot",
    userId: 0
}
const requestList = (pageNo, callback)=>{
    window.fetch(urlPath, {
        method:'post',
        body:JSON.stringify({...params, pageNo}),
        credentials: "include",
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res=>{ 
        return res.json()
    })
    .then(res=>{
        // console.log(res, 998766)
        $('.server-num').html(res.data.total)
        $('.check-ul').children().fadeOut(1000).remove()
        res.data.records && res.data.records.forEach(item=>{
            $('.check-ul').fadeIn(1000).append($(`<li class="no-rule-icon-li">
                    <div class="font-color-withe check-li-frame padding-frame" title='${item.researchName}'>${item.researchName}</div>
                </li>`).fadeIn(1000)
            )
        })
        callback(res.data.records)
    })
}
checkListFn()
function checkListFn(){
   
    window.fetch('../json/checkServer.json').then(res=>res.json()).then(response=>{
    //    console.log(response, 99877)
        // response.servers.forEach(item=>{
        //     // console.log(item)
        //     $('.check-ul').append(`<li class="no-rule-icon-li">
        //             <div class="font-color-withe check-li-frame padding-frame" title='${item}'>${item}</div>
        //         </li>`
        //     )
        // })
        let pageSize = 10, pageNo = 1;
        let timer3 = null
        const fn = (data)=>((!data || !data.length)?(pageNo = 1):"")
        requestList(pageNo, (data)=>((!data||!data.length)?clearInterval(timer3):""))
        timer3 && clearInterval(timer3);
        timer3 = setInterval(()=>{
            pageNo++
            requestList(pageNo, fn)
        }, 5000)
        $('.checkServerTitle').html(response.title)
        
        $('.server-addNums').html(`昨日${response.addNum}`)
    })
}
HotShops()
function HotShops(){
    let myChart = echarts.init(document.getElementById('echartHotShops'));
    let option = {
        // title: {
        //     text: 'Gradient Stacked Area Chart'
        // },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '0%',
            top:'10px',
            right: '1.8%',
            bottom: '4%',
           containLabel: true
        },
        // legend: {
        //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        // },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        // grid: {
        //   left: '3%',
        //   right: '4%',
        //   bottom: '3%',
        //   containLabel: true
        // },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['0时', '1时', '2时', '3时', '4时', '5时', '6时'],
            axisLine: {
                show: true,
             lineStyle: {
                    color: "rgba(255,255,255,.1)",
                    width: 1,
                    type: "solid"
                },
            },
            axisTick: {
                show: false,
            },
            axisLabel:  {
                    interval: 0,
                   // rotate:50,
                    show: true,
                    splitNumber: 15,
                    textStyle: {
                         color: "rgba(255,255,255,.6)",
                        fontSize: '12',
                    },
                },
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
                //formatter: '{value} %'
                 show:true,
                  textStyle: {
                          color: "rgba(255,255,255,.6)",
                         fontSize: '12',
                     },
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "rgba(255,255,255,.1	)",
                    width: 1,
                    type: "solid"
                },
            },
            splitLine: {
                lineStyle: {
                   color: "rgba(255,255,255,.1)",
                }
            }
          }
        ],
        series: [
          {
            name: '',
            type: 'line',
            stack: 'Total',
            smooth: true,
            areaStyle: {
                normal: {
                    color:'#2f89cf',
                    opacity: 1,
                    // barBorderRadius: 5,
                }
            },
            lineStyle:{
                // width:00DDFF
                color:'#85bae1'
              },
            itemStyle:{
                color:'#85bae1'
            },
            // emphasis: {
            //   focus: 'series'
            // },
            data: [200, 600, 800, 400, 200, 200, 1000]
          },
        ]
      };
    option && myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}

// 疑似价格违法平台
legalPlat()

function legalPlat(){
    window.fetch('../json/Illegal.json').then(res=>res.json()).then(response=>{
        response.icons.forEach(item=>{
            $('.noRuleIcon').append(`
                <li class="no-rule-li">
                    <div class='list-li-img' title='${item.name}'>
                        ${
                            item.type=== 'img'?`<img src='../icons/${item.icon}.png' />`:`<svg class="icon" aria-hidden="true">
                                <use xlink:href="#${item.icon}"></use>
                            </svg>`
                        }
                    </div>
                   
                </li>
            `)
        })
        response.titList.forEach(item=>{
            $('.noRuleTitle').append(`
            <li class="no-rule-icon-li ">
                <div class="font-color-withe check-li-frame padding-frame" title='${item.name}'>${item.name}</div>
              </li>
            `)
        })
       
        $('.leageTitle').html(response.title)
        $('.legalTotal').html(response.total)
        $('.legalTimer').html(`（过去${response.timer}月）`)
    })
}
function clearInterVal(timer){
    timer && clearTimeout(timer)
}
function interval(callback, time){
    clearTimeout(timer)
     var timer =  setTimeout(function(){
          callback(function(){
              return timer
          }) 
          interval(callback, time)   
      }, time)
      return timer
}
let timer2 = null
// 暂未发现价格违法平台
function setScrollAni(className="noLegalList"){
    const titleEl =  $(`.${className}`)
    const clientHeight =  titleEl.height()
    let top =   titleEl[0].scrollTop
    const scrollHeight = titleEl[0].scrollHeight
    if(top+clientHeight >=scrollHeight){
        titleEl[0].scrollTop = 0
        clearTimeout(timer2)
        timer2 =  setTimeout(()=>{
            setScrollAni(className)
        }, 100)
    }else{
        titleEl[0].scrollTop++
        requestAnimationFrame((timestamp)=>setScrollAni(className, timestamp))
    }
//   console.log(top)
}
noLegal()
function noLegal(){
    window.fetch('../json/noLegal.json').then(res=>res.json()).then(response=>{
        response.titleArr.forEach(item=>{
            $('.noLegalList').append(`
            <li class="no-rule-icon-li ">
                <div class="font-color-withe check-li-frame padding-frame" title='${item}'>${item}</div>
              </li>
            `)
            // $('.noLegalList').append(`
            //     <li class="no-rule-li">
            //         <div class='list-li-img' title='${item.name}'>
            //             ${
            //                 item.type=== 'img'?`<img src='../icons/${item.icon}.png' />`:`<svg class="icon" aria-hidden="true">
            //                     <use xlink:href="#${item.icon}"></use>
            //                 </svg>`
            //             }
            //         </div>
            //     </li>
            // `)
        })
        requestAnimationFrame((timestamp)=>setScrollAni('noLegalList', timestamp))
        $('.noLegalTitle').html(response.title)
        $('.noLegalTotal').html(response.total)
        $('.noLegalTimer').html(`（过去${response.timer}月）`)
    })
}
function echarts_1() {
        // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('echart1'));
    option = {
    //  backgroundColor: '#00265f',
        title: {
            text: '过去7天新增条数',
            top:0,
            // backgroundColor: 'rgba(255, 255,255,1)'
            textStyle:{
                ...titleChartStyle
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '0%',
            top:'40px',
            right: '0%',
            bottom: '0',
        containLabel: true
        },
        xAxis: [{
            type: 'category',
                data: ['3月12日', '3月11日', '3月10日', '3月09日', '3月08日', '3月07日', '3月06日'],
            axisLine: {
                show: true,
            lineStyle: {
                    color: "rgba(255,255,255,.1)",
                    width: 1,
                    type: "solid"
                },
            },
            axisTick: {
                show: false,
            },
            axisLabel:  {
                    interval: 0,
                // rotate:50,
                    show: true,
                    splitNumber: 15,
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: '12',
                    },
                },
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
            //formatter: '{value} %'
                show:true,
                textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: '12',
                    },
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "rgba(255,255,255,.1	)",
                    width: 1,
                    type: "solid"
                },
            },
            splitLine: {
                lineStyle: {
                color: "rgba(255,255,255,.1)",
                }
            }
        }],
        series: [
            {
            type: 'bar',
            data: [32, 25, 18, 16, 28, 27, 19],
            barWidth:'35%', //柱子宽度
        // barGap: 1, //柱子之间间距
            itemStyle: {
                normal: {
                    color:'#2f89cf',
                    opacity: 1,
                    barBorderRadius: 5,
                }
            }
        }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}
function echarts_5() {
        // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart5'));

    option = {
    //  backgroundColor: '#00265f',
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        title: {
            text: '违法线索分类统计',
            top:0,
            // backgroundColor: 'rgba(255, 255,255,1)'
            textStyle:{
                ...titleChartStyle
            }
        },
        grid: {
            left: '0%',
            top:'40px',
            right: '0%',
            bottom: '0',
        containLabel: true
        },
        xAxis: [{
            type: 'category',
            // data: ['浙江', '上海', '江苏', '广东', '北京', '深圳', '安徽', '四川'],
            data:[
            '大数据杀熟 ',
            '价格欺诈',
            '明码标价',
            '哄抬物价',
            '串通价格',
            "其他原因"
            ],
            axisLine: {
                show: true,
            lineStyle: {
                    color: "rgba(255,255,255,.1)",
                    width: 1,
                    type: "solid"
                },
            },
            
            axisTick: {
                show: false,
            },
            axisLabel:  {
                    interval: 0,
                // rotate:50,
                    show: true,
                    splitNumber: 15,
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: '12',
                    },
                },
        }],
        yAxis: [{
            type: 'value',
            axisLabel: {
            //formatter: '{value} %'
                show:true,
                textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: '12',
                    },
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: "rgba(255,255,255,.1	)",
                    width: 1,
                    type: "solid"
                },
            },
            splitLine: {
                lineStyle: {
                color: "rgba(255,255,255,.1)",
                }
            }
        }],
        series: [{
            type: 'bar',
            data: [51, 19, 6, 7, 5, 17],
            barWidth:'35%', //柱子宽度
            lineStyle: {
                
                normal: {
                    color: '#0184d5',
                    width: 2
                }
            },
        // barGap: 1, //柱子之间间距
            itemStyle: {
                normal: {
                    color:'#2f89cf',
                    opacity: 1,
                    barBorderRadius: 5,
                }
            }
        }
        ]
    };
      
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}
})


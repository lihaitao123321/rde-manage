<template>
    <div class="t_page">
        <div class="index-header">
            <pop-list
                    ref="popList"
                    placement="top"
                    width="96"
                    height="200px"
                    v-model="visible">
                <div class="pop-list">
                    <div class="pop-item" @click="jumpUrl('/scan')">
                        <img src="../../assets/images/index1/scan.png">扫一扫
                    </div>
                    <div class="pop-item" @click="jumpUrl('/jinchangtongxun')">
                        <img src="../../assets/images/index1/jinchangtongxun.png">近场通讯
                    </div>
                </div>
                <x-icon slot="reference" class="more-icon white-x-icon" type="ios-ionic-outline" size="25"></x-icon>
            </pop-list>
            <div class="search-box" @click.stop="seachDetail">
                <x-icon class="white-x-icon" type="ios-search" size="25"></x-icon>
                <group>
                    <x-input class="search-con" readonly :placeholder="config.searchTitle"></x-input>
                </group>
            </div>
            <x-icon
                    class="white-x-icon"
                    type="ios-ionic-outline"
                    size="25"
                    @click="jumpUrl('/notice')"
            ></x-icon>
        </div>
        <div class="redBg">
            <div class="index-page">
                <div class="index-top">

                    <div class="index-action">
                        <div class="action-box" @click="jumpUrl('/projectNumber/1')">
                            <img
                                class="navigation-icon"
                                src="../../assets/images/index1/navigation1.png"
                            >
                            <div class="action-name">
                                项目数量
                                <span>(座)</span>
                            </div>
                            <div class="action-number">{{ pageData.projectCount || 0 }}</div>
                        </div>
                        <div class="action-box" @click="jumpUrl('/projectNumber/2')">
                            <img
                                class="navigation-icon"
                                src="../../assets/images/index1/navigation2.png"
                            >
                            <div class="action-name">
                                设备数量
                                <span>(套)</span>
                            </div>
                            <div class="action-number">{{ pageData.deviceCount || 0 }}</div>
                        </div>
                        <div class="action-box" @click="jumpUrl('/projectNumber/3')">
                            <img
                                class="navigation-icon"
                                src="../../assets/images/index1/navigation3.png"
                            >
                            <div class="action-name">
                                负荷容量
                                <span>(KW)</span>
                            </div>
                            <div class="action-number">{{ pageData.designLoad || 0 }}</div>
                        </div>
                        <div class="action-box">
                            <img
                                class="navigation-icon"
                                src="../../assets/images/index1/navigation4.png"
                            >
                            <div class="action-name">
                                新能源装机容量
                                <span>(KW)</span>
                            </div>
                            <div class="action-number">{{ pageData.newEnergyCapacity || 0 }}</div>
                        </div>
                        <div class="action-box" @click="jumpUrl('/projectNumber/4')">
                            <img class="navigation-icon" src="../../assets/images/index1/navigation5.png" >
                            <div class="action-name">实用用电功率<span>(KW)</span></div>
                            <div class="action-number">{{ pageData.kwh || 0  }}</div>
                        </div>
                        <div class="action-box">
                            <img class="navigation-icon" src="../../assets/images/index1/navigation6.png" >
                            <div class="action-name">新能源发电功率<span>(KW)</span></div>
                            <div class="action-number">{{ pageData.projectCount || 0  }}</div>
                        </div>
                    </div>
                    <div class="all-mon">
                        <div class="title">
                            <div>总体监控预览</div>
                            <div @click="jumpUrl('/jiankongbaobiao')">
                                <span>进入监控</span>
                                <x-icon class="back-icon" type="ios-arrow-right" size="15"></x-icon>
                            </div>
                        </div>
                        <div class="uf chart-box mb13">
                            <div class="uf-f1">
                                <vCircle title="在线率" :num="pageData.onlineRate*100"></vCircle>
                            </div>
                            <div class="uf-f1">
                                <vCircle
                                    title="运行率"
                                    color="l(0,0) 0:#273DDC 0.5:#388DEF 1:#273DDC"
                                    :num="pageData.runingRate*100"
                                ></vCircle>
                            </div>
                            <div class="uf-f1">
                                <vCircle
                                    title="报警率"
                                    color="l(0,0) 0:#FF684E 0.5:#FFA55D 1:#FF684E"
                                    :num="pageData.alarmRate*100"
                                ></vCircle>
                            </div>
                        </div>
                    </div>
                    <div class="all-mon">
                        <div class="title">
                            <div>报警动态</div>
                            <div @click="jumpUrl('/jiankongbaobiao')">
                                <span>进入报警</span>
                                <x-icon class="back-icon" type="ios-arrow-right" size="15"></x-icon>
                            </div>
                        </div>
                        <div class="pillar-box">
                            <div class="chart-layout">
                                <echarts :options="firstChartOption"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="index-bottom">
                    <div class="all-mon">
                        <div class="title">
                            <div>实际用电功率</div>
                            <div @click="jumpUrl('/shiyonggonglvbaobiao')">
                                <span>详情</span>
                                <x-icon class="back-icon" type="ios-arrow-right" size="15"></x-icon>
                            </div>
                        </div>
                        <div class="pillar-box">
                            <div class="chart-layout">
                                <echarts :options="secondChartOption"/>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="all-mon">
                        <div class="title">
                            <div>新能源发电功率</div>
                            <div @click="jumpUrl('/fadianbaobiao')"><span>详情</span><x-icon class="back-icon" type="ios-arrow-right" size="15"></x-icon></div>
                        </div>
                        <div class="pillar-box">
                            <v-chart
                                :data="data5"
                                class="chart-box"
                                :width= "340">
                                <v-scale x type="timeCat" />
                                <v-scale y :min="0" alias="%" />
                                <v-point
                                    :style="{
                                    stroke: '#fff',
                                    lineWidth: 1
                                    }"
                                    shape="smooth" />
                                <v-line shape="smooth" />
                            </v-chart>
                        </div>
                    </div>
                    <div class="all-mon">
                        <div class="title">
                            <div>绿色能源实时占比</div>
                            <div @click="jumpUrl('shishinengyuanbaobiao')"><span>详情</span><x-icon class="back-icon" type="ios-arrow-right" size="15"></x-icon></div>
                        </div>
                        <div class="pillar-box">
                            <v-chart
                                class="chart-box"
                                :width= "340"
                                :data="data6"
                                :padding="[20, 'auto']">
                                <v-tooltip disabled />
                                <v-scale y :options="yOptions" />
                                <v-pie :radius="0.6" :inner-radius="0.6" series-field="name" :colors="['#FE5D4D','#3BA4FF','#737DDE']" />
                                <v-legend :options="legendOptions" />
                                <v-guide type="html" :options="htmlOptions" />
                            </v-chart>
                        </div>
                    </div>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import config from "../../config";
import {
  Group,
  XInput,
  XButton,
  VChart,
  VLine,
  VArea,
  VTooltip,
  VLegend,
  VPie,
  VGuide,
  VBar,
  VScale,
  VPoint
} from "vux";
import vCircle from "@/components/circle/index.vue";
import pillar from "@/components/pillar/index.vue";
import popList from "@/components/pop-list.vue";
import echarts from '../../components/echarts'
import {getOption as getFirstOption} from './chartOptions/baojingdongtaiOption'
import {getOption as getSecondOption} from './chartOptions/baojingOption'
const data6 = [
  { name: "清扫机器人", percent: 83.59, a: "1" },
  { name: "接驳车机器人", percent: 2.17, a: "1" },
  { name: "补给机器人", percent: 14.24, a: "1" }
];

const map = {};
data6.map(obj => {
  map[obj.name] = obj.percent + "%";
});

export default {
  components: {
    Group,
    XInput,
    VChart,
    VLine,
    VArea,
    VTooltip,
    VLegend,
    VBar,
    XButton,
    VGuide,
    VPie,
    VScale,
    VPoint,
    vCircle,
    pillar,
    popList,
    echarts
  },
  data() {
      let defaultOption1 = getFirstOption()
      // let defaultOption2 = getFirstOption()
        return {
            config,
          map,
          firstChartOption:defaultOption1,
          secondChartOption:{},
          htmlOptions: {
            position: ["50%", "50%"],
            html: `
                  <div style="width: 250px;height: 40px;text-align: center;">
                      <div style="font-size: 24px; color:#212121;">49999</div>
                      <div style="font-size: 13px; color:#999999;">总数</div>
                  </div>`
          },
          legendOptions: {
            position: "bottom",
            itemFormatter(val) {
              return val + "  " + map[val];
            }
          },
          yOptions: {
            formatter(val) {
              return val * 100 + "%";
            }
          },
          data6,
          //页面数据
          pageData: {
            projectCount: 0,
            deviceCount: 0,
            designLoad: 0,
            newEnergyCapacity: 0,
            onlineRate: 0,
            runingRate: 0,
            alarmRate: 0,
            alarmlevel0: 0,
            alarmlevel1: 0,
            alarmlevel2: 0,
            offlineCount: 0,
            powers:[]
          },
            visible:false
        };
  },
  methods: {
    jumpUrl(url) {
        if(url === '/scan' || url === '/jinchangtongxun'){
            this.$refs.popList.hidePop()
            this.visible = false;
        }
      this.$router.push(url);
    },
    toNoticeCenter() {
      this.$router.push("/notice");
    },
    onCheckListChange(list, index) {
      console.log(list);
      this.options[index].checklist = list;
    },
    seachDetail() {
      this.$router.push("/search");
    },
    formatterSc(data1){
      return this.Tools.Date.TimeFormat(data1,'ymd')
    }
  },
  async created() {
    await this.Tools.ajax({
      method: "/cloud/api/app/firstpage/getFirstPageData",
      data: {}
    }).then(res => {
      if (res.code === 0) {
        let pageData = res.data;
        let powers = pageData.powers;
        let newList = []
        let seriesData0 = []
        let dateList0 = []
        for (let i = 0; i < powers.length; i++) {
            seriesData0.push(powers[i].kwh)
            dateList0.push(powers[i].time)
            newList.push({
                time:powers[i].workHour,
                tem:powers[i].kwh
            })
        }
        pageData.powers = newList
        this.pageData = pageData
        this.firstChartOption = getFirstOption({seriesDataList:[pageData.alarmlevel0,pageData.alarmlevel1,pageData.alarmlevel2,pageData.offlineCount]})
        this.secondChartOption = getSecondOption({
            seriesDataList:[seriesData0],
            xAxisDataList:[dateList0],
            colors:['#2B7FF3'],
        })
      }

    });
  }
};
</script>
<style lang="less" scoped>
@import "../../css/index";

.pop-list{
    .pop-item{
        display: flex;
        align-items: flex-end;
        color: #0D0408;
        font-size:16px;
        font-weight:500;
        line-height:15px;
        padding: 17px 0;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        img{
            width: 17px;
            height: 17px;
            margin-top: -2px;
            margin-right: 14px;
        }
    }
    .pop-item:first-child{
        padding-top: 5px;
    }
    .pop-item:last-child{
        padding-bottom: 5px;
        border-bottom: none;
    }
}
</style>



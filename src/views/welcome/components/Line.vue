<template>
  <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
  <div id="chartDom1" style="width: 470px; height: 320px" />
</template>

<script lang="ts">
//按需引入
import { defineComponent } from "vue";

//引入创建的echarts.ts文件
import echarts from "@/store/modules/echarts";
import { useUserStore } from "@/store/modules/user";
import { getAdCd } from "@/api/attendance";
import { LegendComponent } from "echarts/components";
import { ToolboxComponent } from "echarts/components";
import moment from "moment";
// 打卡数据
import { weekDfi } from "../weekDefine/index";
echarts.use([ToolboxComponent]);
echarts.use([LegendComponent]);
// 获取用户数据
const store = useUserStore();
const { getDuraton, totalTime, updateWeek } = weekDfi();
export default defineComponent({
  data() {
    return {
      // 初始化打卡数据
      list: [0, 0, 0, 0, 0, 0, 0],
      starttime: "2023-08-27"
    };
  },
  methods: {
    // 周日定时清零 判断当天是否为周日
    getWeek() {
      return moment().format("d");
    },
    // 获取数据 -- 打卡列表
    async getTimes() {
      const id = store._id; // 当前用户id
      const { attendance } = await getAdCd(id);
      console.log(attendance);
      return attendance; // 获取打卡记录
    },

    // 绘制图表
    async chartDom1() {
      /** 1.初始化图表 */
      //封装函数名字与dom名字一致
      // 基于准备好的dom，初始化echarts实例
      const chartDom1 = document.getElementById("chartDom1")!;
      const myChart1 = echarts.init(chartDom1);

      // 指定图表的配置项和数据
      let option1 = {
        title: {
          text: "12.打卡时长"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["时长"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "时长",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series"
            },
            // 最开始 不设置任何初始值
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ]
      };
      // 使用刚指定的配置项option和数据显示图表myChart。
      myChart1.setOption(option1);
      // 加载完之前 显示简单的loading动画
      // myChart1.showLoading();
      updateWeek();
      // 周日清零
      if (!this.getWeek()) {
        this.list = [0, 0, 0, 0, 0, 0, 0];
      }
      // 修改图像配置
      option1 = myChart1.getOption();
      this.getTimes().then(result => {
        // 遍历整个数组 唉 好低效
        for (let i = 0; i < result.length; i++) {
          // 获取当前日期到上次结束日期的天数
          const nowWeekday = getDuraton(
            moment(result[i].clockInTimes[0]).utc().format("YYYY-MM-DD")
          );
          // 判断是否在上次日期  or 之后
          if (nowWeekday >= 0) {
            // 计算当天打卡量
            const duration = totalTime(
              result[i].clockInTimes,
              result[i].clockOutTimes
            );
            // 更新数据
            // console.log("现在周几"+nowWeekday+" 总时长"+duration);
            this.list[nowWeekday / 7] = Number(duration);
            // 检查 记得删除
            // console.log("nowWeekday = " + nowWeekday);
            // console.log("duration = " + duration);
          }
        }
        // console.log("finish");
        // 显示图表 取消加载
        // myChart1.hideLoading();
        // 加载
        // console.log(this.list);
        option1.series[0].data = this.list;
        myChart1.setOption(option1);
        // this.list[nowWeekday] = duration;
      });
      // 每天更新一次数据
      setInterval(() => {
        updateWeek();
        // 周日清零
        if (!this.getWeek()) {
          this.list = [0, 0, 0, 0, 0, 0, 0];
        }
        // 修改图像配置
        option1 = myChart1.getOption();
        this.getTimes().then(result => {
          // 遍历整个数组 唉 好低效
          for (let i = 0; i < result.length; i++) {
            // 获取当前日期到上次结束日期的天数
            const nowWeekday = getDuraton(
              moment(result[i].clockInTimes[0]).utc().format("YYYY-MM-DD")
            );
            // 判断是否在上次日期  or 之后
            if (nowWeekday >= 0) {
              // 计算当天打卡量
              const duration = totalTime(
                result[i].clockInTimes,
                result[i].clockOutTimes
              );
              // 更新数据
              // console.log("现在周几"+nowWeekday+" 总时长"+duration);
              this.list[nowWeekday / 7] = Number(duration);
              // 检查 记得删除
              // console.log("nowWeekday = " + nowWeekday);
              // console.log("duration = " + duration);
            }
          }
          // console.log("finish");
          // 显示图表 取消加载
          // myChart1.hideLoading();
          // 加载
          // console.log(this.list);
          option1.series[0].data = this.list;
          myChart1.setOption(option1);
          // this.list[nowWeekday] = duration;
        });
      }, 1000 * 24);
    }
  },
  mounted() {
    // 调用函数
    this.chartDom1();
  }
});
</script>

<style scoped></style>

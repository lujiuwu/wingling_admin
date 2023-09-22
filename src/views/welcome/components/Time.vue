<script>
import dayjs from "dayjs";

// 获取用户数据
export default {
  name: "WinglingAdminTime",

  data: function () {
    return {
      year: dayjs().format("YYYY"),
      month: dayjs().format("M"),
      day: dayjs().format("D"),
      week: dayjs().format("dddd"),
      week_ch: ""
    };
  },
  methods: {
    trans: function (week) {
      switch (week) {
        case "Monday":
          this.week_ch = "星期一";
          break;
        case "Tuesday":
          this.week_ch = "星期二";
          break;
        case "Wednesday":
          this.week_ch = "星期三";
          break;
        case "Thursday":
          this.week_ch = "星期四";
          break;
        case "Friday":
          this.week_ch = "星期五";
          break;
        case "Saturday":
          this.week_ch = "星期六";
          break;
        case "Sunday":
          this.week_ch = "星期天";
          break;
        default:
          break;
      }
    }
  },
  mounted: function () {
    this.trans(this.week);
  }
};
</script>
<template id="TimeWithAvatar">
  <div class="time">
    <el-tooltip
      class="box-item"
      effect="dark"
      content="今天是敲代码的好日子"
      placement="top-start"
    >
      <div class="mt" style="width: 170px">
        <span class="year">{{ year }}年</span>
        <span class="month">{{ month }}月{{ day }}日</span>
      </div>
    </el-tooltip>
    <div>
      <span class="week_ch">{{ week_ch }}</span>
    </div>
    <div>
      <span class="week">{{ week }}</span>
    </div>
  </div>
</template>

<style scoped lang="css">
span {
  margin-left: 5px;
}
.year {
  font-size: 25px;
}
.month {
  font-size: 20px;
}
.week_ch {
  font-size: 18px;
}
.week {
  color: rgb(113, 194, 224);
}

#TimeWithAvatar {
  display: flex;
}
.time {
  flex: 2;
}
.image {
  flex: 7;
}
.image img {
  height: 50px;
  width: 50px;
}
</style>

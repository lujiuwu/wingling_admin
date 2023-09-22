import moment from "moment";
import { storageWeek } from "./strageWeek";
const pinia = storageWeek();
/** 该文件用于 定义 周 相关配置 */
export function weekDfi() {
  // 设置起始时间
  const starttime = moment("2023-08-27")
    .add(pinia.weekNumber * 7, "days")
    .format("YYYY-MM-DD");
  // const endTime = "2024-01-13 00:00:00";
  // 格式化时间
  function transUTC(utcTime) {
    return moment(utcTime).utc().format("YYYY-MM-DD HH:mm:ss");
  }
  // 计算周数 true表示当前为第一周
  function getDuraton(utcTime1) {
    const nowtime = moment(utcTime1).utc().format("YYYY-MM-DD");
    console.log("上一个节点是"+starttime);
    console.log("相隔时间是"+Math.ceil(moment(new Date(nowtime)).diff(starttime, "days")));
    return Math.ceil(moment(new Date(nowtime)).diff(starttime, "days"));
  }
  function totalTime(arr1, arr2) {
    console.log(arr1.length + " " + arr2.length);
    let sum = 0;
    if (arr1 === null || arr2 === null) {
      console.log("null");
      return 0;
    } else {
      let len1 = arr1.length;
      const len2 = arr2.length;
      let flag = 0;
      if (len1 > len2) {
        len1 = arr2.length;
        flag = 1;
      } else if (len1 < len2) {
        arr2.shift();
        len1 = arr2.length;
      }

      if (arr1 === null || arr2 === null) return sum;
      let clockDiff;
      for (let i = 0; i < len1; i++) {
        const clockIn = transUTC(arr1[i]);
        const clockOut = transUTC(arr2[i]);
        // console.log(clockIn + "" + clockOut);
        if (flag) {
          clockDiff = Number(
            moment(new Date(transUTC(arr2[i])))
              .diff(transUTC(arr1[i]), "hours", true)
              .toFixed(2)
          );
        } else {
          clockDiff = Number(
            moment(new Date(transUTC(arr2[i + 1])))
              .diff(transUTC(arr1[i]), "hours", true)
              .toFixed(2)
          );
        }

        // console.log(`${i}个和为${clockDiff}`);
        sum += clockDiff;
      }
      return (sum / 60).toFixed(2);
    }
  }
  function updateWeek() {
    const nowDay = moment().format("YYYY-MM-DD");
    const startDay = "2023-08-27";
    const disDay = moment(new Date(nowDay)).diff(startDay, "days");
    //  console.log("disDay = "+disDay);
    pinia.changeWeekNumber(Math.ceil(disDay / 7));
    // console.log("当前是第几周 ",pinia.weekNumber);
  }
  const weekNum = pinia.weekNumber;
  return {
    weekNum,
    starttime,
    transUTC,
    getDuraton,
    totalTime,
    updateWeek
  };
}

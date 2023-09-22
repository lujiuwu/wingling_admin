import "element-plus/dist/index.css";

// ① 引入createPinia方法从pinia
import { defineStore } from "pinia";

// 定义数据
export const storageWeek = defineStore("storageWeek", {
  state: () => {
    return {
      weekNumber: 0
    };
  },
  // 更新周数
  actions: {
    changeWeekNumber(param) {
      this.weekNumber = param;
    }
  },
  // 持久化配置
  persist: true
});
export default storageWeek;

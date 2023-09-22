import { reactive } from "vue";
import type { FormRules } from "element-plus";

/** 自定义表单规则校验 */
export const formRules = reactive(<FormRules>{
  username: [{ required: true, message: "用户学号为必填项", trigger: "blur" }],
  realname: [{ required: true, message: "用户姓名为必填项", trigger: "blur" }],
  password: [
    {
      required: true,
      message: "用户密码为必填项",
      trigger: "blur",
      default: "52101314"
    }
  ],
  grade: [{ required: true, message: "用户年级为必填项", trigger: "blur" }],
  targetTime: [{ required: true, message: "目标打卡为必填项", trigger: "blur" }]
});

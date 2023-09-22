<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    realname: "",
    username: "",
    grade: "",
    targetTime: 0,
    remark: "",
    password: "5201314",
    isAdmin: false,
    email: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="用户姓名" prop="realname">
      <el-input
        v-model="newFormInline.realname"
        clearable
        placeholder="请输入角色姓名"
      />
    </el-form-item>

    <el-form-item label="用户学号" prop="username">
      <el-input
        v-model="newFormInline.username"
        clearable
        placeholder="请输入角色学号"
      />
    </el-form-item>
    <el-form-item label="用户密码" prop="password">
      <el-input
        v-model="newFormInline.password"
        clearable
        placeholder="请输入角色密码"
      />
    </el-form-item>
    <el-form-item label="用户邮箱" prop="email">
      <el-input
        v-model="newFormInline.email"
        clearable
        placeholder="请输入角色邮箱"
      />
    </el-form-item>
    <el-form-item label="用户年级" prop="grade">
      <el-input
        v-model="newFormInline.grade"
        clearable
        placeholder="请输入用户年级"
      />
    </el-form-item>
    <el-form-item label="目标打卡" prop="targetTime">
      <el-input
        v-model="newFormInline.targetTime"
        clearable
        placeholder="请输入目标打卡时长"
      />
    </el-form-item>
    <el-form-item label="备注">
      <el-input
        v-model="newFormInline.remark"
        placeholder="请输入备注信息"
        type="textarea"
      />
    </el-form-item>
  </el-form>
</template>

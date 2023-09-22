<script setup lang="ts">
import Github from "./components/Github.vue";
import Time from "./components/Time.vue";
import { ref } from "vue";
import Line from "./components/Line.vue";

// import { useWindowSize } from "@vueuse/core";

defineOptions({
  name: "Welcome"
});
const loading = ref<boolean>(true);

// const { height } = useWindowSize();

setTimeout(() => {
  loading.value = !loading.value;
}, 800);
</script>

<template>
  <el-row style="padding: 0 25px" :gutter="25">
    <el-col
      :xs="24"
      :sm="24"
      :md="14"
      :lg="14"
      :xl="14"
      v-motion
      :initial="{
        opacity: 0,
        y: 100
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 200
        }
      }"
    >
      <el-card shadow="never" class="mb-[28px]">
        <el-skeleton :rows="7" :loading="loading">
          <template #default>
            <Time />
          </template>
        </el-skeleton>
      </el-card>
      <el-card shadow="never" style="padding: 0">
        <el-skeleton animated :rows="7" :loading="loading">
          <template #default>
            <Github />
          </template>
        </el-skeleton>
      </el-card>
    </el-col>
    <el-col
      :xs="24"
      :sm="24"
      :md="10"
      :lg="10"
      :xl="10"
      v-motion
      :initial="{
        opacity: 0,
        y: 100
      }"
      :enter="{
        opacity: 1,
        y: 0,
        transition: {
          delay: 200
        }
      }"
    >
      <el-card shadow="never" class="mb-[28px]">
        <el-skeleton :rows="7" :loading="loading">
          <template #default>
            <Line />
          </template>
        </el-skeleton>
      </el-card>
    </el-col>
  </el-row>
  <!-- <h1>Pure-Admin-Thin（非国际化版本）</h1> -->
</template>

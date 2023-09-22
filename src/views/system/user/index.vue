<script setup lang="ts">
import { ref } from "vue";
import { useUser } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

import Role from "@iconify-icons/ri/admin-line";
import Password from "@iconify-icons/ri/lock-password-line";
import More from "@iconify-icons/ep/more-filled";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";
import Search from "@iconify-icons/ep/search";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";
// import Line from "./components/Line.vue";

defineOptions({
  name: "User"
});

const formRef = ref();
const {
  form,
  loading,
  columns,
  dataList,
  pagination,
  buttonClass,
  openDialog,
  onSearch,
  resetForm,
  updateRoles,
  handleUpdate,
  handleDelete
} = useUser();
</script>

<template>
  <div class="main">
    <div>
      <el-form
        ref="formRef"
        :inline="true"
        :model="form"
        class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
      >
        <el-form-item label="用户姓名：" prop="realname">
          <el-input
            v-model="form.realname"
            placeholder="请输入用户名称"
            clearable
            class="!w-[160px]"
          />
        </el-form-item>
        <el-form-item label="用户学号：" prop="username">
          <el-input
            v-model="form.username"
            placeholder="请输入用户学号"
            clearable
            class="!w-[160px]"
          />
        </el-form-item>
        <!-- <el-form-item label="状态：" prop="status">
          <el-select
            v-model="form.status"
            placeholder="请选择"
            clearable
            class="!w-[160px]"
          >
            <el-option label="已开启" value="1" />
            <el-option label="已关闭" value="0" />
          </el-select>
        </el-form-item> -->
        <el-form-item>
          <el-button
            type="primary"
            :icon="useRenderIcon(Search)"
            :loading="loading"
            @click="onSearch"
          >
            搜索
          </el-button>
          <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
            重置
          </el-button>
        </el-form-item>
      </el-form>

      <PureTableBar title="用户管理" :columns="columns" @refresh="onSearch">
        <template #buttons>
          <el-button
            type="primary"
            :icon="useRenderIcon(AddFill)"
            @click="openDialog()"
          >
            新增用户
          </el-button>
        </template>
        <template v-slot="{ size, dynamicColumns }">
          <div>
            <pureTable
              border
              adaptive
              align-whole="center"
              table-layout="auto"
              :loading="loading"
              :size="size"
              :data="dataList"
              :columns="dynamicColumns"
              :header-cell-style="{
                background: 'var(--el-table-row-hover-bg-color)',
                color: 'var(--el-text-color-primary)'
              }"
            >
              <template #operation="{ row }">
                <el-button
                  class="reset-margin"
                  link
                  type="primary"
                  :size="size"
                  @click="openDialog('编辑', row)"
                  :icon="useRenderIcon(EditPen)"
                >
                  修改
                </el-button>
                <el-popconfirm
                  :title="`是否确认删除${row.realname}的数据`"
                  @confirm="handleDelete(row)"
                >
                  <template #reference>
                    <el-button
                      class="reset-margin"
                      link
                      type="primary"
                      :size="size"
                      :icon="useRenderIcon(Delete)"
                    >
                      删除
                    </el-button>
                  </template>
                </el-popconfirm>
                <el-dropdown>
                  <el-button
                    class="ml-3 mt-[2px]"
                    link
                    type="primary"
                    :size="size"
                    @click="handleUpdate(row)"
                    :icon="useRenderIcon(More)"
                  />
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>
                        <el-button
                          :class="buttonClass"
                          link
                          type="primary"
                          :size="size"
                          :icon="useRenderIcon(Password)"
                        >
                          重置密码
                        </el-button>
                      </el-dropdown-item>
                      <el-dropdown-item>
                        <el-button
                          :class="buttonClass"
                          link
                          type="primary"
                          :size="size"
                          :icon="useRenderIcon(Role)"
                          @click="updateRoles(row)"
                        >
                          设为管理员
                        </el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </pureTable>
          </div>
        </template>
      </PureTableBar>
    </div>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-dropdown-menu__item i) {
  margin: 0;
}

.search-form {
  :deep(.el-form-item) {
    margin-bottom: 12px;
  }
}
</style>

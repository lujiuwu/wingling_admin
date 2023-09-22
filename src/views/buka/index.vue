<script setup lang="ts">
import { ref } from "vue";
import { useUser } from "./utils/hook";
import { PureTableBar } from "@/components/RePureTableBar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";

// import Role from "@iconify-icons/ri/admin-line";
// import Password from "@iconify-icons/ri/lock-password-line";
// import More from "@iconify-icons/ep/more-filled";
import Close from "@iconify-icons/ep/close";
import Delete from "@iconify-icons/ep/delete";
import Checked from "@iconify-icons/ep/checked";
// import Search from "@iconify-icons/ep/search";
// import Refresh from "@iconify-icons/ep/refresh";

// import Line from "./components/Line.vue";

defineOptions({
  name: "User"
});

const {
  // form,
  loading,
  columns,
  dataList,
  pagination,
  // buttonClass,
  onSearch,
  // resetForm,
  // updateRoles,
  // handleUpdate,
  handleDelete,
  handleAccept,
  handleRefuse
} = useUser();
</script>

<template>
  <div class="main">
    <div>
      <PureTableBar title="补卡申请列表" :columns="columns" @refresh="onSearch">
        <template #buttons>
          <!-- <el-button
            type="primary"
            :icon="useRenderIcon(AddFill)"
            @click="openDialog()"
          >
            新增用户
          </el-button> -->
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
              :pagination="pagination"
              :paginationSmall="size === 'small' ? true : false"
              :header-cell-style="{
                background: 'var(--el-table-row-hover-bg-color)',
                color: 'var(--el-text-color-primary)'
              }"
            >
              <template #operation="{ row }">
                <el-popconfirm
                  :title="`是否确认同意该用户的补卡申请`"
                  @confirm="handleAccept(row)"
                >
                  <template #reference>
                    <el-button
                      class="reset-margin"
                      link
                      type="primary"
                      :size="size"
                      :icon="useRenderIcon(Checked)"
                      @click="handleAccept"
                    >
                      同意
                    </el-button>
                  </template>
                </el-popconfirm>
                <el-button
                  class="reset-margin"
                  link
                  type="primary"
                  :size="size"
                  @click="handleRefuse(row)"
                  :icon="useRenderIcon(Close)"
                >
                  拒绝
                </el-button>

                <el-popconfirm
                  :title="`是否确认删除该用户的补卡申请`"
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
                <!-- <el-dropdown>
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
                          拒绝
                        </el-button>
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown> -->
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

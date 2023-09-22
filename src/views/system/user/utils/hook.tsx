import editForm from "../form.vue";
// import { ElMessageBox } from "element-plus";
import { message } from "@/utils/message";
import { addUser, deleteUser, getUserList, updateInfo } from "@/api/system";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, computed, toRaw } from "vue";

export function useUser() {
  const form = reactive({
    username: "",
    realname: "",
    _id: "",
    isAdmin: false
  });
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  // const switchLoadMap = ref({});
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "用户编号",
      type: "index",
      minWidth: 50
    },
    {
      label: "用户学号",
      prop: "username",
      minWidth: 100
    },
    {
      label: "用户姓名",
      prop: "realname",
      minWidth: 90
    },
    {
      label: "年级",
      prop: "grade",
      minWidth: 50
    },
    {
      label: "目标时长(H)",
      prop: "targetTime",
      minWidth: 50
    },
    {
      label: "现在时长(H)",
      prop: "totalDuration",
      minWidth: 50
    },
    {
      label: "操作",
      fixed: "right",
      width: 240,
      slot: "operation"
    }
  ];
  const buttonClass = computed(() => {
    return [
      "!h-[20px]",
      "reset-margin",
      "!text-gray-500",
      "dark:!text-white",
      "dark:hover:!text-primary"
    ];
  });
  // function onChange({ row, index }) {
  //   ElMessageBox.confirm(
  //     `确认要<strong>${
  //       row.status === 0 ? "停用" : "启用"
  //     }</strong><strong style='color:var(--el-color-primary)'>${
  //       row.username
  //     }</strong>用户吗?`,
  //     "系统提示",
  //     {
  //       confirmButtonText: "确定",
  //       cancelButtonText: "取消",
  //       type: "warning",
  //       dangerouslyUseHTMLString: true,
  //       draggable: true
  //     }
  //   )
  //     .then(() => {
  //       switchLoadMap.value[index] = Object.assign(
  //         {},
  //         switchLoadMap.value[index],
  //         {
  //           loading: true
  //         }
  //       );
  //       setTimeout(() => {
  //         switchLoadMap.value[index] = Object.assign(
  //           {},
  //           switchLoadMap.value[index],
  //           {
  //             loading: false
  //           }
  //         );
  //         message("已成功修改用户状态", {
  //           type: "success"
  //         });
  //       }, 300);
  //     })
  //     .catch(() => {
  //       row.status === 0 ? (row.status = 1) : (row.status = 0);
  //     });
  // }
  /**  */
  function handleUpdate(row) {
    console.log(row);
  }

  function handleDelete(row) {
    /**  调用接口 */
    deleteUser(row._id);
    message(`您删除了用户姓名为${row.realname}的这条数据`, { type: "success" });
    // console.log(row._id);
    onSearch();
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getUserList(toRaw(form));
    for(let i = 0;i<data.length;i++){
      data[i].totalDuration=(data[i].totalDuration/60).toFixed(2);
    }
    dataList.value = data;
    // console.log(dataList);
    pagination.total = data.length;
    pagination.pageSize = 15;
    pagination.currentPage = 1;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}角色`,
      props: {
        formInline: {
          realname: row?.realname ?? "",
          username: row?.username ?? "",
          grade: row?.grade ?? "",
          remark: row?.remark ?? "",
          targetTime: row?.targetTime ?? "",
          password: row?.password ?? "5201314",
          email: row?.email ?? "",
          isAdmin: false
        }
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了用户学号为${curData.realname}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", toRaw(options.props.formInline));
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              console.log(addUser(toRaw(options.props.formInline)));
              chores();
            } else {
              // 实际开发先调用编辑接口，再进行下面操作
              chores();
            }
          }
        });
      }
    });
  }
  /** 分配为管理员 */
  function updateRoles(row) {
    // console.log(row);
    const update = {
      username: row.username,
      isAdmin: true
    };
    const id = row._id;
    updateInfo(update, id);
    onSearch();
    // console.log(row.isAdmin, row._id);
  }
  /** 数据权限 可自行开发 */
  // function handleDatabase() {}

  onMounted(() => {
    onSearch();
  });

  return {
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
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}

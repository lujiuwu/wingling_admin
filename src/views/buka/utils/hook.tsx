import editForm from "../form.vue";
// import { ElMessageBox } from "element-plus";
import { message } from "@/utils/message";
import { addDialog } from "@/components/ReDialog";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, computed, toRaw } from "vue";
import { DeleteBuka, getBukaInfo, handleBuka } from "@/api/buka";
export function useUser() {
  const form = reactive({
    // userInfo: {},
    reason: "",
    status: "",
    _id: "",
    username: ""
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
      label: "用户学号",
      prop: "userInfo.username",
      minWidth: 80
    },
    {
      label: "用户姓名",
      prop: "userInfo.realname",
      minWidth: 90
    },
    {
      label: "原因",
      prop: "reason",
      minWidth: 100
    },
    {
      label: "补卡时间",
      prop: "startTime",
      minWidth: 120
    },
    {
      label: "状态",
      prop: "status",
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
  function handleUpdate(row) {
    console.log(row);
  }

  function handleDelete(row) {
    // 删除
    console.log(row._id);
    DeleteBuka(row._id);
    onSearch();
  }
  function handleAccept(row) {
    // 同意
    const acceptBuka = {
      status: "pass"
    };
    handleBuka(acceptBuka, row._id);
    message(`您同意了该用户的补卡申请`, { type: "success" });
    // console.log(row._id);
    onSearch();
  }
  function handleRefuse(row) {
    const id = row._id;
    addDialog({
      title: `拒绝补卡申请`,
      props: {
        formInline: {
          rejectReason: "",
          status: "reject"
        }
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        function chores() {
          message(`您拒绝了该用户的补卡申请`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        console.log("curData", toRaw(options.props.formInline));
        // 表单规则校验通过
        // 实际开发先调用新增接口，再进行下面操作
        console.log(handleBuka(toRaw(options.props.formInline), id));
        chores();
      }
    });
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
    const { data } = await getBukaInfo(toRaw(form));
    dataList.value = data;
    for (let i = 0; i < data.length; i++) {
      data[i].startTime = `${data[i].startTime} - ${data[i].endTime} (${(
        data[i].duration / 60
      ).toFixed(2)}h)`;
      data[i].status = "待处理";
    }
    console.log(data);
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

    onSearch,
    resetForm,

    handleUpdate,
    handleDelete,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange,
    handleAccept,
    handleRefuse
  };
}

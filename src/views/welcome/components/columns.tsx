// import TypeIt from "@/components/ReTypeit";
import OfficeBuilding from "@iconify-icons/ep/office-building";
import Tickets from "@iconify-icons/ep/tickets";
import Location from "@iconify-icons/ep/location";
import Iphone from "@iconify-icons/ep/iphone";
// import Notebook from "@iconify-icons/ep/notebook";
import User from "@iconify-icons/ri/user-3-fill";
import { useUserStore } from "@/store/modules/user";

// 获取用户数据
const store = useUserStore();
// console.log(store);
const userType = store.isAdmin ? "管理员" : "普通用户";
export function useColumns() {
  const lists = [
    { type: "success", label: userType },
    { type: "", label: "翼灵物联网工作室" }
  ];

  const columnsA = [
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <iconify-icon-offline icon={User} />
          </el-icon>
          用户姓名
        </div>
      ),
      value: store.realname
    },
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <iconify-icon-offline icon={Iphone} />
          </el-icon>
          用户学号
        </div>
      ),
      value: store.username
    },
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <iconify-icon-offline icon={Location} />
          </el-icon>
          居住地
        </div>
      ),
      value: "中国"
    }
  ];

  const columnsB = [
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <iconify-icon-offline icon={Tickets} />
          </el-icon>
          标签
        </div>
      ),
      cellRenderer: () => {
        return lists.map(v => {
          return (
            <el-tag class="mr-[10px]" type={v.type} size="small" effect="dark">
              {v.label}
            </el-tag>
          );
        });
      }
    },
    {
      labelRenderer: () => (
        <div class="flex items-center">
          <el-icon>
            <iconify-icon-offline icon={OfficeBuilding} />
          </el-icon>
          联系地址
        </div>
      ),
      value: "中华人民共和国"
    }
  ];

  return {
    columnsA,
    columnsB
  };
}

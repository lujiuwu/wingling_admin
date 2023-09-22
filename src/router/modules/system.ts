export default {
  path: "/system",
  redirect: "/system/user",
  meta: {
    icon: "AllSetting",
    title: "身份管理",
    showLink: true,
    rank: 10
  },
  children: [
    {
      path: "/system/user",
      name: "用户管理",

      component: () => import("@/views/system/user/index.vue"),
      meta: {
        title: "用户管理",
        icon: "User"
      }
    },
    {
      path: "/system/role",
      name: "角色管理",

      component: () => import("@/views/system/role/index.vue"),
      meta: {
        title: "角色管理",
        icon: "Admin"
      }
    }
  ]
} as RouteConfigsTable;

export default {
  path: "/remedy",
  meta: {
    icon: "Buka",
    title: "补卡申请"
  },
  rank: 100,
  children: [
    {
      path: "/remedy",
      name: "Remedy",
      component: () => import("@/views/buka/index.vue"),
      meta: {
        title: "补卡申请",
        showLink: true
      }
    }
  ]
} as RouteConfigsTable;

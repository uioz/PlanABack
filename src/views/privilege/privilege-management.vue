<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-paper class="privilege-management" :z-depth="5">
    <mu-data-table height="100%" :columns="columns" :data="list">
      <template #default={row}>
        <td>{{row.name}}</td>
        <td>{{row.calories}}</td>
        <td>{{row.fat}}</td>
        <td>{{row.carbs}}</td>
        <td>{{row.protein}}</td>
        <td>{{row.iron}}%</td>
        <td><mu-checkbox ></mu-checkbox></td>
      </template>
    </mu-data-table>
  </mu-paper>
</template>
<script>
export default {
  name: "privilege-management",
  data() {
    return {
      columns: [
        {
          title: "账号",
          name: "name",
          cellAlign: "center"
        },
        {
          title: "管理专业范围",
          name: "calories",
          cellAlign: "center"
        },
        {
          title: "上传",
          name: "fat",
          cellAlign: "center"
        },
        {
          title: "下载",
          name: "carbs",
          cellAlign: "center"
        },
        {
          title: "预览",
          name: "protein",
          cellAlign: "center"
        },
        {
          title: "编辑",
          name: "iron",
          cellAlign: "center"
        },
        {
          title: "静态消息",
          name: "notice",
          cellAlign: "center"
        },
        {
          title: "人员修改",
          name: "alter",
          cellAlign: "center"
        },
      ],
      list: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: 1
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: 1
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: 7
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: 8
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: 16
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: 0
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: 2
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: 45
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: 22
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: 6
        }
      ]
    };
  }
};
</script>
<style>
.privilege-management {
  height: 100%;
}
</style>


<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <mu-data-table class="data-preview-table" :columns="columns" :data="list">
    <template slot-scope="scope">
      <td>{{scope.row.name}}</td>
      <td>{{scope.row.calories}}</td>
      <td>{{scope.row.fat}}</td>
      <td>{{scope.row.carbs}}</td>
      <td>{{scope.row.protein}}</td>
      <td>{{scope.row.iron}}%</td>
    </template>
  </mu-data-table>
</template>
<script>
export default {
  name: "data-preview-table",
  data() {
    return {
      sort: {
        name: "",
        order: "asc"
      },
      columns: [
        {
          title: "Dessert (100g serving)",
          name: "name",
          cellAlign: "left",
          align: "left",
        },
        {
          title: "Calories",
          name: "calories",
          cellAlign: "left",
          align: "left",
        },
        {
          title: "Fat (g)",
          name: "fat",
          align: "left",
          cellAlign: "left",
        },
        {
          title: "Carbs (g)",
          name: "carbs",
          align: "left",
          cellAlign: "left",
        },
        {
          title: "Protein (g)",
          name: "protein",
          align: "left",
          cellAlign: "left",
        },
        {
          title: "Iron (%)",
          name: "iron",
          align: "left",
          cellAlign: "left",
        }
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
.data-preview-table {
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
</style>


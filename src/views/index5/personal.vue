<template>
    <div>
      <div class="">
        <XHeader :left-options="{backText: ''}" title="个人中心"></XHeader>
        <Group>
          <cell :title="cellData.avatar" :value='cellValue.avatar' is-link></cell>
          <cell :title="cellData.nickname" :value='cellValue.nickname' is-link :link="{path:'/nickname'}"></cell>
          <cell :title="cellData.gender" :value='cellValue.gender' is-link ></cell>
          <cell :title="cellData.companyName" :value='cellValue.companyName' is-link></cell>
          <cell :title="cellData.department" :value='cellValue.department' is-link></cell>
        </Group>
        <Group>
            <cell :title="cellData.area" :value='cellValue.area' is-link ></cell>
            <cell :title="cellData.address" :value='cellValue.address' is-link :link="{path:'/address'}"></cell>
        </Group>
      </div>
    </div>
  </template>
  
  <script>
  import { Group, Cell,XHeader } from "vux";
  
  export default {
    components: {
      Group,
      Cell,
      XHeader
    },
    data() {
      return {
        cellData: {
          avatar: "头像",
          nickname: "昵称",
          gender: "性别",
          companyName: "所在单位",
          department: "部门",
          area: '所在地区',
          address:'详细地址'
        },
        cellValue:{
            avatar:'头像',
            nickname:'昵称',
            gender:'性别',
            companyName:'所在单位',
            department:'部门',
            area: '所在地区',
            address:'详细地址'
        },
      };
    }
  };
  </script>
  
  <style scoped>
 
  </style>
  
  
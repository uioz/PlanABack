<template>
  <div class="index-info">
    <mu-card>
      <mu-list>
        <mu-list-item button v-for="(value,key) in source" :key="key" >
          <mu-list-item-action>
            <font-awesome-icon icon="user-circle"></font-awesome-icon>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>{{key | getName}}</mu-list-item-title>
            <mu-list-item-sub-title>{{ getDate(key,value) }}</mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
      </mu-list>
    </mu-card>
  </div>
</template>
<script>
import timeAgo from "../../plugin/timeago.js";

export default {
  name: "index-info",
  props: {
    source: Object
  },
  methods:{
    getDate(key,value){

      if(key === 'nickName'){
        return value;
      }

      if(key === 'lastLoginTime'){
        return timeAgo(value)
      }
      
      return new Date(value).toLocaleString();

      // if(!+value){
      //   return new Date(value).toLocaleString();
      // }else{
      //   return timeAgo(value);
      // }

    }
  },
  filters:{
    getName(key){
      switch (key) {
        case 'nickName':
        return '管理员名称';
        case 'lastLoginTime':
        return '上次登录时间';
        case 'startTime':
        return '服务器开放时间';
        case 'endTime':
        return '服务器结束时间';
        case 'runingTime':
        return '服务器运行时间';
      }
    },
    getIcon(){
      // TODO get icon
    }
  }
};
</script>


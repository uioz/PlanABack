<docs>

  intro:

  props:

  methods:

  slots:

  process:

</docs>
<template>
  <privilege-members-layout>
    <template #left-area >
      <privilege-members-list v-model="userList" @pick="handleItemPick" @delete="handleItemDelete" ></privilege-members-list>
    </template>
    <template #right-area >
      <privilege-members-editer :source="editedData" @change="handleEditerChange" @user-add="handleEditerUserAdd"></privilege-members-editer>
    </template>
  </privilege-members-layout>
</template>
<script>
import privilegeMembersLayout from './privilege-members-layout';
import privilegeMembersList from './privilege-members-list';
import privilegeMembersEditer from './privilege-members-editer';
import { getIndexFromDataByAccount } from "./common.js";
import { mapActions } from "vuex";

export default {
  name:'privilege-members',
  components:{
    privilegeMembersLayout,
    privilegeMembersEditer,
    privilegeMembersList
  },
  data(){
    return {
      userList:undefined,
      fethcing:false,
      editedData:undefined
    }
  },
  methods:{
    ...mapActions(['get']),
    getIndexFromDataByAccount:getIndexFromDataByAccount('userList'),
    handleEditerChange(newUserData,oldUserData){

      this.editedData = undefined;

      const index = this.getIndexFromDataByAccount(oldUserData.account);
      if(index !== -1){
        this.userList.splice(index,1,newUserData);
      }else{
        this.userList.push(newUserData);
      }

    },
    handleEditerUserAdd(userData){
      this.userList.push(userData);
    },
    handleItemPick(userData){
      this.editedData = userData;
    },
    handleItemDelete(userData){

      if(this.editedData && this.editedData.account === userData.account){
        this.editedData = undefined;
      }

    },
    beforeFetch(){
      this.fethcing = true;
    },
    fetch(){

      if(this.fethcing){
        return;
      }

      this.beforeFetch();

      this.get({
        target:'privilege/members',
      }).then(response=>{
        if(response){
          this.userList = response.data.data;
        }
      }).finally(()=>this.afterFetch());

    },
    afterFetch(){
      this.fethcing = false;
    }
  },
  created(){
    this.fetch();
  }
}
</script>
<style>

</style>


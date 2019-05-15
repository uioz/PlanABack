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
      <privilege-members-list></privilege-members-list>
    </template>
    <template #right-area >
      <privilege-members-editer></privilege-members-editer>
    </template>
  </privilege-members-layout>
</template>
<script>
import privilegeMembersLayout from './privilege-members-layout';
import privilegeMembersList from './privilege-members-list';
import privilegeMembersEditer from './privilege-members-editer';

export default {
  name:'privilege-members',
  components:{
    privilegeMembersLayout,
    privilegeMembersEditer,
    privilegeMembersList
  }
}
</script>
<style>

</style>


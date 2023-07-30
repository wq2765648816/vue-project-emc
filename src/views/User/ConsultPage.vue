<template>
  <div class="consule">
    <cpNavBar title="问诊记录"></cpNavBar>
    <van-tabs sticky>
      <van-tab title="极速问诊">
        <ConsultList type="2"></ConsultList>
      </van-tab>
      <van-tab title="找医生">
        <ConsultList type="1"></ConsultList>
      </van-tab>
      <van-tab title="开药问诊">
        <ConsultList type="3"></ConsultList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import cpNavBar from '@/components/CpNavBar.vue'
import ConsultList from './components/ConsultList.vue'
</script>

<style lang="scss" scoped>
.consule {
  background-color: var(--cp-bg);
  min-height: 100vh;
}
</style>

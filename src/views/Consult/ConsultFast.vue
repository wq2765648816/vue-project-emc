<template>
  <div class="ConsultFast">
    <CpNavBar
      title="极速问诊"
      right-text="问诊记录"
      @click="$router.push('/user/consult')"
    ></CpNavBar>
    <div class="fast-logo">
      <img src="@/assets/consult-fast.png" class="img" />
      <p class="title"><span>20s</span> 快速匹配专业医生</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import CpNavBar from '@/components/CpNavBar.vue'
</script>

<style lang="scss" scoped>
.ConsultFast {
  .fast-logo {
    padding: 30px 0;
    text-align: center;
    .img {
      width: 240px;
    }
    .title {
      font-size: 16px;
      margin-top: 10px;
      > span {
        color: var(--cp-primary);
      }
    }
  }
}
</style>

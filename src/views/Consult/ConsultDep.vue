<template>
  <div class="consult-dep">
    <cp-nav-bar title="选择科室"></cp-nav-bar>
    <div class="body">
      <van-sidebar v-model="active">
        <van-sidebar-item
          v-for="item in list.lists"
          :key="item.id"
          :title="item.name"
        />
      </van-sidebar>
      <div class="sub-dep">
        <router-link
          v-for="sub in SonList"
          :key="sub.id"
          @click="store.setDep(sub.id)"
          to="/consult/illness"
        >
          {{ sub.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getDepAll } from '@/api'
import * as TS from '@/api/TS'
import * as TT from '@/utils/status'
import { ref, reactive, onMounted, computed } from 'vue'
import { showFailToast } from 'vant'
import { ConsultStore } from '@/stores'
const active = ref(0)
const list = reactive<TS.depDataList>({
  lists: []
})
onMounted(async () => {
  let res = await getDepAll()
  let { code, data, message } = res
  if (code === TT.STATUS.SUCCESS) {
    list.lists = data
  } else {
    showFailToast(message)
  }
})

const SonList = computed(() => list.lists[active.value]?.child)

const store = ConsultStore()
</script>

<style lang="scss" scoped>
.body {
  height: calc(100vh - 46px);
  overflow: hidden;
  display: flex;
  .van-sidebar {
    width: 120px;
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    &-item {
      padding: 15px;
      color: var(--cp-tag);
      &--select {
        color: var(--cp-main);
        font-weight: normal;
        &::before {
          display: none;
        }
      }
    }
  }
  .sub-dep {
    padding-left: 30px;
    a {
      display: block;
      color: var(--cp-dark);
      padding: 12px 0;
    }
  }
}
</style>

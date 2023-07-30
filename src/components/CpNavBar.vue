<template>
  <van-nav-bar
    :title="title"
    :right-text="rightText"
    left-arrow
    fixed
    placeholder
    @click-left="clickLeft"
    @click-right="emit('click')"
  />
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

interface Props {
  title?: string
  rightText?: string
  onBack?: () => void
}
const router = useRouter()

// 左侧点击事件
const clickLeft = () => {
  if (prop.onBack) {
    // 执行父组件的方法
    prop.onBack()
    return
  }
  //  返回上一层
  router.back()
}

const prop = defineProps<Props>()

// 右侧点击事件
interface Emits {
  (name: 'click'): void
}
const emit = defineEmits<Emits>()
</script>

<style lang="scss" scoped>
::v-deep() {
  .van-nav-bar {
    &__text {
      font-size: 15px;
    }
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }
    &__title {
      font-weight: normal;
    }
  }
}
</style>

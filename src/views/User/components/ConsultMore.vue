<template>
  <div class="consult-more">
    <van-popover
      v-model:show="showPopover"
      placement="top-start"
      :actions="actions"
      @select="onSelect"
    >
      <template #reference> 更多 </template>
    </van-popover>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  disabled?: boolean
}>()
const showPopover = ref(false)
const actions = [
  { text: '查看处方', disabled: props.disabled },
  { text: '删除订单' }
]

const emit = defineEmits<{
  (e: 'on-preview'): void
  (e: 'on-delete'): void
}>()

const onSelect = (action: { text: string }, i: number) => {
  if (i === 0) emit('on-preview')
  if (i === 1) emit('on-delete')
}
</script>

<style lang="scss" scoped></style>

import type { FollowType } from '@/types/consult'
import { ref } from 'vue'
import { followOrUnfollow, getPrescriptionPic } from '@/api/index'
import { showImagePreview } from 'vant'

// Vue3概念：通过组合式API封装 数据逻辑 在一起的函数，组合式函数 usexxx
// composable
export const useFollow = (type: FollowType = 'doc') => {
  const loading = ref(false)
  const follow = async (item: { id: string; likeFlag: 0 | 1 }) => {
    loading.value = true
    try {
      await followOrUnfollow({ id: item.id, type })
      item.likeFlag = item.likeFlag === 1 ? 0 : 1
    } finally {
      loading.value = false
    }
  }
  return { loading, follow }
}

// 提供查看处方
export const useShowPrescription = () => {
  const onShowPrescription = async (id?: string) => {
    if (id) {
      const res = await getPrescriptionPic(id)
      showImagePreview([res.data.url])
    }
  }
  return { onShowPrescription }
}

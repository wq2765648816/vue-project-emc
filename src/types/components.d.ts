// 子组件标签高亮 方便代码提示
import CpNavBar from '@/components/CpNavBar.vue'
import CpRadioBtn from '@/components/CpRadioBtn.vue'
import CpIcon from '@/components/CpIcon.vue'
import FollowDoctor from '../views/Home/components/FollowDoctor.vue'
import CpPaySheet from '@/components/CpPaySheet.vue'
declare module 'vue' {
  interface GlobalComponents {
    CpNavBar: typeof CpNavBar
    CpRadioBtn: typeof CpRadioBtn
    CpIcon: typeof CpIcon
    FollowDoctor: typeof FollowDoctor
    CpPaySheet: typeof CpPaySheet
  }
}

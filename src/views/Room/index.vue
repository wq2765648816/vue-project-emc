<template>
  <div class="room-page">
    <cp-nav-bar
      title="问诊室"
      @back="() => $router.replace('/home')"
    ></cp-nav-bar>
    <!-- 状态栏 -->
    <room-status
      :status="consult?.status"
      :countdown="consult?.countdown"
    ></room-status>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <!-- 消息 -->
      <room-message
        v-for="item in list"
        :key="item.id"
        :item="item"
      ></room-message>
    </van-pull-refresh>
    <!-- 操作栏 -->
    <room-action
      @send-text="onSendText"
      @send-image="onSendImage"
      :disabled="consult?.status !== OrderType.ConsultChat"
    ></room-action>
  </div>
</template>

<script setup lang="ts">
import RoomStatus from './component/RoomStatus.vue'
import RoomAction from './component/RoomAction.vue'
import RoomMessage from './component/RoomMessage.vue'
import { ref, nextTick, provide, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '@/stores'
import { useRoute } from 'vue-router'
import { getConsultOrderDetail } from '@/api'
import io, { Socket } from 'socket.io-client'
import type { Message, TimeMessages } from '@/types/room'
import { showToast } from 'vant'
import { MsgType, OrderType } from '@/enums'
import dayjs from 'dayjs'
import type { ConsultOrderItem, Image } from '@/types/consult'
// 引入pinia
const store = useUserStore()
const route = useRoute()
const consult = ref<ConsultOrderItem>()
const list = ref<Message[]>([])
const initialMsg = ref<boolean>(true)
// 查询订单详细信息
const loadConsult = async () => {
  const res = await getConsultOrderDetail({
    orderId: route.query.orderId as string
  })
  consult.value = res.data
  console.log(res.data)
}

// 提供问诊订单数据给后代组件
provide('consult', consult)
const completeEva = (score: number) => {
  const item = list.value.find((item) => item.msgType === MsgType.CardEvaForm)
  if (item) {
    item.msg.evaluateDoc = { score }
    item.msgType = MsgType.CardEva
  }
}
provide('completeEva', completeEva)
// 实时通信
let socket: Socket
onMounted(() => {
  loadConsult()
  socket = io(import.meta.env.VITE_API_BASE_API, {
    auth: {
      token: `Bearer ${store.user?.token}`
    },
    query: {
      orderId: route.query.orderId
    }
  })
  socket.on('connect', () => {
    console.log('连接成功')
  })
  socket.on('disconnect', () => {
    console.log('连接关闭')
  })
  socket.on('error', () => {
    console.log('发生错误')
  })
  // 获取聊天记录，如果是第一次（默认消息）
  socket.on('chatMsgList', ({ data }: { data: TimeMessages[] }) => {
    // data 数据 ===> [ {createTime}, ...items ]
    const arr: Message[] = []
    data.forEach((item, i) => {
      // 记录每一段消息中最早的消息时间，获取聊天记录需要使用
      if (i === 0) time.value = item.createTime
      arr.push({
        msgType: MsgType.Notify,
        msg: {
          content: item.createTime
        },
        createTime: item.createTime,
        id: item.createTime
      })
      arr.push(...item.items)
    })
    list.value.unshift(...arr)

    loading.value = false
    if (!arr.length) return showToast('没有更多聊天记录了')

    if (initialMsg.value) {
      socket.emit('updateMsgStatus', arr[arr.length - 1].id)
      // 第一次需要滚动到最新的消息
      nextTick(() => {
        window.scrollTo(0, document.body.scrollHeight)
        initialMsg.value = false
      })
    }
  })
  // 监听订单状态变化
  socket.on('statusChange', () => loadConsult())
  // 接收聊天消息
  socket.on('receiveChatMsg', async (event) => {
    socket.emit('updateMsgStatus', event.id)
    list.value.push(event)
    await nextTick()
    window.scrollTo(0, document.body.scrollHeight)
  })
})
onUnmounted(() => {
  socket.close()
})

// 发送文字信息
const onSendText = (text: string) => {
  socket.emit('sendChatMsg', {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgText,
    msg: {
      content: text
    }
  })
}
// 发送图片信息
const onSendImage = (image: Image) => {
  socket.emit('sendChatMsg', {
    from: store.user?.id,
    to: consult.value?.docInfo?.id,
    msgType: MsgType.MsgImage,
    msg: {
      picture: image
    }
  })
}

// 下拉刷新
const loading = ref(false)
const time = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))
const onRefresh = () => {
  socket.emit('getChatMsgList', 20, time.value, consult.value?.id)
}
</script>

<style lang="scss" scoped>
.room-page {
  padding-top: 90px;
  padding-bottom: 60px;
  min-height: 100vh;
  box-sizing: border-box;
  background-color: var(--cp-bg);
  .van-pull-refresh {
    width: 100%;
    min-height: calc(100vh - 150px);
  }
}
</style>

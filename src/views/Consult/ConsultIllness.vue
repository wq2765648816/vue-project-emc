<template>
  <div class="illness">
    <cp-nav-bar title="图文问诊" />
    <div class="illness-tip van-hairline--bottom">
      <img class="img" src="@/assets/avatar-doctor.svg" />
      <div class="info">
        <p class="tit">在线医生</p>
        <p class="tip">
          请描述你的疾病或症状、是否用药、就诊经历，需要我提供什么样的帮助
        </p>
        <p class="safe">
          <cp-icon name="consult-safe" color="#979797" />
          <span>内容仅医生可见</span>
        </p>
      </div>
    </div>
    <!-- 收集信息 -->
    <div class="illness-form">
      <van-field
        type="textarea"
        rows="3"
        placeholder="请详细描述您的病情，病情描述不能为空"
        v-model="form.illnessDesc"
      >
      </van-field>
      <div class="item">
        <p>本次患病多久了?</p>
        <cp-radio-btn :option="timeOptions" v-model="form.illnessTime" />
      </div>
      <div class="item">
        <p>此次病情是否去医院就诊过?</p>
        <cp-radio-btn :option="flagOptions" v-model="form.consultFlag" />
      </div>
    </div>
    <div class="illness-img">
      <!-- :after-read 文件读取完成后的回调函数 -->
      <van-uploader
        :after-read="afterRead"
        upload-icon="photo-o"
        max-count="9"
        :max-size="5 * 1024 * 1024"
        v-model="fileList"
        upload-text="上传图片"
        @delete="onDeleteImg"
      />
      <p class="tip" v-if="!fileList.length">
        上传内容仅医生可见,最多9张图,最大5MB
      </p>
    </div>
    <div class="illness-btn">
      <van-button @click="next" type="primary" block round :class="{ disabled }"
        >下一步</van-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { timeOptions, flagOptions } from '@/services/constants'
import type { ConsultIllness, Image } from '@/types/consult'
import { UploadImage } from '@/api'
import { ConsultStore } from '@/stores'
import { useRouter } from 'vue-router'
// setIllness
import type {
  UploaderAfterRead,
  UploaderFileListItem
} from 'vant/lib/uploader/types'
import { showConfirmDialog, showToast } from 'vant'
const store = ConsultStore()
const router = useRouter()
const form = ref<ConsultIllness>({
  illnessDesc: '',
  illnessTime: undefined,
  consultFlag: undefined,
  pictures: []
})
// 控制按钮高亮
const disabled = computed(
  () =>
    !form.value.illnessDesc ||
    form.value.consultFlag === undefined ||
    form.value.illnessTime === undefined
)

// 上传图片
const fileList = ref<Image[]>([])

// 图片上传 文件读取完成后的回调函数
const afterRead: UploaderAfterRead = (item) => {
  // 判断item是不是一个数组
  if (Array.isArray(item)) return
  if (!item.file) return
  item.status = 'uploading'
  item.message = '上传中...'
  UploadImage(item.file)
    .then((res) => {
      item.status = 'done'
      item.message = undefined
      item.url = res.data.url
      // 同步数据
      form.value.pictures?.push(res.data)
    })
    .catch(() => {
      item.status = 'failed'
      item.message = '上传失败'
    })
}

// 删除文件预览时触发
const onDeleteImg = (item: UploaderFileListItem) => {
  form.value.pictures = form.value.pictures?.filter(
    (pic) => pic.url !== item.url
  )
}
// 下一步
const next = () => {
  if (!form.value.illnessDesc) return showToast('请输入病情描述')
  if (form.value.illnessTime === undefined)
    return showToast('请选择症状的持续时间')
  if (form.value.consultFlag === undefined) return showToast('请选择是否就诊')
  // 记录病情
  store.setIllness(form.value)
  // 跳转，携带标识
  router.push('/user/patient?isChange=1')
}
onMounted(() => {
  if (store.consult.illnessDesc) {
    showConfirmDialog({
      title: '温馨提示',
      message: '是否恢复之前填写的病情信息?',
      closeOnPopstate: false
    }).then(() => {
      const { illnessDesc, illnessTime, consultFlag, pictures } = store.consult
      form.value = { illnessDesc, illnessTime, consultFlag, pictures }
      fileList.value = pictures || []
    })
  }
})
</script>

<style lang="scss" scoped>
.illness {
  &-tip {
    display: flex;
    padding: 15px;
    .img {
      width: 52px;
      height: 52px;
      border-radius: 4px;
      overflow: hidden;
      margin-top: 10px;
    }
    .info {
      flex: 1;
      padding-left: 12px;
      .tit {
        font-size: 16px;
        margin-bottom: 5px;
      }
      .tip {
        padding: 12px;
        background: var(--cp-bg);
        color: var(--cp-text3);
        font-size: 13px;
        line-height: 1.3;
        margin-bottom: 10px;
      }
      .safe {
        font-size: 10px;
        color: var(--cp-dark);
        display: flex;
        align-items: center;
      }
    }
  }
  &-form {
    padding: 10px 15px 0;
    .van-field {
      padding: 0;
      &::after {
        border-bottom: none;
      }
    }
    .item {
      > p {
        color: var(--cp-text3);
        padding: 15px 0;
      }
    }
  }
  &-img {
    padding: 15px 0 0 16px;
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    .tip {
      font-size: 12px;
      color: var(--cp-tip);
    }
    ::v-deep() {
      .van-uploader {
        &__preview {
          &-delete {
            top: -6px;
            left: -6px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--cp-primary);
            &-icon {
              transform: translate(-22%, 22%);
            }
          }
        }
        &__upload {
          border-radius: 8px;
        }
        &__upload-icon {
          color: var(--cp-text3);
        }
        .van-image {
          border-radius: 8px;
          overflow: hidden;
        }
      }
    }
  }
  &-btn {
    padding: 0 15px;
    .disabled {
      background: var(--cp-bg);
      border: var(--cp-bg);
      color: var(--cp-tip);
      opacity: 1;
    }
  }
}
</style>

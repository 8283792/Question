import { messageWarning } from '@/utils/elementTools'

class Check{
  static topicImg(content){
    if(!content) return false
    const imgArray = content.match(/<img.*?(?:>|\/>)/gi)
    if(imgArray.length > 5){
      messageWarning('图片数量超出限制，最多只能上传5张图片！')
      return false
    }
    return true
  }
}

export {
  Check
}
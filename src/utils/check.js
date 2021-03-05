import { messageWarning } from '@/utils/elementTools'

class Check {
  /**
   * 检查html字符串中图片数量是否大于5
   * @param {检查的html字符串}} content
   */
  static topicImg(content) {
    if (!content) return false
    const imgArray = content.match(/<img.*?(?:>|\/>)/gi)
    if (imgArray && imgArray.length > 5) {
      messageWarning('图片数量超出限制，最多只能上传5张图片！')
      return false
    }
    return true
  }

  /**
   * 检查html字符串数量
   * @param {html内容字符串}} content
   * @param {最大字节数} maxWords
   */
  static topicText(content, maxWords) {
    if (!content) return false
    const textLength = content.replace(/(<([^>]+)>)/gi, '').length
    if (textLength > maxWords) {
      messageWarning('字符超出限制')
      return false
    }
    return true
  }
}

export { Check }

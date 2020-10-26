class Utils{
  /**
   * 节流函数
   * @param {方法} func 
   * @param {间隔时间} delay 
   */
  static throttle(func, delay) {
    var prev = Date.now();            
    return function() {                
      var context = this
      var args = arguments
      var now = Date.now()
      if (now - prev >= delay) {
      func.apply(context, args)
        prev = Date.now()
      }
    }
  }

  static jsonToString(json) {
    return JSON.stringify(json)
  }
}

export {
  Utils
}
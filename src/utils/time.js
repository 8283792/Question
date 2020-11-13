class Time{
  constructor(wait, that){
    this.initWait = wait
    // debugger
    this.countTime(wait, that)
  }
  /**
   * 
   * @param {等待时间} wait 
   * @param {标识符} flag 
   * @param {改变域} that 
   */
  countTime(wait, that) {
    if (wait == 0) {
      wait = this.initWait
      that._data.SMSText = '发送'
      that._data.flag = true
    } else {
      that._data.SMSText = wait
      wait--
      setTimeout(() => {
          this.countTime(wait, that)
      }, 1000)
    }
  }
}

export {
  Time
}
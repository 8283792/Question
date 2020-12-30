class mixParams {
  /**
   * 混合请求参数
   * @param {操作类型} transaction
   * @param {参数} params
   */
  static mix(transaction, params) {
    const session = localStorage.getItem('_userSess')
    let _params = {
      authentication: JSON.stringify({
        system_id: session || '',
      }),
      authorization: JSON.stringify({
        system_id: '',
        mobile: '',
        sms_pin: '',
        transaction: transaction,
      }),
    }
    _params = Object.assign(_params, params)
    return _params
  }
}

export { mixParams }

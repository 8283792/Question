const ElementTools = window.Vue.prototype
const message = ElementTools.$message
const loading = ElementTools.$loading
const messageError = message.error
const messageSuccsess = message.success
const messageWarning = message.warning

export {
  ElementTools,
  message,
  messageError,
  messageSuccsess,
  messageWarning,
  loading
}
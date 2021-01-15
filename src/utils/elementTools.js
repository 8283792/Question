const ElementTools = window.Vue.prototype
const message = ElementTools.$message
const loading = ElementTools.$loading
const messageError = message.error
const messageSuccsess = message.success
const messageWarning = message.warning
const alertMessage = ElementTools.$alert
const confirmMessage = ElementTools.$confirm
const promptMessage = ElementTools.$prompt

export {
  ElementTools,
  message,
  messageError,
  messageSuccsess,
  messageWarning,
  loading,
  alertMessage,
  confirmMessage,
  promptMessage,
}

import Message from "muse-ui-message";

Message.config({
  successIcon: '',                    // 成功图标
  infoIcon: '',                               // 信息图标
  warningIcon: '',                   // 提醒图标
  errorIcon: '',                           // 错误图标
  iconSize: 0,                                   // 图标大小
  width: 350,                                     // 对话框的宽度
  maxWidth: '80%',                                // 对话框最大宽度
  className: 'pre-wrap',                                  // 对话框的样式
  okLabel: '确定',                                 // 对话框确定按钮文字
  cancelLabel: '取消',                             // 对话框取消按钮文字
  transition: 'scale'                             // 对话框显示的动画 'slide-left', 'slide-right', 'fade', 'scale'
})

export default Message;
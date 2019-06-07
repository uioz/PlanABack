import Toast from "muse-ui-toast";

Toast.config({
  close: false,
  position: 'top',
  successIcon: '',      // 成功信息图标
  infoIcon: '',                 // 信息信息图标
  warningIcon: '',     // 提醒信息图标
  errorIcon: ''              // 错误信息图标
});

export default Toast;
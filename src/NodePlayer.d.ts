declare class NodePlayer {
  /**
   * 自动测试浏览器是否支持MSE硬件解码播放
   * 如不支持，仍然使用软解码。
   * 紧随 new 后调用，不调用则只使用软解。
   * 注意：使用MSE后不支持累积延迟消除
   */
  useMSE(): void;

  /**
   * 是否开启屏幕常亮
   * 在手机浏览器上,canvas标签渲染视频并不会像video标签那样保持屏幕常亮
   * 如果需要该功能, 可以调用此方法, 会有少量cpu消耗, pc浏览器不会执行
   */
  setKeepScreenOn(): void;

  /**
   * 绑定视图id
   * @param viewId canvas视图id
   */
  setView(viewId: string): void;

  /**
   * 设置视频缩放模式
   * 当视频分辨率比例与canvas显示区域比例不同时,缩放效果不同:
   * 0 视频画面完全填充canvas区域,画面会被拉伸
   * 1 视频画面做等比缩放后,对齐canvas区域,画面不被拉伸,但有黑边
   * 2 视频画面做等比缩放后,完全填充canvas区域,画面不被拉伸,没有黑边,但画面显示不全
   * 注意：只在软解时有效
   * @param mode 缩放模式
   */
  setScaleMode(mode: number): void;

  /**
   * 设置最大缓冲时长，单位毫秒
   * 注意：只在软解时有效
   * @param bufferTime
   */
  setBufferTime(bufferTime: number): void;

  /**
   * 设置音量大小，取值0.0 — 1.0
   * 当为0.0时，完全无声
   * 当为1.0时，最大音量，默认值
   * @param volume 音量大小,浮点类型
   */
  setVolume(volume: number): void;

  /**
   * 重置视图大小,将自动改变标签的高宽和css高宽
   * @param width 新视频区域宽
   * @param height 新视频区域高
   */
  resizeView(width: number, height: number): void;

  /**
   * 通知播放器画布尺寸改变，计算调整渲染尺寸
   * 也可以用于旋转画布
   * @param rotate 旋转角度
   * 可选0-默认，90，270
   */
  onResize(rotate: number): void;

  /**
   * 截图
   * @param filename 截图后的文件名
   * @param format 截图的格式，可选png或jpeg
   * @param quality 可选参数，当格式是jpeg时，压缩质量，取值0.0 ~ 1.0
   */
  screenshot(filename: string, format: string, quality: number): void;

  /**
   * 开始播放
   * @param url http-flv,ws-flv 直播地址
   */
  start(url: string): void;

  /**
   * 停止播放
   */
  stop(): void;

  /**
   * 全屏播放,iOS不支持
   */
  fullscreen(): void;

  /**
   * 绑定事件监听器
   * @param event 事件
   * @param handler 处理器
   *
   * 'start'事件 当连接成功并收到数据
   * 'stop' 事件 当本地stop或远端断开连接
   * 'error'事件 当连接错误或播放中发生错误，error 一个参数
   * 'videoInfo'事件 当解析出视频信息时回调，width,height,codec 三个参数
   * ‘videoSei’ 事件 当解析出sei信息时回调，sei 一个参数
   * ‘videoFrame’ 事件 当渲染一帧视频时回调，pts,dts 两个参数
   * ’audioInfo‘事件 当解析出音频信息时回调，samplerate,channels,codec 三个参数
   * ’stats‘事件 每秒回调一次，包含当前缓冲区时长，fps，音视频码率(bit)，stats(对象)一个参数
   */
  on(event: string, listener: (...args: any[]) => void): void;
}

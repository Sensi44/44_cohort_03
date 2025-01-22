global.Notification = class {
  static permission = 'granted';
  static requestPermission = jest.fn().mockResolvedValue('granted');
  constructor(title, options) {
    this.title = title;
    this.options = options;
  }
};

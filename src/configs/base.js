var config = {
  SALT_WORK_PACTOR: 10,
  secret: 'agriculture_api',
  service: {
    name: 'agriculture server',
    version: '0.0.1',
    port: 8000
  },
  db: {
    host: '',
    port: 27017,
    name: '',
    user: '',
    pass: ''
  },
  redis: {
    prefix: 'agriculture_redis',
    host: '127.0.0.1',
    port: 6379
  },
  dateStr: 'YYYY-MM-DD',
  timeStr: 'YYYY-MM-DD HH:mm:ss',
  whiteList: require('./extensions/white-list')
};

module.exports = config;

var config = {
  secret: 'agriculture_api',
  service: {
    name: 'agriculture server',
    version: '0.0.1',
    port: 8000
  },
  db: {
    host: '127.0.0.1',
    port: 27017,
    name: 'agriculture',
    user: 'agriculture',
    pass: 'agriculture'
  },
  redis: {
    prefix: 'agriculture_redis',
    host: '127.0.0.1',
    port: 6379
  },
  dateStr: 'YYYY-MM-DD',
  timeStr: 'YYYY-MM-DD HH:mm:ss'
};

module.exports = config;

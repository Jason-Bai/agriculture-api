var config = {
  SALT_WORK_PACTOR: 10,
  secret: 'agriculture_api',
  service: {
    name: 'agriculture server',
    version: '0.0.1',
    port: 8000
  },
  db: {
    host: '101.200.181.218',
    port: 27017,
    name: 'agriculture',
    user: 'agriculture',
    pass: 'ds*hjZ2u^BLHIHk0'
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

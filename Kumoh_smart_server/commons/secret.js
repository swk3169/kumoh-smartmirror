module.exports = {
  'secret' :  '',
  'db_info': {
    local: { // localhost
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '',
      database: 'system_project2'
    },
    real: { // real
      host: '',
      port: '',
      user: '',
      password: '',
      database: ''
    },
    dev: { // dev
      host: '',
      port: '',
      user: '',
      password: '',
      database: ''
    }
  },
  'federation' : {
    'kakao' : {
      'client_id' : '05e4bc1d54678776989fa1df84df95f3',
      'clientSecret': 'GYfMHNPf1lUJyx4x5CJnUuGIAY6TLscq',
      'callback_url' : 'http://127.0.0.1:3000/auth/login/kakao/callback'
    }
  }
};

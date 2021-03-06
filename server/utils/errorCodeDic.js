const dic = {
    'USER_NAME_EMPTY': {
        msg: '用户名不能为空',
        code: 5000,
    },
    'PASSWORD_EMPTY': {
        msg: '密码不能为空',
        code: 5001,
    },
    'USER_EXISTS': {
        msg: '用户已存在',
        code: 5002,
    },
    'USER_NOT_EXISTS': {
        msg: '用户不存在',
        code: 5003,
    },
    'INCORRECT_NAME_OR_PASSWORD': {
        msg: '账号或密码错误',
        code: 5004,
    },
    'HAS_LOGIN': {
        msg: '您已登录',
        code: 5005,
    },
    'DO_NOT_LOGIN_AGAIN': {
        msg: '请勿重复登录',
        code: 5006,
    },
    'NO_TOUSER': {
        msg: '未找到消息接收人',
        code: 5007,
    },
    'PLEASE_LOGIN': {
        msg: '请先登录',
        code: 5008,
    },
    'ERR_IN_MESSAGE_FIND': {
        msg: '查询消息记录时出错',
        code: 5009,
    },
}

module.exports = dic
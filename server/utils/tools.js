const bluebird = require('bluebird');
const bcrypt = bluebird.promisifyAll(require('bcrypt'), { suffix: '$' });
const config = require('../../config/server.conf')

const {saltRounds} = config;

const tools = {
    /**
     * 密码加密
     * @param {*} password 用户密码
     */
    async encryption(password) {
        const salt = await bcrypt.genSalt$(saltRounds);
        const hash = await bcrypt.hash$(password, salt);
        return hash;
    },
    
    /**
     * 没加密字段和加密后字段比较
     * @param {*} before 加密前的字段，等待比较的字段
     * @param {*} after 机密后的字段
     */
    encryptionCompare(before, after){
        return bcrypt.compareSync(before, after);
    },

    /**
     * 成功时返回
     * @param {*} data 
     */
    formatRes(data = null) {
        return {
            success: true,
            data,
            code: 200,
            msg: '',
        }
    }
}

module.exports = {
    ...tools,
}


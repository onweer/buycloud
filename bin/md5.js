var crypto = require('crypto');
// Creates and returns a Hash object that can be used to generate hash digests using the given algorithm.
exports = module.exports = {
    /**
     * [MD5转换算法]
     * @author   leo
     * @DateTime 2016-06-15T11:42:11+0800
     * @param    {[string]}                 str [传入需要加密的字符串]
     * @param    {[secret]}                 secret [传入格外的secret]
     * @return   {[string]}                     [返回加密后的字符串]
     */
    encryption: function (str, secret) {
        const _secret = secret || 'buycloud';
        return crypto.createHash('md5').update(str + _secret).digest('hex');
    },
    /**
     * [MD5比较算法]
     * @method bcompare
     * @author leo 2016-07-26
     * @param  {[string]} str    [比较字符串]
     * @param  {[string]} hash   [Hash值]
     * @param  {[string]} secret [secret]
     * @return {[boolean]}       [满足Hash返回true，否则返回false]
     */
    bcompare: function (str, hash, secret) {
        return hash === encryption(str, secret);
    }
};

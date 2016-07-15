'use strict';
var path = require('path');
var fs = require('fs');
/**
 * [mkdirs description]
 * 递归创建目录
 * @param  {[type]}   dirpath  [目录名]
 * @param  {[type]}   mode     [模式]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
var mkdirs = function(dirpath, mode) {
    if(fs.existsSync(dirpath)){
            return true;
    } else {
    //尝试创建父目录，然后再创建当前目录
        if(mkdirs(path.dirname(dirpath), mode)){
            fs.mkdirSync(dirpath, mode);
            return true;
        }
    }
};
/**
 * 格式化日期
 * @param  {[type]} fmt [description]
 * @return {[type]}     [description]
 */
var format = function (fmt) {
    var date = new Date();
    var _o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)){
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in _o){
        if (new RegExp("(" + k + ")").test(fmt)) 
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (_o[k]) : (("00" + _o[k]).substr(("" + _o[k]).length)));
    }
    return fmt;
};
module.exports = {
    //---------------- date ----------------
    format: format,

    //---------------- tools -----------------
    mkdirs: mkdirs

}
'use strict';
/**
 * 任务定制
 */
var fs  = require('fs');
var path = require('path');
var mkdirs = require('./lib/util').mkdirs;
var format = require('./lib/util').format;
var request = require('request');
var cheerio = require('cheerio');

var conf = require('./config/config.js');
var downloader = require('./Downloader.js');

// 目录制作
var RegisterDirTask = function (res_dir) {
    mkdirs(conf.store_base + path.sep + res_dir + path.sep + format('yy-MM-dd') + path.sep, 777);
}

// 下载任务
var RegisterPicDownloadTask = function (url, res_path, callback) {
    // 下载器
    downloader.PicDownloader(url).then(function (data) {
        var pic_name = path.basename(url);
        var pic_path = conf.store_base + path.sep + res_path + path.sep + format('yy-MM-dd') + path.sep;
        
        downloader.PipeDownloader(url, pic_path + pic_name, callback);
    }, function (err) {
        console.log(err);
    });
}

/**
 * 子定义
 * @param {[type]} body     [description]
 * @param {[type]} selector [description]
 */

var RegisterPicAnalyseTask = function (body, selector) {
    var $ = cheerio.load(body);
    var result = [];
    $(selector).map(function (i, item){
        result.push($(item).attr('src'));
    })
    return result;
}

var RegisterPageGenerateTask = function (page_arr, start_page, start_page_num, page_total_number, order) {
    if(order == 'asc'){
        for (var i = start_page_num; i <= start_page_num + page_total_number; i++) {
            page_arr.push(start_page +'/'+ conf.page_reg.replace(/%d%/g, i));
        }
    }else if(order == 'desc'){
        for (var i = start_page_num; i >= start_page_num - page_total_number; i--) {
            page_arr.push(start_page +'/'+ conf.page_reg.replace(/%d%/g, i));
        }
    }
}

module.exports = {
    RegisterDirTask: RegisterDirTask,
    RegisterPageGenerateTask: RegisterPageGenerateTask,
    RegisterPicDownloadTask: RegisterPicDownloadTask,
    RegisterPicAnalyseTask: RegisterPicAnalyseTask
}
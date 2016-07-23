'use strict';
/**
 * 爬虫主驱动
 */
var eventproxy = require('eventproxy');
var async = require('async');
// 日志记录
var log4js = require( 'log4js' );

var conf = require('./config/config.js');
var task = require('./Task.js');
var downloader = require('./Downloader.js');

var pages = [];// 下载url池
var counter = 0;// 并发计数器

log4js.configure(conf.logConfigure);
var logger = log4js.getLogger('scrapy');

/**
 * 目录生成
 */
task.RegisterDirTask(conf.store_dictory);
/**
 * url生成
 */
if(conf.page_mode){
    // 多页
    task.RegisterPageGenerateTask(pages, conf.start_url, conf.start_page, conf.total_page, 'desc');// 生成page
}else{
    // 单页
    pages = [conf.start_url];
    conf.concurrency = 1;
    conf.fetchcurrency = 1;
}

function MainProcess (arr) {
    // 并发事件代理
    var ep = new eventproxy();
    // 监听pages.length次 触发事件pages.length
    // pairs [0] single_page
    // pairs [1] body
    ep.after('down_img', arr.length, function (pairs) {
        // 并发下载控制
        async.mapLimit(pairs, conf.concurrency, function (pair, callback) {
            // debug for eventproxy
            counter++;
            console.log("目前并发爬取数目:" + counter);

            // 分析器
            var urls = task.RegisterPicAnalyseTask(pair[1], conf.img_selector);
            
            // 从批量源结束算单次异步结束
            ep.after('finish_img', urls.length, function (data) {
                // debug for eventproxy
                counter--;
                // 必须执行一次
                callback(null, pair[0]);
            });
            
            // 使用eventproxy发送批量源
            urls.forEach(function (url) {
                task.RegisterPicDownloadTask(url, conf.store_dictory, function(){
                    ep.emit('finish_img');
                    logger.info(url);
                    // console.log(url +' done!');
                });
            });

        },function (err, result) {
            if(!err){
                logger.info('finished');
            }
        });
    });
    // 并发请求控制
    arr.forEach(function (single_page) {
       // 解析下载
        downloader.HTMLDownloader(single_page).then(function (body) {
            ep.emit('down_img', [single_page, body]);
        },function (err) {
            // console.log(error);
            logger.error(url);
            console.log(url+"\t下载页面出错");
        })
    });
}

/**
 * 主循环
 * @return {[type]} [description]
 */
var timer = setInterval(function () {
    if(pages.length == 0) {
        clearInterval(timer);
    }else{
        var _p = pages.slice(0 , conf.fetchcurrency);
        pages.splice(0, conf.fetchcurrency);
        MainProcess(_p);
    }
}, conf.fetchIntrv);
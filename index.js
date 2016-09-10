var conf = require('./config/config.js');
var task = require('./lib/Task.js');
var scrapy = require('./lib/Scrapy.js');

var pages = [];// 下载url池
/**
 * 目录生成
 */
task.RegisterDirTask(conf.store_dictory);

/**
 * url生成
 */
if(conf.page_multi_mode){
    // 多页
    task.RegisterPageGenerateTask(pages, conf.start_url, conf.start_page, conf.total_page, 'desc');// 生成page
}else{
    // 单页
    pages = [conf.start_url];
    conf.concurrency = 1;
    conf.fetchcurrency = 1;
}

/**
 * 主循环爬取
 */
var timer = setInterval( function() {
    if(pages.length == 0) {
        clearInterval(timer);
        process.exit(0);
    }else{
        scrapy.MainProcess(pages);
    }
}, conf.fetchIntrv);

// 控制台输出 待完成
/**
 * 注册错误处理
 * @param  {[type]} err [description]
 * @return {[type]}     [description]
 */
process.on('uncaughtException', function (err) {
    scrapy.logger.error('uncaughtException : %s', err.stack);
})
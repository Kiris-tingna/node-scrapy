'use strict';
/**
 * 爬虫配置文件
 */
module.exports = {
    // 爬虫名称
    name: "煎蛋",
    /*------------------ 页面配置 -------------------*/
    allowed_domains: 'http://jandan.net',// 网站域
    start_url : 'http://jandan.net/pic', // 开始爬取的网址列表
    
    /*------------------ 分页配置 ------------------*/
    page_multi_mode: true,// 单多页开关 true:多页 false:单页
    page_reg: "page-%d%",// 分页模式
    start_page: 9409,
    total_page: 3,
    
    /*------------------ 存储配置 ------------------*/
    store_base: 'resource',
    store_dictory: 'jiandan',

    /*------------------ 选择器配置 ----------------*/
    // 如果是图片匹配到请匹配到<img>
    img_selector: '.text p img',// 煎蛋img
    text_selector: '.text p',// 煎蛋text
    // img_selector: '.inner_wrapper_img div a img',
  
    /*------------------ 爬虫并发控制 ----------------*/
    concurrency: 3,// 并发下载
    fetchcurrency: 3,// 并发请求
    fetchIntrv: 2000,// 并发间隔时间

    /*------------------ 日志记录 ----------------*/
    logConfigure: {
        "appenders":[
            {
                "type": "console",
                "category":"console"
            },{
                "type": "dateFile",
                "filename":"./log/",
                // 目录
                "pattern":"yyyyMMdd.log",
                // 命名规则，我们是按天，也可以设置为yyyyMMddhh.log，为按时
                "absolute": true,
                // 相对/绝对
                "alwaysIncludePattern": true,
                // 实时创建
                "category":"scrapy"
            }
        ],
        "levels":{"scrapy":"DEBUG"}
    }
}
'use strict';
/**
 * 爬虫配置文件
 */
module.exports = {
    // 爬虫名称
    name: "豆瓣",
    /*------------------ 页面配置 -------------------*/
    allowed_domains: 'https://movie.douban.com',// 网站域
    start_url : 'https://movie.douban.com/tag/%E5%8A%A8%E7%94%BB', // 开始爬取的网址列表
    
    /*------------------ 分页配置 ------------------*/
    page_multi_mode: false,// 单多页开关 true:多页 false:单页
    page_reg: "page-%d%",// 分页模式
    start_page: 9409,
    total_page: 3,
    
    /*------------------ 存储配置 ------------------*/
    store_base: 'resource',
    store_dictory: 'douban',

    /*------------------ 选择器配置 ----------------*/
    // 如果是图片匹配到请匹配到<img>
    
    img_selector: '.item .nbg img',// 豆瓣img
    text_selector: '.item .pl',// 豆瓣 text
    
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
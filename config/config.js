'use strict';
/**
 * 爬虫配置文件
 */
module.exports = {
    // 爬虫名称
    name: "hello",
    /*------------------ 页面配置 -------------------*/
    allowed_domains: 'http://www.symmz.com',// 网站域
    start_url : 'http://www.symmz.com/meimei.html', // 开始爬取的网址列表
    
    /*------------------ 分页配置 ------------------*/
    page_mode: false,// 单多页开关
    page_reg: "page-%d%",// 分页模式
    start_page: 9340,
    total_page: 30,
    
    /*------------------ 存储配置 ------------------*/
    store_base: 'resource',
    store_dictory: 'meinv',
    // store_log_file: 'log.txt',

    /*------------------ 选择器配置 ----------------*/
    // 如果是图片匹配到请匹配到<img>
    // img_selector: '.text p img',// 煎蛋img
    img_selector: '.inner_wrapper_img div a img',
  
    /*------------------ 爬虫并发控制 ----------------*/
    concurrency: 3,// 并发下载
    fetchcurrency: 3,// 并发请求
    fetchIntrv: 2000// 并发间隔时间
}
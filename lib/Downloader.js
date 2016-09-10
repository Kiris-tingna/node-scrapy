'use strict';
var q = require("q");
var fs = require("fs");
var request = require('request');
var useragent = require('./useragent').useragent;

var RandomUserAgent = function () {
    var index = Math.floor(Math.random() * useragent.length);
    return useragent[index];
}

var HTMLDownloader = function (url) {
    var deferred = q.defer();
    var ua = RandomUserAgent();
    var options = {
        url: url,
        headers: {
            'User-Agent': ua
        }
    }

    request(options, function (error, response, body){
        if(!error && response.statusCode == 200){
            deferred.resolve(body);
        }else{
            deferred.reject(error);
        }
    });
    return deferred.promise;
}

var PicDownloader = function (url) {
    var deferred = q.defer();
    var ua = RandomUserAgent();
    var options = {
        url: url,
        headers: {
            'User-Agent': ua
        }
    }
    request.head(options, function (error, response, body){
        if(!error && response.statusCode == 200){
            deferred.resolve(body);
        }else{
            deferred.reject(error);
        }
    });
    return deferred.promise;
}

var PipeDownloader = function (url, file_path, callback) {
    request(url).pipe(fs.createWriteStream(file_path)).on('close', callback);
}
module.exports = {
    HTMLDownloader: HTMLDownloader,
    PicDownloader: PicDownloader,
    PipeDownloader: PipeDownloader
}
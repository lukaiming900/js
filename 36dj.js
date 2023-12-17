"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const cheerio_1 = require("cheerio");
const CryptoJS = require("crypto-js");
const searchRows = 20;
const host="http://www.36dj.com";
const musicurl="http://tn1.72djapp.cn:8399/";
async function getTopLists() {

    const headers = {

    };
    const params = {

    };
    
     const albums = [];   
    
  const html = await axios_1.get(host, { headers, params });
  const obj=html.data;
  const $ = (0, cheerio_1.load)(obj);
  const rawAlbums = $("div.menu").find("li");
  
 
   
   for(let i=1;i<rawAlbums.length;i++){
     
         albums.push({
                id: $(rawAlbums[i]).find("a").attr("href"),
                title: $(rawAlbums[i]).find("a").text(),
                coverImg: "https://hifini.com/upload/forum/1.png",
            });
     
   }
 
       const jianjiao = {
        title: "360DJ",
        data: albums,
    };
   
   return [jianjiao];
    
}

async function getTopListDetail(topListItem) {
     const headers = {

    };
    const params = {

    };
    
    const albums = [];
    const html = await axios_1.default.get(host+topListItem.id, { headers, params });
    const obj=html.data;
    const $ = (0, cheerio_1.load)(obj);
    const rawAlbums = $("ul.mulist").find("p");
    
     
     
     for(let i=0;i<rawAlbums.length;i++){
         albums.push({
                      platform: '36DJ',
                      id: $(rawAlbums[i]).find("a").attr("href"),
                      artist:"36DJ",
                      title: $(rawAlbums[i]).find("a").text(),
                      album: topListItem.title,
         });
     }
     
         const html2 = await axios_1.default.get(host+$(rawAlbums[3]).find("a").attr("href"), { headers, params });
    const obj2=html2.data;
    const $2 = (0, cheerio_1.load)(obj2); 
    const mys=$2("audio").length;
    const urlc=obj2.match(/"playurl":\s*"(.*?)"/)[1];
     
     return {
      id: topListItem.id,
      description:urlc,
     // coverImg: topListItem.coverImg,
      title: topListItem.title,
      musicList: albums,
    };
    
}

async function getMediaSource(musicItem, quality) {
    
      const headers = {

    };
    const params = {

    };   
    
    
    
    const html2 = await axios_1.default.get(host+musicItem.id, { headers, params });
    const obj2=html2.data;
    const $2 = (0, cheerio_1.load)(obj2); 
    const mys=$2("audio").length;
    const urlc=obj2.match(/"playurl":\s*"(.*?)"/)[1];
   
    
       return {
          
            url:musicurl+urlc,

        };
}

  
module.exports = {
  /** 用来说明插件信息的属�? */
  platform: "36DJ",
  version: "0.0.2", // 插件版本�?
  hints: {
        importMusicSheet: [
            "36dj.com����",

        ],
    },
    primaryKey: ["id"],
    cacheControl: "no-store",
    srcUrl: "http://tv.zanlagua.com/360dj.js",
  /** 供给软件在合适的时机调用的函�? */

  getTopLists,
  getTopListDetail,
  getMediaSource,

};
const express = require('express');
const router = express.Router();

const fs = require('fs');
const path = require('path');


// 获取圣经数据对象

// 简体
const bibleCNData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/zh_ncv_cn.json')));

/*

  * 经文缩写 和 对应的内容

  > 旧约
  |缩写|书名|
  |:-|:-|
  |gn | 创世纪|
  |ex | 出埃及记|
  |lv | 利未记|
  |nm | 民数记|
  |dt | 申命记|
  |js | 约书亚记|
  |jud | 士师记|
  |rt | 路得记|
  |1sm | 撒母耳记上|
  |2sm | 撒母耳记下|
  |1kgs | 列王纪上|
  |2kgs | 列王记下|
  |1ch | 历代志上|
  |2ch |历代志下|
  |ezr | 以斯拉记|
  |ne | 尼西米记|
  |et |  以斯帖记|
  |job | 约伯记|
  |ps | 诗篇|
  |prv | 箴言|
  |ec | 传道书|
  |so | 雅歌|
  |is | 以赛亚书|
  |jr | 耶利米书|
  |lm | 耶利米哀歌|
  |ez | 以西结书|
  |dn | 但以理书|
  |ho | 何西阿书|
  |jl | 约珥书|
  |am | 阿摩司书|
  |ob | 俄巴底亚书|
  |jn | 约拿书|
  |mi | 弥迦书|
  |na | 那鸿书|
  |hk | 哈巴谷书|
  |zp | 西番雅书|
  |hg | 哈该书|
  |zc | 撒迦利亚书|
  |ml | 玛拉基书|
  
  > 新约
  |缩写|书名|
  |:-|:-|
  |mt|马太福音|
  |mk|马可福音|
  |lk|路加福音|
  |jo|约翰福音|
  |act|使徒行传|
  |rm|罗马书|
  |1co|哥林多前书|
  |2co|哥林多后书|
  |gl|加拉太书|
  |eph|以弗所书|
  |ph|腓利比书|
  |cl|歌罗西书|
  |1ts|帖撒罗尼迦前书|
  |2ts|帖撒罗尼迦后书|
  |1tm|提摩太前书|
  |2tm|提摩太后书|
  |tt|提多书|
  |phm|腓利门书|
  |hb|希伯来书|
  |jm|雅各书|
  |1pe|彼得前书|
  |2pe|彼得后书|
  |1jo|约翰一书|
  |2jo|约翰二书|
  |3jo|约翰三书|
  |jd|犹大书|
  |re|启示录|
*/


router.get('/bible', function (req, res) {

    const type = req.query.shortName;
    const chapter = Number(req.query.chapter);
    const node = Number(req.query.node);
    console.log(type, chapter, node);

    // 提取下标
    const index = bibleCNData.findIndex(item => item.abbrev === type);

    if (index == -1) {
        return res.status(400).send({ error: '未找到该书籍的经文' });
    }

    let lection = [];

    if (chapter && node) {
        console.log('用户提供了章和节');
        lection = bibleCNData[index].chapters[chapter - 1][node - 1];
    } else if (chapter) {
        console.log('用户提供了章');
        lection = bibleCNData[index].chapters[chapter - 1];
    } else {
        console.log('用户未提供参数');
        lection = bibleCNData[index].chapters
    }

    if (!lection) {
        return res.status(400).send({ error: '超出该经文章节的范围' });
    }

    // 返回数据
    res.send({ message: '获取经文成功', data: lection });
})


module.exports = router;
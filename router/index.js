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
    // 获取用户 ip 地址，用于记录
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(type, chapter, node, '用户ip:' + ip);

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


router.get('/chapter', function (req, res) {
    // 圣经章节数据
    const chapterData = [
        { shortName: 'gn', lection: '创世记', chapter: 50 },
        { shortName: 'ex', lection: '出埃及记', chapter: 40 },
        { shortName: 'lv', lection: '利未记', chapter: 27 },
        { shortName: 'nm', lection: '民数记', chapter: 36 },
        { shortName: 'dt', lection: '申命记', chapter: 34 },
        { shortName: 'js', lection: '约书亚记', chapter: 24 },
        { shortName: 'jud', lection: '士师记', chapter: 21 },
        { shortName: 'rt', lection: '路得记', chapter: 4 },
        { shortName: '1sm', lection: '撒母耳记上', chapter: 31 },
        { shortName: '2sm', lection: '撒母耳记下', chapter: 24 },
        { shortName: '1kgs', lection: '列王纪上', chapter: 22 },
        { shortName: '2kgs', lection: '列王纪下', chapter: 25 },
        { shortName: '1ch', lection: '历代志上', chapter: 29 },
        { shortName: '2ch', lection: '历代志下', chapter: 36 },
        { shortName: 'ezr', lection: '以斯拉记', chapter: 10 },
        { shortName: 'ne', lection: '尼西米记', chapter: 13 },
        { shortName: 'et', lection: '以斯帖记', chapter: 10 },
        { shortName: 'job', lection: '约伯记', chapter: 42 },
        { shortName: 'ps', lection: '诗篇', chapter: 150 },
        { shortName: 'prv', lection: '箴言', chapter: 31 },
        { shortName: 'ec', lection: '传道书', chapter: 12 },
        { shortName: 'so', lection: '雅歌', chapter: 8 },
        { shortName: 'is', lection: '以赛亚书', chapter: 66 },
        { shortName: 'jr', lection: '耶利米书', chapter: 52 },
        { shortName: 'lm', lection: '耶利米哀歌', chapter: 5 },
        { shortName: 'ez', lection: '以西结书', chapter: 48 },
        { shortName: 'dn', lection: '但以理书', chapter: 12 },
        { shortName: 'ho', lection: '何西阿书', chapter: 14 },
        { shortName: 'jl', lection: '约珥书', chapter: 3 },
        { shortName: 'am', lection: '阿摩司书', chapter: 9 },
        { shortName: 'ob', lection: '俄巴底亚书', chapter: 1 },
        { shortName: 'jn', lection: '约拿书', chapter: 4 },
        { shortName: 'mi', lection: '弥迦书', chapter: 7 },
        { shortName: 'na', lection: '那鸿书', chapter: 3 },
        { shortName: 'hk', lection: '哈巴谷书', chapter: 3 },
        { shortName: 'zp', lection: '西番雅书', chapter: 3 },
        { shortName: 'hg', lection: '哈该书', chapter: 2 },
        { shortName: 'zc', lection: '撒迦利亚书', chapter: 14 },
        { shortName: 'ml', lection: '玛拉基书', chapter: 4 },
        { shortName: 'mt', lection: '马太福音', chapter: 28 },
        { shortName: 'mk', lection: '马可福音', chapter: 16 },
        { shortName: 'lk', lection: '路加福音', chapter: 24 },
        { shortName: 'jo', lection: '约翰福音', chapter: 21 },
        { shortName: 'act', lection: '使徒行传', chapter: 28 },
        { shortName: 'rm', lection: '罗马书', chapter: 16 },
        { shortName: '1co', lection: '哥林多前书', chapter: 16 },
        { shortName: '2co', lection: '哥林多后书', chapter: 13 },
        { shortName: 'gl', lection: '加拉太书', chapter: 6 },
        { shortName: 'eph', lection: '以弗所书', chapter: 6 },
        { shortName: 'ph', lection: '腓利比书', chapter: 4 },
        { shortName: 'cl', lection: '歌罗西书', chapter: 4 },
        { shortName: '1ts', lection: '帖撒罗尼迦前书', chapter: 5 },
        { shortName: '2ts', lection: '帖撒罗尼迦后书', chapter: 3 },
        { shortName: '1tm', lection: '提摩太前书', chapter: 6 },
        { shortName: '2tm', lection: '提摩太后书', chapter: 4 },
        { shortName: 'tt', lection: '提多书', chapter: 3 },
        { shortName: 'phm', lection: '腓利门书', chapter: 1 },
        { shortName: 'hb', lection: '希伯来书', chapter: 13 },
        { shortName: 'jm', lection: '雅各书', chapter: 5 },
        { shortName: '1pe', lection: '彼得前书', chapter: 5 },
        { shortName: '2pe', lection: '彼得后书', chapter: 3 },
        { shortName: '1jo', lection: '约翰一书', chapter: 5 },
        { shortName: '2jo', lection: '约翰二书', chapter: 1 },
        { shortName: '3jo', lection: '约翰三书', chapter: 1 },
        { shortName: 'jd', lection: '犹大书', chapter: 1 },
        { shortName: 're', lection: '启示录', chapter: 22 }
    ]
    const shortName = req.query.shortName || false;
    const lection = req.query.lection || false;
    if (shortName) {
        const index = chapterData.findIndex(item => item.shortName == shortName);
        if (index == -1) {
            res.status(400).send({ error: '未找到对应数据' })
        }
        res.send({
            status: 200,
            data: chapterData[index]
        })
    } else if (lection) {
        const index = chapterData.findIndex(item => item.lection == lection);
        if (index == -1) {
            res.status(400).send({ error: '超出或未找到对应章节' })
        }
        res.send({
            status: 200,
            data: chapterData[index]
        })
    } else {
        res.send({
            status: 200,
            data: chapterData
        })
    }

})

// 查询指定内容
router.get('/search', function (req, res) {

    // 获取请求参数
    const keyword = req.query.keyword && req.query.keyword.trim();
    const scope = req.query.scope && req.query.scope.trim();

    // 如果必填项为 空
    if (!keyword) return res.status(400).send({ error: '请提供关键字' });

    // 如果用户未设置范围
    if (scope) {
        // 获取指定书卷下标
        const index = bibleCNData.findIndex(item => item.abbrev == scope);
        // 若不存在 返回报错
        if (index == -1) return res.status(400).send({ error: '未查到相关查询的圣经缩写' });

        // 获取指定书卷内容
        const bibleData_empty = bibleCNData[index].chapters;
        // 去除空格 提高匹配成功率
        const bibleData = bibleData_empty.map(node => node.map(str => str.replace(/\s/g, "")));

        // 遍历每一章
        const filterData = bibleData.map((item, index) => {

            // 存放每次匹配到的小节的下标数组
            const uindex = [];

            // 遍历每一节
            let data = item.filter((item, index) => {

                // 判断文本是否存在关键字
                const type = item.indexOf(keyword);

                if (type !== -1) {
                    uindex.push(index + 1);
                    return true
                } else {
                    return false
                }
            })

            // 将小节置入到匹配项中
            data = data.map((item, index) => {
                return {
                    data: item,
                    node: uindex[index]
                }
            })

            // 如果该章存在匹配项
            if (data.length) {
                return {
                    chapter: index + 1,
                    data
                }
            } else {
                return false
            }
        }).filter(item => item.data);

        res.send({ status: 200, data: { lection: scope, data: filterData } })

    } else {
        // 去除空格 提高匹配成功率
        const bibleData = bibleCNData.map(lection => lection.chapters.map(node => node.map(str => str.replace(/\s/g, ""))));

        // 遍历经文

        const filterData = bibleData.map((lection, index) => {

            // 遍历章
            const lectionData = lection.map((chapter, index2) => {

                const uindex = [];

                // 遍历节
                let chapterData = chapter.filter((node, index3) => {

                    // 判断文本是否存在关键字
                    const type = node.indexOf(keyword);

                    if (type !== -1) {
                        uindex.push(index3);
                        return true
                    } else {
                        return false
                    }
                })

                chapterData = chapterData.map((item, index) => {
                    return {
                        node: uindex[index] + 1,
                        data: item
                    }
                })


                if (chapterData.length) {
                    return {
                        chapter: index2 + 1,
                        data: chapterData
                    }
                } else {
                    return false
                }
            }).filter(item => item.data)

            if (lectionData.length) {
                return {
                    lection: bibleCNData[index].abbrev,
                    data: lectionData
                }
            } else {
                return false
            }

        }).filter(item => item.data)
        res.send({ status: 200, data: filterData })
    }

})

module.exports = router;
# bibleApi 接口文档

## 接口地址

```
http://127.0.0.1:85
```
## 查询圣经内容
### 参数接收

```
/bible
```

> GET 请求

| 参数名    | 值              | 说明             | 必填 |
| --------- | --------------- | ---------------- | ---- |
| shortName | string          | 圣经 书卷名 缩写 | 是   |
| chapter   | string / number | 对应该内容的 章  | 否   |
| node      | string / number | 对应该内容的 节  | 否   |



### 参数可选值

以下是 ``shortName `` 圣经经文简写名

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



### 返回案例

若传入章节 ``chapter``  、``node``，则返回章节对应内容。若无 ``chapter``  、``node`` 则返回该 书卷 全文

```
/bible?shortName=hb&chapter=1
```

结果

```json
{
  "message": "获取经文成功",
  "data": [
    "神既在古时藉著众先知多次多方的晓谕列祖，",
    "就在这末世藉著他儿子晓谕我们；又早已立他为承受万有的，也曾藉著他创造诸世界。",
    "他是神荣耀所发的光辉，是神本体的真像，常用他权能的命令托住万有。他洗淨了人的罪，就坐在高天至大者的右边。",
    "他所承受的名，既比天使的名更尊贵，就远超过天使。",
    "所有的天使，神从来对那一个说，你是我的儿子，我今日生你？又指著那一个说：我要作他的父，他要作我的子？",
    "再者，神使长子到世上来的时候（或作：神再使长子到世上来的时候），就说：神的使者都要拜他。",
    "论到使者，又说：神以风为使者，以火燄为僕役；",
    "论到子却说：神阿，你的宝座是永永远远的；你的国权是正直的。",
    "你喜爱公义，恨恶罪恶；所以神，就是你的神，用喜乐油膏你，胜过膏你的同伴；",
    "又说：主阿，你起初立了地的根基；天也是你手所造的。",
    "天地都要灭没，你却要长存。天地都要像衣服渐渐旧了；",
    "你要将天地捲起来，像一件外衣，天地就都改变了。惟有你永不改变；你的年数没有穷尽。",
    "所有的天使，神从来对那一个说：你坐在我的右边，等我使你仇敌作你的脚凳？",
    "天使岂不都是服役的灵、奉差遣为那将要承受救恩的人效力么？"
  ]
}
```

```
/bible?shortName=hb&chapter=1&node=1
```

结果

```json
{
  "message": "获取经文成功",
  "data": "神既在古时藉著众先知多次多方的晓谕列祖，"
}
```

## 查询圣经总章节

查询圣经总的经文信息列表，可自选指定参数。一般用于遍历铺设 经文导航 或查询 对应经文的缩写 ``shortName`` ，便于填充经文内容 ``/bible`` 接口的查询参数。 

### 参数接收

```
/chapter
```

### 参数可选值

| 参数名    | 值     | 说明             | 必填 |
| --------- | ------ | ---------------- | ---- |
| shortName | string | 圣经 书卷名 缩写 | 否   |
| lection   | string | 圣经 完整书卷名  | 否   |

### 案例演示

不传参数，返回所有内容

```
/chapter
```

返回效果

```json
{
    "status": 200,
    "data": [
        {
            "shortName": "gn",
            "lection": "创世纪",
            "chapter": 50,
            "type": "old"
        },
        {
            "shortName": "ex",
            "lection": "出埃及记",
            "chapter": 40,
            "type": "old"
        },
        {
            "shortName": "lv",
            "lection": "利未记",
            "chapter": 27,
            "type": "old"
        },
        {
            "shortName": "nm",
            "lection": "民数记",
            "chapter": 36,
            "type": "old"
        },
        ...
    ]
}
```

发送 ``shortName`` 或者 ``lection`` ，查询圣经指定内容的查询信息。

```
/chapter?shortName=gn
```

返回效果

```json
{
    "status": 200,
    "data": {
        "shortName": "gn",
        "lection": "创世记",
        "chapter": 50,
        "type": "old"
    }
}
```

发送 ``lection`` ，使用完整名查询指定请求信息

```
/chapter?lection=箴言
```

返回效果

```json
{
    "status": 200,
    "data": {
        "shortName": "prv",
        "lection": "箴言",
        "chapter": 31,
        "type": "old"
    }
}
```

## 搜索关键词

通过指定书卷搜索 或者 全书内容搜索，获取指定经文的所有包含位置

### 参数接收

```
/search
```

### 参数可选值

| 参数名  | 值     | 说明                 | 必填 |
| ------- | ------ | -------------------- | ---- |
| keyword | String | 需要搜索匹配的关键字 | 是   |
| scope   | String | 匹配的书卷           | 否   |

### 案例演示

```
/search?keyword=神就是爱
```

当不填 ``scope`` 对应的圣经对应的书卷简写 时，则为全书匹配。对所有书卷的文本进行包含匹配

```json
{
    "status": 200,
    "data": [
        {
            "lection": "1jo",
            "data": [
                {
                    "chapter": 4,
                    "data": [
                        {
                            "node": 8,
                            "data": "没有爱心的，就不认识神，因为神就是爱。"
                        },
                        {
                            "node": 16,
                            "data": "神爱我们的心，我们也知道也信。神就是爱；住在爱里面的，就是住在神里面，神也住在他里面。"
                        }
                    ]
                }
            ]
        }
    ]
}
```

> 该返回的内容为树结构，方便前端分层；在相同书卷下的内容会合并，且在相同章节下的内容也会合并

```
{['chapter':'gn'...],['chapter':'gn'...]} => {'chapter':'gn',[...]}
```

> 如：某段关键字在同一章节出现两次，则它的内容和对应小节信息对象会在该章节的 ``data`` 节点中出现两次



若携带 ``scope`` 参数，填入正确的书卷简写，即可按指定范围搜索

```
/search?keyword=一粒芥菜&scope=mk
```

返回效果

```json
{
    "status": 200,
    "data": {
        "lection": "mk",
        "data": [
            {
                "chapter": 4,
                "data": [
                    {
                        "data": "好像一粒芥菜种，种在地里的时候，虽比地上的百种都小，",
                        "node": 31
                    }
                ]
            }
        ]
    }
}
```


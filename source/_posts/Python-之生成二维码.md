---
layout: post
title: Python 之生成二维码
abbrlink: 29287
date: 2022-08-12 00:42:10
tags: qrcode,
categories: python
summary: 一个比较简单又实用的二维码生成程序
---

```python
import qrcode
import re
from os import startfile

input_data = input("请输入完整url:")
pattern = r'^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.|cn\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*([\?&]\w+=\w*)*$'
result = re.search(pattern, input_data)
if result.group(3) == None:
    print('请正确输入域名,比如: www.baidu.com')
    # print('非法,请添加', result.group(3))
    exit()

qr = qrcode.QRCode(version=1, box_size=20, border=1)
# add_date :  pass the input text
qr.add_data('http://' + input_data)
# converting into image
qr.make(fit=True)
# specify the foreground and background color for the img
img = qr.make_image(fill='black', back_color='white')
# store the image
img.save('_img.png')
startfile('_img.png')
```

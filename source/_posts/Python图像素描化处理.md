---
layout: post
title: Python图像素描化处理
abbrlink: 49446
date: 2023-05-09 20:25:27
tags:  素描化
categories: Python
summary: Python图像素描化处理
---
利用Numpy和pillow库对图像进行素描化,原文在知乎上看到的,进行部分代码优化。
效果如下：
原图：
<img src='https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20230205131437.jpg'>
转换后：
<img src="https://babayetu-1309205424.cos.ap-shanghai.myqcloud.com/blogimgs/HD_2333.jpg">
代码如下：

```python
from PIL import Image
import numpy as np
import os
import time


def image(sta, end, depths=10):
    a = np.asarray(Image.open(sta).convert('L')).astype('float')
    depth = depths  # (0-100)
    grad = np.gradient(a)  # 取图像灰度的梯度值
    grad_x, grad_y = grad  # 分别取横纵图像梯度值
    grad_x = grad_x * depth / 100.
    grad_y = grad_y * depth / 100.
    A = np.sqrt(grad_x ** 2 + grad_y ** 2 + 1.)
    uni_x = grad_x / A
    uni_y = grad_y / A
    uni_z = 1. / A
    vec_el = np.pi / 2.2  # 光源的俯视角度，弧度值
    vec_az = np.pi / 4.  # 光源的方位角度，弧度值
    dx = np.cos(vec_el) * np.cos(vec_az)  # 光源对x 轴的影响
    dy = np.cos(vec_el) * np.sin(vec_az)  # 光源对y 轴的影响
    dz = np.sin(vec_el)  # 光源对z 轴的影响
    b = 255 * (dx * uni_x + dy * uni_y + dz * uni_z)  # 光源归一化
    b = b.clip(0, 255)
    im = Image.fromarray(b.astype('uint8'))  # 重构图像
    im.save(end)
    return im


def main():
    start_time = time.perf_counter()
    print('作者 liuchao    2017/4/28', '\n')
    print('请确定输入图片在输入----图片文件夹下', '\n')
    xs = int(input("请输入0-100的数值，数值越大，颜色越深。--------标准参数是 10:        "))
    print('传入的参数为：  ' + str(xs), '\n')
    yes = input("程序已经准备好  确认请输入 yes:     ")
    if yes != 'yes':
        return
    print(' 收到命令  '+ yes +  ',    程序开动:', '\n')
    startss = os.listdir("./input")
    for starts in startss:
        start = ''.join(starts)
        print('正在转化：  ' + start)
        sta = './' + 'input/' + start
        end = './' + 'output/' + 'New_' + start
        image(sta=sta, end=end, depths=xs)
        print('运行时间: %f 秒' % (time.perf_counter() - start_time))

if __name__ == '__main__':
    main()

```


[转载自](https://zhuanlan.zhihu.com/p/26648029)




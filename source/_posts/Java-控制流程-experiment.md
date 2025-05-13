---
layout: post
title: Java 控制流程 experiment
tags: experiment
categories: Java
summary: 本篇为控制流程实验，主要实验内容：通过输入多个成绩，统计平均值，最高分，最低分，各级别人数及所占百分比。
abbrlink: 9904
date: 2022-10-17 00:15:34
---

长话短说，直接上代码。
```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入总人数：");
        int n = scanner.nextInt();
        System.out.println("请连续输入成绩：");
        int[] array = new int[n];
        int sum = 0; // 总成绩
        int count = 0;  // 不及格人数

        for (int i = 0; i < n; i++) {
            array[i] = scanner.nextInt();
            sum += array[i];
        }
        for (int i = 0; i < n; i++) {
            if (array[i] < 60)
                count++;
        }

        System.out.printf("平均成绩: %d\n", sum / n);
        System.out.println("不及格人数：" + count);
        System.out.println("总人数：" + n);
        bubblesort(array);
        isPass(array);
    }

    public static void bubblesort(int[] array) {
        //外层循环控制多少轮
        for (int i = 1; i < array.length; i++) {
            //内层循环控制每轮的次数
            for (int j = 0; j <= array.length - 1 - i; j++) {
                if (array[j] > array[j + 1]) {
                    int temp;
                    temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        System.out.println("成绩单:"+Arrays.toString(array));
        System.out.println("成绩最低分为：" + array[0]);
        System.out.println("成绩最高分为：" + array[array.length - 1]);
    }

    public static void isPass(int[] array) {
        List failed = new ArrayList();
        List good = new ArrayList();
        List excellent = new ArrayList();
        int FailedNum = 0;
        int GoodNum = 0;
        int ExcellentNum = 0;
        double FailePercent = 0;
        double GoodPercent = 0;
        double ExcellentPercent = 0;
        for (int i : array) {
            if (i < 60) {
                failed.add(i);
                FailedNum++;

            } else if (i >= 60 && i < 80) {
                good.add(i);
                GoodNum++;

            } else if (i >= 90) {
                excellent.add(i);
                ExcellentNum++;
            }
        }
        FailePercent = (double) FailedNum / array.length;
        GoodPercent = (double) GoodNum / array.length;
        ExcellentPercent = (double) ExcellentNum / array.length;
        System.out.println("成绩未通过人数：" + FailedNum + ",所占总人数百分比为：" + FailePercent * 100 + "%");
        System.out.println("成绩良好人数：" + GoodNum + ",所占总人数百分比为：" + GoodPercent * 100 + "%");
        System.out.println("成绩优秀人数：" + ExcellentNum + ",所占总人数百分比为：" + ExcellentPercent * 100 + "%");
    }
}
```

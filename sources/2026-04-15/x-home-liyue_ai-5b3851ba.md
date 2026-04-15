---
title: "Windows的WSL子系统迁移成功，
迁移后Hermes Agent不受任何影响，正常运行，
帮我的C盘一下子腾了15G空间，
感谢大佬@kylegeeks提供的方法。

迁移方法很简单：
1/ 获"
source: "X home @liyue_ai"
url: "https://x.com/liyue_ai/status/2044047643098398799"
date: "Tue Apr 14 13:38:29 +0000 2026"
likes: 65
reposts: 12
replies: 6
---

Windows的WSL子系统迁移成功，
迁移后Hermes Agent不受任何影响，正常运行，
帮我的C盘一下子腾了15G空间，
感谢大佬@kylegeeks提供的方法。

迁移方法很简单：
1/ 获取WSL子操作系统名称NAME
wsl -l -v

2/ 关闭WSL子系统
其实这步只要你把所有运行的终端窗口关了它也就停了，不过为了保险，还是执行一下。
wsl --shutdown

3/ 将WSL子系统导出到D盘，记得先建一个文件夹单独存放，这里的Ubuntu就是第一步的NAME，如果跟我的不同，你就用第一步显示的NAME即可。
wsl --export Ubuntu D:\WSL\wsl-export.tar

4/ 注销原来的WSL操作系统
wsl --unregister Ubuntu

5/ 导入到目标位置
wsl --import Ubuntu D:\WSL D:\WSL\wsl-export.tar

6/ 启动WSL
wsl

7/ 启动Hermes网关
hermes gateway

正常的话是一路顺利执行，异常的话还没遇到，有遇到异常的欢迎留言。

# Video Assets

视频渲染模板使用的字体与背景音乐。

## 字体

### Source Han Sans CN（思源黑体 简体中文子集）

来源：<https://github.com/adobe-fonts/source-han-sans/tree/release/SubsetOTF/CN>
许可：SIL Open Font License 1.1（可商用、可修改、需保留 LICENSE）
体积：Regular 8MB + Bold 8MB = 16MB

通过 jsDelivr 镜像下载：

```
https://cdn.jsdelivr.net/gh/adobe-fonts/source-han-sans@release/SubsetOTF/CN/SourceHanSansCN-Regular.otf
https://cdn.jsdelivr.net/gh/adobe-fonts/source-han-sans@release/SubsetOTF/CN/SourceHanSansCN-Bold.otf
```

## BGM

### 当前文件（PoC 占位）

| 文件 | 类型 | 体积 | 来源 |
|------|------|------|------|
| lofi-calm.mp3 | 占位合成（A2-C#3-E3 和弦持续音 + 低通） | ~700KB | ffmpeg lavfi 生成 |
| tech-minimal.mp3 | 占位合成（E3-A3-C4 和弦） | ~700KB | ffmpeg lavfi 生成 |
| news-energetic.mp3 | 占位合成（C3-E3-G3 大调和弦） | ~700KB | ffmpeg lavfi 生成 |

**注意**：当前 BGM 为 PoC 阶段的 ffmpeg 合成占位音，听感单调。
正式上线前应替换为以下来源之一的 CC0/无版权音乐：

- <https://freepd.com>（CC0 公共领域）
- <https://www.chosic.com/free-music>（CC0 / CC BY 4.0）
- YouTube Audio Library（需登录下载）

替换时保持文件名不变，覆盖即可。

### 替换 BGM 时的合规要求

- 必须 CC0 或 CC BY 4.0（CC BY 需在 README 声明作者与来源）
- 不可使用任何中国大陆原创版权音乐（抖音/视频号会检测下架）
- 建议 mp3 128kbps，60s 完整曲目，单文件 ≤ 3MB

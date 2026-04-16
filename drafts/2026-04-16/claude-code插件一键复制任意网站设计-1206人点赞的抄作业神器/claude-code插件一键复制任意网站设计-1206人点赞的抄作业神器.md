# Claude Code插件一键复制任意网站设计，1206人点赞的"抄作业"神器

昨天刷推的时候看到一条1206赞的帖子，一个开发者给 Claude Code 做了个插件，能扫描任意网站，把配色、字体、间距、布局全部提取出来，直接在本地重建一套设计系统。

我当时愣了两秒。这不就是每个不懂设计的程序员做梦都想要的东西吗？

说真的，我自己做side project最头疼的就是设计。功能写完了，页面丑得不敢给人看。去Dribbble找灵感，看到好看的配色想抄，结果用取色器一个一个吸，间距全靠目测，字体还认不全。折腾半天出来的东西，还是一眼"程序员审美"。

这个叫 designlang 的工具，直接把这个痛点干掉了。

## 一行命令，扒光一个网站的设计

用法简单到离谱。终端里敲一行：

```
npx designlang https://vercel.com --full
```

它会启动一个无头浏览器（Playwright），爬进目标网站，扫描5000多个DOM元素的计算样式，然后输出8个文件。

8个。

包括 Tailwind 配置、CSS变量文件、Figma变量JSON、React主题对象、shadcn/ui主题，甚至还有一个带色板预览的HTML报告。你拿到手就能直接往项目里丢。

我拿 Vercel 官网试了一下，跑出来27个独立颜色、2套字体、18个间距值、11个阴影值。WCAG无障碍评分94%。这些数据手动整理，少说得花一下午。

## 不只是取色器，它提取的是"建筑图纸"

市面上提取设计的工具不少，但大多数只给你颜色和字体。designlang 的作者自己说了一句很到位的话，"别的工具给你油漆，我给你建筑图纸"。

它多做了几件别人不做的事。

布局架构。它会提取栅格模式、Flex布局方向、容器宽度、gap值、对齐策略。不是告诉你"这个蓝色是#0070F3"，而是告诉你"这个页面用了55个grid布局和492个flex容器，主容器最大宽度1280px"。

还有响应式断点。它会在375px、768px、1280px、1920px四个视口下分别爬一遍，映射出整个自适应行为。你拿到的不是一张静态截图，是一套完整的响应式规范。

更狠的是交互状态。hover、focus、active这些状态的样式变化，它会自动触发并记录差异值。

坦率讲，做到这三点的工具，我之前没见过。

## 在Claude Code里怎么用

作为 Claude Code 插件安装也是一行：

```
npx skills add Manavarya09/design-extract
```

装完之后在 Claude Code 里直接用 /extract-design 加URL就行。

但我觉得更狠的是 clone 命令。跑 `designlang clone https://xxx.com`，它会直接生成一个 Next.js 项目，把目标网站的配色、字体、间距、组件模式全灌进去。你拿到的不是一份设计文档，是一个能跑的项目。

这跟另一个6000多星的 ai-website-cloner-template 思路类似，但那个更重，需要Claude Code调度多个并行agent来重建整个页面。designlang 更轻量，专注在设计系统提取这一层。

怎么选？如果你只想要设计规范来指导自己写代码，用designlang。如果你想直接复制整个页面结构，用 ai-website-cloner-template。

## 我的判断

我认为这类工具会彻底改变独立开发者做前端的方式。

以前的路径是，要么自己学设计（学习曲线陡，大多数人放弃），要么买模板（千篇一律），要么花钱请设计师（side project阶段舍不得）。现在多了第四条路，看到喜欢的网站，一行命令把设计系统拿过来，在这个基础上改。

有人可能会说这不道德。我的看法是，设计系统本身就是公开的，你打开任何网站的DevTools都能看到所有CSS。designlang只是把手动做的事自动化了。当然，直接像素级复制别人的页面去商用，那是另一回事。

可能有些想法还不成熟，但我觉得对于90%的独立开发者来说，"好设计"的最大障碍不是审美，而是执行。你能看出Vercel的网站好看，你说不清楚它为什么好看。designlang把这个"为什么"变成了可复用的代码。

这才是真正的降维打击。

## 相关链接

- designlang GitHub仓库 https://github.com/Manavarya09/design-extract
- ai-website-cloner-template https://github.com/JCodesMore/ai-website-cloner-template
- Claude Code 插件市场 https://claude.com/plugins

---
相关实体:: [[claude-code|Claude Code]]
相关主题:: [[ai-coding-tools|AI编程工具]]

<!-- REACH: 8/10 | 品牌✓ 利益点✓ 可操作✓ -->

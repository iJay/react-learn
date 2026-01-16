## 网页中的各种距离
根据项目中的几个demo，看一得出结论：
1. 鼠标事件触发时，因为涉及到鼠标触发点，可以通过pageY,clientY，screenY，offsetY来计算位置;也可以通过getBoundingClientRect和scrollTop、offsetTop、clientTop，window.scrollY结合来算。
2. 比如页面是否滚动到底部，就可以通过 document.documentElement.scrollTop + window.innerHeihgt 和 document.documentElement.scrollHeight 对比。这里涉及到的几个概念：根元素documentElement的scrollTop就是window的scrollY；window.innerHeight和window.innerWidth就是可视区域的宽高；scrollHeight，这是元素的包含滚动区域的高度。
3. clientHeight 是内容区域的高度，不包括 border；offsetHeight 包括 border；scrollHeight 是滚动区域的总高度，不包括 border。
4. getBoundingClientRect 拿到的包围盒的高度，而 offsetHeight 是元素本来的高度。这一点可以在元素旋转之后得到印证

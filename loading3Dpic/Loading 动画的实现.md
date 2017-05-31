## Loading 动画的实现

该demo实现了如下图所示的Loading动画，使用CSS3实现。

![loading动画](/loading.gif)

### Loading效果实现思路

该loading效果包含两个部分，一是外层3/4圈的转动，二是内部扇形的转动。

#### 外层动画

外层动画比较简单，直接将一个方向的 `border-color` 设为 `transparent` 就行啦，之后再使用 CSS3的 `animation` 和 `transform: rotate()` 配合就可以完成效果。

#### 内层动画

内层动画需要使用CSS3完成扇形的绘制。

**1. 扇形的绘制**

使用CSS绘制扇形，相比于绘制三角形和圆形等比较费劲。大概实现如下。

```html
<style>
.bg {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: wheat;
    position: relative;
}
.sector1,
.sector2 {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    clip: rect(0px, 50px, 100px, 0px);
}
.sector1 {
    background: grey;
    transform: rotate(30deg);
}
.sector2 {
    background: royalblue;
    transform: rotate(0deg);
}
</style>
<div class="bg">
    <div class="sector1"></div>
    <div class="sector2"></div>
</div>
```

效果如图，比较辣眼睛。。。。。

![效果一](/demo1.png)

下面仔细说明一下，为啥上面的几行CSS代码就能搞出这个东西嘞，一句一句来看。

首先对 `bg` 的样式定义使得浏览器中渲染出来了一个麦芽色的圆形。

![效果二](/demo2.png)

之后对 `sector1` 和 `sector2` 的样式定义，使得浏览器中变成了这个样子。。

![效果三](/demo3.png)

这里需要仔细说明一下，css3 中的`clip` 属性，该属性会裁剪 **绝对定位** 元素，该属性规定元素的可显示区域，这样元素的部分内容就会被裁剪掉。`clip` 属性值，`rect(top, right, bottom, left)` 指定一个剪裁矩形，会把不属于该矩形内的元素部分咔嚓掉。说到这里，可以知道上图显示的灰色区域其实是 `sector1` 和 `sector2` 的重叠部分（此时的 `sector1` 和 `sector2` 完全重叠，都是一个灰色的左半圆形状）。

再之后，分别给 `sector1` 和 `sector2` 添加不同的背景色，以及旋转角度，就可以将二者在视觉上分离开来，并且可以显示出扇形的效果。



**2. 动画效果实现**

总算可以画出扇形了，下面来看看怎么做出这个Loading动画（我觉得我的实现方式并不很好，比较愚蠢。。。）

```Html
<!-- 外圈动画 -->
<div class="loading-outer"></div>
<!-- 内圈动画的背景圆，两个半圆形分别使用了 before 伪元素和 after 伪元素，没有新增加无意义的 html 标签 -->
<div class="sector"></div>
```

为了解释方便，将颜色表述为暗色和亮色，动画的关键帧如下图所示。

![keyframe](/keyframe.png)

按照关键帧，去分别设置 `sector` ，`secter::before` 和 `sector::after` 的 `animation` 中应用到的 `@keyframes`  就可以啦。
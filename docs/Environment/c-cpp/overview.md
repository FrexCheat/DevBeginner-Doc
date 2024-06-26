# 概述

&emsp;&emsp;你说的对，但 C 是丹尼斯·里奇（Dennis Ritchie）于1972年在贝尔实验室创造出的一门面向过程的高级程序设计语言，而 C++ 则是本贾尼·斯特劳斯特卢普（Bjarne Stroustrup）于1979[^1]年在C的基础上引入了“类”的概念而创造出的一门面向过程的语言。

&emsp;&emsp; C++ 是 C 的“超集”，也就是说所有的 C 程序都是合法[^2]的 C++ 程序。因为这个原因[^3]，很多人（或者说很多场合）都将 C 和 C++ 放在一起讲，或者用“C/C++”这样的表述方式。这并没有什么不妥，只是要知道它们两个依旧是有区别的，是两门不同的语言。

&emsp;&emsp;基本上可以确定的是，如果一个IDE支持 C 语言，那么它大概率会支持 C++ [^4]，反之亦然。这两种语言的配置方式相差无几，但值得注意的是， C 语言和 C++ 语言使用的编译器往往不同。我们常用`gcc`（GNU C Compiler）[^5]来编译 C，而用`g++`（GNU C++ Compiler）来编译 C++[^6]。

&emsp;&emsp;仍然感到迷茫？没关系，我们会在下面的章节更加详细地介绍各种适合C/C++语言的IDE以及配置方法。

[^1]: [百度百科](https://baike.baidu.com/item/C++/99272)上的“上线时间”如此。“C++”这一名称是在1983年敲定的。
[^2]: 符合语法。
[^3]: 也就是说还有其他原因。详见[此处](relationship.md)。
[^4]: 需要经过合理的设置。
[^5]: 有人会说 GCC 指的是 GNU Compiler Collection（GNU编译器套装），这种说法也没有问题。最初的 GCC 只支持编译 C 语言，后来的新版本可以编译包括 Fortran、Pascal、Objective-C、Java、Ada、Go 在内的诸多语言。也就是说，`gcc`和`g++`都是 GCC 的一部分。
[^6]: `g++`是基于`gcc`的一部分，它们共享同一个编译器框架和大部分底层代码。可以理解为`g++`是`gcc`的一个特化版本，专门为 C++ 语言做了优化和调整。`gcc`默认处理 C 语言文件，而`g++`默认处理 C++ 语言文件；使用`g++`时，编译器会自动链接 C++ 标准库，而使用`gcc`编译 C++ 代码时，需要手动链接 C++ 标准库。同时，`g++`对 C++ 代码的处理更加准确，尤其是在处理模板、命名空间和其他 C++ 特有特性时。

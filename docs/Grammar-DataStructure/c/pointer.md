::: warning :construction:WARNING
本条目仍在积极施工中，可能存在遗漏或不完善的地方
:::

# 指针

指针是 C 语言中一个非常强大且重要的概念。指针提供了直接访问内存地址的能力，可以用来操作数组、动态内存分配、函数参数传递等。

## (一)&nbsp;指针是什么？

指针是一个变量，与之前的变量不同，它保存了内存地址，而不是变量的值。指针变量的大小和普通变量一样，指针变量的值也是由操作系统分配的。指针变量的值是内存地址，而内存地址是 $8$ 字节。

```c
int i = 7;
int *p = &i;//&是取地址运算符，用来获取指定变量的地址(即找到这个变量的值存在哪)
//也可以写成int* p = &i;星号靠前靠后无所谓
```

## (二)&nbsp;指针与函数

指针与函数之间是紧密相连的，指针可以作为函数的参数传递，函数也可以返回指针。

```c
#include<stdio.h>
void arrayMax(int *b);
void myfunction1(int *p){
    printf("%d\n",*p);//*是解引用运算符，用它来获取指针p所指向的内存地址上的值
    //在这个函数中可以通过指针来访问那个地址，从而获取那个地址上的值，或者修改那个地址上的值
    *p = 10;//通过指针p修改它所指向的内存地址上的值
    printf("%d\n",*p);
    return;
}
int main(){
    int a = 9;
    myfunction1(&a);//传递的是a的地址
    printf("%d\n",a);//a的值被修改了

    int b[] = {1,2,3,4,5,6,7,8,9,10};
    arrayMax(b);
    return 0;
}
//数组名在表达式中会被转换为指向数组首元素的指针。比如我们刚刚定义的那个数组b，其实b就是一个指针，它指向数组的第一个元素
//*b和b[0]是等价的

//int *p = b;(创建一个指向数组首元素的指针)。它与int *p = &b[0]是等价的

//数组作为函数参数时会退化为指针。我们只是传入了数组首元素的地址，
//下面这个函数的参数表中的int *b可以替换为int b[]
void arrayMax(int *b){
    int max = b[0];
    for(int i = 1; i < 10; i++){
        if(b[i] > max){
            max = b[i];
        }
    }
    printf("数组中最大的数是%d\n",max);
    return;
}
```

## (三)&nbsp;指针的赋值

我们前面提过，数组变量不能互相赋值，像下面这样的写法是不对的：

```c
int a[] = {1,2,3,4,5,6,7,8,9,10};
int b[] = a; // [!code error]
```
int b[] = a;是错误的写法

但是指向相同类型变量的指针变量是可以互相赋值的，如下面的代码：

```c
#include <stdio.h>
int main() {
    int num1 = 10;
    int *ptr1 = &num1;  // 指针ptr1指向num1的内存地址

    int *ptr2;
    ptr2 = ptr1;  // 将ptr1的值赋给ptr2

    printf("num1 = %d\n", num1);
    printf("ptr1 = %p\n", ptr1);// 输出ptr1存储的那个的地址
    printf("ptr2 = %p\n", ptr2);// 输出ptr2存储的那个的地址
    printf("*ptr1 = %d\n", *ptr1);// 输出ptr1指向的地址存储的数值
    printf("*ptr2 = %d\n", *ptr2);// 输出ptr2指向的地址存储的数值
    return 0;
}
```

:::warning
指向不同类型变量的指针不能互相赋值，如下面的代码：

```c
#include<stdio.h>
int main(){
    int i = 10;
    int *p = &i;
    char *q;
    //下面这样赋值时错误的
    p = q;// [!code error]
    return 0;
}

```
:::

## (四)&nbsp;指向指针的指针

指针存储了它指向的变量的地址，指针的指针存储了它指向的指针的地址。

```c
#include <stdio.h>
int main() {
    int num1 = 10;
    int *ptr1 = &num1;  // 指针ptr1指向num1的内存地址

    int **ptr2 = &ptr1;  // 将ptr1的地址赋给ptr2
    /*注意，这个地址指的不是ptr1指向的地址，
      而是ptr1变量本身在内存中的存储地址
      可以理解成ptr2指向ptr1，ptr1指向num1
    */
    printf("num1 = %d\n", num1);
    printf("ptr1 = %p\n", ptr1);// 输出ptr1存储的那个的地址
    printf("ptr2 = %p\n", ptr2);// 输出ptr2存储的那个的地址
    printf("*ptr1 = %d\n", *ptr1);// 输出ptr1指向的地址存储的数值
    printf("**ptr2 = %d\n", **ptr2);// 输出ptr2指向的地址存储的数值
    return 0;
}
```

## (五)&nbsp;const 修饰的指针

在C语言中，`const` 是一个关键字，用于声明常量。常量是在程序运行期间不可修改的值。

```c
#include <stdio.h>
int main() {
    const int a = 99;//声明一个常量a，它的值为99，a的值不能被更改
    int i = 10;
    int * const q = &i;
    //指针q只能指向i，不能再指向其他变量
    const int * p = &i;
    //指针p只能读取i的值，不能通过指针p修改i的值，但是可以直接修改i的值
    *q = 20;
    //q指向的i的值被修改为20
    return 0;
}
```

## (六)&nbsp;指针参与的运算

```c
#include<stdio.h>
int main(){
    char ab[] = {0,1,9,3,7};
    char *p = ab;
    printf("%p %p\n",p,p+1);/*我们可以发现输出的两个十六进制数值相差为1
    这是因为对指针做加一操作时它会移动到下一个存储单元，
    每个存储单元的大小取决于它们的数据类型(结构体这个特例我们后面会说)
    p指向的是一个字符数组，每个字符的大小为1字节，所以指针p加1就指向下一个字符
    如果数组类型换成int的话就是后移4个字节，因为int的大小为4字节
    */

    //循环输出数组中每个元素
    //实质是访问p指向的元素、p加1后指向的元素、p加2后指向的元素…………
    for(int i = 0; i < 5; i++){
        printf("%d ",*(p+i));
        /*这里*(p+i)换成*p++效果是一样的，
        它的意思是先访问p指向的变量的值，再让p向后移动一个存储单元
        实在记不住优先级可以试试用括号，保证程序按照你想要的方式运行，
        比如写成(*p)++，保证解引用运算先进行
        */
    }
    return 0;
}
```

对指针进行大于、小于、大于等于、小于等于、等于、不等于这些运算符，都是用来比较两个指针变量的地址值(这么比除了看谁存储的位置靠前、谁靠后以外，好像没什么意义)，并不是来比较指针指向的内存地址上的内容谁大谁小。

## (七)&nbsp;*p 与 p 的区分

之前我们定义了一个指针变量：

```c
int *p;
```

你可能对 `*p` 和 `p` 的区别有点迷糊，`*p` 是用来获取指针 `p` 所指向的内存地址上的内容。而 `p` 是一个名为 `p` 的指针变量，它存储的是一个地址。

## (八)&nbsp;指针的类型转换

指针类型转换是C语言中比较常见的操作，但是它并不是一个安全的操作，因为它可能会导致程序崩溃。

比如下面这个代码：

```c
void * p1;//一个不知道指向什么东西的指针
int i = 9;
int *p = &i;
void *q = (void *)p;
```

这个类型转换方式我们一般用不到，后面我们讲C语言的 `qsort()` 函数的时候可能会用到。

## (九)&nbsp;空指针

如果一个指针不指向任何数据，我们就称之为空指针 ，用 `NULL` 表示。例如：

```c
int *p = NULL;
```

注意区分大小写，`null` 没有任何特殊含义，只是一个普通的标识符。`NULL` 是一个宏定义，在 `stdio.h` 被定义为：

```c
#define NULL ((void *)0)
```

宏我们后面会讲，这里只需要知道写了 `#define 宏名 宏定义值` 之后，编译器在编译时会自动把宏名替换成宏定义值。

```c
//比如
#include<stdio.h>
#define int long long
//那么在编译的时候，编译器会把当前文件中所有的int替换成long long
//main函数那边可以用signed代替int(它们两个等价)，不然会报错
signed main(){
    //略
    return 0;
}
```

说完 `NULL` ，我们接着来说空指针：

```c
int *p = NULL;
int *p;
/*这两种声明是不一样的，第一个是个空指针，它不指向任何东西，
而是指向一个空地址，所以它不能被解引用。
而第二个则是指向一个未知地址的指针，
如果试着修改第二个指针指向的内存地址上的内容，
可能会出现程序崩溃的问题。
*/
```

## (十)&nbsp;字符串
相信你已经看完了数组和指针的相关内容，我们来聊聊字符串。<br>
### 1.&nbsp;字符串是什么
字符串是以\0结尾的一串字符。\0标志符是字符串的结束标志，它告诉程序这个字符串结束了，程序在输出一个字符串的时候，看到\0就知道这个字符串到这里就结束了。<br>
作为结束标志，\0并不会被输出到屏幕上，计算字符串长度的函数也不会把它算进去。<br>
字符串在C语言中没有专门的数据类型，而是通过字符数组或字符指针来实现。<br>
### 2.&nbsp;字符数组的声明和定义
字符串实质上是一个字符数组，数组中每个元素都是字符，可以按照数组的方式访问字符串中的字符。<br>
#### (1)&nbsp;声明并初始化字符串
可以在声明时直接把一个字符串常量赋给它，这样编译器会自动在末尾添加空字符。
```c
#include <stdio.h>

int main() {
    // 声明并初始化字符串
    char str1[] = "Hello, World!";
    //str1中实际存储的是Hello, World!\0
    
    printf("%s\n", str1); // 输出字符串

    return 0;
}
```
#### (2)&nbsp;声明未初始化的字符数组
也可以声明一个未初始化的字符数组，然后逐个字符赋值，并手动添加空字符。
```c
#include <stdio.h>

int main() {
    // 声明未初始化的字符数组
    char str2[13];

    // 逐个字符赋值，并手动添加空字符
    str2[0] = 'H';
    str2[1] = 'e';
    str2[2] = 'l';
    str2[3] = 'l';
    str2[4] = 'o';
    str2[5] = ',';
    str2[6] = ' ';
    str2[7] = 'W';
    str2[8] = 'o';
    str2[9] = 'r';
    str2[10] = 'l';
    str2[11] = 'd';
    str2[12] = '\0'; // 手动添加空字符

    printf("%s\n", str2); // 输出字符串

    return 0;
}

```
### 3.&nbsp;使用字符指针声明字符串
```c
#include <stdio.h>

int main() {
    // 使用字符串常量初始化字符指针
    char *str3 = "Hello, World!";
    
    printf("%s\n", str3); // 输出字符串

    return 0;
}
```


```c{4-6}
#include<stdio.h>
int main(){
    char *str1 = "hello world";
    char str2[] = "hello world";
    str2[0] = 'c';
    printf("%s\n",str2);

    str1[0] = 'c';// [!code error]
    /*str1指向的是字符串常量，
    字符串常量是存储在只读存储区的，不能修改
    */
    printf("%s\n",str1);
    return 0;
}
```
上面展示了两种定义字符串的方法，第一种是数组，第二种是指针。虽然说数组名在表达式中会被转换为指向数组首元素的指针。但是这两种定义方式还是有区别的。<br>
|    特性    |    字符数组    |   字符指针  |
| ---------- | ------------- | ----------- |
|内存分配	|编译器为数组分配足够的空间，包括终止符|指针指向只读存储区的字符串字面量|
|可修改性	|可以修改数组内容	|不可修改字符串字面量内容|
|存储位置	|通常在栈上（函数内部）或全局数据区（全局作用域）	|指针在栈上，字符串字面量在只读存储区|

### 4.&nbsp;字符串赋值
#### (1).&nbsp;直接赋值
下面这些写法都是正确的：<br>
```c
char *t = "title";
char *s;
s = t;
//s和t指向的是同一个字符串

char *str1;
char str2[] = "hello world";
str1 = str2;
```

#### (2).&nbsp;通过scanf()函数读取

```c
#include<stdio.h>
int main(){
    char str1[8];
    scanf("%s",string);
    /*
    直接使用scanf往字符数组读取可能会出现数据丢失的情况，
    比如我输入了20个字符，但是这个数组只能存下7个字符(和一个结束符'\0')
    */
    //为了让scanf安全，我们可以使用
    scanf("%7s",string)，
    //明确要求它只读取7个字符，然后自动添加一个结束符。
    return 0;
}

```
使用scanf读取字符串并写入数组时，不需要加取地址符号&，因为我们前面说过，数组名在表达式中会被转换为指向数组首元素的指针。
:::warning
误区警示：
```c
char *str1;
/*下面这个scanf函数是错误的，
因为str1是一个未初始化的指针，
而scanf需要一个地址来写入数据。
*/
scanf("%s",str1);// [!code error]
//如果一定要用指针形式的话可以这样：
char *str1 = "hello";// 
//或者用malloc等函数分配内存
```
:::


### 5.&nbsp;常用的字符串函数
c语言提供了一些函数来操作字符串，它们都在<string.h>头文件中。
#### (1).&nbsp;strlen()函数
学到这里我们应该已经能看函数的定义和注释来知道它的用法的能力了。
strlen的原型声明如下：
```c
size_t strlen(const char *str);
//返回s的字符串的长度，不包括结尾的\0
```
size_t 是C语言中用于表示大小的数据类型，通常被定义为 unsigned int 或 unsigned long，它的确切定义取决于具体的操作系统和编译器，这里不要管它。<br>
参数列表中const char *str表示str是一个指向只读存储区的字符串常量的指针。也就是说传入的地址给了一个叫str的指针，这个指针只能读取它指向的区域的值，不能通过这个指针修改它指向的区域的值。<br>
```c
#include <stdio.h>
#include <string.h>

int main() {
    char str6[] = "Hello, World!";
    int len = strlen(str6);
    
    printf("字符串长度: %d\n", len);

    return 0;
}

```
#### (2).&nbsp;strcmp()函数
strcmp函数用于比较两个字符串是否相等，它返回一个整数。<br>
如果两个字符串相等，则返回0。<br>
如果第一个字符串小于第二个字符串，则返回-1。<br>
如果第一个字符串大于第二个字符串，则返回1。<br>
这个大小指的是什么呢？指的并不是长度，而且两个数组从前往后对应的字符之间的大小关系。<br>
谁大谁小是看字符的ASCII码值。<br>
比如下面这俩数组
| a[0] | a[1] | a[2] | a[3] | a[4] | a[5] | a[6] | a[7] | 
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 'a'  | 'b'  | 'c'  | 'd'  | 'e'  | 'f'  | 'g'  | '\0' |

| b[0] | b[1] | b[2] | b[3] | b[4] |
| ---- | ---- | ---- | ---- | ---- |
| 'a'  | 'b'  | 'c'  | 'd'  | '\0' |

从前往后依次比较，a[0]和b[0]的ASCII码值相同，a[1]和b[1]的ASCII码值也相同，依次往后比，会发现a[4]和b[4]的ASCII码值不同，a[4]的ASCII码值大于b[4]的ASCII码值，所以返回一个正数1。<br>
```c
#include<stdio.h>
#include<string.h>
int main(){
    char str1[] = "abcdefg";
    char str2[] = "abcd";

    printf("%d\n",strcmp(str1,str2));
    return 0;
}
```

库函数也是程序员写的，我们也可以试试自己还原一个strcmp函数(感兴趣的同学可以试一下)：
```c
/*
比较两个字符串是否相等，它返回一个整数。<br>
如果两个字符串相等，则返回0。<br>
如果第一个字符串小于第二个字符串，则返回一个负数。<br>
如果第一个字符串大于第二个字符串，则返回一个正数。<br>
*/
int mycmp(const char *s1, const char *s2){
    while(*s1 == *s2 && *s1 != '\0'){
        s1++;
        s2++;
    }
    return *s1 - *s2;
    //找到第一个对应位置字符不相等的地方，直接相减(得到它们的ASCII码值之差)
}
```
#### (3).&nbsp;其他常用函数
还有好多常用的字符串函数，这里我只给出原型声明和功能，大家可以自己尝试一下。
```c
char * strcpy(char *restrict dest, const char *restrict src);
/*将src的字符串拷贝到dest
(包含结尾的'\0')
*/
/*restrict是c99新增的关键字，用于告诉编译器，
对象已经被指针所引用，不能通过除该指针外所有其他直接或间接的方式修改该对象的内容。
我们暂时用不到它
*/
//实例:
char *dst = (char*)malloc(strlen(src)+1);
//存什么类型的数据就申请什么类型的内存空间
//内存空间申请我们下一章节会讲
strcpy(dst,src);
```

```c
char * strchr(const char *s, int c);
/*
从左到右搜索字符串s，直到找到字符c为止。
没找到返回NULL。
*/
```

```c
char* strrchr(const char *s, int c);
/*
这个跟刚才那个基本一样，
唯一的区别是它是从右到左搜索。
*/
```
```c
char * strstr(const char *s1, const char *s2);
/*
在字符串s1中搜索字符串s2，
返回在haystack中第一次出现needle字符串的位置，
如果未找到则返回null。
*/

```
```c
char *strcasestr(const char *s1, const char *s2);
/* 跟strstr基本相同，只是大小写不敏感
(意思就是搜索的时候不区分大小写) */
```
### 6.&nbsp;单字符输入输出
#### (1).&nbsp;putchar()函数
```c
//函数原型：
int putchar(int c);
//接收一个字符
//输出一个字符到标准输出设备(屏幕)
//返回值为输出的字符个数，返回EOF(-1)表示失败
```
#### (2).&nbsp;putchar()函数
```c
//函数原型：
int getchar(void);
//从标准输入设备(键盘)读取一个字符
//返回值为读取的字符，返回EOF(-1)表示失败
```

```c
//示例：
#include<stdio.h>
int main(){
    int ch;
    while((ch = getchar()) != EOF){
        putchar(ch);
    };
    printf("EOF\n");
    //如何终止c程序运行？
    //windows ctrl + z
    //linux ctrl + d
    
    return 0;
}
```



## (十一)&nbsp;动态内存分配
在C语言中，动态内存分配是一种在运行时分配和管理内存的方式.<br>
与静态内存分配（如通过数组等方式）不同，动态内存分配允许程序在需要时分配内存，并在不再需要时释放内存，以提高内存使用的灵活性和效率。<br>
C语言提供了一组标准库函数，它们在<stdlib.h>头文件中。这些函数用于动态内存分配和管理，包括 malloc、calloc、realloc 和 free。<br>

### 1.&nbsp;malloc()函数
malloc函数用于分配指定字节数的内存，返回一个指向分配内存的指针。如果分配失败，它返回 NULL。
```c{4,6,13}
#include<stdio.h>
#include<stdlib.h>
int main(){
    int n = 30;
    //分配内存("借")
    int *a = (int *)malloc(n * sizeof(int));//申请了n个int大小的内存

    //之后a可以直接当成数组使用
    a[5] = 11;
    printf("%d\n",a[5]);

    //释放内存("还")
    free(a);/*只能释放申请来的那片空间的首地址，
    也就是说，如果申请内存之后执行过a++之类的改变指针指向的行为的话，就不能直接释放了
    */
    /* 释放内存后，该内存块可以被重新分配，
    但指针仍然指向已释放的内存地址，因此需要小心使用。
    */
    return 0;
}
```
如果剩余内存空间不够，malloc函数会返回NULL。
:::warning
常见误区：
分配的内存没有通过free函数释放，会导致内存泄漏，逐渐耗尽可用内存。
重复释放空间
使用已释放的内存
:::
### 2.&nbsp;realloc()函数
realloc函数用于重新分配内存，它接受一个指针作为参数，并返回一个指向重新分配内存的指针。如果重新分配失败，它返回 NULL。<br>
一般需要重新扩展之前分配的内存块的大小的时候，可以使用realloc函数。<br>
```c
//原型声明
void *realloc(void *ptr, size_t newsize);
/* 
void *是一种指针类型，表
示任意类型的指针。
ptr是指向先前已分配的内存块的指针。
size_t无符号整数类型
newsize是要分配的内存块的新大小(以字节为单位)
*/

/* 
如果ptr为NULL，则realloc函数将分配一个内存块，
大小为newsize字节。
此时它和malloc函数一样。
*/
```
注意：
realloc() 分配的新内存块可能与原来的不在同一个位置,因此不能使用原来的指针访问新的内存块。<br>
建议在调用 realloc() 后立即检查返回值,以确保内存分配成功。<br>
如果 realloc() 失败,原内存块不会被释放,需要手动释放。<br>


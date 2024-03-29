### 引入
- 阅读example1可以看出：如果在原有的Order类上扩展能力是比较麻烦的，因为分享能力和评分能力相当于是两个依赖而且是实现额外能力的强依赖，这就需要我们在开发新的额外的功能的时候不仅仅要关注于新逻辑的测试还需要关注于历史逻辑，这种场景就适合使用Ioc实现

### 什么是Ioc
在上述例子中，Order我们称之为高层模块，而ShareAbility和Rate称之为低层模块
现状是Order高层模块依赖于这两个低层模块，Ioc就是将这种类型反转，所以也就对应Ioc的名字：控制反转
Ioc是一个比较🐮👃的架构方式，比如Spring全家桶、Nest架构设计都是借助于Ioc去实现

### 如何实现：面向接口编程
高层模块Order负责定义依赖接口，低层模块负责实现接口，实现需要借助DI：依赖注入
改造请看example2

  - 高层模块提供injectable，在构造器里面初始化模块的init
  - 低层模块提供init，将当前实例绑定到init接收到的入参中

此时这个高层模块（对应着example2的Order）这个类就可以被称为容器。
依赖注入就是把高层模块的所依赖的低层次以参数的方式注入其中，这种方式可以修改低层次依赖而不影响高层次依赖。
但是注入的方式要注意一下，因为我们不可能在高层次模块中预先知道所有被依赖的低层次模块，也不应该在高层次模块中依赖低层次模块的具体实现。
因此注入需要分成两部分：
  - 高层次模块中通过加载器机制解耦对低层次模块的依赖，转而依赖于低层次模块的抽象；
  - 低层次模块的实现依照约定的抽象实现，并通过注入器将依赖注入高层次模块。

这样高层次模块就脱离了业务逻辑转而成为了低层次模块的容器，而低层次模块则面向接口编程：满足对高层次模块初始化的接口的约定即可。这就是控制反转：**通过注入依赖将控制权交给被依赖的低层级模块**。

### 使用装饰器
对类使用装饰器将需要注入的类自动注入进容器的依赖集中，根据这个@Injectable可以类比一下Nest的Ioc应用


### 总结
所以对于Order来说他就作为一个Ioc容器即可，其实理论上它并不需要业务逻辑
Ioc其实可以理解为一个变相的中央存取

![](https://pic1.zhimg.com/80/v2-a50d41909d845ed5f11d2bb8e6d00b7c_1440w.webp)

## 完整的Ioc启动流程逻辑(Java版)
https://zhuanlan.zhihu.com/p/243462131
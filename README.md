# FlappyBird
原生JavaScript和Canvas实现FlappyBird小游戏
点击这里[开始游戏](https://xiaoxiongzi.github.io/FlappyBird/index.html)
PS:可以以电脑浏览器的手机模式打开，也可以在手机浏览器中直接打开

游戏运用了Canvas的drawImage，translate，rotate，save，restore，fillRect等API。
采用中介者模式，Game类统领全局，负责读取资源，设置定时器，维护各个物体实例，所有的演员都是Game类new 出来的， 游戏项目外部的语句就一条： 
```javascript
var game = new Game(); 
```
### 其他的所有语句都封装在Game类里面了 
需要的类： 

- Game类：中介者，读取资源，设置定时器，维护各个物体实例 
- Bird类：小鸟类，这个类是单例的，实例化一次 
- Pipe类： 管子类 
- Land类：大地类 
- BG类：背景类
- sceneManager类：场景管理类

## 难点
- 视口的适配

我们的游戏在任何手机上面都是充满视口的
这里贴出代码
```javascript
(function () {
    var Game = window.Game = function (id) {
        this.canvas = document.querySelector(id);
        this.context = this.canvas.getContext('2d');
        this.init()
    }
    Game.prototype.init = function () {
        var windowW = document.documentElement.clientWidth;
        var windowH = document.documentElement.clientHeight;
        if (windowW > 414) {
            windowW = 414;
        } else if (windowW < 320) {
            windowW = 320;
        }
        if (windowH > 736) {
            windowH = 736
        } else if (windowH < 500) {
            windowH = 500;
        }
        this.canvas.width = windowW;
        this.canvas.height = windowH
    }
})()
```

- 资源管理器

游戏中有多张图片，这些图片都必须先load后，然后才能让定时器开始工作。
我们可以自己创建一个资源管理器，主要目的是为了读取外部的配置文件，游戏中的资源管理器R.json文件。存储了游戏中需要的图片对象。
游戏所需要的图片在这里下载[飞翔的小鸟(Flappy Bird)素材](http://www.java1234.com/a/kaiyuan/sucai/2014/0930/2967.html)

- 碰撞检测

因此小鸟的图片其实是一个长方形，而且角度又不断变化导致中心点难于掌握，因此很难判断小鸟与管子的碰撞。
这里画了张图帮助自己理解

![](http://ounf1hr8f.bkt.clouddn.com/17-9-11/51583239.jpg)

- 小鸟下落的速度

需要模拟小鸟的重力，高中物理没有白学

- 分数的计算

分数的计算与碰撞检测类似，设置一个开关，当管子重新出现时，设置为true。当分值加1时，设置为false。小鸟的最左边的x坐标如果超出了管子的x+width，就认为成功通过。

- 场景管理器

场景管理器有4个方法enter,update,render，bindEvent。其中定时器在每帧执行update方法和render方法。enter方法由业务来调用，比如用户点击了按钮，此时就进入场景2，鸟撞到了管子，就进入场景3。 这样就把游戏的各个不同阶段分离出来，方便处理。





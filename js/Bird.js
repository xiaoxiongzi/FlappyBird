(function () {

    var Bird = window.Bird = function () {
        //随机一个小鸟的颜色0,1,2
        this.color = parseInt(Math.random() * 3);
        //决定用图，小鸟有3个翅膀的状态
        this.imageArr = [
            game.R["bird" + this.color + "_0"],
            game.R["bird" + this.color + "_1"],
            game.R["bird" + this.color + "_2"],
        ]
        //翅膀的状态
        this.wingStep = 0;
        //小鸟的位置
        this.x = game.canvas.width * (1 - 0.618) - 40;
        this.y = 100;
        //小鸟自己的帧数
        this.drop = 0;
        //小鸟的角度
        this.angle = 0;
        //是否具有能量，也就是被点击往上飞的状态
        this.hasEnergy = false;

    }
    Bird.prototype.update = function () {
        this.wing();
        //固定帧数拍一次翅膀
       
        this.angle += 0.01;
        this.drop++;
        if (!this.hasEnergy) {
            this.y += 0.2 * this.drop;
        } else {
            this.y -= 0.5 * (20 - this.drop);
            if (this.drop > 20) {
                this.hasEnergy = false;
                this.drop = 0;
            }
        }

        //计算自己的四个碰撞检测值
        this.T = this.y - 12;
        this.R = this.x + 17;
        this.B = this.y + 12;
        this.L = this.x - 17;

        //验证是否落地
        if(this.B > game.canvas.height * 0.76){
            game.sm.enter(4);
        }
    }

    Bird.prototype.render = function () {
        game.context.save();
        //将坐标系拉到小鸟的中心点
        game.context.translate(this.x, this.y);
        //旋转
        game.context.rotate(this.angle)
        game.context.drawImage(this.imageArr[this.wingStep], -24, -24);
        game.context.restore();

    }
    Bird.prototype.fly = function () {
        this.hasEnergy = true;
        this.drop = 0;
        //鸟头瞬间拉起
        this.angle = -0.5;
    }
    Bird.prototype.wing = function(){
        game.fno % 10 == 0 && this.wingStep++;
        if (this.wingStep > 2) {
            this.wingStep = 0;
        }
    }
})()
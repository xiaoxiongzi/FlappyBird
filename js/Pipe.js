(function () {
    //大地类
    var Pipe = window.Pipe = function () {
        //自己的背景
        this.imageup = game.R.pipe_up;
        this.imagedown = game.R.pipe_down;
        //总高包括了上管子的高度+空隙+下管子的高度
        this.allheight = game.canvas.height * 0.76;
        //空隙的高度固定
        this.interspace = 140;
        //管子的原本高度为320
        this.picheight = 320;
        //随机一个上管子的高度,但要保证管子的长度最小为100
        this.height1 = 100 + parseInt(Math.random() * (this.picheight-100));
        //此时下管子的高度就由上管子决定了
        this.height2 = this.allheight - this.height1 - this.interspace;
        this.x = game.canvas.width;
        //是否已经成功通过管子
        this.alreadyPass = false;
        game.pipeArr.push(this);
    }
    Pipe.prototype.update = function () {
        this.x -= 2;
        //碰撞检测，检测自己有没有碰到小鸟
        if(game.bird.R > this.x && game.bird.L < this.x + 52){
            if(game.bird.T < this.height1 || game.bird.B > this.height1 + this.interspace){
                //clearInterval(game.timer)
                //死亡就进入场景4
                game.sm.enter(4);
            }
        }
       if(game.bird.R > this.x + 52 &&  !this.alreadyPass){
           //顺利通过了
           game.score ++;
           this.alreadyPass = true;
       }
       //检测这个管子是不是出了视口，如果是，要从数组中删除这个管子
       if(this.x < -52){
           for(var i=0;i<game.pipeArr.length;i++){
               if(game.pipeArr[i]==this){
                   game.pipeArr.splice(i,1)
               }
           }
       }
    }

    Pipe.prototype.render = function () {
        //上面的管子开口向下
        game.context.drawImage(this.imagedown, 0, this.picheight-this.height1,52,this.height1,this.x,0,52,this.height1);
        game.context.drawImage(this.imageup, 0, 0,52,this.height2,this.x,this.height1+this.interspace,52,this.height2);
        
    }

})()
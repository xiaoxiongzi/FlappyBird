(function(){
    var Background = window.Background = function(){
        this.image = game.R.bg_day;
        this.y = 0.75 * game.canvas.height - 396;
        this.w = 288;
        this.height = 512;
        this.speed = 1;
        this.x = 0;
    }
    Background.prototype.render = function(){
        //因为图片不够宽，所以我们采用无缝连续滚动的套路，克隆图片等图片左边到达边线的时候，瞬间拉回
        game.context.drawImage(this.image, this.x, this.y);
        game.context.drawImage(this.image, this.x+this.w, this.y);
        game.context.drawImage(this.image, this.x+this.w*2, this.y);
        //渲染天空  
        game.context.fillStyle='#4EC0CA';
        game.context.fillRect(0,0,game.canvas.width,this.y);
        //渲染草地
        game.context.fillStyle='#5EE270';
        game.context.fillRect(0, this.height+this.y-2, game.canvas.width, game.canvas.height - this.y - this.height)
    }
    //背景运动
    Background.prototype.update = function(){
        this.x-=this.speed;
        //无缝滚动
        if(this.x < -this.w){
            this.x = 0
        }
    }
    
})()
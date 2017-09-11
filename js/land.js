(function(){
    var Land = window.Land = function(){
       //自己的背景
        this.image = game.R.land;
        //图片的宽度
        this.w = 336;
        //图片的位置
        this.x = 0;
        this.y = game.canvas.height*0.76;
    }
    Land.prototype.update = function(){
        this.x -=2;
        if(this.x < - this.w){
            this.x = 0;
        }
    }

    Land.prototype.render = function(){
       game.context.drawImage(this.image, this.x, this.y);
       game.context.drawImage(this.image, this.x+this.w, this.y);
       game.context.drawImage(this.image, this.x+this.w*2, this.y);
       
       //最下面大地的颜色
       game.context.fillStyle='#DED895';
       game.context.fillRect(0, this.y+111, game.canvas.width, game.canvas.height - this.y-112);
       
    }
    
})()
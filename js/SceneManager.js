(function () {
    var SceneManager = window.SceneManager = function () {
        //1表示欢迎屏幕，2. 表示教程 3表示游戏内容，4表示GameOver，5表示再来一次
        this.sceneNumber = 1;
        game.bg = new Background();
        game.bird = new Bird();
        game.land = new Land();
        this.logoY = -48;
        this.button_playY = game.canvas.height;
        this.button_playX = game.canvas.width / 2 - 58;
        this.bindEvent();
    }
    SceneManager.prototype.update = function () {
        switch (this.sceneNumber) {
            case 1:
                game.score = 0;
                this.logoY += 5;
                this.logoY = this.logoY > 120 ? 120 : this.logoY
                this.button_playY -= 8;
                this.button_playY = this.button_playY < game.canvas.height * 0.50 ? game.canvas.height * 0.50 : this.button_playY;
                break;
            case 2:
                game.bird.wing();
                this.tutorialOpacity += this.tutorialOpacityIsDown ? -0.02 : 0.02;
                //
                if (this.tutorialOpacity < 0.02 || this.tutorialOpacity > 0.98) {
                    this.tutorialOpacityIsDown = !this.tutorialOpacityIsDown
                }
                break;
            case 3:
                //小鸟的更新
                game.bird.update();
                game.bg.update();
                game.land.update();
                //负责处理管子
                //管子的实例化
                game.fno % 150 == 0 && (new Pipe());
                for (var i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i] && game.pipeArr[i].update()
                }
                break;
            case 4:
                this.birdfno++;
                game.bird.angle += 0.02;
                game.bird.y += 0.5 * this.birdfno;
                game.context.globalAlpha += 0.1;
                if (game.context.globalAlpha > 1) {
                    game.context.globalAlpha = 1
                }
        }
    }
    SceneManager.prototype.render = function () {
        //根据当前是第几个场景，来决定做什么
        switch (this.sceneNumber) {
            case 1:
                game.bg.render();
                game.land.render();
                game.bird.render();
                game.bird.wing();
                game.bird.x = game.canvas.width / 2 - 24;
                game.bird.y = game.canvas.height / 2;
                game.bird.angle = 0;
                game.context.drawImage(game.R["logo"], game.canvas.width / 2 - 89, this.logoY);
                game.context.drawImage(game.R["button_play"], this.button_playX, this.button_playY);
                break;
            case 2:
                game.bg.render();
                game.land.render();
                game.bird.render();
                //教程，以闪烁来提醒
                game.context.save();
                game.context.globalAlpha = this.tutorialOpacity;
                game.context.drawImage(game.R["tutorial"], game.canvas.width / 2 - 57, 300);
                game.context.restore();
                break;
            case 3:
                game.bg.render();
                game.land.render();
                game.bird.render();

                for (var i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i] && game.pipeArr[i].render()
                }
                var scoreLength = game.score.toString().length;
                //循环语句去设置图片的显示，有一个基准位置就是self.canvas.widht/2 - scoreLength/2*34
                for (var i = 0; i < scoreLength; i++) {
                    game.context.drawImage(game.R["shuzi" + game.score.toString().charAt(i)], game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i, 100);
                }
                break
            case 4:
                game.bg.render();
                game.land.render();
                game.bird.render();
                for (var i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i] && game.pipeArr[i].render()
                }
                var scoreLength = game.score.toString().length;
                //循环语句去设置图片的显示，有一个基准位置就是self.canvas.widht/2 - scoreLength/2*34
                for (var i = 0; i < scoreLength; i++) {
                    game.context.drawImage(game.R["shuzi" + game.score.toString().charAt(i)], game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i, 100);
                }
                if (game.bird.y > game.canvas.height) {
                    this.enter(5);
                }
                break;
            case 5:
                game.bg.render();
                game.land.render();
                for (var i = 0; i < game.pipeArr.length; i++) {
                    game.pipeArr[i] && game.pipeArr[i].render()
                }
                var scoreLength = game.score.toString().length;
                //循环语句去设置图片的显示，有一个基准位置就是self.canvas.widht/2 - scoreLength/2*34
                for (var i = 0; i < scoreLength; i++) {
                    game.context.drawImage(game.R["shuzi" + game.score.toString().charAt(i)], game.canvas.width / 2 - scoreLength / 2 * 34 + 34 * i, 100);
                }
                game.context.drawImage(game.R["text_game_over"],game.canvas.width/2 - 102, 250);
                
        }
    }
    SceneManager.prototype.enter = function (number) {
        this.sceneNumber = number;
        switch (this.sceneNumber) {
            case 1:
                //进入1号场景这一瞬间
                this.logoY = -48;
                this.button_playY = game.canvas.height;
                break;
            case 2:
                game.bird.y = 200;
                //tutoriald 透明度0-1
                this.tutorialOpacity = 1;
                this.tutorialOpacityIsDown = true;
                break;
            case 3:
                //管子数组清空
                game.pipeArr = new Array();
                break;
            case 4:
                game.context.globalAlpha = 0;
                this.birdfno = 0;
                break;
        }
    }
    SceneManager.prototype.bindEvent = function () {
        var self = this;
        //点击后再判断当前是第几个场景
        game.canvas.onclick = function (event){
            clickHandler(event.clientX,event.clientY)
        }
         function clickHandler(mousex,mousey) {
            switch (self.sceneNumber) {
                case 1:
                    if (mousex > self.button_playX && mousex < self.button_playX + 116 && mousey > self.button_playY && mousey < self.button_playY + 70) {
                        self.enter(2)
                    }
                    break;
                case 2:
                    self.enter(3);
                    break;
                case 3:
                    game.bird.fly()
                    break;
                case 5:
                    self.enter(1);
                    break;
            }
        }
    }
})()

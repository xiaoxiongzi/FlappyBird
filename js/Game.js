(function () {
    var Game = window.Game = function (params) {
        this.canvas = document.querySelector(params.canvasid);
        this.context = this.canvas.getContext('2d');
        //资源文件的地址
        this.Rjsonurl = params.Rjsonurl
        this.fno = 0;
        this.score = 0;
        this.init()
        //读取资源
        var self = this;
        this.loadAllResource(function(){
            self.start();
            //绑定监听
        });
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
    //读取资源
    Game.prototype.loadAllResource = function(callback){
        var alreadyDoneNumber = 0;
        this.R = {};
        self = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                var Robj = JSON.parse(xhr.responseText);

                for(var i=0 ; i<Robj.images.length;i++){

                    self.R[Robj.images[i].name] = new Image()
                    self.R[Robj.images[i].name].src = Robj.images[i].url;
                    self.R[Robj.images[i].name].onload = function(){
                        alreadyDoneNumber++;
                        //提示文字
                        self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
                        var txt = "正在加载" + alreadyDoneNumber + "/" + Robj.images.length + "张图片"
                        self.context.textAlign='center';
                        self.context.font='20px sans-serif';
                        self.context.fillText(txt, self.canvas.width/2, self.canvas.height*(1-0.618));
                        if(alreadyDoneNumber == Robj.images.length){
                            callback()
                        }
                    }
                }
            }
        }
        xhr.open("get",this.Rjsonurl,true);
        xhr.send(null)
    }

    Game.prototype.start = function(){
        var self =this;
        this.sm = new SceneManager();
       
        this.timer = setInterval(function(){
            self.context.clearRect(0, 0, self.canvas.width, self.canvas.height);
            self.fno ++;
            self.sm.update()
            self.sm.render()
        },20)
    };
    
})()
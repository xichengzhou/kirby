
GameScreen = function(width,height)
{
    //Constructor
    GameScreen.superclass.constructor.apply(this,arguments);

    //Create a top-level variable for our SpriteSheetAnimation object
    this.spriteSheetAnim;
	this.spriteSheetAnim2;
    this.back;
    this.turning="";
    this.turning2="";
    this.forward=false;
    this.backward=false;
    this.forward2=false;
    this.backward2=false;
    this.backgroundColor = "#025AFF";
    this.x = 1;
    this.y = 1;
    this.dx = 7;
    this.dy = 7;
    this.ct = 0;
   
   this.start = new TGE.Button().setup({
            textColor: "#025AFF",
            text: " Start !!!",    
            x:200,
            y:100,
            
            pressFunction:this.startgame.bind(this),
    });

    this.spriteSheetAnim = new TGE.SpriteSheetAnimation().setup({
        image:"spriteSheetImg",
        columns:7,
        rows:1,
        totalFrames:7,
        fps:5,
        x: 320,
        y: 240,
    });
	
	 this.spriteSheetAnim2 = new TGE.SpriteSheetAnimation().setup({
        image:"spriteSheetImg2",
        columns:1,
        rows:1,
        totalFrames:1,
        fps:20,
        x: Math.random()*this.width,
        y: Math.random()*this.height,
    });

     this.spriteSheetAnim3 = new TGE.SpriteSheetAnimation().setup({
        image:"spriteSheetImg3",
        columns:6,
        rows:1,
        totalFrames:6,
        fps:5,
        x: 720,
        y: 240,
    });
    
    this.back = new TGE.Sprite().setup({
		image:"back",
		x:410,
		y:395,
		width:this.width,
		height:this.height,
	});

    

	this.addChild(this.back);

    /*this.addChild(new TGE.Text().setup({
        x:400,
        y:100,
        text:"Your score is " + this.ct,
        font:"32px sans-serif",
        color:"#FFF"
    }));*/

      this.addChild(new TGE.Button().setup({
        textColor: "#025AFF",
        text: "Restart",
        x:700,
        y:100,
        pressFunction:this.Restart.bind(this)
        
    }));


    this.addChild(this.start);
    this.addChild(this.spriteSheetAnim);
    this.addChild(this.spriteSheetAnim2);
    this.addChild(this.spriteSheetAnim3);
    

    
}


GameScreen.prototype =
{
    playAnim: function(){
        this.spriteSheetAnim.play();
		this.spriteSheetAnim2.play();
        this.spriteSheetAnim3.play();
        

    },

    startgame: function(){


    this.spriteSheetAnim.addEventListener("keydown",this.SetStatusofSpider.bind(this));
    this.spriteSheetAnim.addEventListener("keyup",this.resetStatusofSpider.bind(this));
    this.spriteSheetAnim.addEventListener("update",this.upDateSpider.bind(this));
    this.spriteSheetAnim.addEventListener("update",this.collision.bind(this));
    this.spriteSheetAnim3.addEventListener("keydown",this.SetStatusoffly.bind(this));
    this.spriteSheetAnim3.addEventListener("keyup",this.resetStatusoffly.bind(this));
    this.spriteSheetAnim3.addEventListener("update",this.upDatefly.bind(this));
    this.spriteSheetAnim3.addEventListener("update",this.collision2.bind(this));
    this.spriteSheetAnim2.addEventListener("update",this.Move.bind(this));   
       
    },


    SetStatusofSpider:function(event){
        var spider=event.currentTarget;
        
     	if(event.keyCode == 37){
     		this.turning="left"
        }
          
     	if(event.keyCode == 39){
     		this.turning="right"
        }
          
        if(event.keyCode == 38){
            this.forward=true;
        }

         if(event.keyCode == 40){
            this.backward=true;
        }
     },

     resetStatusofSpider:function(event){
        if(event.keyCode==37 || event.keyCode==39){
            this.turning="";
        }
        if(event.keyCode==38){
            this.forward=false;
        }
        if(event.keyCode==40){
            this.backward=false;
        }
     },

     upDateSpider:function(event){
        var spider=event.currentTarget;
        if(this.turning=="left")
            spider.rotation-=4;
        if(this.turning=="right")
            spider.rotation+=4;
        if(this.forward){
            var distance=6;
            var theta=(spider.rotation-90)*Math.PI/180;
            spider.x+=distance*Math.cos(theta);
            spider.y+=distance*Math.sin(theta);
        }
        if(this.backward){
            var d=4;
            var t=(spider.rotation-90)*Math.PI/180;
            spider.x-=d*Math.cos(t);
            spider.y-=d*Math.sin(t);
        }
        if(this.turning != "" || this.forward||this.backward){
            spider.play();
        }else{
            spider.stop();
        }

        if(spider.x <= 0){
            spider.x=0
        } else if (spider.x >= this.width){
            spider.x=this.width;
        }
        if(spider.y <= 0){
            spider.y=0
        } else if (spider.y >= this.height){
            spider.y=this.height;
        }  
     },

      SetStatusoffly:function(event){
        var fly=event.currentTarget;
        
        if(event.keyCode ==65 ){
            this.turning2="left"
        }
          
        if(event.keyCode == 68){
            this.turning2="right"
        }
          
        if(event.keyCode == 87){
            this.forward2=true;
        }
        if(event.keyCode == 83){
            this.backward2=true;
        }
     },

     resetStatusoffly:function(event){
        if(event.keyCode==65 || event.keyCode==68){
            this.turning2="";
        }
        if(event.keyCode==87){
            this.forward2=false;
        }
         if(event.keyCode==83){
            this.backward2=false;
        }
     },

     collision:function(event){
        if((this.spriteSheetAnim.x<=(this.spriteSheetAnim2.x+40)&&this.spriteSheetAnim.x>=(this.spriteSheetAnim2.x-40))&&(this.spriteSheetAnim.y<=(this.spriteSheetAnim2.y+40)&&this.spriteSheetAnim.y>=(this.spriteSheetAnim2.y-40))){
           this.spriteSheetAnim2.x= Math.random()*this.width,
           this.spriteSheetAnim2.y= Math.random()*this.height,
            this.ct++;
         }
    },

    collision2:function(event){
        if((this.spriteSheetAnim3.x<=(this.spriteSheetAnim2.x+40)&&this.spriteSheetAnim3.x>=(this.spriteSheetAnim2.x-40))&&(this.spriteSheetAnim3.y<=(this.spriteSheetAnim2.y+40)&&this.spriteSheetAnim3.y>=(this.spriteSheetAnim2.y-40))){
           this.spriteSheetAnim2.x= Math.random()*this.width,
           this.spriteSheetAnim2.y= Math.random()*this.height,
            this.ct++;
         }
    },

     upDatefly:function(event){
        var fly=event.currentTarget;
        if(this.turning2=="left")
            fly.rotation-=4;
        if(this.turning2=="right")
            fly.rotation+=4;
        if(this.forward2){
            var distance=4;
            var theta=(fly.rotation-90)*Math.PI/180;
            fly.x+=distance*Math.cos(theta);
            fly.y+=distance*Math.sin(theta);
        }
         if(this.backward2){
            var d=6;
            var t=(fly.rotation-90)*Math.PI/180;
            fly.x-=d*Math.cos(t);
            fly.y-=d*Math.sin(t);
        }
        if(this.turning2 != "" || this.forward2|| this.backward2){
            fly.play();
        }else{
            fly.stop();
        }
        if(fly.x <= 0){
            fly.x=0
        } else if (fly.x >= this.width){
            fly.x=this.width;
        }
        if(fly.y <= 0){
            fly.y=0
        } else if (fly.y >= this.height){
            fly.y=this.height;
        }  
        
     },

     Move:function(event){
        
        var mushroom = event.currentTarget;
        mushroom.x += this.dx;
        mushroom.y += this.dy;
        if(mushroom.x <= 0 || mushroom.x >= this.width)
            this.dx *= -1;
        if(mushroom.y <= 0 || mushroom.y >= this.height)
            this.dy *= -1;
        
    },

    Restart: function(){ 
        document.location.reload();
    }
}
    
extend(GameScreen,TGE.Window);
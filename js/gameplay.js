var AMOUNT_DIAMONS=30;
GamePlayManager={
  init:function(){
    console.log("Init");
    game.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally=true;
    game.scale.pageAlignVertically=true;
    this.flagFirstMouseDown=false;
  },
  preload:function(){
    console.log("Preaload");
    game.load.image('background','assets/images/background.png');
    game.load.spritesheet('horse','assets/images/horse.png',84,156,2);
    game.load.spritesheet('diamonds','assets/images/diamonds.png',81,84,4);
  },
  create:function(){
    console.log("create");
    game.add.sprite(0,0,'background');
    this.horse=game.add.sprite(0,0,'horse');
    this.horse.frame=1;
    this.horse.x=game.width/2;
    this.horse.y=game.height/2;
    this.horse.anchor.setTo(0.5,0.5);
    //ROTANDO sprite
    //this.horse.angle=0;
    //ESCALAR
    //this.horse.scale.setTo(1,2);
    //OPACIDAD
    //this.horse.alpha=0.5;
    game.input.onDown.add(this.onTap,this);
    this.diamonds=[];

    for (var i = 0; i < AMOUNT_DIAMONS; i++) {
      var diamond=game.add.sprite(100,100,'diamonds');
      diamond.frame=game.rnd.integerInRange(0,3);
      diamond.scale.setTo(0.30+game.rnd.frac());
      diamond.x=game.rnd.integerInRange(50,1050);
      diamond.y=game.rnd.integerInRange(50,600);
      this.diamonds[i] = diamond;
      var rectCurrenDiamond = this.getBoundsDiamond(diamond);
      var rectHorse = this.getBoundsDiamond(this.horse);
      while(this.isOverlapingOtherDiamond(i, rectCurrenDiamond) || this.isRectanglesOverlapping(rectHorse, rectCurrenDiamond) ){
            diamond.x = game.rnd.integerInRange(50, 1050);
            diamond.y = game.rnd.integerInRange(50, 600);
            rectCurrenDiamond = this.getBoundsDiamond(diamond);
      }
    }
  },
  getBoundsDiamond:function (currentDiamond){
    return new Phaser.Rectangle(currentDiamond.left,currentDiamond.top,currentDiamond.width,currentDiamond.height);
  },
  isRectanglesOverlapping: function(rect1, rect2) {
        if(rect1.x> rect2.x+rect2.width || rect2.x> rect1.x+rect1.width){
            return false;
        }
        if(rect1.y> rect2.y+rect2.height || rect2.y> rect1.y+rect1.height){
            return false;
        }
        return true;
    },
  isOverlapingOtherDiamond:function(index, rect2){
        for(var i=0; i<index; i++){
            var rect1 = this.getBoundsDiamond(this.diamonds[i]);
            if(this.isRectanglesOverlapping(rect1, rect2)){
                return true;
            }
        }
        return false;
    },
  onTap:function(){
    this.flagFirstMouseDown=true;
  },
  update:function(){
    console.log("update");
    if(this.flagFirstMouseDown==true){
      //this.horse.angle=this.horse.angle+1;
      var pointerX=game.input.x;
      var pointerY=game.input.y;
      //console.log("X:"+pointerX);
      //console.log("Y:"+pointerY);
      var distX=pointerX-this.horse.x;
      var distY=pointerY-this.horse.y;
      //console.log("DISTANCIA X:"+distX);
      //console.log("DISTANCIA Y:"+distY);
      if(distX>0){
        this.horse.scale.setTo(1,1);
      }else{
        this.horse.scale.setTo(-1,1);
      }
      this.horse.x=this.horse.x+distX*0.02;
      this.horse.y=this.horse.y+distY*0.02;
    }

  }
}
var game=new Phaser.Game(1136,640,Phaser.AUTO);
game.state.add('gameplay',GamePlayManager);
game.state.start("gameplay");

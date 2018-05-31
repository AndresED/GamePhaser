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

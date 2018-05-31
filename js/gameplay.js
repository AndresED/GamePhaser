GamePlayManager={
  init:function(){
    console.log("Init");
  },
  preload:function(){
    console.log("Preaload");
  },
  create:function(){
    console.log("create");
  },
  update:function(){
    console.log("update");
  }
}
var game=new Phaser.Game(1136,640,Phaser.AUTO);
game.state.add('gameplay',GamePlayManager);

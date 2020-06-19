let soundMain;
class StartScene extends Phaser.Scene
{
    constructor()
    {
        super({key: 'StartScene'});
    }

    preload()
    {
        this.load.audio('song',"sound/song2.wav");
        this.load.image('startScreen',"image/startScreenPic.png");
    }

    create()
    {
        this.add.sprite(240, 320, "startScreen");
       soundMain = this.sound.add("song");
       soundMain.play();
       gameState.scoreText = this.add.text(300, 455, "space to shoot\nleft and right movememt", {fontSize: '18px', fill: '#000000'});
        this.input.on("pointerup", () => {
            this.scene.stop("StartScene");
            this.scene.start('GameScene');
          });

     
    }
}
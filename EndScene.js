class EndScene extends Phaser.Scene {
    constructor() {
      super({
          key: 'EndScene'
        })
    }

     //load all asset file to be used
     preload()
     {
         const base = "image/";
         this.load.image('endScene',`${base}EndScene.png`);
     }

     create()
     {
         this.add.sprite(240, 320, 'endScene');
         gameState.scoreText = this.add.text(325, 455, `Your Score: ${currentScore}`, {fontSize: '18px', fill: '#000000'});
         this.input.on("pointerup", () => {
            this.scene.stop("EndScene");
            this.scene.start('GameScene');
            //replay Main sound after gameOver
            soundMain.play();
          });
     }

}

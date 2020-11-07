const config = {
    type: Phaser.AUTO,
    width: 710,
    height: 642,
    physics:
    {
        default: 'arcade',
        arcade:
        {
            //higher number fall faster
            gravity: { y: 200 },
            debug: false,
            enableBody: true
        }
    },
    scene: [StartScene, GameScene, YellowBugScene, EndScene,],
    audio: {
        disableWebAudio: true
    }
     //added the physic plugin which is use for adding gravity to the game

  };

 const game = new Phaser.Game(config);

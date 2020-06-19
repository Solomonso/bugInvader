//all global varibales used
let gameState = {};
let player;
let bugs;
let bugList = [];
let greenBug;
let redBug;
let yellowBug;
let greenBugLoop;
let yellowBugLoop;
let redBugLoop;
let  generateRedbug;
let timer;
let timer2
let seconds = 1;
let seconds2 = 1;
let currentScore;
let playerScore;
let shootSound;
let dieSound;
let gameOverSound;
 class GameScene extends Phaser.Scene 
{
    constructor() 
    {
      super({key: 'GameScene'});
    }

     //load all asset file to be used 
     preload()
     {
         const base = "image/";
         this.load.image('bg',`${base}gameScreen.png`);
         this.load.spritesheet("player", `${base}player.png`, { frameWidth: 72, frameHeight: 90 });
         this.load.image("platform",`${base}platform.png`);
         this.load.image("bullet",`${base}bullet.png`);
         this.load.image("codey",`${base}codey.png`);
         this.load.image('bugGreen', `${base}bugGreen.png`);
         this.load.image('bugRed', `${base}bugRed.png`);
         this.load.image('bugYellow', `${base}bugYellow.png`);
         this.load.image('bugYellowFlipped', `${base}bugYellowFlipped.png`);
         this.load.audio('sound',"sound/shoot.wav");
         this.load.audio('dieSound',"sound/death.wav");
         this.load.audio('gameOverSound',"sound/round_end.wav");
     }
     
     //set all the game object to be used in the create
     create()
     {   
         //add bg
         this.add.sprite(240, 320, "bg");
         player =  new Player(this,355,500,"player").setScale(.8);
        
         //create bullets
         gameState.bullet = this.physics.add.group();

         //for ground platform
         const platforms = this.physics.add.staticGroup();
         platforms.create(335,640,"platform");
         gameState.cursors = this.input.keyboard.createCursorKeys();
         
         //player score
         playerScore = new Score();
         currentScore = playerScore.getScore;
         gameState.scoreText = this.add.text(325, 620, `Score: ${currentScore}`, {fontSize: '15px', fill: '#000000'});
         
         //helps to detect collision btw the platform and player
         player.setCollideWorldBounds(true);
         this.physics.add.collider(player, platforms);
        
         //create the group bugs
          gameState.bugs = this.physics.add.group();
          gameState.bugRed = this.physics.add.group();
         bugList = ['bugGreen','bugRed', 'bugYellow'];
        
         //creating green bugs
         greenBug = () => {
            const xCoord = Math.random() * 640
            let randomBug = bugList[Math.floor(Math.random() * 1)]
            gameState.bugs.create(xCoord, 2, randomBug);
            //gameState.bugs.rotation += 90;   
        }
    
        greenBugLoop = this.time.addEvent({
        delay: 1300,
        callback: greenBug,
        loop: true,
    });

    //generate red bug
    generateRedbug  =  () =>
    {
        redBug = () => {
            const xCoord = Math.random() * 640
            let randomBug = bugList[1];
            gameState.bugRed.create(xCoord, 2, randomBug)
        } 

        redBugLoop = this.time.addEvent({
            delay: 1300,
            callback: redBug,
            loop: true,
        });
    }
     //green bug collide with platform
   this.physics.add.collider(gameState.bugs, platforms,  (bug) => {
     bug.destroy();	
      playerScore.setScore = 2;
      currentScore = playerScore.getScore;
     gameState.scoreText.setText(`Score: ${playerScore.getScore}`);
     
    })

     //Red bug collide with platform
     this.physics.add.collider(gameState.bugRed, platforms,  (bug) => {
        bug.destroy();	
        playerScore.setScore = 1;
        currentScore = playerScore.getScore;
        gameState.scoreText.setText(`Score: ${playerScore.getScore}`)
    })
     
     //for bullets collide with green bug
 this.physics.add.collider(gameState.bugs,gameState.bullet, (bug, bullet)=> {
         bug.destroy();
         bullet.destroy();
         playerScore.setScore = 1;
         currentScore = playerScore.getScore;
        gameState.scoreText.setText(`Score: ${playerScore.getScore}`)
     });
 
     //for bullets collide  with red bug
     this.physics.add.collider(gameState.bugRed,gameState.bullet, (bug, bullet)=> {
            bug.destroy();
            bullet.destroy();
            playerScore.setScore = 1;
            currentScore = playerScore.getScore;
            gameState.scoreText.setText(`Score: ${playerScore.getScore}`)
                 
     });

      
     //for green bug collide with player
     this.physics.add.collider(gameState.bugs,player, () => {
        greenBugLoop.destroy();
        this.physics.pause();
        this.endScene()
});

 //for red bug collide with player
this.physics.add.collider(gameState.bugRed,player, () => {
    redBugLoop.destroy();
    this.physics.pause();
    this.endScene()
});

        //time counter for generating red bug and destroy green
         timer = setInterval(() => {
             console.log("time A " + seconds);
             seconds--;
             if (seconds < 0) {
                greenBugLoop.destroy();
                generateRedbug();
                 clearInterval(timer);
                 this.timer2();
             }
         }, 10000);
     }
     
      //time counter for destroying red bug and move to yellow  bug scene
     timer2()
     {
        timer2 = setInterval(() => {
            console.log("time B " + seconds2);
            seconds2--;
            if (seconds2 < 0) {
              redBugLoop.destroy();   
                clearInterval(timer2);
                this.moveToNextScene();
                
            }
        }, 10000);
     }

    //function for moving to next scene after surving green and red bug
    moveToNextScene()
    {
        
        if(seconds2 < 0)
        {
            this.add.text(240, 345, 'Survived green and red bug\n Click to meet yellow bug', { fontSize: '18px', fill: '#000000' })
            this.input.on("pointerup", () => {
                this.scene.stop("GameScene");
                this.scene.start('YellowBugScene');
              });
              //reset time
              seconds = 1;
              seconds2 = 1;
        }
    }

    //function get call when bug hit player and it's game over
    endScene()
    {
        //clear the timer to stop incoming bug and reset it
        clearInterval(timer);
        clearInterval(timer2);
        seconds = 1;
        seconds2 = 1;
        dieSound = this.sound.add("dieSound");
        gameOverSound = this.sound.add("gameOverSound");
        dieSound.play();
        gameOverSound.play();
        soundMain.stop();
        this.scene.stop('GameScene');
        this.scene.start('EndScene');
    }

    //yellow bug generate()
     generateYellowbug()
     {
         yellowBug = () => 
         {
             const xCoord = Math.random() * 640
             let randomBug = bugList[2];
             gameState.bugYellow.create(xCoord, 2, randomBug);   
         }

         yellowBugLoop = this.time.addEvent({
             delay: 1700,
             callback: yellowBug,
             loop: true,
         });
     }

     update()
     {
       
         player.movePlayer();
         if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) 
         {
            shootSound = this.sound.add("sound")
            shootSound.play();
            gameState.bullet.create(player.x, player.y, 'bullet').setGravityY(-400);
         }  
     }   
}
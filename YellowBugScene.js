//global variable used
let generateAmmo; 
class YellowBugScene extends Phaser.Scene {
    constructor() {
      super({
          key: 'YellowBugScene'
        })
    }

     //load all asset file to be used 
     preload()
     {
         const base = "image/";
         this.load.image('yellowBugScreen',`${base}yellowBugScreen.png`);
         this.load.spritesheet("player", `${base}player.png`, { frameWidth: 72, frameHeight: 90 });
         this.load.image("platform",`${base}platform.png`);
         this.load.image("bullet",`${base}bullet.png`);
         this.load.image("bugAmmo",`${base}bugBullet.png`);
         this.load.image('bugYellow', `${base}bugYellow.png`);
         this.load.image('bugYellowFlipped', `${base}bugYellowFlipped.png`);
         this.load.audio('boss',"sound/bossIntro.wav");
     }
     
     //set all the game object to be used in the create
     create()
     {   
            //add bg
            this.add.sprite(240, 320, 'yellowBugScreen');
            player =  new Player(this,355,500,"player").setScale(.8);
            
            let bossSound = this.sound.add("boss");
            bossSound.play();
            //create player bullet object groups
            gameState.bullet = this.physics.add.group();

            //create platform
            const platforms = this.physics.add.staticGroup();
            platforms.create(335,640,"platform");
        
            gameState.cursors = this.input.keyboard.createCursorKeys();

            //display score
            gameState.scoreText = this.add.text(325, 620, `Score: ${currentScore}`, {fontSize: '15px', fill: '#000000'});
            
            //helps to detect collision btw the platform and player
            player.setCollideWorldBounds(true);
            this.physics.add.collider(player, platforms);

            //create group of bugs
            gameState.bugs = this.physics.add.group();
            bugList = ['bugYellow', 'bugYellowFlipped'];
            
           //for displaying yellow bugs not affected by gravity
            //row
            for(let y = 1; y < 2; y++)
            {
                //column
                for(let x = 1; x < 9; x++)
                {   
                    gameState.bugs.create(80 * x, 95 * y,"bugYellow").setGravityY(-200);   
                }
            }

            //for yellow bug ammo which is flipped
            let bugAmmo = this.physics.add.group();
            generateAmmo = () =>
            {
                let randomBug = Phaser.Utils.Array.GetRandom(gameState.bugs.getChildren());
                bugAmmo.create(randomBug.x, randomBug.y, 'bugYellowFlipped');
                   
            }
            //bug ammo loop
            gameState.bugAmmoLoop =  this.time.addEvent({
                delay: 800,
                callback: generateAmmo,
                callbackScope: this,
                loop: true
            });

        //bug collide with platform set. after collide with platform increase score
        this.physics.add.collider(bugAmmo, platforms,  (bullet) => {
        bullet.destroy();	
        playerScore.setScore = 2;
        currentScore = playerScore.getScore;
        gameState.scoreText.setText(`Score: ${playerScore.getScore}`);
        })

        //for player bullets and collide with bug. After killing bug with bullet increase score
        this.physics.add.collider(gameState.bugs, gameState.bullet, (bug, bullet)=> {
            bug.destroy();
            bullet.destroy();
            playerScore.setScore = 1;
            currentScore = playerScore.getScore;
            gameState.scoreText.setText(`Score: ${playerScore.getScore}`);
        });
            
        //if yellow bug which is flipped touchs player game over  and play sounds 
        this.physics.add.collider(bugAmmo, player, () => {
            gameState.bugAmmoLoop.destroy();
            this.scene.stop("YellowBugScene");
            this.scene.start('EndScene');
            dieSound.play();
            gameOverSound.play();

        });
        
     }
   
     update()
     {
         player.movePlayer();
         //for player shooting
         if (Phaser.Input.Keyboard.JustDown(gameState.cursors.space)) 
         {
            gameState.bullet.create(player.x, player.y, 'bullet').setGravityY(-400);
            shootSound.play();
         }  
         //if no remaining bugs you won
         if(this.numOfTotalBugs() === 0)
         {
           this.physics.pause();
           gameState.scoreText = this.add.text(240, 318, `Your Score: ${currentScore}`, {fontSize: '18px', fill: '#FFFFFF'});
           this.add.text(240, 345, 'You have Won \n Refresh to Start Again', { fontSize: '18px', fill: '#FFFFFF' });
         }
     }   

     // returns the number of total yellow bugs 
    numOfTotalBugs() 
    {
	    const totalBug = gameState.bugs.getChildren().length;
        return totalBug;
    }
}
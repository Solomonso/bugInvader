class Player extends Phaser.Physics.Arcade.Sprite
 {
    constructor(scene, x, y,texture,frame)
    {
        super(scene,x,y,texture,frame);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        scene.physics.world.enableBody(this);
        
    }
    
    movePlayer()
    {
        if(gameState.cursors.right.isDown)
        {
            player.setVelocityX(160);
        }

        else if(gameState.cursors.left.isDown)
        {
            player.setVelocityX(-160);
        }
        else
        {
            player.setVelocityX(0);
        }

            
    }   
}
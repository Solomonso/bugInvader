export class Bug extends Phaser.Physics.Arcade.Sprite
 {
    constructor(scene, x, y,texture,frame)
    {
        super(scene,x,y,texture,frame);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        scene.physics.world.enableBody(this);
    }
}
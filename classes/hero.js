class Hero extends Phaser.GameObjects.Sprite {
  constructor(config) {
    super(config.scene, config.x, config.y, config.key, 0);
    config.scene.physics.world.enable(this);
    // this.setCollideWorldBounds(true);
    config.scene.add.existing(this);
    this.acceleration = 50;
    this.jumpVelocity = 150
    this.body.maxVelocity.x = 100;
    this.body.maxVelocity.y = 200;
    this.body.setSize(6, 12, false)
    this.body.setOffset(51, 36)
    this.play('hero_anim_idle')
  }
  move() {

  }
}
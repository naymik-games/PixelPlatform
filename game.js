let game;
let jumping = false;
let standing = false

var tiles
window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 820,
      height: 450
    },
    physics: {
      default: 'arcade',
      arcade: {
        fps: 120,
        gravity: { y: 300 },
        debug: false
      }
    },
    pixelArt: true,
    scene: [preloadGame, startGame, playGame, UI]
  }
  game = new Phaser.Game(gameConfig);
  window.focus();
}
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////
class playGame extends Phaser.Scene {
  constructor() {
    super("playGame");
  }
  preload() {


  }
  create() {

    // this.structureText = this.add.text(25, game.config.height - 112, '', { fontFamily: 'Gamer', fontSize: '90px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

    this.cameras.main.setBackgroundColor(0x333333);
    this.cameras.main.setZoom(4)

    //create our tilemap
    this.map = this.make.tilemap({ key: 'map' });
    console.log(this.map)
    this.map.setCollisionBetween(1, 600);
    this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    //set the tileset to use using the name of the tileset in tiled and the name of our tilesheet in preload
    tiles = this.map.addTilesetImage('tileset', 'tiles');
    //create layers from their names in tiled.
    this.ground = this.map.createLayer('terrain', tiles, 0, 0);

    this.player = new Hero({
      scene: this,
      key: 'hero_idle',
      x: 8 * 6,
      y: 48
    });

    /*  this.player = this.physics.add.sprite(200, 50, 'hero_idle', 0)
     this.player.body.setSize(6, 12, false)
     this.player.body.setOffset(51, 36); */
    //this.player.setCollideWorldBounds(true);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);



    this.physics.add.collider(this.player, this.ground);
    /* this.input.on("pointerdown", this.gemSelect, this);
     this.input.on("pointermove", this.drawPath, this);
     this.input.on("pointerup", this.removeGems, this);
    */
    //this.check = this.add.image(725, 1000, 'check').setScale(.7);
  }
  update() {
    standing = this.player.body.blocked.down || this.player.body.touching.down;
    if (dpad.left) {
      //if hero is on ground then use full acceleration
      if (standing) {
        this.player.body.setAccelerationX(-this.player.acceleration);
      }
      //if hero is in the air then accelerate slower
      else {
        this.player.body.setAccelerationX(-this.player.acceleration / 3);
      }
    }
    //same deal but for right arrow
    else if (dpad.right) {
      if (this.standing) {
        this.player.body.setAccelerationX(this.player.acceleration);
      } else {
        this.player.body.setAccelerationX(this.player.acceleration / 3);
      }
    }
    //if neither left or right arrow is down then...
    else {
      //if hero is close to having no velocity either left or right then set velocity to 0. This stops jerky back and forth as the hero comes to a halt. i.e. as we slow hero down, below a certain point we just stop them moving altogether as it looks smoother
      if (Math.abs(this.player.body.velocity.x) < 10 && Math.abs(this.player.body.velocity.x) > -10) {
        this.player.body.setVelocityX(0);
        this.player.body.setAccelerationX(0);
      }
      //if our hero isn't moving left or right then slow them down 
      else {
        //this velocity.x check just works out whether we are setting a positive (going right) or negative (going left) number  
        this.player.body.setAccelerationX(((this.player.body.velocity.x > 0) ? -1 : 1) * this.player.acceleration / 3);
      }
    }


    if (standing && dpad.red && (!jumping)) {
      this.player.body.setVelocityY(-this.player.jumpVelocity);
      jumping = true;
      dpad.red = false
    } else if (!dpad.red) {
      dpad.red = false
      if (standing) {
        jumping = false;
      }
    }


  }
  movement(direction) {
    //if left key is down then move left

  }
  addScore() {
    this.events.emit('score');
  }
}

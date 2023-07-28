let dpad = {
  up: false,
  down: false,
  right: false,
  left: false,
  red: false,
  green: false
}
class UI extends Phaser.Scene {

  constructor() {

    super("UI");
  }
  preload() {



  }
  create() {

    /* this.header = this.add.image(game.config.width / 2, 15, 'blank').setOrigin(.5, 0).setTint(0x3e5e71);
    this.header.displayWidth = 870;
    this.header.displayHeight = 200; */


    this.score = 0;
    this.scoreText = this.add.bitmapText(85, 100, 'topaz', this.score, 80).setOrigin(.5).setTint(0xcbf7ff).setAlpha(1);





    this.Main = this.scene.get('playGame');
    this.Main.events.on('score', function () {

      this.score += 1;
      //console.log('dots ' + string)
      this.scoreText.setText(this.score)
    }, this);
    //  width: 820,
    //   height: 450
    this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
      x: 75,
      y: 375,
      radius: 100,
      base: this.add.circle(0, 0, 50, 0x888888),
      thumb: this.add.circle(0, 0, 25, 0xcccccc),
      dir: '8dir',   //'8dir' 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
      // forceMin: 16,
      // enable: true
    }).on('update', this.dumpJoyStickState, this)

    this.text = this.add.text(410, 200, '', { fontFamily: 'Courier', fontSize: 15, color: '#00ff00' });
    var print = this.add.text(0, 200, '', { fontFamily: 'Courier', fontSize: 15, color: '#00ff00' });
    var sprite = this.add.circle(670, 375, 25).setStrokeStyle(5, 0xff0000);
    var sprite2 = this.add.circle(745, 375, 25).setStrokeStyle(5, 0x00ff00);
    this.input.addPointer(1);
    var btn = this.plugins.get('rexbuttonplugin').add(sprite, {
      // enable: true,
      mode: 0,              // 0|'press'|1|'release'
      // clickInterval: 100    // ms
      // threshold: undefined
    });


    /*    btn.on('down', function (button, gameObject, event) {
         print.text = 'Red Down';
         dpad.red = true
         //dpad.red = false
       }, this) */
    /*     btn.on('up', function (button, gameObject, event) {
          print.text = 'Red Up';
          dpad.red = false
        }, this) */
    btn.on('click', function () {
      print.text = 'Red Down';
      dpad.red = true
    })
    var btn2 = this.plugins.get('rexbuttonplugin').add(sprite2, {
      // enable: true,
      mode: 0,              // 0|'press'|1|'release'
      // clickInterval: 100    // ms
      // threshold: undefined
    });
    btn2.on('click', function () {
      print.text += 'Click Button Green\n';
    })
  }

  update() {

  }
  dumpJoyStickState() {
    if (this.joyStick.left) {
      //console.log('left')
      dpad.left = true

    } else if (this.joyStick.right) {
      //console.log('right')
      dpad.right = true

    } else {
      dpad.left = false
      dpad.right = false
    }
    if (this.joyStick.up) {
      dpad.up = true
    } else {
      dpad.up = false
    }
    /* else if (this.joyStick.up) {
      console.log('up')
    } else if (this.joyStick.down) {
      console.log('down')
    } */
    var cursorKeys = this.joyStick.createCursorKeys();
    var s = 'Key down: ';
    for (var name in cursorKeys) {
      if (cursorKeys[name].isDown) {
        s += `${name} `;
      }
    }

    s += `
Force: ${Math.floor(this.joyStick.force * 100) / 100}
Angle: ${Math.floor(this.joyStick.angle * 100) / 100}
`;

    s += '\nTimestamp:\n';
    for (var name in cursorKeys) {
      var key = cursorKeys[name];
      s += `${name}: duration=${key.duration / 1000}\n`;
    }

    this.text.setText(s);
  }


}
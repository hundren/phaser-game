var game = new Phaser.Game(640, 960, Phaser.CANVAS, '', { preload:
 preload, create: create, update: update });

function preload() {
 	 game.load.spritesheet('smplayer', './assets/smr.png', 32, 49);
}

var platforms;
var player;
var cursors;
var stars;
var score = 0;
var scoreText;

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
 	player = game.add.sprite(32, 32, 'smplayer');
 	player.animations.add('up', [0, 1, 2, 3], 10, true);
 	player.animations.add('left', [5, 6, 7, 8], 10, true);
    player.animations.add('right', [9, 10,11, 12], 10, true);
    player.animations.add('down', [13, 14,15, 16], 10, true);
    game.physics.arcade.enable(player);
  	player.body.bounce.y = 0.2;
  	player.body.gravity.y = 300;
  	player.body.collideWorldBounds = true;
  	cursors = game.input.keyboard.createCursorKeys();
  	// pad=game.Plugin.VirtualJoystick();
  	// 画面全屏
  	game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	game.scale.pageAlignHorizontally = true;
	game.scale.pageAlignVertically = true;
	// game.scale.setScreenSize(true);
}

function update(){
	if (cursors.left.isDown) {
    player.body.velocity.x = -150;
    player.animations.play('left');
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 150;
    player.animations.play('right');
  } else {
    player.animations.stop();
    player.frame = 4;
  }
}

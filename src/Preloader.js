Candy.Preloader = function(game){
	// define width and height of the game
	Candy.GAME_WIDTH = 640;
	Candy.GAME_HEIGHT = 960;
};
Candy.Preloader.prototype = {
	preload: function(){
		// set background color and preload image
		this.stage.backgroundColor = '#B4D9E7';
		this.preloadBar = this.add.sprite((Candy.GAME_WIDTH-311)/2, (Candy.GAME_HEIGHT-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		// load images
		this.load.image('background', 'img/background.png');
		this.load.image('floor', 'img/floor.png');
		this.load.image('monster-cover', 'img/monster-cover.png');
		this.load.image('title', 'img/title.png');
		this.load.image('game-over', 'img/gameover.png');
		this.load.image('score-bg', 'img/score-bg.png');
		this.load.image('life', 'img/life.png');
		this.load.image('button-tryagain', 'img/tryagain.png');
		this.load.image('button-pause', 'img/button-pause.png');
		this.load.image('monsterLife', 'img/greenLife.png');
		this.load.image('monsterLifeBg', 'img/greenLifeBg.png');
		this.load.image('light', 'img/comeLight.png');
		// 美少女点击按钮
		this.load.image('canpush', 'img/wa.png');
		this.load.image('cannotpush', 'img/wb.png');
		this.load.image('cannotpush2', 'img/wb2.png');
		this.load.image('cannotpush3', 'img/wb3.png');
		this.load.image('cannotpush4', 'img/wb4.png');
		// load spritesheets
		this.load.spritesheet('candy', 'img/candy.png', 82, 98);
		this.load.spritesheet('monster-idle', 'img/monster-idle.png', 103, 131);
		this.load.spritesheet('salior', 'img/salior.png', 32, 48);
		this.load.spritesheet('saliorLife', 'img/life.png', 289, 45);
		this.load.spritesheet('button-start', 'img/button-start.png', 401, 143);
  		this.load.atlasJSONHash("player1", "img/char.png", "img/char.json");
    	this.load.atlasJSONHash("coins", "img/coins.png", "img/coins.json");
	},
	create: function(){
		// start the MainMenu state
		this.state.start('MainMenu');
	}
};
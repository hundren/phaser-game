Candy.MainMenu = function(game){
	audioButton = null;
	audioStatus = true;
};
Candy.MainMenu.prototype = {
	create: function(){
		// display images
		this.add.sprite(0, 0, 'background');
		this.add.sprite(-130, Candy.GAME_HEIGHT-514, 'monster-cover');
		this._fontStyle = { font: "40px ComicBook", fill: "#FFCC00", stroke: "#642e06", strokeThickness:8, align: "left" ,fontStyle:'italic'};
		text = this.game.add.text(50, 100, "点击怪兽!                    消灭它! ", this._fontStyle);
		text2 = this.game.add.text(50, 240, "小心!! ", { font: "70px ComicBook", fill: "#FFCC00", stroke: "#642e06", strokeThickness:8, align: "left" ,fontStyle:'italic'});
		text3 = this.game.add.text(50, 370, "掉下来的蛋糕。 ", this._fontStyle);
		text4 = this.game.add.text(320, 600, "因为\n吃太多你会变胖。 ", this._fontStyle);
		monster = this.add.sprite(260, 60, "player1", "SlimeMonster01");
		cake = this.add.sprite(400,260,'candy',4);
		monster.scale.setTo(0.7, 0.7);
		cake.scale.setTo(1.7, 1.7);
		// this.add.sprite((Candy.GAME_WIDTH-300)/2, 60, 'title');
		// add the button that will start the game
		this.add.button(Candy.GAME_WIDTH-401-10, Candy.GAME_HEIGHT-143-10, 'button-start', this.startGame, this, 1, 0, 2);
		// this.startGame(this);
		// 音乐按键
		audioButton = this.add.button(Candy.GAME_WIDTH-111-10, 10, 'button-audio', this.manageAudio, this);
		audioButton.animations.add('true', [0], 10, true);
		audioButton.animations.add('false', [1], 10, true);
		audioButton.animations.play('true');

	
		storageAPI.initUnset('audio',true);
		var audioStatus = storageAPI.get('audio');
		audioButton.animations.play(audioStatus);
		// 音效
		fx = this.add.audio('bgm');
		fx.play('',0,1,true,false);
	},
	startGame: function() {
		// start the Game state
		this.state.start('Game');
		document.getElementById('adTitle').style.display='none'
	},
	manageAudio: function() {
		audioStatus =! audioStatus;
		audioButton.animations.play(''+audioStatus);
		storageAPI.set('audio',audioStatus);
		audioStatus?fx.play('',0,1,true,false):fx.stop();
	}
};
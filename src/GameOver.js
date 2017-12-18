Candy.GameOver = function (game){this.audioStatus = true;}
Candy.GameOver.prototype = {
	create: function(){
		this.add.sprite(0, 0, 'background');
        // this.add.sprite(-130, Candy.GAME_HEIGHT-514, 'monster-cover');
        this.add.sprite((Candy.GAME_WIDTH-594)/2, 80, 'game-over'); 
        this.add.button((Candy.GAME_WIDTH-363)/2, Candy.GAME_HEIGHT-131-200, 'button-tryagain', this.startGame, this);this.audioStatus  = storageAPI.get('audio');
		fx.stop();   
        var gameover = this.add.audio('gameover');
        gameover.play();
    },
    startGame: function() {
		// start the Game state
        this.state.start('Game');
		this.audioStatus?fx.play('',0,1,true,false):fx.stop();
	}
};
Candy.GameOver = function (game){}
Candy.GameOver.prototype = {
	create: function(){
		this.add.sprite(0, 0, 'background');
        // this.add.sprite(-130, Candy.GAME_HEIGHT-514, 'monster-cover');
        this.add.sprite((Candy.GAME_WIDTH-594)/2, 80, 'game-over'); 
        this.add.button((Candy.GAME_WIDTH-363)/2, Candy.GAME_HEIGHT-131-200, 'button-tryagain', this.startGame, this);       
    },
    startGame: function() {
		// start the Game state
		this.state.start('Game');
	}
};
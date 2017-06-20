var easeInSpeed = function(x){
        return x * Math.abs(x) / 2000;
    };
var reg = {};
Candy.Game = function(game){
	// define needed variables for Candy.Game
	this._player = null;
	this._candyGroup = null;
	this._spawnCandyTimer = 0;
	this._fontStyle = null;
	this._drag = null;
	this.monster = null;
	this._playerFirstPosition=280;
	// define Candy variables to reuse them in Candy.item functions
	Candy._scoreText = null;
	Candy._score = 0;
	Candy._health = 0;
	Candy._battleHowls = [
		"PAM!",
		"BAM!",
		"BANG!",
		"BIFF!",
		"BLOOP!",
		"BONK!",
		"CLASH!",
		"CRASH!",
		"KAPOW!",
		"OOOFF!",
		"POW!",
		"WHACK!",
		"WHAMM!",
		"ZAM!",
		"ZLOPP!",
		"ZZWAP!",
		"WHAP!",
		"UGGH!",
		"THWACK!"
		];
};
Candy.Game.prototype = {
	create: function(){
		//插入全屏操作插件
		this.game.touchControl = this.game.plugins.add(Phaser.Plugin.TouchControl);
        this.game.touchControl.inputEnable();
		// start the physics engine
		this.physics.startSystem(Phaser.Physics.ARCADE);
		// set the global gravity
		this.physics.arcade.gravity.y = 200;
		// display images: background, floor and score
		this.add.sprite(0, 0, 'background');
		this.add.sprite(-30, Candy.GAME_HEIGHT-160, 'floor');
		this.add.sprite(10, 5, 'score-bg');
		// add pause button
		this.add.button(Candy.GAME_WIDTH-96-10, 5, 'button-pause', this.managePause, this);
		// create the player
		this._player = this.add.sprite(280, 760, 'monster-idle');
		//player加入物理引擎
		// this.game.physics.enable(this._player, Phaser.Physics.ARCADE);
		// this._player.body.collideWorldBounds = true;
		// this._player.body.bounce.y = 0.8;
		// this._player.body.bounce.x = 1;
		// this._player.body.gravity.y = 50;
		// add player animation
		this._player.animations.add('idle', [0,1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
		// play the animation
		this._player.animations.play('idle');
		// set font style
		this._fontStyle = { font: "40px Arial", fill: "#FFCC00", stroke: "#333", strokeThickness: 5, align: "center" };
		// initialize the spawn timer
		this._spawnCandyTimer = 0;
		// initialize the score text with 0
		Candy._scoreText = this.add.text(120, 20, "0", this._fontStyle);
		// set health of the player
		Candy._health = 10;
		// create new group for candy
		this._candyGroup = this.add.group();
		// spawn first candy
		Candy.item.spawnCandy(this);
		// 插入拖动模块
		// Candy.drag.moveDrag(this);
		this.drag = this.add.sprite(280, 400, 'drag');
		this.drag.inputEnabled = true;
		this.drag.input.enableDrag();
		// 加入怪兽
    	this.monster = this.add.sprite(0, 0, "player1", "SlimeMonster01");
    	this.monster.scale.setTo(0.6, 0.6);
    	this.monster.x = this.game.width / 2 - this.monster.width / 2;
    	this.monster.y = this.monster.height - 6;
    	this.monster.animations.add("idles", ["SlimeMonster01", "SlimeMonster02"], 4, true, true);
    	this.monster.animations.play("idles");
   	    this.monster.inputEnabled = true;
   	    this.monster.events.onInputDown.add(function() {
	        var dmg = this.game.rnd.integerInRange(100, 1000);
	        var timeToLive = 200;
	        var masterEffect="physics";
	        var effect = masterEffect;
	        var bg = false;
	        var bgColor = 0xfec72a;
	        if (dmg > 800) {
	            effect = masterEffect === "smoke" ? "explode" : "smoke";
	            timeToLive = 600;
	            dmg = Phaser.ArrayUtils.getRandomItem(Candy._battleHowls);
	        }
	        if(masterEffect === "physics") {
	            bg = true;
	        }
	        var rand = this.game.rnd.integerInRange(0,1);
	        var val = this.monster.x + (this.monster.width * rand);
	        var targetX = val;
	        
	        new FloatingText(this, {
	            text: dmg,
	            // sprite: coins,
	            // spriteAnimationName:"idle",
	            spriteAnimationFrames: Phaser.Animation.generateFrameNames("Coins-", 1, 7, '', 0),
	            spriteAnimationFrameRate: 14,
	            animation: effect,
	            textOptions: {
	                fontSize: 32,
	                fill: "#ff18aa",
	                stroke: "#ffffff",
	                strokeThickness: 1,
	                wordWrap: true,
	                wordWrapWidth: 200,
	                font: "Luckiest Guy"
	            },
	            // spriteAnchor: 0.5,
	            // rotation: 15,
	            hasBackground: bg,
	            backgroundColor: bgColor,
	            x: this.monster.x + this.monster.width / 2,
	            y: this.monster.y - 20,
	            timeToLive: timeToLive
	        })
	    }, this);
	},
	managePause: function(){
		// pause the game
		this.game.paused = true;
		// add proper informational text
		var pausedText = this.add.text(100, 250, "Game paused.\nTap anywhere to continue.", this._fontStyle);
		// set event listener for the user's click/tap the screen
		this.input.onDown.add(function(){
			// remove the pause text
			pausedText.destroy();
			// unpause the game
			this.game.paused = false;
		}, this);
	},
	update: function(){
            var speed = this.game.touchControl.speed;
            // console.log("xx",speed.tap);
            if(speed.x==0){
            	this._playerFirstPosition=this._player.position.x;
            }
            this._player.position.x=speed.x+this._playerFirstPosition;
            this._player.position.y+=2.2;
            // 坐标限制让它不要超出屏幕
            if(this._player.position.x<0){
            	this._player.position.x=0;
            }
            if(this._player.position.x>534){
            	this._player.position.x=534;
            }
            if(this._player.position.y>760){
            	this._player.position.y=760;
            }
            // 限制角色跳的高度
            if(this._player.position.y<230){
            	this._player.position.y=230;
            }
            if(this._player.position.y==230){
            console.log("playy",this._player.position.y);
            	var dmg = this.game.rnd.integerInRange(100, 1000);
		        var timeToLive = 200;
		        var masterEffect="physics";
		        var effect = masterEffect;
		        var bg = false;
		        var bgColor = 0xfec72a;
		        if (dmg > 800) {
		            effect = masterEffect === "smoke" ? "explode" : "smoke";
		            timeToLive = 600;
		            dmg = Phaser.ArrayUtils.getRandomItem(Candy._battleHowls);
		        }
		        if(masterEffect === "physics") {
		            bg = true;
		        }
		        var rand = this.game.rnd.integerInRange(0,1);
		        var val = this.monster.x + (this.monster.width * rand);
		        var targetX = val;
		        
		        new FloatingText(this, {
		            text: dmg,
		            // sprite: coins,
		            // spriteAnimationName:"idle",
		            spriteAnimationFrames: Phaser.Animation.generateFrameNames("Coins-", 1, 7, '', 0),
		            spriteAnimationFrameRate: 14,
		            animation: effect,
		            textOptions: {
		                fontSize: 32,
		                fill: "#ff18aa",
		                stroke: "#ffffff",
		                strokeThickness: 1,
		                wordWrap: true,
		                wordWrapWidth: 200,
		                font: "Luckiest Guy"
		            },
		            // spriteAnchor: 0.5,
		            // rotation: 15,
		            hasBackground: bg,
		            backgroundColor: bgColor,
		            x: this.monster.x + this.monster.width / 2,
		            y: this.monster.y - 20,
		            timeToLive: timeToLive
		        })
            }
            // console.log("playx",this._player.position.x);
            // console.log("playy",this._player.position.y);
       //**********
       //增加player高度
       //**********
       if(speed.tap==1){
       		speed.tap=0;
       		this._player.position.y-=50.2;
       }
		// update timer every frame
		this._spawnCandyTimer += this.time.elapsed;
		// if spawn timer reach one second (1000 miliseconds)
		if(this._spawnCandyTimer > 1000) {
			// reset it
			this._spawnCandyTimer = 0;
			// and spawn new candy
			Candy.item.spawnCandy(this);
		}
		// loop through all candy on the screen
		this._candyGroup.forEach(function(candy){
			// to rotate them accordingly
			candy.angle += candy.rotateMe;
		});
		
	}
};

Candy.item = {
	spawnCandy: function(game){
		// calculate drop position (from 0 to game width) on the x axis
		var dropPos = Math.floor(Math.random()*Candy.GAME_WIDTH);
		// define the offset for every candy
		var dropOffset = [-27,-36,-36,-38,-48];
		// randomize candy type
		var candyType = Math.floor(Math.random()*5);
		// create new candy
		var candy = game.add.sprite(dropPos, dropOffset[candyType], 'candy');
		// add new animation frame
		candy.animations.add('anim', [candyType], 10, true);
		// play the newly created animation
		candy.animations.play('anim');
		// enable candy body for physic engine
		game.physics.enable(candy, Phaser.Physics.ARCADE);
		candy.body.collideWorldBounds = true;
		candy.body.bounce.y = 0.8;
		candy.body.bounce.x = 1;
		// enable candy to be clicked/tapped
		candy.inputEnabled = true;
		// add event listener to click/tap
		candy.events.onInputDown.add(this.clickCandy, this);
		// be sure that the candy will fire an event when it goes out of the screen
		candy.checkWorldBounds = true;
		// reset candy when it goes out of screen
		candy.events.onOutOfBounds.add(this.removeCandy, this);
		// set the anchor (for rotation, position etc) to the middle of the candy
		candy.anchor.setTo(0.5, 0.5);
		// set the random rotation value
		candy.rotateMe = (Math.random()*4)-2;
		// add candy to the group
		game._candyGroup.add(candy);
	},
	clickCandy: function(candy){
		// kill the candy when it's clicked
		candy.kill();
		// add points to the score
		Candy._score += 1;
		// update score text
		Candy._scoreText.setText(Candy._score);
	},
	removeCandy: function(candy){
		// kill the candy
		candy.kill();
		// decrease player's health
		Candy._health -= 10;
	}
};
// 拖动模块
Candy.drag={
	moveDrag: function(game){
		var drag = game.add.sprite(280, 900, 'drag');
		drag.inputEnabled = true;
		drag.input.enableDrag();
		// drag.input.allowVerticallyDrag = false;
	}
}
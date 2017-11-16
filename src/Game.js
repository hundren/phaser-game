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
	this.monsterLife = null;
	this.hitCount = 0;
	this.coins = null;
	this.light = null;
	this.showLight = true;
	this.mosterDirection = "right";
	this._playerFirstPosition = 280;
	this.trun = true;
	this.nopush = null;
	this.canpush = null;
	//中心蓄力圆圈
	Candy.circle = null;
	Candy.angle = { min: 1.6, max: 1.6 };
	// 背景圆
	Candy.circleBg = null;
	// 背景圆半径
	Candy.outside = 58;
	Candy.setBig = true;
	// define Candy variables to reuse them in Candy.item functions
	Candy._scoreText = null;
	Candy._score = 0;
	Candy._health = 0;
	Candy.killTime = 0;
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
		//加入蓄力圆圈
		Candy.circleBg = this.game.add.graphics(0,0);
		Candy.circleBg.clear();
		Candy.circleBg.lineStyle(20, 0x0b1638);
		Candy.circleBg.arc(0, 0, 56, 0, 7, false, 128);
		Candy.circleBg.endFill();
		Candy.circle = this.game.add.graphics(0, 0);
		// this.circleBg.enableDrag();
		//加入美少女按钮
		this.canpush = this.add.sprite((this.game.width / 2), this.game.height / 1.5, 'canpush');
		this.canpush.anchor.set(0.5);
		this.canpush.smoothed = false;
		this.canpush.inputEnabled = true;
		this.canpush.events.onInputDown.add(function() {
			console.log('dd');
			this.resetPower();
		},this)
		this.add.tween(this.canpush.scale).to( { x: 1.5, y: 1.5 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
		this.canpush.visible = false;
		this.nopush = this.add.sprite((this.game.width / 2)-50, this.game.height / 1.5-50, 'cannotpush');
		this.nopush.inputEnabled = true;
		this.nopush.input.enableDrag();
		this.game.physics.enable(this.nopush, Phaser.Physics.ARCADE);
		this.nopush.body.allowGravity = false;
		this.nopush.body.immovable = true;
		//加入怪兽血条
		this.monsterLife=this.add.sprite(0, 0, 'monsterLife');
		this.monsterLife.health=100;
		this.monsterLife.crop(new Phaser.Rectangle(0, 0, 100, 10));
		this.monsterLife.x = this.game.width / 2;
    	this.monsterLife.y = this.monsterLife.height + 90;
		// 加入硬币
		this.coins = this.add.sprite(0,0,"coins","Coins-1");
	    this.coins.anchor.setTo(0.5);
	    this.coins.animations.add('idle', Phaser.Animation.generateFrameNames("Coins-", 1, 7, '', 0), 14, true, true);
	    this.coins.visible = false;
	    // 加入怪兽吸引光线
	    this.light = this.add.sprite(100,250,"light")
	    this.light.scale.setTo(2.6);
	    this.light.visible = false;
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
				// sprite: this.coins,
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
			// 血条减少
			if(this.monsterLife.cropRect.width>0){
				this.monsterLife.cropRect.width -= 0.5;
			}
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
	resetPower: function(){
		this.canpush.visible = false;
		this.nopush.visible = true;
		Candy.circleBg.visible = true;
		this.nopush.visible = true;
		Candy.angle.max = 1.6;
		Candy.circle.lineStyle(10, 0xfcbf1f);
		Candy.circle.clear();
		Candy.circle.arc(0, 0,55, 1.6, 1.6, false,128);
		Candy.circle.endFill();
		var that = this;
		console.log('groupLength',this._candyGroup)
		this._candyGroup.forEach(function(candy){
			candy.kill();
			// add points to the score
			Candy._score += 1;
			// update score text
		})
		Candy._scoreText.setText(Candy._score);
		
	},
	update: function(){
            var speed = this.game.touchControl.speed;
            //打击计数器
            this.hitCount+=1;
            // console.log("xx",speed.tap);
            // if(speed.x==0){
            // 	this._playerFirstPosition=this._player.position.x;
            // }
            // this._player.position.x=speed.x+this._playerFirstPosition;
            // this._player.position.y+=2.2;
            // // 坐标限制让它不要超出屏幕
            // if(this._player.position.x<0){
            // 	this._player.position.x=0;
            // }
            // if(this._player.position.x>534){
            // 	this._player.position.x=534;
            // }
            // if(this._player.position.y>760){
            // 	this._player.position.y=760;
            // }
            // // 限制角色跳的高度
            // if(this._player.position.y<230){
            // 	this._player.position.y=230;
            // }
       //**********
       //增加player高度
       //**********
       if(speed.tap==1){
       		// speed.tap=0;
       		// this._player.position.y-=3.9;
       }
	   // 圆圈自减
	//    Candy.angle.max = 8;
       if(Candy.angle.max>1.6 && Candy.angle.max<8){
			Candy.circleBg.visible = true;
       		Candy.angle.max-=0.005;
			Candy.circle.clear();
		    Candy.circle.lineStyle(10, 0xfcbf1f);
		    if(Candy.angle.max>1.6){
		    Candy.circle.arc(0, 0,55, Candy.angle.min, Candy.angle.max, false,128);
		    }
			// console.log('out',Candy.angle.max);
			Candy.circle.endFill();
			
	   }
	// 圆圈满了高亮
	   else if(Candy.angle.max >= 8){
		this.canpush.visible = true;
		this.nopush.visible = false;
		Candy.circleBg.visible = false;
		function setBigger(outbig){
			Candy.circle.clear();
			Candy.circle.lineStyle(10, 0xffffff,0.4);
			Candy.circle.arc(0, 0, outbig, 0, 7, false, 128);
			Candy.circle.endFill();	
		}
		if(Candy.setBig){
			if(Candy.outside>=58 && Candy.outside<117){
	 			Candy.outside += 0.5;
			}else if(Candy.outside>=117){
				Candy.outside -= 0.5;
				Candy.setBig = false;
			}
		}else{
			if(Candy.outside>58 && Candy.outside<117){
				Candy.outside -= 0.5;
		   }else if(Candy.outside<=58){
			   Candy.outside += 0.5;
			   Candy.setBig = true;
		   }
		}
		setBigger(Candy.outside);
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
		// 吃了蛋糕
		var that=this;
		// console.log(this._candyGroup)
		this._candyGroup.forEach(function(candy){
			// to rotate them accordingly
			candy.angle += candy.rotateMe;
			//吃掉下来的蛋糕，死了的蛋糕玩家不能吃
			if(candy.position.x<(that._player.position.x+that._player.width)&&candy.position.x>(that._player.position.x)&&candy.position.y>(that._player.position.y)&&candy.position.y<(that._player.position.y+that._player.height)&&candy.alive){
					that._candyGroup.removeChild(candy);
					// Candy._score += 1;
					// Candy._scoreText.setText(Candy._score);
			}
			// 死了的蛋糕就给怪物吃
			if(!candy.alive){
				if(candy.position.x<(that.monster.position.x+that.monster.width)&&
				candy.position.x>that.monster.position.x&&candy.position.y>that.monster.position.y&&candy.position.y<(that.monster.position.y+that.monster.height)){
					that._candyGroup.removeChild(candy);
					if(that.monsterLife.cropRect.width+30<100){
						that.monsterLife.cropRect.width+=30;
					}else{
						that.monsterLife.cropRect.width=100;
					}
				}else if(candy.position.y<candy.height-40){
					that._candyGroup.removeChild(candy);
				}
			}
		
		});	
		//互相物理碰撞开关
		this.game.physics.arcade.collide(this.nopush,this._candyGroup);
	
		this.monsterLife.x=this.monster.x+23;
		this.light.x=this.monster.x-90;
		var lightRan=Math.floor(Math.random()*200);
		// var lightRan=25;
		if(lightRan==25){
			this.light.visible=true;
			this.showLight=false;
			setTimeout(function(){
				that.showLight=true;
			},2000);
			//吸起不弹起来的蛋糕
		this._candyGroup.forEach(function(candy){
			// console.log('candyheight',candy.height,'candyy',candy.position.y,'gameheight',that.game.height);
			if(candy.position.y>(that.game.height-candy.height)&&(candy.position.x>that.monster.x&&candy.position.x<that.monster.x+180)){
				// candy.position.y-=20;
				candy.body.gravity.y = -350;
				candy.alive = false;
			}	
		})
		}else{
			if(this.showLight){
					this.light.visible=false;
				// 怪兽x坐标随机移动
				if(this.mosterDirection=='right'){
					this.monster.x+=0.9;
					if(this.monster.x>(this.game.width-this.monster.width)){
						this.mosterDirection='left';
					}
				}else{
					this.monster.x-=0.9;
					if(this.monster.x<0){
						this.mosterDirection='right';
					}
				}
			}
			
		}
        this.monsterLife.updateCrop();
		// 吃蛋糕
  		this.physics.arcade.overlap(this._player, this._candyGroup, this.collectStar);
		// 按钮拖动跟随一起运动
		this.canpush.position.x = this.nopush.position.x + 50;
		this.canpush.position.y = this.nopush.position.y + 50;
		Candy.circleBg.position.x = this.nopush.position.x + 50;
		Candy.circleBg.position.y = this.nopush.position.y + 50;
		Candy.circle.position.x = this.nopush.position.x + 50;
		Candy.circle.position.y = this.nopush.position.y + 50;
	},

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
		candy.body.velocity.x = 10 + Math.random() * 40;
		candy.body.bounce.y = 0.8;
		candy.body.bounce.x = 1;
		// candy.body.bounce.setTo(0.8);
		// enable candy to be clicked/tapped
		candy.inputEnabled = true;
		//设置candy alive为true
		candy.alive = true;
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
		// 点中一个蛋糕加一个能量
		//圆圈增加
		if(Candy.angle.max <= 8 ){
			Candy.angle.max+=0.5;
			Candy.circle.clear();
			Candy.circle.lineStyle(10, 0xfcbf1f);
			Candy.circle.arc(0, 0, 55, Candy.angle.min, Candy.angle.max, false, 128);
			Candy.circle.endFill();
		}
	},
	removeCandy: function(candy){
		// kill the candy
		candy.kill();
		// decrease player's health
		Candy._health -= 10;
	}
};

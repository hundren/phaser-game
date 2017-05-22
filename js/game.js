/* global Phaser */
/* global BasicGame */

(function(BasicGame) {
    'use strict';

    BasicGame.Game = function () {

        //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

        /*this.game;        //  a reference to the currently running game
        this.add;       //  used to add sprites, text, groups, etc
        this.camera;    //  a reference to the game camera
        this.cache;     //  the game cache
        this.input;     //  the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
        this.load;      //  for preloading assets
        this.math;      //  lots of useful common math operations
        this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc
        this.stage;     //  the game stage
        this.time;      //  the clock
        this.tweens;    //  the tween manager
        this.world;     //  the game world
        this.particles; //  the particle manager
        this.physics;   //  the physics manager
        this.rnd;       //  the repeatable random number generator
    */
        //  You can use any of these from any function within this State.
        //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    };

    var easeInSpeed = function(x){
        return x * Math.abs(x) / 2000;
    };

    BasicGame.Game.prototype = {
        create: function () {

            this.game.touchControl = this.game.plugins.add(Phaser.Plugin.TouchControl);
            this.game.touchControl.inputEnable();

            this.tilesprite = this.add.tileSprite(0, 0, this.world.width, this.world.height, 'background');
            this.tilesprite.scale.set(3);

            this.character = this.add.sprite(this.world.centerX, this.world.centerY, 'character');
            this.game.physics.arcade.enable(this.character);

            this.character.anchor.set(0.5);
            this.character.scale.set(3);
            this.character.animations.add('walkDown', [0 ,1 ,2 ,3],20 /*fps */, true);
            this.character.animations.add('walkUp',   [12 ,13 ,14,15],20 /*fps */, true);
            this.character.animations.add('walkLeft', [4,5,6,7],20 /*fps */, true);
            this.character.animations.add('walkRight',[8,9,10,11],20 /*fps */, true);


            // var _button1 = this.add.button(400, 80, 'buttons', function () {
            //     if (_button1.frame===1) {
            //         _button1.frame = 3;
            //         this.game.touchControl.settings.singleDirection = true;
            //     }else if (_button1.frame===3) {
            //         _button1.frame = 1;
            //         this.game.touchControl.settings.singleDirection = false;
            //     }
            // }, this);
            // _button1.frame=1;


            // var _button2 = this.add.button(400, 20, 'buttons', function () {
            //     if (_button2.frame===2) {
            //         _button2.frame = 0;
            //         this.game.touchControl.inputEnable();
            //     }else if (_button2.frame===0) {
            //         _button2.frame = 2;
            //         this.game.touchControl.inputDisable();
            //     }
            // }, this);
            // _button2.frame=0;

            // this.add.button(400, 740, 'githubstar', function () {
            //     window.open('https://github.com/eugenioclrc/phaser-touch-control-plugin','_blank');
            // }, this,0,0,1,0).scale.set(0.5);



            // var style = {font: '25px Arial', fill: '#ffffff', align: 'left', fontWeight: 'bold', stroke: '#000000', strokeThickness: 6};
            // var tw = this.add.text(20, 20, 'Phaser Touch Plugin demo\nDeveloped by @eugenioclrc\nFor http://gamegur.us', style);
            // tw.inputEnabled = true;
            // tw.events.onInputDown.add(function(){
            //     window.open('https://twitter.com/eugenioclrc','_blank');
            // });



            // this.directionsText = this.add.text(20, 740, '', style);
            // this.velocityText = this.add.text(200, 740, '', style);

            var masterEffect = "up";

            var coins = this.add.sprite(0,0,"coins","Coins-1");
            coins.anchor.setTo(0.5);
            // coins.animations.add('idle',Phaser.Animation.generateFrameNames("Coins-", 1, 7, '', 0), 14, true, true);
            coins.visible = false;
            
            var char = this.add.sprite(0, 0, "player1", "SlimeMonster01");
            char.scale.setTo(0.6, 0.6);
            char.x = this.game.width / 2 - char.width / 2;
            char.y = this.game.height - char.height - 6;
            // char.animations.add("idle", ["SlimeMonster01", "SlimeMonster02"], 4, true, true);
            char.animations.play("idle");
            char.inputEnabled = true;
            char.events.onInputDown.add(function() {
                var dmg = this.game.rnd.integerInRange(100, 1000);
                var timeToLive = 200;
                var effect = masterEffect;
                var bg = false;
                var bgColor = 0xfec72a;
                if (dmg > 800) {
                    effect = masterEffect === "smoke" ? "explode" : "smoke";
                    timeToLive = 600;
                    // dmg = Phaser.ArrayUtils.getRandomItem(battleHowls);
                }

                if(masterEffect === "physics") {
                    bg = true;
                }

                var rand = this.game.rnd.integerInRange(0,1);
                var val = char.x + (char.width * rand);
                var targetX = val;
                var battleHowls = [
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
                new FloatingText(this, {
                    text: dmg,
                    sprite: coins,
                    // spriteAnimationName:"idle",
                    // spriteAnimationFrames: Phaser.Animation.generateFrameNames("Coins-", 1, 7, '', 0),
                    // spriteAnimationFrameRate: 14,
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
                    x: char.x + char.width / 2,
                    y: char.y - 20,
                    timeToLive: timeToLive
                })
            }, this);
        },
        updateDebugText: function(){
            // this.directionsText.setText('directions: {\n  up: ' + this.game.touchControl.cursors.up +
            //     ',\n  down: ' + this.game.touchControl.cursors.down + ',\n  left: ' + this.game.touchControl.cursors.left +
            //     ',\n  right: ' + this.game.touchControl.cursors.right + ',\n}');
            // this.velocityText.setText('velocity: {\n  x: ' + this.game.touchControl.speed.x + ',\n  y: ' + this.game.touchControl.speed.y + '\n}');

        },
        update: function() {
            this.updateDebugText();
            var speed = this.game.touchControl.speed;
            var delay=0;

            // this.tilesprite.tilePosition.y += easeInSpeed(speed.y);
            // this.tilesprite.tilePosition.x += easeInSpeed(speed.x);
            // Also you could try linear speed;
            this.tilesprite.tilePosition.y += this.game.touchControl.speed.y / 20;
            this.tilesprite.tilePosition.x += this.game.touchControl.speed.x / 20;
            this.character.body.velocity.setTo(0, 0);
            if (Math.abs(speed.y) < Math.abs(speed.x)){
                delay = parseInt(1000 / Math.abs((easeInSpeed(speed.x)) * 10), 10);

                // moving mainly right or left
                if (this.game.touchControl.cursors.left) {
                    this.character.play('walkLeft');
                    // this.character.body.velocity.x=-150;
                } else if (this.game.touchControl.cursors.right) {
                    this.character.play('walkRight');
                    // this.character.body.velocity.x=150;
                }
            } else if (Math.abs(speed.y) > Math.abs(speed.x)){
                delay = parseInt(1000 / Math.abs((easeInSpeed(speed.y)) * 10), 10);
                // moving mainly up or down
                if (this.game.touchControl.cursors.up) {
                    this.character.play('walkUp');
                    // this.character.body.velocity.y=-150;
                } else if (this.game.touchControl.cursors.down) {
                    this.character.play('walkDown');
                    // this.character.body.velocity.y=150;

                }
            } else {
                this.character.animations.stop(0, true);
            }

            // this is a little hack, if the next frame its really slow and we have speed up things we will
            // have to wait for _timeNextFrame to se the fps updated
            this.character.animations.currentAnim.delay = delay;
            if(delay && (this.character.animations.currentAnim._timeNextFrame - this.time.now) > delay){
                this.character.animations.currentAnim._timeNextFrame = this.time.now + delay;
            }
        }
     };

})(BasicGame);

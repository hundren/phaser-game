var image = null;
var emitter = null;
Candy.GoodEnd = function (game){
    this.content = '';
    this.line = [];
    
    this.wordIndex = 0;
    this.lineIndex = 0;
    
    this.wordDelay = 120;
    this.lineDelay = 400;
}
Candy.GoodEnd.prototype = {
	create: function(){
        this.stage.backgroundColor = '#000';
        // 隐藏codingpage
        // document.getElementById('adTitle').style.display = 'none';

        this.content = [
        
        ];
        
        console.log(pxtChoose);
        db.set('pxt.choose', 'no')
        .write();
        console.log('db',db);
        text = this.add.text(32, 32, '', { font: "24px 华文细黑", fill: "#19de65" });
        text.inputEnabled = true;
        text.input.allowHorizontalDrag =false;
        text.input.enableDrag();
        this.nextLine(this);

            // 暂停音乐
            fx.stop();
            var fxx = this.add.audio('meet');
            fxx.play('',0,1,true,false);
        
        // 心开始
        // var manager =  this.game.plugins.add(Phaser.ParticleStorm);

        // var data = {
        //     lifespan: 3000
        // };

        // manager.addData('basic', data);

        // emitter = manager.createEmitter(Phaser.ParticleStorm.PIXEL);

        // emitter.renderer.pixelSize = 8;
    
        // emitter.addToWorld();
    
        // //  12 x 10 = 96 x 80 px
        // image = manager.createImageZone('heart');
    
        // this.input.onDown.add(this.clickBoom, this);

        // 心结束

        },
       nextLine:function() {
        
            if (this.lineIndex === this.content.length)
            {
                //  We're finished
                return;
            }
        
            //  Split the current line on spaces, so one word per array element
            this.line = this.content[this.lineIndex].split(' ');
        
            //  Reset the word index to zero (the first word in the line)
            this.wordIndex = 0;
        
            //  Call the 'nextWord' function once for each word in the line (line.length)
            this.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this);
        
            //  Advance to the next line
            this.lineIndex++;
        
        },
     nextWord:function() {
            //  Add the next word onto the text string, followed by a space
            text.text = text.text.concat(this.line[this.wordIndex] + " ");
        
            //  Advance the word index to the next word in the line
            this.wordIndex++;
        
            //  Last word?
            if (this.wordIndex === this.line.length)
            {
                //  Add a carriage return
                text.text = text.text.concat("\n");
        
                //  Get the next line after the lineDelay amount of ms has elapsed
                this.time.events.add(this.lineDelay, this.nextLine, this);
            }
        
        },
     clickBoom(pointer) {

            var x = pointer.x;
            var y = pointer.y;
        
            //  This will apply the radiateFrom to only those particles emitted in this call
            emitter.emit('basic', x - 48, y - 40, { zone: image, full: true, spacing: 8, setColor: true, radiateFrom: { x: x, y: y, velocity: 1 } });
        
        },
        update: function(){
            // console.log(text)
            if(text.position.y > 32){
                text.position.y = 32
            }
            if(text.position.y+text._height < 200 && text._height >200){
                text.position.y = -text._height+200
            }
        }
    }


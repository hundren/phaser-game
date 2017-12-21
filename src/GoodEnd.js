
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
        document.getElementById('adTitle').style.display = 'none';
        this.content = [
            "亲 爱 的 PXT:",
            "很 久 没 见",
            "恭 喜 你 获 得 成 就：击 败 “ 一 只 喜 欢 喂 蛋 糕",
            "给 美 少 女 吃 ，但 因 美 少 女 吃 得 太 多 会 胖，",
            "所 以 无 奈 要 被 玩 家 消 灭 的 怪 兽。”",
            "",
            "呵 呵 ， 我 想 我 就 是 那 只 怪 兽 ~",
            "一 只 不 知 道 自 己 怎 么 会 被 消 灭 的 怪 兽",
            "当 然 你 还 是 那 个 美 少 女",
            "那 个 还 没 吃 胖 的 美 少 女 ~",
            "",
            "是 了 ， 看 到 这 你 可 能 还 是 有 个 疑 问，",
            "没 错 ，P FOR PAN , X FOR XIAO , T FOR TING",
            "世 界 就 是 这 么 奇 妙",
            "",
            "好 了 ， 我 们 还 是 马 上 进 入 正 题 ",
            "继 续 谈 谈 我 这 个 将 会 获 奖 ， 然 后 分 分 钟 收 入",
            "过 千 万 ， 风 摩 万 千 少 女 ，带 我 走 ",
            "上 人 身 巅 峰 的 游 戏 的 制 作 的 心 路 历 程 吧",
            "",
            "当 然 ， 每 个 优 秀 的 游 戏 背 后 肯 定 少 不 了 一 个",
            "优 秀 的 故 事 ：",
            "我 们 的 这 个 当 然 也 不 例 外",
            "",
            "故 事 的 主 人 公 就 是 这 只 怪 兽 和 美 少 女",
            "每 个 故 事 的 开 始 总 是 从 某 个 简 单 的 相 遇 开 始 的",
            "细 想 一 下 ， 怪 兽 和 美 少 女 刚 相 遇 到 现 在",
            "已 经 难 以 用 秒 来 计 算 了 ， 然 而 就 距 现 在",
            "473，040，000 秒 前，神 奇 的 事 情 发 生 了",
            "宇 宙 间 的 2 堆 原 子 团 产 生 了 一 次 近 距 离 接 触",
            "从 此 历 史 的 前 轮 发 生 了 变 化",
            "只 因 怪 兽 多 看 美 少 女 一 眼",
            "",
            "先 简 单 介 绍 一 下 故 事 的 背 景 吧",
            "怪 兽 和 美 少 女 是 初 中 同 学",
            "不 要 问 我 怪 兽 和 美 少 女 为 什 么",
            "能 在 同 一 个 中 学 上 课",
            "其 实 这 没 有 什 么 奇 怪 的",
            "因 为", 
            "他 们 还 有 一 个 瓜 很 大 的 历 史 老 师",
            "M 字 头 的 物 理 老 师",
            "等 等",
            "",
            "",
            "The bartender's smile widened.In an age of",
            "affordable beauty, there was something heraldic",
            "arm whined as he reached for another mug.",
            "",
            "",
            "From Neuromancer by William Gibson",
            "African whose cheekbones were ridged with precise rows of tribal scars. `Wage was",
            "in here early, with two joeboys,' Ratz said, shoving a draft across the bar with",
            "his good hand. `Maybe some business with you, Case?'",
            "",
            "Case shrugged. The girl to his right giggled and nudged him.",
            "The bartender's smile widened. His ugliness was the stuff of legend. In an age of",
            "affordable beauty, there was something heraldic about his lack of it. The antique",
            "arm whined as he reached for another mug.",
            "",
            "",
            "From Neuromancer by William Gibson"
        ];
        
        console.log(pxtChoose);
        text = this.add.text(32, 32, '', { font: "24px 华文细黑", fill: "#19de65" });
        text.inputEnabled = true;
        text.input.enableDrag();
        this.nextLine(this);
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
        
        }
    }


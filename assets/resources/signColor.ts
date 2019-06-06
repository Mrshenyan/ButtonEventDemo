// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class signColor extends cc.Component {

    @property({
        type:cc.Node,
        tooltip:"所有显示的绘制图形的根节点",
    })
    Nodes:cc.Node[]=[];
    @property(cc.Node)
    rootNode:cc.Node=null;
    @property({
        type:Boolean,
        tooltip:"是否转向",
    })
    TurnOrNot:Boolean=false;
    previousKey:number=0;
    onLoad(){
        this.drawIt();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.Control,this);
    }

    static DrawMAP={
        MAP_1:[false,true,false,true,true,true,true,false,true],
    }

    drawIt(){
        let allblockPoses=Array<{}>();
        let a:cc.Vec2;
        let b:cc.Vec2;
        let c:cc.Vec2;
        let d:cc.Vec2;
        for(let i=0;i<this.Nodes.length;i++){
            let oneblockPoses=Array<cc.Vec2>();
            let node_a:cc.Node=new cc.Node();
            let node_b:cc.Node=new cc.Node();
            let node_c:cc.Node=new cc.Node();
            let node_d:cc.Node=new cc.Node();
            let pos = this.Nodes[i].getPosition();

            a=new cc.Vec2(pos.x - this.Nodes[i].width / 2, 
                pos.y + this.Nodes[i].height / 2);
            node_a.position=a;
            a=node_a.convertToNodeSpace(pos);//这里要注意坐标系的对应和坐标的转换

            b=new cc.Vec2(pos.x + this.Nodes[i].width / 2, 
                pos.y + this.Nodes[i].height / 2)
            node_b.position=b;
            b=node_b.convertToNodeSpace(pos);

            c=new cc.Vec2(pos.x + this.Nodes[i].width / 2, 
                pos.y - this.Nodes[i].height / 2)
            node_c.position=c;
            c=node_c.convertToNodeSpace(pos);
            
            d=new cc.Vec2(pos.x - this.Nodes[i].width / 2, 
                pos.y - this.Nodes[i].height / 2)
            node_d.position=d;
            d=node_d.convertToNodeSpace(pos);
            
            oneblockPoses.push(a);
            oneblockPoses.push(b);
            oneblockPoses.push(c);
            oneblockPoses.push(d);
            allblockPoses.push(oneblockPoses);
        }
        for(let i=0;i<this.Nodes.length;i++){
            
            // Sketchpad.close();
            if(signColor.DrawMAP.MAP_1[i]){
                let Sketchpad = this.Nodes[i].addComponent(cc.Graphics);
                Sketchpad.lineWidth=1;
                Sketchpad.moveTo(allblockPoses[i][0].x,allblockPoses[i][0].y);
                Sketchpad.lineTo(allblockPoses[i][1].x,allblockPoses[i][1].y);
                Sketchpad.lineTo(allblockPoses[i][2].x,allblockPoses[i][2].y);
                Sketchpad.lineTo(allblockPoses[i][3].x,allblockPoses[i][3].y);
                Sketchpad.lineTo(allblockPoses[i][0].x,allblockPoses[i][0].y);
                // Sketchpad.strokeColor = cc.Color.YELLOW;
                Sketchpad.fillColor = cc.Color.BLACK;
                Sketchpad.stroke();
                Sketchpad.fill();
                console.log("draw the "+i+" block");
                console.log(allblockPoses[i][0]);
                console.log(allblockPoses[i][1]);
                console.log(allblockPoses[i][2]);
                console.log(allblockPoses[i][3]);
            }
        }
    }

    Control(event){
        if(this.previousKey!=0&&this.previousKey==event.keyCode){
            this.TurnOrNot = true;
        }
        else{
            this.TurnOrNot = false;
        }
        switch(event.keyCode){
            case cc.macro.KEY.left:{
                //TODO here should add the code that is used turn round,or run
                turnRound(this.previousKey);
            }
            case cc.macro.KEY.right:{

            }
            case cc.macro.KEY.up:{

            }
            case cc.macro.KEY.down:{

            }
        }

        function turnRound(preCode){

        }
    }
}

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
    onLoad(){
        this.drawIt();
    }
    drawIt(){
        let allblockPoses=Array<{}>();
        let YorN=Array<Boolean>(9);
        YorN[0]=false;
        YorN[1]=true;
        YorN[2]=false;
        YorN[3]=true;
        YorN[4]=true;
        YorN[5]=true;
        YorN[6]=true;
        YorN[7]=false;
        YorN[8]=true;
        let a:cc.Vec2;
        let b:cc.Vec2;
        let c:cc.Vec2;
        let d:cc.Vec2;
        for(let i=0;i<this.Nodes.length;i++){
            let oneblockPoses=Array<cc.Vec2>();
            let pos = this.Nodes[i].getPosition();
            a=new cc.Vec2(pos.x/2 - this.Nodes[i].width / 2, 
                pos.y/2 + this.Nodes[i].height / 2);
            b=new cc.Vec2(pos.x/2 + this.Nodes[i].width / 2, 
                pos.y/2 + this.Nodes[i].height / 2)
            c=new cc.Vec2(pos.x/2 + this.Nodes[i].width / 2, 
                pos.y/2 - this.Nodes[i].height / 2)
            d=new cc.Vec2(pos.x/2 - this.Nodes[i].width / 2, 
                pos.y/2 - this.Nodes[i].height / 2)
            
            oneblockPoses.push(a);
            oneblockPoses.push(b);
            oneblockPoses.push(c);
            oneblockPoses.push(d);
            allblockPoses.push(oneblockPoses);
        }
        for(let i=0;i<this.Nodes.length;i++){
            
            // Sketchpad.close();
            if(YorN[i]){
                let Sketchpad = this.Nodes[i].addComponent(cc.Graphics);
                Sketchpad.lineWidth=1;
                Sketchpad.moveTo(allblockPoses[i][0].x,allblockPoses[i][0].y);
                Sketchpad.lineTo(allblockPoses[i][1].x,allblockPoses[i][1].y);
                Sketchpad.lineTo(allblockPoses[i][2].x,allblockPoses[i][2].y);
                Sketchpad.lineTo(allblockPoses[i][3].x,allblockPoses[i][3].y);
                Sketchpad.lineTo(allblockPoses[i][0].x,allblockPoses[i][0].y);
                Sketchpad.strokeColor = cc.Color.;
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
}

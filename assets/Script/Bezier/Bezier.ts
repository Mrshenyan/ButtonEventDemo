const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Node)
    BezierNode:cc.Node=null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        let pos1 = cc.v2(100,100);
        let pos2 = cc.v2(200,200)
        let pos3 = cc.v2(300,300)
        let pos4 = cc.v2(400,400)
        // let pos=[cc.v2(0, 299), cc.v2(300, -222), cc.v2(300, 100)]
        let pos=[];
        pos.push(pos1)
        pos.push(pos2);
        pos.push(pos1)
        pos.push(pos2)
        // let bezierAction = cc.bezierTo(2,pos);
        // let bact = bezierAction.easing(cc.easeInOut(10));
        // this.BezierNode.runAction(bact);
        this.formulaBezier(pos1,pos2,pos3,pos4)
    }

    // update (dt) {}

    ClacBezier(startPos,endPos){
        let midPos = new cc.Vec2((startPos.x+endPos.x)/2,(startPos.y+endPos.y)/2);

        function formulaBezier(p1,p2,p3,p4){
            let pos:cc.Vec2;
            for(let t=0;t<=1;t+=0.01){
                pos.x = p1.x*Math.pow((1-t),3)+3*p2.x*t*Math.pow((1-t),2)+3*p3.x*Math.pow(t,2)*(1-t)+p4.x*Math.pow(t,3);
                pos.y = p1.y*Math.pow((1-t),3)+3*p2.y*t*Math.pow((1-t),2)+3*p3.y*Math.pow(t,2)*(1-t)+p4.y*Math.pow(t,3);
            }
            console.log(pos);
        }
    }
    formulaBezier(p1,p2,p3,p4){
        let pos:cc.Vec2=new cc.Vec2();
        console.log(this.BezierNode.position)
        for(let t=0;t<=1;t+=0.01){
            pos.x = p1.x*Math.pow((1-t),3)+3*p2.x*t*Math.pow((1-t),2)+3*p3.x*Math.pow(t,2)*(1-t)+p4.x*Math.pow(t,3);
            pos.y = p1.y*Math.pow((1-t),3)+3*p2.y*t*Math.pow((1-t),2)+3*p3.y*Math.pow(t,2)*(1-t)+p4.y*Math.pow(t,3);
            this.BezierNode.runAction(cc.moveTo(1,pos));
            console.log(pos);
        }
    }
}

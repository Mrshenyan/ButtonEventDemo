const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Node)
    BezierNode:cc.Node=null;
    @property(cc.Graphics)
    tri:cc.Graphics = null

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    poses=new Array();
    start () {
        let self = this;
        let pos1 = cc.v2(200,400);
        let pos2 = cc.v2(400,-100)
        let pos=[];
        pos.push(pos1)
        pos.push(pos2);
        pos.push(pos1)
        pos.push(pos2)
        self.squareBezier(cc.v2(20,20),cc.v2(44,4),cc.v2(43,78),cc.v2(20,50));
        
    }

    squareBezier(pos1,pos2,pos3,pos4){
        let self = this;
        let G = this.tri;
        G.moveTo(0,0);
        this.BezierNode.x=0;
        this.BezierNode.y=0;
        for(let t=0;t<=1;t+=0.01){
            let node = new cc.Node();
            let pos:cc.Vec2=new cc.Vec2();
            pos.x = (pos1.x*Math.pow((1-t),3)+3*t*Math.pow((1-t),2)*pos2.x+3*pos3.x*Math.pow(t,2)*(1-t)+pos4.x*Math.pow(t,3));
            pos.y = (pos1.y*Math.pow((1-t),3)+3*t*Math.pow((1-t),2)*pos2.y+3*pos3.y*Math.pow(t,2)*(1-t)+pos4.y*Math.pow(t,3));
            node.x = pos.x;
            node.y = pos.y;
            G.lineTo(pos.x,pos.y);
            this.poses.push(pos);
        }
        let actes=[];
        let acttt;
        
        this.BezierNode.x = self.poses[0].x;
        this.BezierNode.y = self.poses[0].y;
        acttt = cc.bezierTo(1,self.poses[100]);
        for(let i=0;i<self.poses.length;i++){
            let act = cc.moveTo(0.01,self.poses[i]);
            actes.push(act);
        }
        self.BezierNode.runAction(cc.sequence(actes));
        self.BezierNode.runAction(cc.sequence(actes));
        G.strokeColor = cc.Color.RED;
        G.stroke();
        
    }

    buttonClick(){
        let self = this;
        let posa:cc.Vec2=new cc.Vec2();
        let posb:cc.Vec2=new cc.Vec2();
        let posc:cc.Vec2=new cc.Vec2();
        let posd:cc.Vec2=new cc.Vec2();
        this.tri.clear();
        this.poses=[];
        posa.x = Math.random()*150;
        posa.y = Math.random()*150;
        posb.x = Math.random()*150;
        posb.y = Math.random()*150;
        posc.x = Math.random()*150;
        posc.y = Math.random()*150;
        posd.x = Math.random()*150;
        posd.y = Math.random()*150;
        this.squareBezier(posa,posb,posc,posd);
    }
}

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
<<<<<<< HEAD
        let pos1 = cc.v2(100,100);
        let pos2 = cc.v2(200,200)
        let pos3 = cc.v2(300,300)
        let pos4 = cc.v2(400,400)
        // let pos=[cc.v2(0, 299), cc.v2(300, -222), cc.v2(300, 100)]
=======
        let self = this;
        let pos1 = cc.v2(200,400);
        let pos2 = cc.v2(400,-100)
>>>>>>> 5cd1ff3632679380d8f3dfd1d3443b9fb9d315f0
        let pos=[];
        pos.push(pos1)
        pos.push(pos2);
        pos.push(pos1)
        pos.push(pos2)
<<<<<<< HEAD
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
=======
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
>>>>>>> 5cd1ff3632679380d8f3dfd1d3443b9fb9d315f0
    }
}

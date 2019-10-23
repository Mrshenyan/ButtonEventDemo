const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Node)
    BezierNode:cc.Node=null;
    @property(cc.Graphics)
    tri:cc.Graphics = null
    @property(cc.Node)
    content:cc.Node=null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    poses=new Array();
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
        this.squareBezier(cc.v2(20,20),cc.v2(44,4),cc.v2(43,78),cc.v2(20,50));
        
    }

    squareBezier(pos1,pos2,pos3,pos4?){
        let self = this;
        let G = this.tri;
        this.BezierNode.x=0;
        this.BezierNode.y=0;
        this.content.removeAllChildren();
        for(let t=0;t<=1;t+=0.0002){
            let node = new cc.Node();
            let pos:cc.Vec2=new cc.Vec2();
            // pos.x = pos1.x*Math.pow((1-t),2)+2*t*(1-t)*pos2.x+pos3.x*Math.pow(t,2);
            // pos.y = pos1.y*Math.pow((1-t),2)+2*t*(1-t)*pos2.y+pos3.y*Math.pow(t,2); 
            pos.x = (pos1.x*Math.pow((1-t),3)+3*t*Math.pow((1-t),2)*pos2.x+3*pos3.x*Math.pow(t,2)*(1-t)+pos4.x*Math.pow(t,3));
            pos.y = (pos1.y*Math.pow((1-t),3)+3*t*Math.pow((1-t),2)*pos2.y+3*pos3.y*Math.pow(t,2)*(1-t)+pos4.y*Math.pow(t,3));
            node.x = pos.x;
            node.y = pos.y;
            // let detalNode = new cc.Node();
            // let detal = detalNode.addComponent(cc.Label);
            // this.content.addChild(detalNode);
            // detalNode.height = 30;
            // detal.string = ""+pos;
            this.poses.push(pos);
        }
        // this.content.height = this.content.childrenCount*42
        let actes=[];
        
        this.BezierNode.x = self.poses[0].x;
        this.BezierNode.y = self.poses[0].y;
        G.moveTo(self.poses[0].x,self.poses[0].y);
        for(let i=0;i<self.poses.length;i++){
            let act = cc.moveTo(0.0002,self.poses[i]);
            G.lineTo(self.poses[i].x,self.poses[i].y);
            actes.push(act);
        }
        // self.BezierNode.runAction(cc.sequence(actes));
        self.BezierNode.runAction(cc.sequence(actes));
        G.strokeColor = cc.Color.RED;
        G.stroke();
        
    }

    buttonClick(){
        let self = this;
        let posa:cc.Vec2=new cc.Vec2(100,100);
        let posb:cc.Vec2=new cc.Vec2();
        let posc:cc.Vec2=new cc.Vec2();
        let posd:cc.Vec2=new cc.Vec2(-58,-67);
        this.tri.clear();
        this.poses=[];
        posa.x = Math.random()*150;
        posa.y = Math.random()*150;
        posd.x = Math.random()*150;
        posd.y = Math.random()*150;
        let x = Math.random()*3+1;
        posb.x = (posa.x+posd.x)*(1/3);
        posb.y = (posa.y+posd.y)*(1/3);
        posc.x = (posa.x+posd.x)*(2/3);
        posc.y = (posa.y+posd.y)*(2/3);
        this.squareBezier(posa,posb,posd,posd);


        let a=1,b=1,c=1,d=1;
        let num1 =0
        let num2 =0; 
        for(let i=1;i<10;i++){
            for(let j=1;j<10;j++){
                for(let m=1;m<10;m++){
                    for(let n=1;n<10;n++){
                        num1 = i*1000+j*100+m*10+n;
                        num2 = n*1000+m*100+j*10+i;
                        if(num1*4==num2){
                            console.log(num1)
                            console.log(num2)
                            console.log("i: "+i)
                            console.log("j: "+j)
                            console.log("m: "+m)
                            console.log("n: "+n)
                        }
                    }
                }
            }
        }
    }
}

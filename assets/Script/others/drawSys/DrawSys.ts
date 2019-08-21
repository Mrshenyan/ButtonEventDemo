import triangle from "./Polygon/triangle";

const {ccclass, property} = cc._decorator;


@ccclass
export default class DrawSys extends cc.Component {
    static PI = Math.PI;
    @property({
        type:cc.Node,
        displayName:"panelNode",
        tooltip:"视图窗口"
    })
    PanelNode:cc.Node=null;
    @property(cc.Node)
    BtnNodes:cc.Node[]=[];
    @property({
        type:cc.Enum({
            未知:0,
            男:1,
            女:2
        }),
        displayName:"性别"
    })
    sex={
        未知:0,
        男:1,
        女:2
    }.未知;

    isDraw=false;
    // LIFE-CYCLE CALLBACKS:
    sharp:triangle = triangle.instance;
    onLoad () {
        this.BtnNodes[9].on(cc.Node.EventType.TOUCH_START,this.sharp.CalcArea,this.sharp);
    }

    start () {

    }


    
    update (dt) {
        // if(this.isDraw){
        //     let Inode = cc.find("Canvas/I");
        //     Inode.scaleX-=0.001;
        //     Inode.scaleY-=0.001;
        // }
    }


    DrawPic(currentTarget){
        let self = this;
        let CTarget = currentTarget.target;
        let touchName = CTarget.name;
        console.log(touchName);
        switch(touchName){
            case "A":{
                // A();
                ani()
                break;
            }
            case "B":{
                B();
                break;
            }
            case "C":{
                C_1(100,100,100,100,100);
                break;
            }
            case "D":{
                D();
                break;
            }
            case "E":{
                E();
                break;
            }
            case "F":{
                F();
                break;
            }
            case "G":{
                G();
                break;
            }
            case "H":{
                H();
                break;
            }
            case "I":{
                I();
                break;
            }
        }

        function A(){
            self.PanelNode.getChildByName(touchName).removeComponent(cc.Graphics);
            var a = self.PanelNode.getChildByName(touchName).addComponent(cc.Graphics);
            a.lineWidth = 1;
            // g.fillColor = cc.hexToColor('#ff0000');
            
            // a.arc(0, 0, 100, Math.PI/2, Math.PI, false);
            // a.moveTo(20,100);
            // a.lineTo(20,20);
            // a.lineTo(70,20);
            // a.lineTo(20,100);
            // a.strokeColor = cc.Color.YELLOW;
            // a.close();
            // a.moveTo(2,2);
            // a.bezierCurveTo(2,4,8,16,8,2);
            // a.close();
            // a.fillColor = cc.Color.RED;
            // a.stroke();
            // a.fill();

            
            let pos1 = cc.v2(100,100);
            let pos2 = cc.v2(100,0)
            let pos3 = cc.v2(200,0)
            let pos4 = cc.v2(200,-100)
            a.moveTo(pos1.x,pos1.y);
            formulaBezier(pos1,pos2,pos3,pos4);
            function formulaBezier(p1,p2,p3,p4){
                    let pos:cc.Vec2=new cc.Vec2();
                    console.log(a.node.position)
                    for(let t=0;t<=1;t+=0.01){
                        pos.x = p1.x*Math.pow((1-t),3)+3*p2.x*t*Math.pow((1-t),2)+3*p3.x*Math.pow(t,2)*(1-t)+p4.x*Math.pow(t,3);
                        pos.y = p1.y*Math.pow((1-t),3)+3*p2.y*t*Math.pow((1-t),2)+3*p3.y*Math.pow(t,2)*(1-t)+p4.y*Math.pow(t,3);
                        a.lineTo(pos.x,pos.y);
                        console.log(pos);
                    }
                    // a.close();
                    a.stroke();
                a.strokeColor = cc.Color.YELLOW;
            }

            // a.arc(-10, 10, 100, Math.PI/2, Math.PI, true);
            // a.lineTo(-10, 10);
            // a.close();

            // a.stroke();
            // a.fill();
        }
        function B(){
            // self.PanelNode.getChildByName(touchName).removeComponent(cc.Graphics);
            // var b = self.PanelNode.getChildByName(touchName).addComponent(cc.Graphics);
            let path = self.addComponent('R.path');
            path.selected = true;
            path.circle(0,0,30);
            path.makePath();
        }
        function C(){
            let tria = triangle.instance;
            // let pos:cc.Vec2 = new cc.Vec2(-2000,-1000);
            let PI = Math.PI;
            let x = Math.cos(PI/3);
            let drawtria = tria.Draw(cc.find("Canvas/I"),
                    new cc.Vec2(0,0),
                    new cc.Vec2(100,0),
                    new cc.Vec2(100+100*Math.cos(72*PI/180),100*Math.sin(72*PI/180)),
                    new cc.Vec2(50,50*Math.tan(72*PI/180)),
                    new cc.Vec2(-100*Math.cos(72*PI/180),100*Math.sin(72*PI/180)));
                    self.isDraw = true;

        }

        function C_1(a:number,b:number,c:number,d:number,e:number){
            let pos_a = new cc.Vec2(0,a);
            let pos_b = new cc.Vec2(b*Math.cos((18/180) * DrawSys.PI),b*Math.sin((18/180) * DrawSys.PI));
            let pos_c = new cc.Vec2(c*Math.cos((54/180) * DrawSys.PI),-c*Math.sin((54/180) * DrawSys.PI));
            let pos_d = new cc.Vec2(-d*Math.cos((54/180) * DrawSys.PI),-d*Math.sin((54/180) * DrawSys.PI));
            let pos_e = new cc.Vec2(-e*Math.cos((18/180) * DrawSys.PI),b*Math.sin((18/180) * DrawSys.PI));
            let tria = triangle.instance;
            Draw(cc.find("Canvas/I"),pos_a,pos_b,pos_c,pos_d,pos_e);
            // let drawtria = tria.Draw(cc.find("Canvas/I"),
            //         pos_a,
            //         pos_b,
            //         pos_c,
            //         pos_d,
            //         pos_e
            //         );
            //         self.isDraw = true;
            //         console.log(pos_a);
            //         console.log(pos_b);
            //         console.log(pos_c);
            //         console.log(pos_d);
            //         console.log(pos_e);

        }

        function Draw(node:cc.Node,...linePos:cc.Vec2[]):cc.Graphics{
            // this.AlllinePos = linePos;
            // this.edgeNum = linePos.length - 1;
            let lineLen:number[] = [];
            let tri = node.addComponent(cc.Graphics);
            tri.moveTo(linePos[0].x,linePos[0].y);
            for(let i=0;i<linePos.length;i++){
                let len = Math.sqrt((Math.pow(linePos[i].x,2)+Math.pow(linePos[i].y,2)));
                lineLen[i] = len;
            }
            for(let i=1;i<=linePos.length;i++){
                if(i==linePos.length){
                    tri.lineTo(linePos[0].x,linePos[0].y)
                    // this.isClosed = true;
                }
                else{
                    tri.lineTo(linePos[i].x,linePos[i].y);
                }
            }
            tri.strokeColor = cc.Color.YELLOW;
            tri.close();
            tri.fillColor = new cc.Color(255,0,0,100);//create a color object dynamicly
            tri.stroke();
            tri.fill();
            return tri;
        }

        function D(){

        }
        function E(){

        }
        function F(){

        }
        function G(){

        }
        function H(){

        }
        function I(){

        }

        function ani(){
            // var center = [ 300, 300 ];
            self.PanelNode.getChildByName(touchName).removeComponent(cc.Graphics);
            var ctx = self.PanelNode.getChildByName(touchName).addComponent(cc.Graphics);
            ctx.lineWidth = 1;
            let curveness = 0.7;
            let start = cc.v2(100,100);
            let end = cc.v2(0,0);
            let percent=0.5;
            var radius = 300;
            let count = 10;
        	// for ( var i = 0; i < count; i++ ) {
        		var angle = Math.PI * 2 / count// * i;
        		end.x = start.x + radius * Math.sin( angle );
        		end.y = start.y + radius * Math.cos( angle );
        		// ctx.strokeStyle = colors[ i ];
				// ctx.beginPath();
                Beizer(ctx,start,end,curveness,percent)
            // }
            ctx.stroke();
            percent = (percent+1)%100;
            if(percent==100){
                percent=0;
            }
            // requestAnimationFrame(ani);
        }
        function Beizer(ctx,start,end,curveness,percent){
            let cp = [
                (start.x+end.x)/2 - (start.y-end.y)*curveness,
                (start.y+end.y)/2 - (start.x-end.x)*curveness,
            ];
            ctx.moveTo(start.x,start.y);
            for(let i=0;i<=percent/100;i+=0.01){
                ctx.quadraticCurveTo(start.x,cp[0],end.x,i);
                // ctx.quadraticCurveTo(start.y,cp[1],end.y,i);
            }
            ctx.stroke();
        }

    }
}

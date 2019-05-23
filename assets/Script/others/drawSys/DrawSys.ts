import triangle from "./Polygon/triangle";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    PanelNode:cc.Node=null;
    @property(cc.Node)
    BtnNodes:cc.Node[]=[];

    // LIFE-CYCLE CALLBACKS:
    sharp:triangle = triangle.instance;
    onLoad () {
        this.BtnNodes[9].on(cc.Node.EventType.TOUCH_START,this.sharp.CalcArea,this.sharp);
    }

    start () {

    }


    
    // update (dt) {}


    DrawPic(currentTarget){
        let self = this;
        let CTarget = currentTarget.target;
        let touchName = CTarget.name;
        console.log(touchName);
        switch(touchName){
            case "A":{
                A();
                break;
            }
            case "B":{
                B();
                break;
            }
            case "C":{
                C();
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
            a.moveTo(20,100);
            a.lineTo(20,20);
            a.lineTo(70,20);
            a.lineTo(20,100);
            a.strokeColor = cc.Color.YELLOW;
            a.close();
            // a.moveTo(2,2);
            // a.bezierCurveTo(2,4,8,16,8,2);
            // a.close();
            a.fillColor = cc.Color.RED;
            a.stroke();
            a.fill();

            

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
            let pos:cc.Vec2 = new cc.Vec2(20,20);
            let drawtria = tria.Draw(self.PanelNode.getChildByName(touchName),new cc.Vec2(20,20),new cc.Vec2(50,20),new cc.Vec2(50,60),new cc.Vec2(20,60));

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

    }
}

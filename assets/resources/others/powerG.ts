const {ccclass, property} = cc._decorator;

 
@ccclass
export default class powerG extends cc.Component {

    @property({
        type:cc.Node,
        tooltip:"能力图节点"
    })
    powerGNode:cc.Node=null;

    static PI = Math.PI;

    onLoad(){
        this.DrawPG(50,60,58,86,34);
    }

    /**
     * 参数是画图所需要的五边的长度，对应是五边的坐标系下
     * 使用系统的绘图系统需要将相应的坐标转换到XOY直角坐标系
     * 计算五个点在直角坐标系下的坐标，之后绘制
     * @param a first side
     * @param b 
     * @param c 
     * @param d 
     * @param e 
     */
    DrawPG(a:number,b:number,c:number,d:number,e:number){
        let posA = new cc.Vec2(0,a);
        let posB = new cc.Vec2(b,0);
        let posC = new cc.Vec2(c,0);
        let posD = new cc.Vec2(d,0);
        let posE = new cc.Vec2(e,0);

        console.log(posA+'\n'+posB+'\n'+posC+'\n'+posD+'\n'+posE+'\n')
        let posA_xoy = posA;
        let posB_xoy = new cc.Vec2(b*Math.cos(powerG.PI/10),b*Math.sin(powerG.PI/10));
        let posC_xoy = new cc.Vec2(c*Math.cos(3*powerG.PI/10),-c*Math.sin(3*powerG.PI/10));
        let posD_xoy = new cc.Vec2(-d*Math.cos(3*powerG.PI/10),-d*Math.sin(3*powerG.PI/10));;;
        let posE_xoy = new cc.Vec2(-e*Math.cos(powerG.PI/10),e*Math.sin(powerG.PI/10));

        console.log(posA_xoy+'\n'+posB_xoy+'\n'+posC_xoy+'\n'+posD_xoy+'\n'+posE_xoy+'\n')
        let Sketchpad = this.powerGNode.addComponent(cc.Graphics);
        Sketchpad.lineWidth = 1;
        // Sketchpad.strokeColor = cc.Color.RED;
        Sketchpad.moveTo(posA_xoy.x,posA_xoy.y);
        Sketchpad.lineTo(posB_xoy.x,posB_xoy.y);
        Sketchpad.lineTo(posC_xoy.x,posC_xoy.y);
        Sketchpad.lineTo(posD_xoy.x,posD_xoy.y);
        Sketchpad.lineTo(posE_xoy.x,posE_xoy.y);
        Sketchpad.lineTo(posA_xoy.x,posA_xoy.y);
        Sketchpad.fillColor = cc.color(127.5,127.5,127.5,100);
        
        Sketchpad.stroke();
        Sketchpad.fill();
    }
}

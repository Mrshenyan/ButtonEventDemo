const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    Btns:cc.Prefab=null;
    @property(cc.Button)
    Btn_Start:cc.Button=null;
    @property(cc.ProgressBar)
    PB:cc.ProgressBar[]=[];
    @property(cc.Graphics)
    Graphics:cc.Graphics=null;

    onLoad () {
        let btns = cc.instantiate(this.Btns);
        this.node.addChild(btns);
    }

    start () {

    }

    // update (dt) {}

    Start_CallBack(){
        let self = this;
        let s = 0;
        let radian;
        let x=0;
        this.schedule(a,0.0005);
        this.schedule(b,0.01);
        function a(){
            if(s>self.PB[0].progress){
                self.unschedule(a);
                return;
            }
            s+=0.001
            for(let u=0;u<self.PB.length;u++){
                if(self.PB[u].progress>1){
                    self.PB[u].progress = 1;
                }
                else{
                    self.PB[u].progress = s;
                    // radian = s*2*Math.PI;
                }
            }
        }
        function b(){
            x+=0.001;
            console.log(x);
            radian = 2*x*Math.PI;
            console.log(radian)
            self.Graphics.arc(100,100,50,0,radian);
            self.Graphics.stroke();
        }
    }
}


//这个环形进度可不可以使用Graphics来绘制？
//我想应该是可以的。
//划线的最后一个参数：countclickwise参数：number类型，
//1：表示逆时针划线，0：表示顺时针划线

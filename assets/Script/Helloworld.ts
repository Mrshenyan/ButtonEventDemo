const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Label)
    Str: cc.Label = null;
    @property(cc.Button)
    Btn1:cc.Button = null;
    @property(cc.Button)
    Btn2:cc.Button = null;
    @property(cc.Button)
    Btn3:cc.Button = null;
    @property(cc.Sprite)
    Sp1:cc.Sprite = null;
    @property(cc.Sprite)
    Sp2:cc.Sprite = null;
    @property(cc.Sprite)
    Sp3:cc.Sprite = null;




    onLoad(){

        let Btn_CallBackEvent = new cc.Component.EventHandler();
        // console.log(Btn_CallBackEvent);
        Btn_CallBackEvent.target = this.node;
        Btn_CallBackEvent.component = "Helloworld";
        Btn_CallBackEvent.handler = "Btn_CallBackEvent1";
        
        let BtnCallBE:cc.Button = this.Btn1;
        // console.log(Btn_CallBackEvent);
        BtnCallBE.clickEvents.push(Btn_CallBackEvent);
    }

    start () {
    }
 
    
    update(dt){
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.BtnCliclEvent,this.Btn);
        this.Btn2.node.on("click",this.BtnCliclEvent2);
        this.Btn3.node.on("click",this.BtnCliclEvent3);
    }


    
    Btn_CallBackEvent1(event){
        let self = this;
        let btn = event.target;
        let parent = btn.parent;
        event.bubbles = false;
        let btn_name = btn.getChildByName("Btn_Str").getComponent(cc.Label).string;
        btn.getChildByName("Btn_Str").getComponent(cc.Label).string = "一换个名字";
        let btn_name2 = btn.getChildByName("Btn_Str").getComponent(cc.Label).string;
        btn.x = 0;
        btn.y = 0;
        console.log(event);
        console.log(event.target);
        console.log(parent);
        console.log("that is me who has a diffrent color spark");
    }
    BtnCliclEvent2(event){
        let self = this;
        let btn = event.target;
        let parent = btn.parent;
        let btn_name = btn.getChildByName("Btn_Str").getComponent(cc.Label).string;
        btn.getChildByName("Btn_Str").getComponent(cc.Label).string = "二换个名字";
        let btn_name2 = btn.getChildByName("Btn_Str").getComponent(cc.Label).string;
        console.log(event);
        console.log(event.target);
        console.log(parent);
        console.log("我就是我");
    }
    BtnCliclEvent3(event){
        let self = this;
        let btn = event.target;
        let parent = btn.parent;
        let btn_name = btn.getChildByName("Btn_Str").getComponent(cc.Label).string;
        btn.getChildByName("Btn_Str").getComponent(cc.Label).string = "三换个名字";
        let btn_name2 = btn.getChildByName("Btn_Str").getComponent(cc.Label).string;
        console.log(event);
        console.log(event.target);
        console.log(parent);
        console.log("我就是三");
    }

    SpCallBackEvent(){
        
    }
}

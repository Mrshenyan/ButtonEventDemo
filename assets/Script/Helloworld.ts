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
    @property(cc.Sprite)
    Bg:cc.Sprite = null;

    @property(cc.Button)
    Btn_Net:cc.Button=null;
    @property(cc.Button)
    Btn_ToVP1:cc.Button=null;
    @property(cc.Label)
    NetWorkMsg:cc.Label=null;
    @property(cc.Prefab)
    BtnNodes:cc.Prefab=null;



    StartPos:cc.Vec2;
    EndPos:cc.Vec2;

    MainNodePos:cc.Vec2;

    onLoad(){
        this.MainNodePos = this.node.position;
        this.StartPos = cc.Vec2.ZERO;
        this.EndPos = cc.Vec2.ZERO;
        let self = this;
        let prefab = cc.instantiate(this.BtnNodes);
        this.node.addChild(prefab);
        console.log("看看："+this.node.position);
        let Btn_CallBackEvent = new cc.Component.EventHandler();
        // console.log(Btn_CallBackEvent);
        Btn_CallBackEvent.target = this.node;
        Btn_CallBackEvent.component = "Helloworld";
        Btn_CallBackEvent.handler = "Btn_CallBackEvent1";
        let BtnCallBE:cc.Button = this.Btn1;
        // console.log(Btn_CallBackEvent);
        BtnCallBE.clickEvents.push(Btn_CallBackEvent);
        // this.node.on(cc.Node.EventType.TOUCH_START,this.TouchEvent,this);
        // this.node.on(cc.Node.EventType.TOUCH_MOVE,this.TouchEventMove,this);
        
        this.Bg.node.on(cc.Node.EventType.TOUCH_START,this.BgCallBackEventStart,this.node);
        this.Bg.node.on(cc.Node.EventType.TOUCH_MOVE,this.BgCallBackEventMove,self);
        this.Bg.node.on(cc.Node.EventType.TOUCH_END,this.BgCallBackEventEnd,self);
        this.Btn_ToVP1.node.on(cc.Node.EventType.TOUCH_START,this.ToVP1,this);
        // this.Bg.node.on(cc.Node.EventType.TOUCH_CANCEL,this.BgCallBackEventMove,this.Bg);
    }

    start () {
    }
 
    
    update(dt){
        this.Btn2.node.on("click",this.BtnCliclEvent2);
        this.Btn3.node.on("click",this.BtnCliclEvent3);
        this.Sp1.node.on(cc.Node.EventType.TOUCH_START,this.SpCallBackEvent1,this.Sp1);
        this.Sp1.node.on(cc.Node.EventType.TOUCH_MOVE,this.SpCallBackEventMove1,this.Sp1);
        this.Sp2.node.on(cc.Node.EventType.TOUCH_START,this.SpCallBackEvent2,this.Sp2);
        this.Sp2.node.on(cc.Node.EventType.TOUCH_MOVE,this.SpCallBackEventMove3,this.Sp3);
        this.Sp3.node.on(cc.Node.EventType.TOUCH_START,this.SpCallBackEvent3,this);
        this.Sp3.node.on(cc.Node.EventType.TOUCH_MOVE,this.SpCallBackEventMove3,this.Sp3);

    
        // this.BgCallBackEventRestrict();
    }


    
    TouchEvent(){
    }
    TouchEventMove(event){
        console.log(event);
    }

    Btn_CallBackEvent1(event){
        let self = this;
        let btn = event.target;
        let parent = btn.parent;
        event.bubbles = false;
        let btn_name = btn.getChildByName("Btn_Str").getComponent(cc.Label).string;
        btn.getChildByName("Btn_Str").getComponent(cc.Label).string = "1 change a name";
        let btn_name2 = btn.getChildByName("Btn_Str").getComponent(cc.Label).string;
        let parentSize = parent.Size;
        // btn.x = 0;
        // btn.y = 0;
        console.log(event);
        console.log(event.touch._point);
        console.log(event.target);
        console.log(parent);
        console.log(parentSize)
        console.log("i am the 1");
    }
    BtnCliclEvent2(event){
        let self = this;
        let btn = event.target;
        let parent = btn.parent;
        let btn_name = btn.getChildByName("Btn_Str").getComponent(cc.Label).string;
        btn.getChildByName("Btn_Str").getComponent(cc.Label).string = "2 change a name";
        let btn_name2 = btn.getChildByName("Btn_Str").getComponent(cc.Label).string;
        console.log(event);
        console.log(event.target);
        console.log(parent);
        console.log("i am the 2");
    }
    BtnCliclEvent3(event){
        let self = this;
        let btn = event.target;
        let parent = btn.parent;
        let btn_name = btn.getChildByName("Btn_Str").getComponent(cc.Label).string;
        btn.getChildByName("Btn_Str").getComponent(cc.Label).string = "3 change a name";
        let btn_name2 = btn.getChildByName("Btn_Str").getComponent(cc.Label).string;
        console.log(event);
        console.log(event.target);
        console.log(parent);
        console.log("i am the 3");
    }
    BgCallBackEventMove(event){
        let touchPos = event.touch._point;
        let x:cc.Vec2 = cc.Vec2.ZERO;
        this.getComponent("Helloworld").EndPos.y = touchPos.y;
        this.getComponent("Helloworld").EndPos.x = touchPos.x;
        x.x = this.getComponent("Helloworld").EndPos.x - this.getComponent("Helloworld").StartPos.x;
        x.y = this.getComponent("Helloworld").EndPos.y - this.getComponent("Helloworld").StartPos.y;
        event.target.x += x.x;
        event.target.y += x.y;
        this.getComponent("Helloworld").BgCallBackEventRestrict();
        this.getComponent("Helloworld").StartPos.x =this.getComponent("Helloworld").EndPos.x;
        this.getComponent("Helloworld").StartPos.y =this.getComponent("Helloworld").EndPos.y;

    }
    BgCallBackEventStart(event){
        let touchPos = event.touch._point;
        this.getComponent("Helloworld").StartPos.x = touchPos.x;
        this.getComponent("Helloworld").StartPos.y = touchPos.y;
        
    }

    BgCallBackEventRestrict(){
        let self = this;
        let descX = Math.abs(self.Bg.node.width/2 - self.node.width/2);
        let descY = Math.abs(self.Bg.node.height/2 - self.node.height/2);

        if(self.Bg.node.x<-descX){
            self.Bg.node.x = -descX;
        }
        if(self.Bg.node.x>descX){
            self.Bg.node.x = descX;
        }
        if(self.Bg.node.y<-descY){
            self.Bg.node.y = -descY;
        }
        if(self.Bg.node.y>descY){
            self.Bg.node.y = descY;
        }
    }

    BgCallBackEventEnd(event){
        this.EndPos = event.touch._point;
        // console.log("EndPos: ");
        // console.log(this);
    }
    SpCallBackEventMove1(event){
        let pos = event.touch._point;
        // pos = event.target.convertToWorldSpaceAR(pos);
        let parentSize =new cc.Vec2
        parentSize.x = event.target.parent.width;
        parentSize.y = event.target.parent.height;
        event.target.x = pos.x//-parentSize.x/2;
        event.target.y = pos.y//-parentSize.y/2;
        // console.log(parentSize);
        // console.log(event.target);
        // console.log(event.target.parent);
    }
    SpCallBackEventMove2(event){
        let pos = event.touch._point;
        // pos = event.target.convertToWorldSpaceAR(pos);
        
        event.target.x = pos.x-480;
        event.target.y = pos.y-320;
        // console.log(pos);
        // console.log(event.target);
    }
    SpCallBackEventMove3(event){
        let pos = event.touch._point;
        // pos = event.target.convertToWorldSpaceAR(pos);
        
        event.target.x = pos.x-480;
        event.target.y = pos.y-320;
        // console.log(pos);
        // console.log(event.target);
    }

    SpCallBackEvent1(event){
        let self = this;
        let sp1 = event.target;
        let parent = sp1.parent;
        event.bubbles = false;
        console.log(event);
        console.log(event.touch._point);
        console.log(event.target);
        console.log(parent);
        let parentSize = new cc.Vec2;
        parentSize.x = parent.width
        parentSize.y = parent.height;
        console.log(parentSize)
        console.log("plase call me Sp1");
    }
    SpCallBackEvent2(event){
        let self = this;
        let sp1 = event.target;
        let parent = sp1.parent;
        // event.bubbles = false;
        console.log(event);
        console.log(event.target);
        console.log(parent);
        console.log("plase call me Sp2");
    }
    SpCallBackEvent3(event){
        let self = this;
        let sp1 = event.target;
        let parent = sp1.parent;
        // event.bubbles = false;
        console.log(event);
        console.log(event.target);
        console.log(parent);
        console.log("plase call me Sp3");
    }

    LinkNet(){
        let self = this;
        let url = "https://httpbin.org/get?show_env=1"
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = ()=>{
            if(xhr.readyState == 4 && (xhr.status>= 200 && xhr.status<400)){
                let response = xhr.responseText;
                console.log(response);
                let cc = JSON.parse(response);
                console.log(cc);
                console.log(cc.args);
            }
        }
        xhr.open("GET",url,true);
        xhr.send();
        self.NetWorkMsg.string = "联网开始";
    }

    ToVP1(){
        cc.director.loadScene("Video");
    }
}

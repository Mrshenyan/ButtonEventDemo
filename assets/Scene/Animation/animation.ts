
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    Helloworld:cc.Sprite=null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.Helloworld.getComponent(cc.Animation).on(cc.Node.EventType.TOUCH_START,this.finishCallback2);
        let points=[new cc.Vec2(-20,100),new cc.Vec2(300,-89),new cc.Vec2(100,189)]
        let act = cc.cardinalSplineTo(10,points,0);
        this.Helloworld.node.runAction(act);
    }

    start () {

    }

    // update (dt) {}

    finishCallback(str:String,target){
        // console.log(str);
        console.log(target);
        console.log("123123213123");
    }

    finishCallback2(msg,event){
        // console.log(str);
        console.log(msg);
        let tar = event.name;
        console.log(tar);
        // console.log(event);
    }
}

import Helloworld from "../../Script/others/others/Helloworld";

// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Sprite)
    Helloworld:cc.Sprite=null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.Helloworld.getComponent(cc.Animation).on(cc.Node.EventType.TOUCH_START,this.finishCallback2);
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

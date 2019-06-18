import GlobalMsg from "./GlobalMsg";

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
export default class GlobalMsg_2 extends cc.Component {


    onLoad () {
        GlobalMsg.GLOBAL_EVENTMGR.on("scene2",function(){
            GlobalMsg.GLOBAL_EVENTMGR.off("scene2");
            console.log("scene2");
        },cc.director);
        this.scheduleOnce(function(){
            GlobalMsg.sendMsg("scene1");
            GlobalMsg.curScene = "scene1";
            cc.director.loadScene("GlobalMsg_1");
        },3);
    }
}

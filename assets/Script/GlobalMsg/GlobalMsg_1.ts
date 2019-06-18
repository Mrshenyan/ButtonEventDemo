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
export default class GlobalMsg_1 extends cc.Component {

    onLoad () {
        GlobalMsg.GLOBAL_EVENTMGR.on("scene1",function(){
            GlobalMsg.GLOBAL_EVENTMGR.off("scene1");
            console.log("scene1");
        },cc.director);
        this.scheduleOnce(function(){
            GlobalMsg.sendMsg("scene2");
            GlobalMsg.curScene = "scene2";
            cc.director.loadScene("GlobalMsg_2");
        },3);
    }

    
}

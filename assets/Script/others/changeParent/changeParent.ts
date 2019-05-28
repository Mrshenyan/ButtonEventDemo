import Helloworld from "../other/Helloworld";

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
    Helloworld: cc.Sprite = null;

    @property(cc.Sprite)
    BG: cc.Sprite = null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
    ChanreParent(){
        this.Helloworld.node.parent = this.BG.node;
    }

    ChanreParent2(){
        this.Helloworld.node.zIndex = this.BG.node.zIndex+1;
        this.Helloworld.node.parent = this.BG.node;
    }

    ChanreParent3(){
        // let HW = this.Helloworld;
        // HW.parent = null;
        this.Helloworld.node.removeFromParent();
        this.BG.node.addChild(this.Helloworld.node);
        // this.Helloworld.parent = this.BG;
    }

    ChanreParent4(){
        // let HW = this.Helloworld;
        // HW.parent = null;
        let node = cc.find("Canvas/HelloWorld");
        node.zIndex = this.BG.node.zIndex+1;
        node.parent = this.BG.node;
        // this.Helloworld.parent = this.BG;
    }
    ChanreParent5(){
        // let HW = this.Helloworld;
        // HW.parent = null;
        let node = cc.find("Canvas/HelloWorld");
        node.zIndex = this.BG.node.zIndex+1;
        node.parent = this.BG.node;
        // this.Helloworld.parent = this.BG;
    }
    ChanreParent6(){
        // let HW = this.Helloworld;
        // HW.parent = null;
        let node = cc.find("Canvas/HelloWorld");
        node.zIndex = this.BG.node.zIndex+1;
        node.parent = this.BG.node;
        // this.Helloworld.parent = this.BG;
    }
}

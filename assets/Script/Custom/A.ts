const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.Button)
    send:cc.Button = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.send.node.on(cc.Node.EventType.TOUCH_START,this.sendMsg,this);
    }

    start () {

    }

    // update (dt) {}

    sendMsg(){
        console.log("已发送");
    }
}

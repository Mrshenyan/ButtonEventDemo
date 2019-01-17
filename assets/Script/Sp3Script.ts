
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    
    @property(cc.Sprite)
    Sp3:cc.Sprite = null;

    // onLoad () {}

    start () {

    }

    update (dt) {
        this.Sp3.node.on(cc.Node.EventType.TOUCH_START,this.SpCallBackEvent3,this.Sp3);
    }

    SpCallBackEvent3(event){
        let self = this;
        let sp1 = event.target;
        let parent = sp1.parent;
        // event.bubbles = false;
        console.log(event);
        console.log(event.target);
        console.log(parent);
        console.log("I am Sp3's Script");
    }
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Node)
    BezierNode:cc.Node=null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        let pos1 = cc.v2(200,400);
        let pos2 = cc.v2(400,-100)
        // let pos=[cc.v2(0, 299), cc.v2(300, -222), cc.v2(300, 100)]
        let pos=[];
        pos.push(pos1)
        pos.push(pos2);
        pos.push(pos1)
        pos.push(pos2)
        let bezierAction = cc.bezierTo(2,pos);
        let bact = bezierAction.easing(cc.easeInOut(10));
        this.BezierNode.runAction(bact);
    }

    // update (dt) {}
}

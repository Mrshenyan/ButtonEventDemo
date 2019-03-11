const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    btns:cc.Prefab=null;
    @property(cc.Sprite)
    testSp:cc.Sprite=null;

    // onLoad () {}

    start () {
        let self = this;
        let action = cc.spawn(
            cc.moveBy(2,20,0),
            cc.scaleBy(2,1.5,1.5),
        )
        let reAction = action.reverse();
        this.testSp.node.runAction(action);
        this.scheduleOnce(()=>{
            self.testSp.node.runAction(cc.spawn(
                cc.moveBy(2,-20,0),
                cc.scaleBy(2,(1/1.5),(1/1.5)),
            ));
        },3);
    }

    // update (dt) {}
}

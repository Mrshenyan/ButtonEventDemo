const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Prefab)
    btns:cc.Prefab=null;

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}

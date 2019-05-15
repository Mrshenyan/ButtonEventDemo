const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

   
    @property(cc.Prefab)
    BtnNodes:cc.Prefab=null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        let prefab = cc.instantiate(this.BtnNodes);
        this.node.addChild(prefab);
    }

    start () {

    }

    // update (dt) {}
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.SpriteAtlas)
    spPlist:cc.SpriteAtlas=null;
    @property(cc.Prefab)
    BtnNodes:cc.Prefab=null;


    onLoad () {
        let prefab = cc.instantiate(this.BtnNodes);
        this.node.addChild(prefab);
        let testReadPlistNode=new cc.Node("rePN");
        let sp = testReadPlistNode.addComponent(cc.Sprite);
        this.spPlist

    }

    start () {

    }

    // update (dt) {}
}

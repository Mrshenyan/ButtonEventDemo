const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.SpriteAtlas)
    spPlist:cc.SpriteAtlas=null;


    onLoad () {
        let testReadPlistNode=new cc.Node("rePN");
        let sp = testReadPlistNode.addComponent(cc.Sprite);
        this.spPlist

    }

    start () {

    }

    // update (dt) {}
}

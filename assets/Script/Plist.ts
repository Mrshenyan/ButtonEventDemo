const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.SpriteAtlas)
    spPlist:cc.SpriteAtlas=null;
    @property(cc.Prefab)
    BtnNodes:cc.Prefab=null;
    @property(cc.Sprite)
    sp:cc.Sprite=null;

    sps:cc.SpriteFrame[]=[];

    onLoad () {
        let self = this;
        let Btnprefab = cc.instantiate(this.BtnNodes);
        this.node.addChild(Btnprefab);
        // let testReadPlistNode=new cc.Node("rePN");
        // let sp = testReadPlistNode.addComponent(cc.Sprite);
        // this.spPlist
        this.sps = this.spPlist.getSpriteFrames();
        console.log(this.sps);
        cc.loader.loadRes("./testPlist/AutoAtlas",cc.SpriteAtlas,function(err,res){
            console.log(res);
            self.sp.spriteFrame = res.getSpriteFrame("1qa");
        });

    }

    start () {

    }

    // update (dt) {}
}

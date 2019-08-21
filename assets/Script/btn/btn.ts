const {ccclass, property} = cc._decorator;

@ccclass
export default class btn extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let btnNode = new cc.Node();
        btnNode.width=138;
        btnNode.height=138;
        btnNode.addComponent(cc.Button);
        this.node.addChild(btnNode);
        let btnBgNode = new cc.Node();
        btnBgNode.width=138;
        btnBgNode.height=138;
        btnBgNode.addComponent(cc.Sprite);
        btnNode.addChild(btnBgNode);
        let btnn = btnNode.getComponent(cc.Button);
        let btnsp = btnBgNode.getComponent(cc.Sprite);
        let clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "btn";
        clickEventHandler.handler = "click";
        btnn.clickEvents.push(clickEventHandler);
        cc.loader.loadRes("Proppng/P_0001",cc.SpriteFrame,function(err,res){
            btnsp.sizeMode=cc.Sprite.SizeMode.CUSTOM;
            if(err){
                console.error(err);
            }
            else{
                btnsp.spriteFrame = res;
                console.log(btnsp.node.width);
                console.log(btnsp.node.height);
            }
        })
        console.log(btnNode.x);
        console.log(btnNode.y);
        console.log(btnNode.width);
        console.log(btnNode.height);
    }

    start () {

    }

    // update (dt) {}
    click(){
        console.log("摸鱼");
    }
}

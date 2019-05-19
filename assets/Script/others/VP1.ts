const {ccclass, property} = cc._decorator;

@ccclass
export default class VP1 extends cc.Component {

    @property(cc.VideoPlayer)
    player:cc.VideoPlayer = null;
    @property(cc.Prefab)
    BtnNodes:cc.Prefab=null;


    onLoad () {
        let prefab = cc.instantiate(this.BtnNodes);
        this.node.addChild(prefab);
        let videoPlayerEventHandler = new cc.Component.EventHandler();
        videoPlayerEventHandler.target = this.node;
        videoPlayerEventHandler.component = "VP1";
        videoPlayerEventHandler.handler = "videlPlayerCallback";
        videoPlayerEventHandler.customEventData = "foobar";

        this.player.videoPlayerEvent.push(videoPlayerEventHandler);

    }

    start () {

    }

    // update (dt) {}
    videlPlayerCallback(event){
        this.player.play();
    }
}

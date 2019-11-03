const {ccclass, property} = cc._decorator;

@ccclass
export default class LoadRemotePic extends cc.Component {

    @property(cc.Sprite)
    Sp:cc.Sprite=null;
    @property(cc.Button)
    Btn:cc.Button=null;


    // onLoad () {}

    start () {

    }

    // update (dt) {}
    getRemotePic(event,customEventData){
        let self = this;
        let url = "http://p1.music.126.net/DG_u09cOEOt_YcIFotpo1g==/109951164030486018.jpg";
        cc.loader.load({url:url},(err,texture)=>{
            if(err){
                console.log(err);
                return;
            }else{
                let spp = self.Sp.getComponent(cc.Sprite);
                spp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                spp.spriteFrame = new cc.SpriteFrame(texture);
                
            }
        })
    }
}

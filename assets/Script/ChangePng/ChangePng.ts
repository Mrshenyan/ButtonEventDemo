// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    A:cc.Button=null;
    @property(cc.Button)
    B:cc.Button=null;
    @property(cc.Button)
    C:cc.Button=null;
    @property(cc.Sprite)
    aims:cc.Sprite=null;
    @property({
        default: 0,
        displayName:"Score",
        tooltip:"the Score",

    })
    score:number=0;
    // onLoad () {}

    start () {

    }

    // update (dt) {}
    LoadPng(event){
        let self = this;
        let name:String="";
        let target = event.currentTarget.name;
        switch(target){
            case "A":{
                name = "A_10001";
                break;
            }
            case "S":{
                name = "S_10002";
                break;
            }
            case "P":{
                name = "P_10003";
                break;
            }
        }
        let m_sUrlOfpng:string = "";
        let m_sKindOfpng = name.slice(0,1);
        let m_sLvOfpng = name.slice(2,3);
        let m_sThispng = name.slice(3);
        switch(m_sKindOfpng){
            case "P":{
                m_sUrlOfpng ="Proppng" + "/P_" + m_sThispng;
                break;
            }
            case "S":{
                m_sUrlOfpng =  "Skillpng" + "/S_" + m_sThispng;
                break;
            }
            case "A":{
                m_sUrlOfpng =  "Achievementpng" + "/A_" + m_sThispng;
                break;
            }
            default :{
                break;
            }
        }

        
        cc.loader.loadRes(m_sUrlOfpng,cc.SpriteFrame,function(err,sp){
            if(err){
                console.error(err);
                return;
            }
            else{
                let sprite = self.aims.getComponent(cc.Sprite);
                sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                sprite.spriteFrame = sp;
            }
        });
    }

    releasePng(event){
        let self = this;
        // let name:String="";
        // let target = event.currentTarget.name;
        let sp = self.aims.getComponent(cc.Sprite).spriteFrame
        let dep = cc.loader.getDependsRecursively(sp)
        cc.loader.release(sp);
    }
}

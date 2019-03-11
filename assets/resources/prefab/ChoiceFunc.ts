// import { targetedAction } from '../../../creator';
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    Btns:cc.Button[]=[];
    // @property(cc.Button)
    // Btn_:cc.Button=null;

    onLoad () {
        for(let i=0;i<this.Btns.length;i++){
            this.Btns[i].node.on(cc.Node.EventType.TOUCH_START,this.BtnChoice,this);
            this.Btns[i].node.tag = i;
        }
    }

    start () {

    }

    // update (dt) {}


    BtnChoice(event){
        // console.log(event.currentTarget.tag);
        let tag = event.currentTarget.tag;
        switch(tag){
            case 0:{
                cc.director.loadScene("helloworld");
                break;
            }
            case 1:{
                cc.director.loadScene("Video");
                break;
            }
            case 2:{
                cc.director.loadScene("Time");
                break;
            }
            case 3:{
                cc.director.loadScene("Plist");
                break;
            }
            case 4:{
                cc.director.loadScene("CustomEvent");
                break;
            }
            case 5:{
                cc.director.loadScene("readCSV");
                break;
            }
            case 6:{
                cc.director.loadScene("ProgressBar");
                console.log("Progress");
                break;
            }
            case 7:{
                cc.director.loadScene("EncryptPic");
                console.log("Encryptpic");
                break;
            }
            case 8:{
                cc.director.loadScene("Matchvs");
                console.log("Encryptpic");
                break;
            }
            case 9:{
                cc.director.loadScene("DragonBone");
                console.log("Encryptpic");
                break;
            }
            case 10:{
                cc.director.loadScene("transfer");
                console.log("Encryptpic");
                break;
            }
            case 11:{
                console.log("Action");
                break;
            }
            case 12:{
                console.log("暂无");
                break;
            }
            case 13:{
                console.log("暂无");
                break;
            }
            case 14:{
                console.log("暂无");
                break;
            }
            case 15:{
                console.log("暂无");
                break;
            }
            case 16:{
                console.log("暂无");
                break;
            }
            case 17:{
                console.log("暂无");
                break;
            }
            case 18:{
                console.log("暂无");
                break;
            }
        }
    }
}

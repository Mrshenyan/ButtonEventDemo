const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Label)
    FUNC:cc.Label[]=[];
    @property(cc.Label)
    Results:cc.Label[]=[];
    @property(cc.Button)
    BTN:cc.Button[]=[];


    onLoad () {

        for(let i=0;i<this.BTN.length;i++){
            this.BTN[i].node.on(cc.Node.EventType.TOUCH_START,this.callBackFun,this.Results[i]);
            this.BTN[i].node.tag = i;
        }

    }

    start () {

    }

    // update (dt) {}

    callBackFun(event){
        console.log(event.target.tag);
        console.log(event.target.tag);
        console.log(event.type);
        let tag = event.target.tag;
        let DATE = new Date();
        switch(tag){
            case 0:{
                this.getComponent(cc.Label).string = DATE.getUTCFullYear().toString();
                break;
            }
            case 1:{
                this.getComponent(cc.Label).string = DATE.getFullYear().toString();
                break;
            }
            case 2:{
                this.getComponent(cc.Label).string = DATE.getMonth().toString();
                break;
            }
            case 3:{
                this.getComponent(cc.Label).string = DATE.getDate().toString();
                break;
            }
            case 4:{
                this.getComponent(cc.Label).string = DATE.getDay().toString();
                break;
            }
            case 5:{
                this.getComponent(cc.Label).string = DATE.getTime().toString();
                break;
            }
            case 6:{
                this.getComponent(cc.Label).string = DATE.getHours().toString();
                break;
            }
            case 7:{
                this.getComponent(cc.Label).string = DATE.getMinutes().toString();
                break;
            }
            case 8:{
                this.getComponent(cc.Label).string = DATE.getSeconds().toString();
                break;
            }
            case 9:{
                this.getComponent(cc.Label).string = DATE.getUTCDate().toString();
                break;
            }
            case 10:{
                this.getComponent(cc.Label).string = DATE.getUTCSeconds().toString();
                break;
            }
            case 11:{
                break;
            }
        }
    }
}

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
            this.BTN[i].node.on(cc.Node.EventType.TOUCH_START,this.callBackFun,this.FUNC[i]);
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
        switch(tag){
            case 0:{

                break;
            }
            case 1:{
                break;
            }
            case 2:{
                break;
            }
            case 3:{
                break;
            }
            case 4:{
                break;
            }
            case 5:{
                break;
            }
            case 6:{
                break;
            }
            case 7:{
                break;
            }
            case 8:{
                break;
            }
            case 9:{
                break;
            }
            case 10:{
                break;
            }
            case 11:{
                break;
            }
        }
    }
}

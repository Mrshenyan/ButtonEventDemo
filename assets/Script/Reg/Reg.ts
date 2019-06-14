const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property(cc.EditBox)
    p:cc.EditBox=null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.clickEnter,this);
    }

    start () {

    }

    clickEnter(event){
        this.p.editingReturn
        let testReg:RegExp;
        if(event.keyCode == cc.macro.KEY.enter){
            let needStr = this.p.getComponentInChildren(cc.Label).string;
            let regStr = /^1[3|4|5|8][0-9]\d{4,8}$/g;
            let retArray=[];
            let iscontain:Boolean=false;
            iscontain = regStr.test(needStr);
            console.log(iscontain);
        }
    }
    // update (dt) {}
}

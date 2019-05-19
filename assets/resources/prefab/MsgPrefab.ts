
const {ccclass, property} = cc._decorator;

@ccclass
export default class MsgPrefab extends cc.Component {

    @property(cc.Button)
    SaveBtn:cc.Button=null;
    @property(cc.Button)
    GetBtn:cc.Button = null;
    @property(cc.Label)
    TxtLabel:cc.Label=null;
    @property(cc.RichText)
    RichText:cc.RichText=null;

    // onLoad () {}
    testMsg = {
    }
    start () {
        this.testMsg = JSON.parse( cc.sys.localStorage.getItem("testMsg"));
    }

    Save(){
        let self = this;
        this.testMsg["msg2"] = "cocoscreator";
        cc.sys.localStorage.setItem("testMsg",JSON.stringify(this.testMsg));
        this.RichText.string = "Save succ";
        this.TxtLabel.node.color = (cc.Color.YELLOW);
        this.TxtLabel.string = JSON.stringify(this.testMsg);
        this.scheduleOnce(()=>{
            self.node.destroy();
        },1);
    }
    get(){
        let msg = JSON.parse( cc.sys.localStorage.getItem("testMsg"));
        this.RichText.string = "get Succ";
        this.TxtLabel.string = JSON.stringify(msg);
        this.TxtLabel.node.color = (cc.Color.RED);
    }
}

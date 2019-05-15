
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    SaveBtn:cc.Button=null;
    @property(cc.Button)
    GetBtn:cc.Button = null;
    @property(cc.Label)
    TxtLabel:cc.Label=null;
    @property(cc.RichText)
    RichText:cc.RichText=null;
    @property(cc.Button)
    getPre:cc.Button=null;
    @property(cc.Node)
    PrefabNode:cc.Node=null;
    @property(cc.Prefab)
    MsgPre:cc.Prefab=null;
    @property(cc.AudioClip)
    Audios:cc.AudioClip[]=[];

    // onLoad () {}
    testMsg = {
        msg:"this",
        msg1:"is",
        msg2:"a",
        msg3:"test",
        msg4:"msg"
    }
    start () {
        let msg = JSON.parse( cc.sys.localStorage.getItem("testMsg"));
        if(msg!=null){
            this.testMsg = msg;
        }
        this.TxtLabel.string = JSON.stringify(this.testMsg);
        this.TxtLabel.node.color = (cc.Color.WHITE);
    }

    // update (dt) {}
    Save(){
        this.testMsg = JSON.parse( cc.sys.localStorage.getItem("testMsg"));
        cc.sys.localStorage.setItem("testMsg",JSON.stringify(this.testMsg));
        this.RichText.string = "Save succ";
        this.TxtLabel.node.color = (cc.Color.GREEN);
    }
    get(){
        let msg = JSON.parse( cc.sys.localStorage.getItem("testMsg"));
        this.RichText.string = "get Succ";
        this.TxtLabel.string = JSON.stringify(msg);
        this.TxtLabel.node.color = (cc.Color.RED);
    }
    addPrefab(){
        let pre = cc.instantiate(this.MsgPre);
        this.node.addChild(pre);
    }
}

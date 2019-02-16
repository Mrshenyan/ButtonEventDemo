const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        let self = this;
        cc.find("Canvas").on("CUSTOMEVENT",function(event){
            let data = event.getUserData();
            self.label.string = "已经接收到A的Msg";
            console.log("已经接收到A的msg",data);
        })
        // let B = cc.find("Canvas/B");
        // let Acomponent = cc.find("Canvas/A").getComponent("A");
        // Acomponent._callback = (function(){
        //     this.node.emit("CUSTOM_EVENT");
        // }).bind(this);
        
        // this.node.on("CUSTOM_EVENT",wirteMsg,B);
        // function wirteMsg(){
        //     //function onCustomEvent(event){
        //         console.log("12312312313");
        //    // }
        //     B.getChildByName("text").getComponent(cc.Label).string = "已接收";
        // }
    }

    start () {

    }

    // update (dt) {}
}

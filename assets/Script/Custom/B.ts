const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let B = cc.find("Canvas/B");
        let Acomponent = cc.find("Canvas/A").getComponent("A");
        Acomponent._callback = (function(){
            this.node.emit("CUSTOM_EVENT");
        }).bind(this);
        
        this.node.on("CUSTOM_EVENT",wirteMsg,B);


        function wirteMsg(){
            //function onCustomEvent(event){
                console.log("12312312313");
           // }
            B.getChildByName("text").getComponent(cc.Label).string = "已接收";
        }
    }

    start () {

    }

    // update (dt) {}
}

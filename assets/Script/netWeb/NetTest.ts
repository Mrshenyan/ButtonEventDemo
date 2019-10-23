import { NetNode } from "./NetNode";

import { WebSock } from "./WebSock";

import { NetData } from "./IProtocolHelper";

import NetManager from "./NetManager";
import { DefStringProtocol } from "./NetInterface";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    textLabel: cc.Label = null;
    @property(cc.Label)
    urlLabel: cc.Label = null;
    @property(cc.RichText)
    msgLabel: cc.RichText = null;
    private lineCount: number = 0;

    onLoad() {
        let Node = new NetNode();
        this.urlLabel.string = "ws://echo.websocket.org"
        Node.init(new WebSock(), new DefStringProtocol());
        Node.setResponeHandler(0, (cmd: number, data: NetData) => {
            if (this.lineCount > 5) {
                let idx = this.msgLabel.string.search("\n");
                this.msgLabel.string = this.msgLabel.string.substr(idx + 1);
            }
            this.msgLabel.string += `${data}\n`;
            ++this.lineCount;
        });
        NetManager.getInstance().setNetNode(Node);
    }

    onConnectClick() {
        NetManager.getInstance().connect({ url: this.urlLabel.string });
    }

    onSendClick() {
        NetManager.getInstance().send(this.textLabel.string);
    }

    onDisconnectClick() {
        NetManager.getInstance().close();
    }

    onReConnect(){
        let netInstance = NetManager.getInstance();
        if(cc.sys.isObjectValid(netInstance)){
            // netInstance = new NetManager();
            console.log("valid");
        }else{
            console.log("not valid")
        }
        netInstance.connect({ url: this.urlLabel.string });
    }
    // update (dt) {}
}

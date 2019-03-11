const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Button)
    Btnlink:cc.Button=null;

    _sioClient;
    SocketIO
    onLoad () {
        // let io = require()
        this.SocketIO = io;
    }

    start () {

    }

    // update (dt) {}

    BtncallBack(){
        let self = this;
        this._sioClient = this.SocketIO.connect("127.0.0.1:3000");
        this._sioClient.tag = "Cocos Creator_1";
        this._sioClient.on("callClientEvent",this.callClientEvent)
        this._sioClient.on("connect",function(){
            cc.log('connect called');
        })
        this._sioClient.on('message',function(data){
            cc.log(this._sioClient.tag+"message received: "+data);
        })
        this._sioClient.on("error",function(){
            cc.log("error called");
        })

        sendMsg();
        function sendMsg(){
            cc.log("onsendMsg");
            self._sioClient.send("hello Socket.IO!");
            self._sioClient.emit("callServerEvent ","{\"message\":\"Hello Server.\"}");
        }
    }

    callClientEvent(data){
        let msg = "Server CallBack："+ this._sioClient.tag + "Data: " +data;
        cc.log(msg);
    }
    
}

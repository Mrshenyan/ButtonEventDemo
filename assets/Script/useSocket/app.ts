const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {


    @property(cc.Button)
    Btnlink: cc.Button = null;
    @property(cc.Button)
    BtnlinkWeb:cc.Button = null;
    @property(cc.Label)
    LabelNodes:cc.Label[]=[];

    _sioClient;
    SocketIO
    onLoad() {
        // let io = require()
        this.SocketIO = io;
    }

    start() {

    }

    // update (dt) {}

    BtncallBack() {
        let self = this;
        this._sioClient = this.SocketIO.connect("127.0.0.1:3000");
        this._sioClient.tag = "Cocos Creator_1";
        this._sioClient.on("callClientEvent", this.callClientEvent)
        this._sioClient.on("connect", function () {
            cc.log('connect called');
        })
        this._sioClient.on('message', function (data) {
            cc.log(this._sioClient.tag + "message received: " + data);
        })
        this._sioClient.on("error", function () {
            cc.log("error called");
        })

        sendMsg();
        function sendMsg() {
            cc.log("onsendMsg");
            self._sioClient.send("hello Socket.IO!");
            self._sioClient.emit("callServerEvent ", "{\"message\":\"Hello Server.\"}");
        }
    }

    callClientEvent(data) {
        let msg = "Server CallBack：" + this._sioClient.tag + "Data: " + data;
        cc.log(msg);
    }

    BtnXhrCallback() {
        let self = this;
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && (xhr.status>=200 && xhr.status<400)){
                let response = xhr.responseText;
                self.LabelNodes[0].string = response;
            }
        }
        xhr.open("GET","",true);
        xhr.send();
    }

    BtnWebCallBack(){
        let self = this;
        let ws = new WebSocket("ws://echo.websocket.org");
        ws.onopen = function(event){
            console.log("Send test ws was opend");
        }
        ws.onmessage = function(event){
            self.LabelNodes[1].string = event.data;
        }
        ws.onerror = function(event){
            self.LabelNodes[1].string = "err";
        }
        ws.onclose = function(event){
            self.LabelNodes[1].string = "close";
        }
        setTimeout(function(){
            if(ws.readyState == WebSocket.OPEN){
                ws.send("hello websocker, i am a text message");
            }
            else{
                self.LabelNodes[1].string = "websocket instance wasnot ready";
            }
        },10);
    }
}

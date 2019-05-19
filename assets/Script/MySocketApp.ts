const {ccclass, property} = cc._decorator;

@ccclass
export default class MySocketApp extends cc.Component {

    @property(cc.Label)
    lable:cc.Label=null;

    onLoad () {
        let self = this;

        if(cc.sys.isNative){
            // window.io = SocketIO;
        }
        else{
            // window.io = require('socket.io');
        }

        let socket = io("http://localhost:3000");
        socket.emit("client","那个谁，连我干嘛");
        socket.on("server",function(data){
            console.log("data="+data);
            self.lable.string="收到服务器的回话";
        })
    }

    start () {

    }

    // update (dt) {}
}

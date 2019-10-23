
import { NetData } from "./IProtocolHelper";
import { ISocket } from "./NetInterface";

const {ccclass, property} = cc._decorator;

export class WebSock implements ISocket {
    onClose: (event: any) => void;
    private _ws:WebSocket = null;
    onConnected: (event) => void;
    onMessage: (msg) => void;
    onError: (event) => void;
    onClosed: (event) => void;
    connect(option:any) {
        // throw new Error("Method not implemented.");
        if(this._ws){
            if(this._ws.readyState === WebSocket.CONNECTING){
                console.log("websocket connected,wait a moment");
                return false;
            }
        }
        let url = null;
        if(option.url){
            url = option.url;
        }else{
            let ip = option.ip;
            let port = option.port;
            let protocol = option.protocol;
            url = `${protocol}:`;
        }
        this._ws = new WebSocket(url);
        this._ws.binaryType = option.binaryType?option.binaryType:"arraybuffer";
        this._ws.onmessage = (event)=>{
            this.onMessage(event.data);
        };
        this._ws.onopen = this.onConnected;
        this._ws.onerror = this.onError;
        this._ws.onerror = this.onClosed;
        return true;
    }
    send(buffer:NetData) {
        // throw new Error("Method not implemented.");
        if(this._ws.readyState ==WebSocket.OPEN){
            this._ws.send(buffer);
            return true;
        }
        return false;
    }
    close(code?: number, reason?: string) {
        // throw new Error("Method not implemented.");
        this._ws.close();
    }
}

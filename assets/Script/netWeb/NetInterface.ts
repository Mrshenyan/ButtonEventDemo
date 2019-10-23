export type NetData=(string |ArrayBufferLike |Blob|ArrayBufferView);
export type NetCallFunc=(cmd:number,data:any)=>void;

export interface CallbackObject{
    target:any,
    callback:NetCallFunc,
}
export interface RequestObject{
    buffer:NetData,
    rspCmd:number,
    rspObject:CallbackObject,
}

export interface IProtocolHelper{
    getHeadlen():number;
    getHearbeat():NetData;
    getPackageLen(msg:NetData):number;
    checkPackage(msg:NetData):boolean;
    getPackageId(msg:NetData):number;
}

export class DefStringProtocol implements IProtocolHelper{
    getHeadlen(): number {
        // throw new Error("Method not implemented.");
        return 0;
    }    
    getHearbeat(): string | ArrayBuffer | Blob | ArrayBufferView {
        // throw new Error("Method not implemented.");
        return "";
    }
    getPackageLen(msg: string | ArrayBuffer | Blob | ArrayBufferView): number {
        // throw new Error("Method not implemented.");
        return msg.toString().length;
    }
    checkPackage(msg: string | ArrayBuffer | Blob | ArrayBufferView): boolean {
        // throw new Error("Method not implemented.");
        return true;
    }
    getPackageId(msg: string | ArrayBuffer | Blob | ArrayBufferView): number {
        // throw new Error("Method not implemented.");
        return 0;
    }
    
}

export interface ISocket{
    onConnected:(event)=>void;
    onMessage:(msg:NetData)=>void;
    onError:(event)=>void;
    onClose:(event)=>void;

    connect(options:any);
    send(buffer:NetData);
    close(code?:number,reason?:string);
}

export interface INetworkTips{
    connectTips(isShow:boolean):void;
    reconnectTips(isShow:boolean):void;
    requestTips(isShow:boolean):void;
}
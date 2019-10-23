const {ccclass, property} = cc._decorator;
export type NetData = (string |ArrayBufferLike |Blob|ArrayBufferView);
export interface IProtocolHelper {
    getHeadlen():number;
    getHearbeat():NetData;
    getPackageLen(msg:NetData):number;
    checkPackage(msg:NetData):boolean;
    getPackageId(msg:NetData):number;
}


export default class GlobalMsg {
    static GLOBAL_EVENTMGR = new cc.EventTarget();
    static curScene;
    static sendMsg(name){
        GlobalMsg.GLOBAL_EVENTMGR.emit(name);
    }
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class MotionStreak extends cc.Component {

    @property(cc.Node)
    HelloWorld:cc.Node=null;

    
    private _speed:number=5;
    @property
    public set speed(spe){
        this._speed=spe;
    }
    public get speed(){
        return this._speed;
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    }

    start () {

    }

    update (dt) {
        let s = this._speed;
        this.HelloWorld.x += s;
    }
}

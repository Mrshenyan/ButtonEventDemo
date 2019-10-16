const {ccclass, property} = cc._decorator;

@ccclass
export default class TrafficLight extends cc.Component {

   
    @property(cc.Sprite)
    greenSp:cc.Sprite=null;
    @property(cc.Sprite)
    yellowSp:cc.Sprite=null; 
    @property(cc.Sprite)
    redSp:cc.Sprite=null;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}

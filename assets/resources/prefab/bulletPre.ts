const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {
    // @property(cc.Prefab)
    // bulletPre:cc.Prefab=null;
    // @property(cc.Node)
    // ParentNode:cc.Node=null;

    onLoad(){
        // let poolLen = 10;
        // this.bPool = new cc.NodePool();
        // for(let i=0;i<poolLen;i++){
        //     let bullet = cc.instantiate(this.bulletPre);
        //     this.bPool.put(bullet);
        // }
    }



    init(){
        let self = this;
        let direction = this.node.parent.getComponent("signColor").curdirection;
        console.log(direction);
    }
}
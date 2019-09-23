const {ccclass, property} = cc._decorator;

@ccclass
export default class NodePools extends cc.Component {

    
    
    NodePool:cc.NodePool=null;
    @property(cc.Prefab)
    nodePre:cc.Prefab=null;
    @property(cc.Node)
    nodeParent:cc.Node=null;

    onLoad () {
        this.NodePool = new cc.NodePool();
        let poolcapacity = 10;
        for(let i=0;i<poolcapacity;i++){
            let node = cc.instantiate(this.nodePre);
            this.NodePool.put(node);
        }
    }

    start () {

    }

    // update (dt) {}

    addObj(){
        let obj = null;
        if(this.NodePool.size()>0){
            obj = this.NodePool.get();
        }else{
            obj = cc.instantiate(this.nodePre);
        }
        this.nodeParent.addChild(obj);
    }
}

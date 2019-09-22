import Global from "../../Script/Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Content extends cc.Component {

    @property(cc.Prefab)
    Item:cc.Prefab=null;

    onLoad () {
        let item = cc.instantiate(this.Item);
        let attr = {tag:0};
        item.attr(attr);
        let interval = 15;
        let x = item.width;
        for(let i = 0;i<10;i++){
            let childNode = cc.instantiate(item);
            let xx = -480 + i * x + interval*i;
            let attr = {tag:i};
            childNode.attr(attr);
            childNode.children[0].getComponent(cc.Label).string = i.toString();
            // childNode.setPosition(xx);
            childNode.x = xx;
            this.node.addChild(childNode);
        }
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touchMove,this);
        this.node.on(cc.Node.EventType.TOUCH_END,this.touchMoveEnd,this);
    }

    start () {

    }

    // update (dt) {}
    touchMove(event){
        let delta = event.touch.getDelta();
        let deltaX = delta.x;
        for(let i=0;i<this.node.childrenCount;i++){
            this.node.children[i].runAction(cc.moveBy(0.05,deltaX,0));
        }
        if(deltaX<0){
           for(let i=0;i<this.node.childrenCount;i++){
                if(this.node.children[i].x<(-480-this.node.children[i].width)){
                    Global.GLOBALLISTER.emit("Out of bordary" + this.node.children[i].tag,deltaX);
                }
            } 
        }else{
            for(let i=this.node.childrenCount-1;i>-1;i--){
                 if(this.node.children[i].x>(480+this.node.children[i].width)){
                     Global.GLOBALLISTER.emit("Out of bordary" + this.node.children[i].tag,deltaX);
                 }
             }
        }
        
    }

    touchMoveEnd(event){
        let delta = event.touch._startPoint.x - event.touch._prevPoint.x
        let deltaX = delta
        console.log(deltaX);
    }
}

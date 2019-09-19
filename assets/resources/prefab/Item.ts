import Global from "../../Script/Global";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Item extends cc.Component {

    

    // onLoad () {}

    start () {
        let self = this;
        console.log(this.node.tag);
        Global.GLOBALLISTER.on("Out of bordary"+this.node.tag,this.ListenOut,this);
    }

    update (dt) {
        
    }
    ListenOut(event){
        let SN = 9;
        if(event<0){
            if(this.node.tag==0){
                SN=9;
            }
            else{
                SN = this.node.tag-1;
            }
        }else{
            if(this.node.tag==9){
                SN=0;
            }
            else{
                SN = this.node.tag+1;
            }
        }
        if(event<0){
            this.node.x = this.node.parent.children[SN].x + (15+ this.node.width)
        }else{
            this.node.x = this.node.parent.children[SN].x - (15+ this.node.width)
        }
    }
}

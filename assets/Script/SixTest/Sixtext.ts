const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    cell: cc.Prefab = null;

    Cell:cc.Node = null;
    CellPOS:cc.Vec2=new cc.Vec2(415,386);
    CellLine:number=87/Math.cos(Math.PI/6);
    onLoad(){
        this.Cell = cc.instantiate(this.cell);
        this.generaterCell();
    }
    generaterCell(){
        let self = this;
        let a = Math.pow(4,0.5);
        for(let n=1;n<10;n++){
            let i=0;
            let limit=Math.floor((n-1)/2);
            let remainder = (n/2) - parseInt((n/2).toString());
            if(remainder!=0){
                i=-Math.floor((n-1)/2);//向下取整
                for(;i<=limit;i++){
                    let cellPos:cc.Vec2=new cc.Vec2();
                    let newCell = cc.instantiate(this.Cell);
                    cellPos.x = this.CellPOS.x + 0.5*this.CellLine/Math.cos(Math.PI/6)*i*(n-1);
                    cellPos.y = this.CellPOS.y - 3*this.CellLine*(n-1)/2;
                    newCell.setPosition(cellPos);
                    console.log(cellPos);
                    this.node.addChild(newCell);
                }
            }
            else{
                i=-n/2;//向下取整
                for(;i<=n/2;i++){
                    if(i!=0){
                        let x=0;
                        if(i<0){
                            x=-1;
                        }
                        else{
                            x=1;
                        }
                        let cellPos:cc.Vec2=new cc.Vec2();
                        let newCell = cc.instantiate(this.Cell);
                        cellPos.x = this.CellPOS.x + 0.5*this.CellLine/Math.cos(Math.PI/6)*(n-1)-0.5*this.CellLine/Math.cos(Math.PI/6)*x;
                        cellPos.y = this.CellPOS.y - 1.5*this.CellLine*(n-1);
                        newCell.setPosition(cellPos);
                        console.log(cellPos);
                        this.node.addChild(newCell);
                    }
                }
            }
            
        }
    }
}

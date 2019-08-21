const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Prefab)
    cell: cc.Prefab = null;

    Cell:cc.Node = null;
    CellPOS:cc.Vec2=new cc.Vec2(415,386);
    CellLine:number=87/Math.cos(Math.PI/6);
    allCellPos=new Array();//生成的游戏区域的格子的信息
    thisProp:cc.Node=null;
    onLoad(){
        this.Cell = cc.instantiate(this.cell);
        this.generaterCell();
    }
    //生成游戏区域
    generaterCell(){
        let self = this;
        let a = Math.pow(4,0.5);
        let j=-1;
        for(let n=1;n<10;n++){
            let i=0;
            let limit=Math.floor((n-1)/2);
            let remainder = (n/2) - parseInt((n/2).toString());
            if(remainder!=0){
                i=-Math.floor((n-1)/2);//向下取整
                let count = 0;
                this.allCellPos[n] = new Array();//一整行
                for(;i<=limit;i++){
                    let cellPos:cc.Vec2=new cc.Vec2();
                    let newCell = cc.instantiate(this.Cell);
                    newCell.on(cc.Node.EventType.TOUCH_START,this.CellClickCallBack,this,false);
                    cellPos.x = this.CellPOS.x + 2*this.CellLine*Math.cos(Math.PI/6)*i;
                    cellPos.y = this.CellPOS.y - 3*this.CellLine*(n-1)/2;
                    newCell.setPosition(cellPos);
                    this.node.addChild(newCell);
                    j++;
                    let attr={tag:{n,i,count}};
                    newCell.attr(attr);
                    this.allCellPos[n][count] = new Array();
                    this.allCellPos[n][count].push(newCell);
                    this.allCellPos[n][count].push(cellPos);
                    this.allCellPos[n][count]["SN"] = new Array();
                    this.allCellPos[n][count]["SN"].push(n);
                    this.allCellPos[n][count]["SN"].push(i);
                    this.allCellPos[n][count]["SN"].push(count);
                    count++;
                }
            }
            else{
                i=-n/2;//向下取整
                let count = 0;
                this.allCellPos[n] = new Array();
                for(;i<=n/2;i++){
                    if(i!=0){
                        let x=0;//x是正负因子
                        if(i<0){
                            x=-1;
                        }
                        else{
                            x=1;
                        }
                        let cellPos:cc.Vec2=new cc.Vec2();
                        let newCell = cc.instantiate(this.Cell);
                        cellPos.x = this.CellPOS.x+this.CellLine*Math.cos(Math.PI/6)*x+2*this.CellLine*Math.cos(Math.PI/6)*(Math.abs(i)-1)*x;
                        cellPos.y = this.CellPOS.y - 1.5*this.CellLine*(n-1);
                        newCell.setPosition(cellPos);
                        newCell.on(cc.Node.EventType.TOUCH_START,this.CellClickCallBack,this,false);
                        this.node.addChild(newCell);
                        j++;
                        let attr={tag:{n,i,count}};
                        newCell.attr(attr);
                        this.allCellPos[n][count] = new Array();
                        this.allCellPos[n][count].push(newCell);
                        this.allCellPos[n][count].push(cellPos);
                        this.allCellPos[n][count]["SN"] = new Array();
                        this.allCellPos[n][count]["SN"].push(n);
                        this.allCellPos[n][count]["SN"].push(i);
                        this.allCellPos[n][count]["SN"].push(count)
                        count++;
                    }
                }
            }
            
        }
        console.log(this.allCellPos);
    }


    //转向
    RotaFun(){
        //tipNode是转圈节点
        //这里的this.node是生成的数字块的挂载节点：tmpWarp
        let tipNode:cc.Node = this.node.getChildByName('RotaNode');
        if (tipNode.getNumberOfRunningActions() != 0)return;
            
        // tipNode.runAction(cc.rotateTo(.2, tipNode.rotation + 60));
        // cc.audioEngine.playEffect(this.gameScene.effects[8]);
        let childs = tipNode.children;
        //条件运算：前面条件不满足就不执行后面
        childs.length > 1 && childs.forEach(v => {
            //mul函数是系统函数：用于坐标分量乘上因子，所以因子不能丢，基本上是谁调用就用谁乘因子。也可以传入需要乘上的坐标参数
            let p1 = v.position.mul(2);
            //var tp = cc.pRotateByAngle(v.position, cc.v2(), -60 * Math.PI / 180);
            //注：这里的rotate函数是旋转函数：参数是弧度，返回值是角度，注意与rotateTo和rotateBy函数区别
            let tp = cc.v2(v.position).rotate(-60 * Math.PI / 180);
            let p2 = tp.mul(2);
            v.runAction(cc.bezierTo(.2, [p1, p2, tp]));
        });
    }

    CellClickCallBack(event,customEventTarget){
        // let currentTarget =
        let tag = event.currentTarget.tag;
        console.log(tag);
        //这里的this是调用的时候传入的响应节点
        this.FindCell(tag);
    }

    FindCell(tag){
        let lineNum = tag.n;
        let RowNum = tag.i;
        let CellSN = tag.count;
        console.log(lineNum);
        console.log(RowNum);
        let x =lineNum/2 - parseInt((lineNum/2).toString());
        let RoundSixCellSN = new Array(6);
        for(let o=0;o<RoundSixCellSN.length;o++){
            RoundSixCellSN[o] = new Array();
        }
        RoundSixCellSN[0].push(lineNum-1);
        RoundSixCellSN[0].push(CellSN-1);
        RoundSixCellSN[1].push(lineNum-1);
        RoundSixCellSN[1].push(CellSN);
        RoundSixCellSN[2].push(lineNum);
        RoundSixCellSN[2].push(CellSN-1);
        RoundSixCellSN[3].push(lineNum);
        RoundSixCellSN[3].push(CellSN+1);
        RoundSixCellSN[4].push(lineNum+1);
        RoundSixCellSN[4].push(CellSN);
        RoundSixCellSN[5].push(lineNum+1);
        RoundSixCellSN[5].push(CellSN+1);
        console.log(RoundSixCellSN);
        let RoundSixCellNodes=new Array();
        
        for(let i=0;i<RoundSixCellSN.length;i++){
            let cellsn = RoundSixCellSN[i][1];
            let linenum = RoundSixCellSN[i][0];
            try {
                if(this.allCellPos[linenum][cellsn]){
                    RoundSixCellNodes.push(this.allCellPos[linenum][cellsn]);
                }
            } catch (error) {
                // console.error(error);
                continue;
            }
        }
        console.log(RoundSixCellNodes);
    }
}

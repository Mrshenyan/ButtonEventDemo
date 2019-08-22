const {ccclass, property} = cc._decorator;

@ccclass
export default class Sixtext extends cc.Component {

    @property(cc.Prefab)
    cell: cc.Prefab = null;//格子的预制体
    @property(cc.Node)
    RotateNode:cc.Node=null;
    @property(cc.Prefab)
    Shadow:cc.Prefab = null;//阴影的预制体
    @property(cc.Prefab)
    Chesses:cc.Prefab[]=[];//数字的预制体
    @property(cc.Node)
    newGenedParentNode:cc.Node=null;
    Cell:cc.Node = null;//游戏区域的游戏格子，在这个类中用于存放格子的预制体的实例化，在循环创建格子的时候被复制。
    CellPOS:cc.Vec2=new cc.Vec2(415,386);//第一个六边形的位置
    CellLine:number=87/Math.cos(Math.PI/6);//六边形单边长
    allCellPos=new Array();//生成的游戏区域的格子的信息
    thisProp:cc.Node=null;
    FilledGridCount:number=45;//被天上数字的格子数；
    onLoad(){
        this.Cell = cc.instantiate(this.cell);
        this.generaterCell();
        let self = this;
        this.RotateNode.on(cc.Node.EventType.TOUCH_START,()=>{
            let shadow = cc.instantiate(self.Shadow);

        })
        this.RotateNode.on(cc.Node.EventType.TOUCH_MOVE,this.Move,this);
    }
    //生成游戏区域
    generaterCell(){
        let self = this;
        let a = Math.pow(4,0.5);
        let j=-1;
        let gap=20;
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
                    if(i!=0){
                        cellPos.x +=i*gap;
                    }

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
                    this.allCellPos[n][count].isFilled = false;
                    // this.allCellPos.prototype.isFill = false;
                    // let isfill = new addProtot(this.allCellPos);
                    // addProtot.prototype.isFilled = false;
                    // isfill.isFilled = false;
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
                        if(i==-1||i==1){
                            cellPos.x +=(i*gap)/2;
                        }
                        else{
                            cellPos.x +=((i*gap)-x*gap/2)
                        }
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
                        this.allCellPos[n][count].isFilled = false;
                        // let isfill = new addProtot(this.allCellPos);
                        // addProtot.prototype.isFilled = null;
                        // isfill.isFilled = false;
                        count++;
                    }
                }
            }
            

        }
        function addProtot(array){
            this.allCellPos
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

    
    /**
     * 一键消除，获取点击的单元格的周围游戏格。
     * @param tag 被点击的单元格信息
     * @param toolKind 使用的道具类型，1：一键消除，2：小导弹，3：强制合成
     */
    FindCell(tag,toolKind?){
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

    /**
     * 棋子生成函数，
     * @param count 需要生成的个数
     * @param rotate 生成的初始角度
     */
    generateChess(count?,rotate?){
        let genedNumGridPos:Array<cc.Vec2>=new Array();
        if(!count){
            count = parseInt((Math.random() * 2).toString()) + 1, rotate = parseInt((Math.random() * 6).toString()) * 60;
        }
        this.newGenedParentNode.removeAllChildren();//该节点是新生成的棋子的父节点
        //生成棋子的时候需要判断游戏区域剩余的空格数
        switch(this.FilledGridCount){
            case 0:{//gameover
                console.log("gameover");
                break;
            }
            case 1:{//generate one number grid
                console.log("generate one number grid");
                break;
            }
            default:{//generate two number grid
                console.log("generate two number grid");
                break;
            }
        }
        function geneFun(){
            let geneID=[0,1,2,3,4,5];
            if(!count||count==1){
                genedNumGridPos.push(new cc.Vec2(0,0));
                // let 
            }
            else{
                let pos = new cc.Vec2(-100,0);
                let Rota = 0 * Math.PI/180;
                let pos1Rota = pos.rotate(Rota)
                let pos2Rota = pos.rotate(Rota-Math.PI);
                genedNumGridPos.push(pos1Rota);
                genedNumGridPos.push(pos2Rota);
            }
            genedNumGridPos.forEach(v=>{
                let id = parseInt((Math.random()*geneID.length).toString());

            });
        }
    }

    Move(event){
        let touchpos = event.touch.getDelta();
        this.RotateNode.x += touchpos.x;
        this.RotateNode.y += touchpos.y;

    }
}

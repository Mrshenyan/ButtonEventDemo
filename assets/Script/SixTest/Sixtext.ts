const {ccclass, property} = cc._decorator;

@ccclass
export default class Sixtext extends cc.Component {

    /** 格子的预制体*/
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
    /**游戏区域的游戏格子，在这个类中用于存放格子的预制体的实例化，在循环创建格子的时候被复制。 */
    Cell:cc.Node = null;//
    /**第一个六边形的位置 */
    CellPOS:cc.Vec2=new cc.Vec2(415,386);//
    /**六边形单边长 */
    CellLine:number=87/Math.cos(Math.PI/6);//
    /**生成的游戏区域的格子的信息 */
    allCellPos=new Array();//
    thisProp:cc.Node=null;
    FilledGridCount:number=45;//被天上数字的格子数；
    ShoadowNode:cc.Node=null;
    ariPos:cc.Vec2=null;
    FilledGrid:boolean=false;
    FilledPos=new Array(2);
    onLoad(){
        this.ShoadowNode = cc.instantiate(this.Shadow)
        this.ShoadowNode.active = false;
        this.Cell = cc.instantiate(this.cell);
        this.generaterCell();
        let self = this;
        this.RotateNode.on(cc.Node.EventType.TOUCH_START,()=>{
            // let shadow = cc.instantiate(self.Shadow);
        })
        this.RotateNode.on(cc.Node.EventType.TOUCH_MOVE,this.Move,this);
        this.RotateNode.on(cc.Node.EventType.TOUCH_END,this.MoveEnd,this);
        this.RotateNode.zIndex=10;
        this.ariPos = this.RotateNode.getPosition(); 
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
                    let shadownode = cc.instantiate(this.ShoadowNode);
                    if(!newCell.getChildByName("shadow")){
                        newCell.addChild(shadownode);
                    }
                    this.node.addChild(newCell);
                    j++;
                    let row = i;
                    let sn = count;
                    let attr={tag:{n,row,sn}};
                    let attr2={isFilled:false};
                    newCell.attr(attr);
                    newCell.attr(attr2);
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
                        if(i==-1||i==1){
                            cellPos.x +=(i*gap)/2;
                        }
                        else{
                            cellPos.x +=((i*gap)-x*gap/2)
                        }
                        cellPos.y = this.CellPOS.y - 1.5*this.CellLine*(n-1);
                        newCell.setPosition(cellPos);
                        newCell.on(cc.Node.EventType.TOUCH_START,this.CellClickCallBack,this,false);
                        let shadownode = cc.instantiate(this.ShoadowNode);
                        if(!newCell.getChildByName("shadow")){
                            newCell.addChild(shadownode);
                        }
                        this.node.addChild(newCell);
                        j++;
                        let row = i;//中间向两边
                        let sn = count;//自左向右，从0开始
                        let attr={tag:{n,row,sn}};
                        let attr2={isFilled:false};
                        newCell.attr(attr);
                        newCell.attr(attr2);
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
            }
            

        }
        // function addProtot(array){
        //     this.allCellPos
        // }
        // console.log(this.allCellPos);
    }


    //转向
    RotaFun(rotate1?){
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
            if(rotate1==undefined){
                let p1 = v.position.mul(2);
                //注：这里的rotate函数是旋转函数：参数是弧度，返回值是角度，注意与rotateTo和rotateBy函数区别
                let tp = cc.v2(v.position).rotate(-60 * Math.PI / 180);
                let p2 = tp.mul(2);
                v.runAction(cc.bezierTo(.2, [p1, p2, tp]));
                // v.setPosition(tp)
            }
            else{
                // //注：这里的rotate函数是旋转函数：参数是弧度，返回值是角度，注意与rotateTo和rotateBy函数区别
                let p1 = v.position.mul(2);
                //注：这里的rotate函数是旋转函数：参数是弧度，返回值是角度，注意与rotateTo和rotateBy函数区别
                let tp = cc.v2(v.position).rotate(-60 * Math.PI / 180);
                let p2 = tp.mul(2);
                v.runAction(cc.bezierTo(.2, [p1, p2, tp]));
                //tp是旋转之后的坐标。
                // v.setPosition(tp)
            }
        });
    }

    CellClickCallBack(event,customEventTarget){
        // let currentTarget =
        let tag = event.currentTarget.tag;
        // console.log(tag);
        //这里的this是调用的时候传入的响应节点
        let nodes = this.FindCell(tag);//tag是点击的游戏格的位置属性和第几个
        // console.log(nodes);
    }

    
    /**
     * 获取点击的单元格的周围游戏格。
     * @param tag 被点击的单元格信息
     * @param toolKind 使用的道具类型，1.0：一键消除，2.1,2.2,2.3：小导弹，3.0：强制合成
     * 注：小导弹有三种：横向，左斜向，右斜向，分别对应2.1，2.2，2.3
     * 这个查找函数用于返回使用道具之后的需要消除的游戏格
     */
    FindCell(tag,toolKind?):cc.Node[]{
        let lineNum = tag.n;
        let RowNum = tag.row;
        let CellSN = tag.sn;
        // console.log(lineNum);
        // console.log(RowNum);
        let x =lineNum/2 - parseInt((lineNum/2).toString());
        let RoundSixCellSN = new Array(6);
        for(let o=0;o<RoundSixCellSN.length;o++){
            RoundSixCellSN[o] = new Array();
        }
        /**使用技能返回的游戏格 */
        let ToolKindNodes=new Array<cc.Node>();
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
        // console.log(RoundSixCellSN);
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
        RoundSixCellNodes[RoundSixCellNodes.length] = this.allCellPos[lineNum][CellSN]
        // console.log(RoundSixCellNodes);
        switch(toolKind){
            case 1:{
                ToolKindNodes = RoundSixCellNodes;
                break;
            }
            case 2.1:{
                ToolKindNodes[0] = RoundSixCellNodes[2];
                ToolKindNodes[1] = RoundSixCellNodes[3];
                ToolKindNodes[2] = RoundSixCellNodes[6];
                break;
            }
            case 2.2:{
                ToolKindNodes[0] = RoundSixCellNodes[0];
                ToolKindNodes[1] = RoundSixCellNodes[5];
                ToolKindNodes[2] = RoundSixCellNodes[6];
                break;
            }
            case 2.3:{
                ToolKindNodes[0] = RoundSixCellNodes[1];
                ToolKindNodes[1] = RoundSixCellNodes[4];
                ToolKindNodes[2] = RoundSixCellNodes[6];
                break;
            }
            case 3:{
                //强制合成要另外处理，等第二次选择结束
                ToolKindNodes[0] = RoundSixCellNodes[2];
                ToolKindNodes[1] = RoundSixCellNodes[3];
                ToolKindNodes[2] = RoundSixCellNodes[6];
                break;
            }
            default:{
                return RoundSixCellNodes;
            }
        }
        return ToolKindNodes;
    }

    /**
     * 棋子生成函数，
     * @param count 需要生成的个数
     * @param rotate 生成的初始角度
     */
    generateChess(){
        let self = this;
        let count=0;
        let rotate=0;
        let genedNumGrid:Array<cc.Node>=new Array();
        let attr={tag:null};
        let num={theNum:0};
        if(!count){
            count = parseInt((Math.random() * 2).toString()) + 1, rotate = parseInt((Math.random() * 6).toString()) * 60;
        }
        rotate = parseInt((Math.random() * 6).toString()) * 60
        this.newGenedParentNode.removeAllChildren();//该节点是新生成的棋子的父节点
        //生成棋子的时候需要判断游戏区域剩余的空格数
        switch(this.FilledGridCount){
            case 0:{//gameover
                console.log("gameover");
                break;
            }
            case 1:{//generate one number grid，这里只生成一个棋子
                console.log("generate one number grid only");
                geneFun()
                break;
            }
            default:{//generate two number grid,要说明的是这里生成1个或者两个棋子
                console.log("generate two number grid");
                geneFun();
                break;
            }
        }
        function geneFun(){
            let geneID=[0,1,2,3,4,5];
            let genePos=new Array<cc.Vec2>(2);
            if(!count||count==1){
                let id = parseInt((Math.random()*geneID.length).toString());
                genedNumGrid[0] = cc.instantiate(self.Chesses[geneID[id]]);
                genedNumGrid[0].attr(attr);
                num.theNum = geneID[id]+1;
                genedNumGrid[0].attr(num);
                // console.log("生成的是："+num.theNum);
                geneID.splice(id,1)
                genePos[0]=genedNumGrid[0].position.rotate(rotate);
                // let 
            }
            else{
                // console.log(geneID);
                let id = parseInt((Math.random()*geneID.length).toString());
                genedNumGrid[0] = cc.instantiate(self.Chesses[geneID[id]]);
                genedNumGrid[0].attr(attr);
                num.theNum = geneID[id]+1;
                genedNumGrid[0].attr(num);
                // console.log("生成的是："+num.theNum);
                geneID.splice(id,1)
                // console.log("id: "+id);
                // console.log(geneID);
                id = parseInt((Math.random()*geneID.length).toString());
                genedNumGrid[1] = cc.instantiate(self.Chesses[geneID[id]]);
                genedNumGrid[1].attr(attr);
                num.theNum = geneID[id]+1;
                // console.log("生成的是："+num.theNum);
                genedNumGrid[1].attr(num);
                geneID.splice(id,1)
                // console.log("id: "+id);
                // console.log(geneID);
                genedNumGrid[0].x=99;
                genedNumGrid[1].x=-99
                genePos[0]=genedNumGrid[0].position.rotate(rotate*Math.PI/180);
                genePos[1]=genedNumGrid[1].position.rotate(rotate*Math.PI/180);
            }
            for(let i=genedNumGrid.length-1;i>=0;i--){
                if(genedNumGrid[i]==undefined||genedNumGrid[i]==null){
                    continue;
                }
                else{
                    genedNumGrid[i].setPosition(genePos[i]);
                    self.newGenedParentNode.addChild(genedNumGrid[i]);
                }
            }
        }
    }

    /**
     * 移动函数
     * @param event 
     */
    Move(event){
        let self = this;
        let touchpos = event.touch.getDelta();
        this.RotateNode.x += touchpos.x;
        this.RotateNode.y += touchpos.y;
        self.FilledPos=[];
        RotateLoop:
        for(let n=0;n<this.RotateNode.childrenCount;n++){
            allCellLoop:
            for(let i=1;i<this.allCellPos.length;i++){
                for(let j=0;j<this.allCellPos[i].length;j++){
                    let node = this.allCellPos[i][j][0];
                    let nodeworldpos = node.parent.convertToWorldSpaceAR(node.getPosition())
                    let theNode = this.RotateNode.children[n]
                    let vpos = theNode.parent.convertToWorldSpaceAR(theNode.getPosition());
                    let s = this.FilledGrid = alignPos(vpos,nodeworldpos,node,n,this.RotateNode.childrenCount);
                    if(s){
                        i=1,j=0;
                        break allCellLoop;
                    }
                }
            }
        }
        function alignPos(pos1,pos2,node,n,count):boolean{
            let v = new cc.Vec2(pos1.x-pos2.x,pos1.y-pos2.y)
            let det = cc.v2().sub(v).mag();;
            if(det<(node.width/2-10)){
                node.getChildByName("shadow").active = true;
                self.FilledPos.push(node);
                if(node.isFilled&&count==2){
                    self.FilledPos=[];
                }
                return true;
            }
            else{
                if((n!=1)||(count<2)){
                    node.getChildByName("shadow").active = false;
                    self.FilledPos=[];
                }
                return false;
            }
        }
    }

    /**
     * 移动结束
     * @param event 
     */
    MoveEnd(event){
        let self = this;
        let fpos=new Array();
        if(!this.FilledGrid){
            this.RotateNode.setPosition(this.ariPos);
        }
        if(this.FilledPos.length<1){
            this.RotateNode.setPosition(this.ariPos);
        }
        for(let i=0;i<this.FilledPos.length;i++){
            if(this.FilledPos[i]==null||this.FilledPos[i]==undefined){
                this.RotateNode.setPosition(this.ariPos);
            }
            else if(this.FilledPos.length!=this.RotateNode.childrenCount){
                this.FilledPos[i].children[0].active=false;
                this.RotateNode.setPosition(this.ariPos);
            }
            else{
                this.FilledPos[i].isFilled=true;
                this.RotateNode.children[i].setPosition(0,0); 
                this.RotateNode.children[i].tag =  this.FilledPos[i].tag;
                this.RotateNode.children[i].parent = this.FilledPos[i];
                // self.Eliminate(this.FilledPos[i].children[1].tag);
                fpos[fpos.length]=this.FilledPos[i];
                this.FilledPos.shift();
                i=-1;
                this.FilledGridCount-=1;
                this.RotateNode.setPosition(this.ariPos);
            }
        }
        for(let i=0;i<fpos.length;i++){
            self.Eliminate(fpos[i].children[1].tag);
        }
        this.FilledGrid = false;
        this.FilledPos=[]
    }

    /**
     * @param tag 数字在游戏区域的位置
     * 消除函数
     */
    Eliminate(tag:{n,row,sn}){//这里有个逻辑问题
        // console.log(tag);
        let ArroundNodes = this.FindCell(tag);
        let self = this;
        // console.log(ArroundNodes);//最后一个是自身;
        // console.log(this.allCellPos);
        let leftNode=this.allCellPos[tag.n][tag.sn-1],rightNode=this.allCellPos[tag.n][tag.sn+1];
        let downLeftNode,downRightNode;
        let theNode = this.allCellPos[tag.n][tag.sn];
        if(tag.n==9){
            downLeftNode=undefined;
            downRightNode=undefined;
        }else{
            downLeftNode = this.allCellPos[tag.n+1][tag.sn]
            downRightNode = this.allCellPos[tag.n+1][tag.sn+1];
        }
        /** 左，右，左下，右下,0表示为空，可以填入数字*/
        let leftIsFilled,rightIsFilled,downLeftIsFilled,downRightIsFilled;
        if(leftNode==undefined){
            leftIsFilled=0b1111;
        }
        else{
            if(!leftNode[0].isFilled){
                leftIsFilled=0b0000;
            }
            else{
                leftIsFilled=0b0010;
            }
        }
        if(rightNode==undefined){
            rightIsFilled=0b1111;
        }
        else{
            if(!rightNode[0].isFilled){
                rightIsFilled=0b0000;
            }
            else{
                rightIsFilled=0b0001;
            }
        }
        if(downLeftNode==undefined){
            downLeftIsFilled=0b1111;
        }
        else{
            if(!downLeftNode[0].isFilled){
                downLeftIsFilled=0b0000;
            }
            else{
                downLeftIsFilled=0b1000;
            }
        }
        if(downRightNode==undefined){
            downRightIsFilled=0b1111;
        }
        else{
            if(!downRightNode[0].isFilled){
                downRightIsFilled=0b0000;
            }
            else{
                downRightIsFilled=0b0100;
            }
        }
        let LPulsR = leftIsFilled+rightIsFilled;
        let x = LPulsR|0b0000//按位于之后结果为0表示左右都有空，即不需要消除
        if(!x){
            console.log("X: "+x);
            console.log("不需要消除")
            self.generateChess();
        }else{
            switch(x){
                case 0b0010:{
                    console.log("左");
                    subElinate(theNode[0].children[1],leftNode[0].children[1],downLeftIsFilled);
                    break;
                }
                case 0b0001:{
                    console.log("右");
                    subElinate(theNode[0].children[1],rightNode[0].children[1],downRightIsFilled);
                    break;
                }
                case 0b0011:{
                    console.log("左右");
                    let lorR = Math.random();
                    LorRElinate(lorR);
                    break;
                }
                default:{
                    if(leftIsFilled&&leftIsFilled>5){
                        console.log("最左端");
                        if(rightIsFilled){
                            subElinate(theNode[0].children[1],rightNode[0].children[1],downRightIsFilled);
                        }
                        else{
                            //边界情况，为空直接重新生成
                            self.generateChess();
                        }
                    }
                    else if(rightIsFilled&&rightIsFilled>5){
                        console.log("最右端");
                        if(leftIsFilled){
                            subElinate(theNode[0].children[1],leftNode[0].children[1],downLeftIsFilled);
                        }
                        else{
                            //边界情况，为空直接重新生成
                            self.generateChess();
                        }
                    }
                }
            }
        }

        /**
         * 
         * @param node1 当前棋子
         * @param node2 左或右棋子
         * @param downFilled 左下或右下游戏格
         * @param both 是否左右都有棋子
         */
        function subElinate(node1,node2,downFilled,both?:boolean){
            if(both==undefined){
                if(node1.theNum==node2.theNum){
                    console.log("相等，可以相消");
                    if(!downFilled){
                        console.log("下是空的，可以填入");
                        let addNum = node1.theNum+node2.theNum;
                    }else{
                        console.log("下不是空的，直接消除");
                        let addNum = node1.theNum+node2.theNum;
                    }
                }else{
                    console.log("不相等，不可以相消");
                }
                self.generateChess();
            }else{
                console.log("相等，可以相消");
                if(!downFilled){
                    console.log("下是空的，可以填入");
                    let addNum = node1.theNum+node2.theNum;
                }else{
                    console.log("下不是空的，直接消除");
                    let addNum = node1.theNum+node2.theNum;
                }
            }
        }

        function LorRElinate(lorR){
            if(lorR<0.5){//需要进一步判断左右数字是否相等，
                if(theNode[0].children[1],leftNode[0].theNum==leftNode[0].children[1].theNum){
                    if(!downLeftIsFilled&&downLeftIsFilled<5){
                        subElinate(theNode[0].children[1],leftNode[0].children[1],downLeftIsFilled,true);
                    }else if(!downRightIsFilled&&downRightIsFilled<5){
                        subElinate(theNode[0].children[1],rightNode[0].children[1],downRightIsFilled,true);
                    }
                    else {
                        console.log("左右都没");
                    }
                }else if(theNode[0].children[1],leftNode[0].theNum==rightNode[0].children[1].theNum){
                    //有点问题
                }
            }
            else{
                if(!downRightIsFilled&&downRightIsFilled<5){
                    subElinate(theNode[0].children[1],leftNode[0].children[1],downLeftIsFilled,true);
                }else if(!downLeftIsFilled&&downLeftIsFilled<5){
                    subElinate(theNode[0].children[1],rightNode[0].children[1],downRightIsFilled,true);
                }
                else {
                    console.log("左右都没");
                }
            }
        }
    }

    /**
     * 消除后生成数字格函数
     * @param Addnum 相加之后的数字大小
     * @param pos 新生成的数字的位置
     */
    EliminateGene(Addnum,pos){
        let addedNode = cc.instantiate(this.Cell);
        /**用于加载 */
        let colorNum = Addnum - parseInt((Addnum/3).toString());
        
    }
}

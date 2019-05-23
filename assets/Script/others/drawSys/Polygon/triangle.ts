// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class triangle extends cc.Component implements Polygon {
    edgeColor:cc.Color;
    edgeNum:Number;
    fillColor:cc.Color;
    area:Number;

    AlllinePos:cc.Vec2[]=[];
    AllLineLens:number[]=[];
    AllAuxiliaryLines:number[]=[];
    subTriArea:number[]=[];
    SUMArea:number=0;
    /**
     * 需要的辅助角的余弦值
     */
    AuxiliaryAgale:number[]=[];
    isClosed:boolean=false;

    public static readonly instance = new triangle();
    private constructor() {
        super();
     };
    /**
     * 面积计算
     */
    CalcArea():Number{
        this.SUMArea = 0;
        let AuxiliaryAgale;
        let tempLines = this.CalcAuxiliary();
        this.subTriArea.length = this.AllAuxiliaryLines.length + 1;
        if(!this.isClosed){
            return 0;
        }
        else{
            for(let i=0;i<this.AuxiliaryAgale.length;i++){
                this.subTriArea[i] = 0.5 * tempLines[i] * tempLines[i+1] * Math.sqrt(1-Math.pow(this.AuxiliaryAgale[i],2));
                this.SUMArea += this.subTriArea[i];
            }
        }
        alert(this.SUMArea);
    }
    

    /**
     * 辅助计算
     */
    CalcAuxiliary():number[]{
        let tempLine:number[]=[];
        for(let i=0;i<=this.AlllinePos.length-1;i++){
            if(i==this.AlllinePos.length-1){
                this.AllLineLens[i] = Math.sqrt((
                    Math.pow(Math.abs(this.AlllinePos[i].x-this.AlllinePos[0].x),2) 
                    + Math.pow(Math.abs(this.AlllinePos[i].y-this.AlllinePos[0].y),2)));
            }
            else{
                this.AllLineLens[i] = Math.sqrt((
                    Math.pow(Math.abs(this.AlllinePos[i].x-this.AlllinePos[i+1].x),2) 
                    + Math.pow(Math.abs(this.AlllinePos[i].y-this.AlllinePos[i+1].y),2)));
            }
        }
        tempLine[0] = this.AllLineLens[0];
        tempLine[1] = this.AllLineLens[1];
        for(let i=2;i<this.AlllinePos.length-1;i++){
            this.AllAuxiliaryLines[i] = Math.sqrt((
                Math.pow(Math.abs(this.AlllinePos[i].x-this.AlllinePos[0].x),2) 
                + Math.pow(Math.abs(this.AlllinePos[i].y-this.AlllinePos[0].y),2)));
            tempLine[tempLine.length] = this.AllAuxiliaryLines[i];
        }
        tempLine[tempLine.length] = this.AllLineLens[this.AllLineLens.length-2];
        tempLine[tempLine.length] = this.AllLineLens[this.AllLineLens.length-1];
        for(let i=0;i<tempLine.length-3;i++){
            this.AuxiliaryAgale[i] = (Math.pow(tempLine[i],2)+Math.pow(tempLine[i+1],2) 
                - Math.pow(this.AllLineLens[i+2],2))/(2 * tempLine[i] * tempLine[i+1]);
        }
        return tempLine;
    }

    /**
     * 
     * @param node parent node
     * @param LinePos points pos
     */
    Draw(node:cc.Node,...linePos:cc.Vec2[]):cc.Graphics{
        this.AlllinePos = linePos;
        this.edgeNum = linePos.length - 1;
        let lineLen:number[] = [];
        let tri = node.addComponent(cc.Graphics);
        tri.moveTo(linePos[0].x,linePos[0].y);
        for(let i=0;i<linePos.length;i++){
            let len = Math.sqrt((Math.pow(linePos[i].x,2)+Math.pow(linePos[i].y,2)));
            lineLen[i] = len;
        }
        for(let i=1;i<=linePos.length;i++){
            if(i==linePos.length){
                tri.lineTo(linePos[0].x,linePos[0].y)
                this.isClosed = true;
            }
            else{
                tri.lineTo(linePos[i].x,linePos[i].y);
            }
        }
        tri.strokeColor = cc.Color.YELLOW;
        tri.close();
        tri.fillColor = cc.Color.RED;
        tri.stroke();
        tri.fill();
        return tri;
    }
}

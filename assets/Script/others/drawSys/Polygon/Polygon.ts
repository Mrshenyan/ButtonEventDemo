interface Polygon {
    edgeColor:cc.Color;
    edgeNum:Number;
    fillColor:cc.Color;
    area:Number;
    [propName:string]:any;

    CalcArea():Number;
    /**
     * 
     * @param node parent node
     * @param LinePos points pos
     */
    Draw(node:cc.Node,...LinePos:cc.Vec2[]):void;

    
}


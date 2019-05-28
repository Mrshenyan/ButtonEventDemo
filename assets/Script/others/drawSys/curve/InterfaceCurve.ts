interface CurveInterface {
    edgeColor:cc.Color;
    fillColor:cc.Color;
    area:Number;
    [propName:string]:any;
    
}


class CurveClass implements CurveInterface{
    [propName: string]: any;    
    edgeColor: cc.Color;
    fillColor: cc.Color;
    area: Number;

    
    public static readonly instance = new CurveClass();
    private constructor(){};

    /**
     * 
     * @param radius 圆的半径或椭圆的定长2a
     * @param focus1 圆的圆心或椭圆的焦点1坐标
     * @param focus2 椭圆的焦点2坐标
     */
    Draw(radius: number,focus1: cc.Vec2, focus2?: cc.Vec2, ): void{
        if(focus2==undefined){

        }
    }
}


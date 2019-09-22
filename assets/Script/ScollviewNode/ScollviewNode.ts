const {ccclass, property} = cc._decorator;

@ccclass
export default class ScollviewNode extends cc.Component {
    private _content:cc.Node = cc.find("Canvas/ScollviewNode/view/content");
    @property({
        type:cc.Node,
        serializable:true,
    })
    public get content(){
        return this._content;
    }
    public set content(content:cc.Node){
        this._content = content;
    }
    
    private _HorV:Boolean=false;
    @property({
        type:Boolean,
        tooltip:"开启水平滚动还是垂直滚动\n"+
                "true for Horizontal"
    })
    public get HorV(){
        return this._HorV;
    }
    public set HorV(HorV:Boolean){
        this._HorV = HorV;
    }

    _Inertia:Boolean=false;
    @property({
        type:Boolean,
        tooltip:"是否开启惯性"
    })
    public get Inertia(){
        return this._Inertia;
    }
    public set Inertia(inertia:Boolean){
        this._Inertia = inertia
    }
    _Brake:Number=0;
    @property({
        type:Number,
        tooltip:"开启惯性后用户在停止触摸后，\n"
        +"滚动多久停止，0表示永不停止，1表示立刻停止"
    })
    public get Brake(){
        return this._Brake;
    }
    public set Brake(Brake:Number){
        this._Brake = Brake
    }

    _Elastic:Boolean=false;
    @property({
        type:Boolean,
        tooltip:"是否允许滚动内容超过边界\n 并在停止触摸后回弹"
    })
    public get Elastic(){
        return this._Elastic;
    }
    public set Elastic(elastic:Boolean){
        this._Elastic = elastic;
    }

    _BounceDuration:number=0.5;
    @property({
        type:Number,
        tooltip:"回弹持续时间，\n 0表示立即反弹"
    })
    public get BounceDuration(){
        return this._BounceDuration;
    }
    public set BounceDuration(bounceDuration){
        this._BounceDuration = bounceDuration;
    }

    @property({
        type:cc.Component.EventHandler,
        tooltip:"滚动视图事件的回调函数",
    })
    scrollEvents:cc.Component.EventHandler[]=[]

    private _cancelInnerEvents:Boolean=true;
    @property({
        type:Boolean,
        tooltip:"滚动行为是否会取消节点上注册的触摸事件",
    })
    public get cancelInnerEvents(){
        return this._cancelInnerEvents;
    }
    public set cancelInnerEvents(cancelInnerEvents:Boolean){
        this._cancelInnerEvents = cancelInnerEvents;
    }

    _view:cc.Node;
    get view(){
        if(this.content){
            return this.content.parent;
        }
    }
    _caculateMovePercentDelta(options){
        let anchor = options.anchor;
        let applyToHorizontal = options.applyToHorizontal;
        let applyToVertical = options.applyToVertical;
        this._calculateBoundary();
        anchor = anchor.clampf(cc.v2(0,0),cc.v2(1,1));

        let scrollSize = this._view.getContentSize();
        let contentSize = this.content.getContentSize();
        let bottomDeta = this._getContentBottomBoundary() - this._bottonBoundary;
        bottomDeta = -bottomDeta;
        let leftDeta

    }
    _getContentBottomBoundary(){
        return 0
    }
    _calculateBoundary(){

    }
}

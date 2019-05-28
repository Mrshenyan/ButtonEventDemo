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
export default class algorithm extends cc.Component {

    // @property(cc.Node)
    // Btn_Nodes1:cc.Node=null;
    @property(cc.Node)
    Btn_Nodes2:cc.Node=null;
    @property(cc.Node)
    text_Node:cc.Node=null;
    @property(cc.Label)
    Msg:cc.Label=null;

    NumArray:number[]=new Array();
    time1=0;
    time2=0;
    time3=0;
    time0=0;
    isStart:boolean=false;
    isOver0:boolean=false;
    isOver1:boolean=false;
    isOver2:boolean=false;
    isOver3:boolean=false;

    Sdate:Date=new Date();
    Edate:Date=new Date();
    onLoad () {
        
        for(let i=0;i<this.Btn_Nodes2.childrenCount;i++){
            this.Btn_Nodes2.children[i].on(cc.Node.EventType.TOUCH_START,this.BtnClick,this);
        }
    
        

    }

    start () {

    }

    // update (dt) {
    // }

    BtnClick(event){
        console.log(event);
        let target = event.currentTarget;
        let targetName = target.name;
        switch(targetName){
            case "A":{
                this.A();
                break;
            }
            case "B":{
                this.B();
                break;
            }
            case "C":{
                this.C();
                break;
            }
            case "D":{
                this.D();
                break;
            }
        }
    }


    /**
     * 算法1:冒泡
     */
    A(){
        let time:number = 0;
        let startTime = new Date().getTime();
        let endTime = 0;
        let temp=0;
        let pos=0;
        let needSortArray = this.NumArray;
        for(let j=0;j<needSortArray.length-1;j++){

            for(let i=0;i<j;i++){
                if(needSortArray[i]>needSortArray[i+1]){
                    temp = needSortArray[i];
                    needSortArray[i] = needSortArray[i+1];
                    needSortArray[i+1] = temp;
                    temp=0;
                }
                // pos = i;
                endTime = new Date().getTime();
                this.time0 = endTime - startTime;
            }
            // j=pos;
        }
        this.isOver0 = true;
        this.text_Node.children[0].getComponent(cc.Label).string = this.time0.toString();
        console.log(this.NumArray);
    }

    
    A_1(){
        let time:number = 0;
        let startTime = new Date().getTime();
        let endTime = 0;
        let temp=0;
        // let pos=0;
        let needSortArray = this.NumArray;
        let i=needSortArray.length;
        while(i>0){
            let pos=0;
            for(let j=0;j<i;j++){
                if(needSortArray[j]>needSortArray[j+1]){
                    pos = j;
                    temp = needSortArray[j];
                    needSortArray[j] = needSortArray[j+1];
                    needSortArray[j+1] = temp;
                    endTime = new Date().getTime();
                    this.time0 = endTime - startTime;
                }
                i=pos;
                endTime = new Date().getTime();
                this.time0 = endTime - startTime;
            }
        }
        this.time0 = endTime - startTime;
        this.text_Node.children[1].getComponent(cc.Label).string = this.time0.toString();
    }

    /**
     * 算法2 选择
     */
    B(){
        let startTime = new Date().getTime();
        let endTime = 0;
        let needSortArray = this.NumArray;
        let temp=0;
        for(let j=0;j<needSortArray.length;j++){
            for(let i=0;i<needSortArray.length;i++){
                if(needSortArray[j]>needSortArray[i]){
                    temp = needSortArray[j];
                    needSortArray[j] = needSortArray[i];
                    needSortArray[i]=temp;
                }
                // break;
            }
        }
        this.isOver1 = true;
        endTime = new Date().getTime();
        this.time1 = endTime - startTime;
        this.text_Node.children[1].getComponent(cc.Label).string = this.time1.toString();
        needSortArray.reverse();
        console.log(needSortArray);
    }
    /**
     * 算法3 插入()
     */
    C(){
        let startTime = new Date().getTime();
        let endTime = 0;
        let needSortArray = this.NumArray;
        let temp=0;
        let startNum = needSortArray[0];
        for(let i=1;i<needSortArray.length;i++){

        }
        this.isOver2 = true;
        endTime = new Date().getTime();
        this.time2 = endTime - startTime;
        this.text_Node.children[2].getComponent(cc.Label).string = this.time2.toString();
    }
    /**
     * 算法4
     */
    D(){
        let time:number = 0;
        let startTime = new Date().getTime();
        let endTime = 0;

        this.isOver3 = true;
        endTime = new Date().getTime();
        this.time3 = endTime - startTime;
        this.text_Node.children[3].getComponent(cc.Label).string = this.time3.toString();
    }

    EditBoxInputFinish(){
        this.NumArray = [];
        this.Msg.node.children[0].children[0].active = true;
        for(let i =0;i<parseInt(this.Msg.node.getChildByName("num").
                        children[1].getComponent(cc.Label).string);i++){
            let x = Math.ceil(Math.random()*10000);
            this.NumArray.push(x);
        }
        console.log("vvvvv not Sort vvvvvv")
        console.log(this.NumArray);
        console.log("^^^^^^^not Sort^^^^^^")
    }
}

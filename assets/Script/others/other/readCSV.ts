const {ccclass, property} = cc._decorator;

@ccclass
export default class readCSV extends cc.Component {
    @property(cc.Button)
    readBtn:cc.Button=null;
    @property(cc.Button)
    deT:cc.Button=null;
    @property(cc.Prefab)
    BtnNodes:cc.Prefab=null;

    SN:Array<number>=[];
    resJson:String;
    delayTime=1;
    onLoad () {
        let self = this;
        let prefab = cc.instantiate(this.BtnNodes);
        this.node.addChild(prefab);
        let xxxx = "000011";
        let yyyy = parseInt(xxxx);
        console.log(yyyy);
        //以下是CVS文件读取并转换为数组存储。
        cc.loader.loadRes("Etable",function(err,res){
            if(err){
                cc.error(err);
            }
            else{
                console.log(res.text);
                // let x = parseFloat(res.json[0].features.DE);
                // let y=0;
                // let z=x+y;
                self.resJson = JSON.stringify(res.text);
                let resS = JSON.parse(<string>self.resJson);
                let RCount=0;
                for(let u=0;u<self.resJson.length;u++){
                    if(self.resJson[u]=="r"){
                        self.SN.push(u);
                        RCount++;
                    }
                }
                console.log("Rcount "+RCount);
            }
        });
    }

    start () {

    }

    // update (dt) {}

    read(){
        let self = this
        let contents:Array<String>=[];
        let Content:Array<String>=[];
        let xxxx = [];
        let y;
        for(let i=0;i<self.SN.length;i++){
            if(i==0){
                y = self.resJson.substring(0,self.SN[i]);
                y = y.substring(1,y.length-1);
                Content.push(y);
                // let jsonData = JSON.parse(y);
                // console.log(jsonData);
            }
            else{
                y = self.resJson.substring(self.SN[i-1],self.SN[i]);
                y = y.substring(y.search("n"));
                y = y.substring(1,y.length-1);
                Content.push(y);
               
            }
        }
        xxxx = Serialization();
        console.log(Content);
        console.log(this.delayTime);


        /**
         * 
         */
        function Serialization():Array<[]>{
            let dotpos=[];
            let matchStr:string = ",";
            for(let i=0;i<Content.length;i++){
                dotpos[i]=[];
                let tempCon = Content[i];
                for(let j=0;j<Content[i].length-1;j++){
                    if(tempCon.substring(j,j+1)==matchStr){
                        dotpos[i].push(j);
                    }
                }
            }
            let str = Content[1].substring(dotpos[1][2],dotpos[1][3]);
            console.log("str: "+str);
            console.log(dotpos);
            return dotpos;
        }
    }
    ChangeTime(){
        this.delayTime-=0.1;   
    }
}

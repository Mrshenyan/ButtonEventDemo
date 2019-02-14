const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property(cc.Button)
    readBtn:cc.Button=null;

    onLoad () {
        
    }

    start () {

    }

    // update (dt) {}

    read(){
        let contents:Array<String>=[];
        let resJson:String;
        let SN:Array<number>=[];
        let Content:Array<String>=[];
        cc.loader.loadRes("test",function(err,res){
            if(err){
                cc.error(err);
            }
            else{
                resJson = JSON.stringify(res);
                // resJson = res
                let resS = JSON.parse(<string>resJson);
                // let x = resJson.search("r");
                // console.log(x);
                console.log(resJson);
                for(let u=0;u<res.length;u++){
                    if(resJson[u]=="r"){
                        SN.push(u);
                    }
                }
            }
        });

        this.scheduleOnce(function(){
            let y;
            for(let i=0;i<SN.length;i++){
                if(i==0){
                    y = resJson.substring(0,SN[i]);
                    y = y.substring(1,y.length-1);
                    console.log("y : "+y);
                    Content.push(y);
                }
                else{
                    y = resJson.substring(SN[i-1],SN[i]);
                    y = y.substring(y.search("n"));
                    y = y.substring(1,y.length-1);
                    console.log("y : "+y);
                    Content.push(y);
                }
            }
            console.log(Content);
        },2);
        
        // let x = resJson.split("\r\n");
        // let y = resJson.substr(1,5);
        // console.log(x);
        // console.log(y);
    }
}

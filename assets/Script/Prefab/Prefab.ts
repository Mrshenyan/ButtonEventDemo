const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let self = this;
        // let pre;
        // cc.loader.loadRes("prefab/1qa",function(err,res){
        //     if(err){
        //         console.error(err);
        //     }
        //     else{
        //         let attr={tag:0};
        //         let pre = cc.instantiate(res);
        //         pre.attr(attr);
        //         loadP(pre);
        //     }
        // })
        let url = "";
        let pngs 
        cc.loader.loadRes(url,function(err,res){
            pngs = res;
        })
        loadP();
        async function loadP(){
            // self.scheduleOnce(function(){
                for(let i=1;i<10;i++){
                    cc.loader.loadRes("prefab/1qa",function(err,res){
                        if(err){
                            console.error(err);
                        }
                        else{
                            let attr={tag:0};
                            let pre = cc.instantiate(res);
                            pre.attr(attr);
                            self.node.addChild(pre);
                            pre.tag=i;
                            pre.y=280-50*i;
                            console.log(i);
                    // loadP(pre);
                        }
                    });
                    // let aPre = cc.instantiate(pre);
                    // let attr={tag:i};
                    // aPre.attr(attr);
                    // aPre.tag=i;
                    // aPre.y=280-50*i;
                    // self.node.addChild(aPre);
                }
            // },2);
        }
    }

    start () {
        let ha = this.testAsync();
        console.log(ha);
    }


    async testAsync(){
        return "hello async";
    }

    // update (dt) {}
}

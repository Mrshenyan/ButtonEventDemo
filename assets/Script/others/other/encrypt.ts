const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    BtnEncrypt:cc.Button = null;
    @property(cc.Prefab)
    btnPrefab:cc.Prefab=null

    url="./encryptpic/1qa";
    onLoad () {

        let btns = cc.instantiate(this.btnPrefab);
        this.node.addChild(btns);
        if(cc.sys.isNative){
            this.Encrypting();
        }
    }

    start () {

    }

    // update (dt) {}

    Encrypting(){
        let self = this;
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","encrypt","(Ljava/lang/String)V",self.url)
        console.log(self.url);
        // jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","encrypt","(Ljava/lang/String)V",self.url);
        console.log("Encrypt Start ");
    }

    unEncrypt(){
        let self = this;
        let res = jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","unEncrypt","()V");
        console.log(res);
    }
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Button)
    BtnEncrypt:cc.Button = null;

    url="./encryptpic/1qa";
    onLoad () {

        this.Encrypting();
    }

    start () {

    }

    // update (dt) {}

    Encrypting(){
        let self = this;
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","encrypt","(Ljava/lang/String)V",self.url);
        console.log("Encrypt Start ");
    }

    unEncrypt(){
        let self = this;
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","encrypt","()V");
    }
}

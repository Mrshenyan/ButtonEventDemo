import websocket from "../useSocket/websocket";
const {ccclass, property} = cc._decorator;
import {execFile} from 'child_process'
// let childProcess  = require('child_process')
@ccclass
export default class webNeteasy extends cc.Component {

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:
    // ws = new WebSocket("https://music.163.com/#/user?id=255667932");
    onLoad () {
        
    }

    start () {

    }

    // update (dt) {}
    ClicktoWangyi(){
        let url = "https://music.163.com/#/user?id=255667932";
        // let execFile = childProcess.execFile;
        let arg1 = "123";
        let arg2="456";
        let fileName = "jsLinkPyTest.py";
        execFile('python'+''+fileName+''+arg1+''+arg2,function(err,stdout,stderr){
            if(err){
                console.log("error: "+err);
            }
            if(stdout){
                console.log("stdout : "+stdout);
            }
        });

    }
}

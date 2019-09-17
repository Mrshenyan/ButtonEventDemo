import HttpManager from "../HttpManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class getNetTime extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    _url:string="http://api.k780.com:88/?app=life.time&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json"
    @property
    set url(urlStr){
        this._url = urlStr;
    }
    get url(){
        return this._url;
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        let url = this._url;
        let timeXML =new XMLHttpRequest();
        timeXML.onreadystatechange = function(){
            if(timeXML.readyState == 4 && (timeXML.status>= 200 && timeXML.status<400)){
                let res = timeXML.responseText;
                console.log(JSON.parse(res));
            }
        }
        timeXML.open("GET",url,true);
        timeXML.send();
        // let str = timeXML.
        // console.log(str);
    }

    // update (dt) {}
}

import Base64 from "./Base64"
// import ConnectManager from "../Node/ConnectManager";
export default class HttpManager {
    static m_sUrl:string="http://120.26.200.106/candyH5/base/server/1.1.0/php";
    // static m_oconnectNodeMgr:ConnectManager;
    static m_oSendDataArr = {};
    static m_oCallbacks = {};
    static m_oGlobalCallbacks = {};
    /**
     * 初始化，拼接url
     */
    static init(){
        // let url = "http://120.26.200.106/candyH5/base/server/1.1.0/php"
        // switch (GameData.tempData.channel) {
        //     case "test":
        //         url += "118.25.136.244";
        //         break;
        //     case "limi":
        //         url += "193.112.183.174";
        //         break;
        //     case "iqiyi":
        //         url += "bgmmxs.17666.mobi";
        //         break;
        //     case "huawei":
        //         url += "bgmmxs.17666.mobi";
        //         break;
        //     case "soeasy":
        //         url += "bgmmxs.17666.mobi";
        //         break;
        //     case "wechat":
        //         url += "193.112.183.174";
        //         break;
        //     default:
                
        //         break;
        // }
        // url = url + "/candyH5/" + GameData.tempData.channel + "/server/" + Constant.version + "/php";
        // switch (GameData.tempData.channel) {
        //     case "test":
        //         // Http.url = "https://bgmmxs.17666.mobi/candyH5/huawei/server/" + Constant.version + "/php";
        //         // Http.url = "http://193.112.183.174/candyH5/wechat/server/" + Constant.version + "/php";
        //         Http.url = "http://120.26.200.106/candyH5/base/server/" + Constant.version + "/php";
        //         break;
        //     default:
        //         Http.url = url
        //         break;
        // }
    }
    
    static sendRequest(sPath:string,oData:object,oHandler:Function,sExtraUrl?:string) {
        let oXhr = new XMLHttpRequest()
        oXhr.timeout = 5000;
        var str = "?";
        for(var k in oData){
            if(str != "?"){
                str += "&";
            }
            let s = encodeURI(oData[k]);
            s = s.replace(/\+/g, "%2B"); 
            s = s.replace(/\//g, "%2F"); 
            s = s.replace(/\=/g, "%3D"); 

            str += k + "=" + s;
        }
        if(sExtraUrl == null){
            sExtraUrl = HttpManager.m_sUrl;
        }

        var sRequestURL = sExtraUrl + sPath + str;//完整的url
        console.log("RequestURL:" + sRequestURL);
        
        if (cc.sys.isNative){
            oXhr.setRequestHeader("Accept-Encoding","gzip,deflate");
            oXhr.setRequestHeader("contentType","text/html;charset=UTF-8" );
        }
        
        oXhr.onreadystatechange = function() {
            if(oXhr.readyState === 4 && (oXhr.status >= 200 && oXhr.status < 300)){
                console.log("http res("+ oXhr.responseText.length + "):" + oXhr.responseText);
                try {
                    var oRet = JSON.parse(oXhr.responseText);//ret作为服务器应答返回数据在handle中处理
                    if(oHandler != null){
                        oHandler(oRet);
                    }                        /* code */
                } catch (e) {
                    console.log("err:" + e);
                    //handler(null);
                }
                finally{
                    // if(cc.vv && cc.vv.wc){
                    // //       cc.vv.wc.hide();    
                    // }
                }
            }else{
                // handler({result:-1});
            }
        };
        
        // if(cc.vv && cc.vv.wc){
        //     //cc.vv.wc.show();
        // }
        oXhr.open("GET",sRequestURL, true);
        oXhr.send();
        return oXhr;
    };

    /**
     * 
     * @param iType 传入的数据类型，用于区别渠道,整型参数
     * @param sId 传入的数据所属id，字符串型参数
     * @param oCallback 回调函数
     * @param oData 传入的数据本体
     * @param bHaveNode 网络连接动画节点
     */
    static sendData(iType:number,sId:string,oCallback?:Function,oData?:{},bHaveNode?:boolean){
        bHaveNode = bHaveNode == undefined? true:bHaveNode;
        let oNewData = {}
        oNewData["type"] = iType;
        oNewData["id"] = sId;
        oData = oData == undefined ? {} : oData;
        oNewData["content"] = oData;
        HttpManager.send(oNewData,oCallback);
    }

    /**
     * 
     * @param data 发送的数据本体
     * @param callback 回调
     */
    static send(oData:object,oCallback?:Function){
        if(oCallback != undefined){
            this.m_oCallbacks[oData["type"]] = oCallback;
        }
        this.m_oSendDataArr[oData["type"]] = [oData,oCallback];
        let s:string = Base64.encoder(JSON.stringify(oData));

        HttpManager.sendRequest("/data.php",{s:s},HttpManager.onmessage);
    }

    static reSend(type){
        let oData = this.m_oSendDataArr[type][0];
        this.m_oCallbacks[oData["type"]] = this.m_oSendDataArr[type][1];
        let s:string = Base64.encoder(JSON.stringify(oData));

        HttpManager.sendRequest("/data.php",{s:s},HttpManager.onmessage);
    }

    static sendFail(type){
        HttpManager.m_oCallbacks[type] = undefined;
    }


    /**
     * 服务器有值返回，处理返回值
     * @param data 数据本体
     */
    static onmessage(data) {
        let sResult = data.result.split("_");
        data.type = parseInt(sResult[0]);
        data.result = parseInt(sResult[1]);
        if(HttpManager.m_oCallbacks[data.type] != undefined){
            HttpManager.m_oCallbacks[data.type](data);
            HttpManager.m_oCallbacks[data.type] = undefined;
        }else if(HttpManager.m_oGlobalCallbacks[data.type] != undefined){
            HttpManager.m_oGlobalCallbacks[data.type](data);
        }
    }
}

/**
 * Created by janey on 2017/2/22.
 */
var lkModal = {
    getCookie(c_name){
        let c_start, c_end;
        if (document.cookie.length>0){
            c_start=document.cookie.indexOf(c_name + "=");
            if (c_start!=-1){
                c_start=c_start + c_name.length+1
                c_end=document.cookie.indexOf(";",c_start)
                if (c_end==-1) c_end=document.cookie.length
                return unescape(document.cookie.substring(c_start,c_end))
            }
        }
        return ""
    },
    setCookie(c_name,value,expiredays){
        var exdate=new Date()
        exdate.setDate(exdate.getDate()+expiredays)
        document.cookie=c_name+ "=" +escape(value)+((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
    },
    checkEqui(target, andriodLink, iosLink, isWechat, callback) {
        var $target = $(target);
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 || u.indexOf('Adr') > -1; //g
        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
            if( isWechat ){
                $target.click(function () {
                    callback();
                });
                return;
            }
            $target.attr('href',andriodLink);

        }
        if (isIOS) {
            $target.attr('href',iosLink);

        }
    }
};
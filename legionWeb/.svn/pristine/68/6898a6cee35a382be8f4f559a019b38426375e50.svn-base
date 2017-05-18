/**
 * Created by janey on 2017/4/20.
 */

define([],function () {
    return {

        getQrcode: function (msgCon) {

            var time = 5, isSend = false;
            let countDown = new Promise((resolve, reject) => {
                var countId = setInterval(function(){
                    if(time <= 1){
                        clearInterval(countId);
                        time = 60;
                        isSend = true;
                        resolve(isSend);
                    }else{
                        time--;
                        $(msgCon).find('b').html(time+'s');
                    };
                },1000);
            });
            return countDown;
        }
    }
});
/**
 * Created by janey on 16/6/8.
 */

define(['core'],function(core){
    return {
        changeUserStatus: function(){
            return $.ajax({
                url: core.website_DOMAIN + '/i/tooltip'
            })
        }
    }
});
/**
 * Created by janey on 16/6/8.
 */

define(['core'],function(core){
    return {
        purchaseChapter: function(chapterNum,chapterId, autoSub){
            return $.ajax({
                type: 'POST',
                url: core.website_DOMAIN + '/buy/chapter/' + chapterId,
                data: {
                    'buyCount' : chapterNum,
                    'autoSub' : autoSub
                },
                dataType: 'JSON'
            })
        }
    }
});
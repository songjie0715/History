/**
 * Created by janey on 16/6/8.
 */

define(['core'], function(core){
    return {
        getTickets: function(page){
            return $.ajax({
                url: core.website_DOMAIN + '/ajax/i/ticket',
                data: {
                    page: page
                }
            });
        },
        getPackageTickets: function(page){
            return $.ajax({
                url: core.website_DOMAIN + '/ajax/i/mycard',
                data: {
                    page: page
                }
            });
        },
        getHotBooks: function(hotObj){
            return $.ajax({
                url: core.website_DOMAIN + '/recommend/ajax/list',
                data: {
                    currentPage: hotObj.page,
                    sex: hotObj.sex
                }
            });
        },
        postFeedback: function(param){
            return $.ajax({
                url: core.website_DOMAIN + '/ajax/i/question/add',
                type: 'POST',
                data: {
                    type: param.type,
                    content: param.content
                }
            })
        },
        getMoreFeedback: function(page){
            return $.ajax({
                url: core.website_DOMAIN + '/ajax/i/question/more?page='+page,
            })
        }
    }
});
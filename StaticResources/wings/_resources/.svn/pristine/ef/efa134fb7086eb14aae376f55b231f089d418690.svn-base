/**
 * Created by janey on 16/6/8.
 */

define(['core'], function(core){
    return {
        delBook: function(bookId){
            return $.ajax({
                type: 'POST',
                data: {
                    'favor': -1
                },
                url: core.website_DOMAIN + '/ajax/book/'+ bookId +'/favorite'
            })
        },
        getMoreBook: function(page){
            return $.ajax({
                url: core.website_DOMAIN + '/ajax/i/shelf',
                data: {
                    sorts: 0,
                    page: page,
                    pageSize: 15
                }
            })
        },
        getBuyLogs: function(page){
            return $.ajax({
                url: core.website_DOMAIN + '/ajax/i/buylogs',
                data: {
                    page: page
                }
            })
        },
        getPayLogs: function(page){
            return $.ajax({
                url: core.website_DOMAIN + '/ajax/i/paylogs',
                data: {
                    page: page
                }
            })
        }
    }
});
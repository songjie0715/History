/**
 * Created by janey on 16/6/8.
 */

define(['jquery','core'], function($,core){
    return {
        delBook: function(bookId){
            return $.ajax({
                type: 'POST',
                data: {
                    'favor': -1
                },
                url: core.apiPath + '/ajax/book/'+ bookId +'/favorite'
            })
        },
        getMoreBook: function(page){
            return $.ajax({
                url: core.apiPath + '/ajax/i/shelf',
                data: {
                    sorts: 0,
                    page: page,
                    pageSize: 15
                }
            })
        },
        getBuyLogs: function(page){
            return $.ajax({
                url: core.apiPath + '/ajax/i/buylogs',
                data: {
                    page: page
                }
            })
        },
        getPayLogs: function(page){
            return $.ajax({
                url: core.apiPath + '/ajax/i/paylogs',
                data: {
                    page: page
                }
            })
        }
    }
});
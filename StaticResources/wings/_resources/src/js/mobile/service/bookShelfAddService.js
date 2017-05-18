/**
 * Created by janey on 16/6/8.
 */

define(['jquery','core'], function($,core){
    return {
        getMoreRecordBook: function(page){
            return $.ajax({
                url: core.apiPath + '/ajax/i/reading',
                data: {
                    page: page,
                    pageSize: 10
                }
            })
        },
        getMoreShelfBook: function(page){
            return $.ajax({
                url: core.apiPath + '/ajax/i/shelf',
                data: {
                    sorts: 0,
                    page: page,
                    pageSize: 10
                }
            })
        }
    }
});
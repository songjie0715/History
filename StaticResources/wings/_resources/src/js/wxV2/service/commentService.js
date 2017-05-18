/**
 * Created by janey on 16/6/8.
 */

define(['core'], function(core){
    return {
        getCommentList: function(bookId, page){
            return $.ajax({
                url: core.website_DOMAIN + '/ajax/review/' + bookId + '/more?page='+ page,
                dataType: 'JSON'
            })
        },
        review: function (bookId, title, content) {
            return $.ajax({
                url: core.website_DOMAIN + '/ajax/review/' + bookId + '/write',
                type: 'POST',
                data: {
                    title: title,
                    content: content
                },
                dataType: 'JSON'
            })
        },
        getReplyList: function(reviewId, page){
            return $.ajax({
                url: core.website_DOMAIN + '/ajax/review/'+ reviewId +'/replys?page='+page,
                dataType: 'JSON'
            });
        },
        reply: function(reviewId, content, bookId){
            return $.ajax({
                url: core.website_DOMAIN + '/ajax/review/' + reviewId + '/reply',
                type: 'POST',
                data: {
                    content: content,
                    bookId: bookId
                },
                dataType: 'JSON'
            })
        },
        likeService: function(bookId,reviewId){
            return $.ajax({
                url: core.website_DOMAIN + '/ajax/review/' + reviewId +'/like',
                type: 'POST',
                data: {
                    bookId: bookId
                },
                dataType: 'JSON'
            });
        }
    }
});
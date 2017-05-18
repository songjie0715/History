/**
 * Created by janey on 16/6/20.
 */

define([
'components/dialog'
], function(Dialog){
    return new Dialog({
        template: '#template-book-open-month-dialog',
        methods: {
            hideDialog: function(){
                this.hide();
            },
            packToShelf: function(bookId){
                $.ajax({
                    url: '/wx/ajax/guide/app/download?bookId='+bookId,
                    success: function(){
                        location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.laikan.reader';
                    }
                })
            }
        }
    });
});
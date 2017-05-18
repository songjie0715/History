/**
 * Created by janey on 16/6/20.
 */

define([
'components/dialog',
'service/bookReaderService'
], function(Dialog, bookReaderService){
    return function(status){
        return new Dialog({
            template: '#template-book-newUserPackage-dialog',
            events: {
                show(){
                    var d = new Date();
                    lkModal.setCookie('isAndriodDownloadTip', d.getDate(), 365);
                    bookReaderService.changeUserStatus(status);
                }
            },
            methods: {
                hideDialog: function(e){
                    this.hide();
                }
            }
        });
    }

});
/**
 * Created by janey on 2017/4/27.
 */
define([
    'vue',
    'mixin/sidebar'
], function (Vue,sidebar) {

    return function(paginate){
        return new Vue({
            el: '#app',
            mixins:[sidebar],
            data: {

            },
            beforeCreate(){
                 this.$modalMaterialContent = $('#modal-material-content');
                 this.$content = this.$modalMaterialContent.find('.modal-body');
            },
            mounted: function () {
                $('.paging').pagination({
                    items: paginate.items,
                    itemsOnPage: 10,
                    cssStyle: 'light-theme',
                    currentPage: paginate.currentPage,
                    prevText: '上一页',
                    nextText: '下一页',
                    onPageClick: (pageNumber)=> {
                        paginate.fanye(pageNumber);
                    }
                });

                this.$modalMaterialContent.on('show.bs.modal', ()=> {

                    this.$content.html('');
                });

            },
            methods: {
                viewMaterialContent: function(id){

                    $.ajax({
                        type: 'GET',
                        url: '/weidulm/content/'+id,
                        success: (data) => {
                            this.$content.html(data);
                        }
                    });
                    this.$modalMaterialContent.modal('show');
                }
            }
        })
    }
});
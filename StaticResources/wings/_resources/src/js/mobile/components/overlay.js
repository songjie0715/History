/**
 * Created by janey on 16/6/19.
 */

define(['vue'], function(Vue){
    return new Vue({
        template: '<div class="shadow hidden" :class="{hidden: !isShow, zIndex: isZindex}"></div>',
        data: {
            isShow: false,
            isZindex: false
        },
        created: function(){
            this.$mount().$appendTo('body');
        },
        methods: {
            show: function(){
                this.isShow = true;
            },
            hide: function(){
                this.isShow = false;
            }
        }
    });
});
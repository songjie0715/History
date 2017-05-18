/**
 * Created by janey on 16/6/19.
 */

define(['vue'], function(Vue){
    return new Vue({
        template: '<div class="loading hidden" :class="{hidden: !isShow}"></div>',
        data: {
            isShow: false
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
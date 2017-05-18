/**
 * Created by janey on 16/6/12.
 */


define(['vue','components/overlay','jquery'], function(Vue,overlay,$){
    return Vue.extend({
        data: function(){
            return {
                isShow: false,
                setPos: false
            }
        },
        created: function(){
            this.$mount().$appendTo('body');
        },
        methods: {
            show: function(){
                this.isShow = true;
                this.setPos = true;
                overlay.show();
                $('body').addClass('ovh');
                this.$emit('show');
            },
            hide: function(){
                this.isShow = false;
                this.setPos = false;
                overlay.hide();
                $('body').removeClass('ovh');
                $('body').css({'position':'relative'});
                this.$emit('hide');
            }
        }
    });
});
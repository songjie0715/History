/**
 * Created by janey on 16/6/7.
 */

var legionConfigVue = Vue.extend({
    data: function(){
        return {

        }
    },
    created: function(){

    },
    methods: {
        upfoldEachItem: function(event){
            var $this = $(event.currentTarget);
            var $content = $this.closest('.item').find('.contents');
            var $arrow = $this.find('.arrow');
            var status = $arrow.data('upfold');
            if( !status ){
                $content.removeClass('upfold');
                $arrow.data('upfold',true);
                $arrow.removeClass('arrow-down').addClass('arrow-up')
            } else {
                $content.addClass('upfold');
                $arrow.data('upfold',false);
                $arrow.removeClass('arrow-up').addClass('arrow-down');
            }
        }
    }
});


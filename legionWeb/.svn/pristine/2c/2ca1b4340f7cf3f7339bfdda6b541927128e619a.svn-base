/**
 * Created by janey on 2017/4/27.
 */
define([
    'vue',
    'mixin/sidebar',
    'mixin/unfold'
], function (Vue,sidebar,unfold) {
    new Vue({
        el: '#app',
        mixins:[sidebar,unfold],
        data: function(){
            return {
                group: '',
                groupOptions: [
                    { text: '全部', value: 'all' },
                    { text: 'One', value: 'A', subChannel: [{
                        text: '渠道一',
                        value: '0'
                    },{
                        text: '渠道二',
                        value: '1'
                    }] },
                    { text: 'Two', value: 'B',subChannel: [{
                        text: '渠道三',
                        value: '2'
                    },{
                        text: '渠道四',
                        value: '3'
                    }] },
                    { text: 'Three', value: 'C',subChannel: [{
                        text: '渠道五',
                        value: '4'
                    },{
                        text: '渠道六',
                        value: '5'
                    }] },
                    { text: '其他', value: 'd',subChannel: [{
                        text: '渠道七',
                        value: '6'
                    },{
                        text: '渠道八',
                        value: '7'
                    }] }
                ]
            }
        },
        mounted: function () {
            $('.select').selectpicker({
                noneSelectedText: '请选择'
            });
            $('.datetimepicker').datetimepicker({
                format: 'YYYY-MM-DD'
            });
        },
        methods: {

        }
    })

});
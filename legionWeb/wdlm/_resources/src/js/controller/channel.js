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
        data: {
        },
        mounted(){
            $('.select').selectpicker({
                noneSelectedText: '请选择'
            });
            $('.datetimepicker').datetimepicker({
                format: 'YYYY-MM-DD'
            });
        },
        methods: {
            modifyTitle(id,type,name) {
                $.ajax({
                    url:'',
                    type: 'POST',
                    data: {},
                    success: function(){
                        $('#modal-modify-tit').on('show.bs.modal', function () {
                            $('#modal-modify-tit').find('#modifyNameId').val(id);
                            $('#modal-modify-tit').find('#modifyName').val(name);
                            $('#modal-modify-tit').find('#modifyNameType').val(type);
                        });
                        $('#modal-modify-tit').modal('show');
                    }
                })
                
            },
            removeGroup(id) {
                $('#modal-remove-group').on('show.bs.modal', function () {
                    $('#modal-remove-group').find('#removeChannelId').val(id);
                });
                $('#modal-remove-group').modal('show');
            },
            joinGroup(id) {
                $('#modal-join-group').on('show.bs.modal', function () {
                    $('#modal-join-group').find('#channelId').val(id);
                });
                $('#modal-join-group').modal('show');

            },
            viewChannel(link){
                $('#modal-view-channel').find('.modal-body').html('');
                $('#modal-view-channel').modal({backdrop: 'static', keyboard: false, show: true}).find('.modal-body').append('<p>'+ link +'</p>');
            }
        }
    })

});
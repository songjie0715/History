/**
 * Created by janey on 2017/4/27.
 */

/**
 * Created by janey on 2017/4/27.
 */
define(function () {
    return {
        mounted(){
            $('.table-content-group').on('show.bs.collapse', function () {
                var $this = $(this);
                $this.closest('dl').find('dt .glyphicon').removeClass('glyphicon-plus').addClass('glyphicon-minus');
            }).on('hide.bs.collapse', function () {
                var $this = $(this);
                $this.closest('dl').find('dt .glyphicon').removeClass('glyphicon-minus').addClass('glyphicon-plus');
            });
        }
    }
});
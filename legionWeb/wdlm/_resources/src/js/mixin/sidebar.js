/**
 * Created by janey on 2017/4/27.
 */
define(function () {
    return {
        mounted(){
            $('.nav-second-level')
                .on('show.bs.collapse', function () {
                    var $this = $(this);
                    $this.closest('li').find('.glyphicon').removeClass('glyphicon-menu-left').addClass('glyphicon-menu-down');
                }).on('hide.bs.collapse', function () {
                    var $this = $(this);
                    $this.closest('li').find('.glyphicon').removeClass('glyphicon-menu-down').addClass('glyphicon-menu-left');
                });

            function manageNav(){
                let loc = location.pathname;
                $.each($('.nav-sidebar a'),function(i,v){
                    let path = $(v).attr('href');
                    if( loc.indexOf(path) != -1 ){

                        $(v).closest('li').addClass('active');
                        $(v).closest('.nav-second-level').collapse('show');
                    }
                })
            }
            manageNav();



        }
    }
});
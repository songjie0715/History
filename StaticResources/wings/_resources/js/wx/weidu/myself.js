$(window).scroll(function () {
    var scrollTop = $(this).scrollTop();
    var coreH = $('.zhanghao_core').height();
    var headerH = $('.lianmeng_header').height();
    var tongjiH  = $('.tongji_shuliang').height();
    if(scrollTop >= (coreH + headerH + tongjiH)){
        $('.zhanghao_core').addClass('xiding');
    }else{
        $('.zhanghao_core').removeClass('xiding');
    }
});



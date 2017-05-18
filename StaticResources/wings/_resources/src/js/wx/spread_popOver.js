
$(function(){

    $('.fontBulb').on('touchend',function (e) {
        var $this = $(this);
        var $img = $this.find('img');
        var $menuFontBulb = $('#fontBulb');
        var $menuFontBulbLightImg = $menuFontBulb.find('img');
        var $menuFontBulbLightText = $menuFontBulb.find('span');
        var $fontSizePlus = $('.fontSizePlus').find('img');
        var $fontSizeMinus = $('.fontSizeMinus').find('img');

        var $wrapper = $('.wrapper');

        if( !$this.data('status')){
            $wrapper.removeClass('day-new-status').addClass('night-new-status');
            $img.attr('src', GLOBAL_PATH +'/_resources/img/mobile/chapter_nightn_ico.png');
            $fontSizePlus.attr('src', GLOBAL_PATH +'/_resources/img/mobile/chapter_night_aplus_ico.png');
            $fontSizeMinus.attr('src', GLOBAL_PATH +'/_resources/img/mobile/chapter_night_asub_ico.png');
            $menuFontBulbLightText.html('黑夜');

            $this.data('status', true);
            $menuFontBulb.data('status', true);

            //localStorage.setItem('readStatus', 'night');
            $.cookie("fontBulb",'changBg', {path: "/", expires: 7 });
            $this.data('status', true);
            e.stopPropagation();
            e.preventDefault();
        }else{
            $wrapper.removeClass('night-new-status').addClass('day-new-status');
            $img.attr('src', GLOBAL_PATH +'/_resources/img/mobile/chapter_day_ico.png');
            $fontSizePlus.attr('src', GLOBAL_PATH +'/_resources/img/mobile/chapter_day_aplus_ico.png');
            $fontSizeMinus.attr('src', GLOBAL_PATH +'/_resources/img/mobile/chapter_day_asub_ico.png');
            $menuFontBulbLightText.html('白天');

            $this.data('status', false);
            $menuFontBulb.data('status', false);

            //localStorage.setItem('readStatus', 'day');
            $.cookie("fontBulb",' ', {path: "/", expires: 7});
            e.stopPropagation();
            e.preventDefault();
        }
    });



    //字体变化
    var min=1.2,max=2.8;
    var elm = $('.intro');
    var fontSize= $.cookie("fontSize");
    var size = 1.6;

    if( fontSize ){
        fontSize = Number(fontSize);
        size = fontSize;
        $('.intro').css({"font-size":fontSize+"rem","line-height":fontSize*1.8+"rem"});
    }

    $('.fontSizePlus, .fontSizeMinus').unbind('touchend');

    $('.fontSizePlus').on('touchend',function(e) {
        if (size<=max ) {
            size+=0.2;
            elm.css({'fontSize' : size+'rem','line-height':size*1.8+'rem'});
            $.cookie("fontSize",size, { path: "/", expires: 7});
        }
        e.preventDefault();
        e.stopPropagation();
    });
    $('.fontSizeMinus').on('touchend',function(e) {
        if (size>=min ) {
            size-=0.2;
            elm.css({'fontSize' : size+'rem','line-height':size*1.8 +'rem'});
            $.cookie("fontSize",size, { path: "/", expires: 7});
        }
        e.preventDefault();
        e.stopPropagation();
    });

    $('.fontSizePlus').on('touchend',function(e) {
        if (size<=max ) {
            size+=0.2;
            elm.css({'fontSize' : size+'rem','line-height':size*1.8+'rem'});
            $.cookie("fontSize",size, { path: "/", expires: 7});
        }
        e.preventDefault();
        e.stopPropagation();
    });
    $('.fontSizeMinus').on('touchend',function(e) {
        if (size>=min ) {
            size-=0.2;
            elm.css({'fontSize' : size+'rem','line-height':size*1.8 +'rem'});
            $.cookie("fontSize",size, { path: "/", expires: 7});
        }
        e.preventDefault();
        e.stopPropagation();
    });
    // $('.chapter-collect').on('touchend',function(e){
    //     var $this = $(this);
    //     var chapterUpfold = $this.data('status');
    //     if(!chapterUpfold){
    //         $('.collent-dialog').show();
    //         $this.data('status',true);
    //     }else{
    //         $('.collent-dialog').hide();
    //         $this.data('status',false);
    //     }
    //     e.preventDefault();
    //     e.stopPropagation();
    // });
});


















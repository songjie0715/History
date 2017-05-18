/**
 * Created by janey on 16/8/2.
 */

$.fn.extend({
    popOver: function(options){
        var $this = $(this);
        var elem = $(this).data('prop');
        var $elemPopOver = $('#'+elem);
        var show = $(this).attr('showPop');

        if( show === 'true' ){
            $elemPopOver.hide();
            $this.removeClass('showPop');
            $(this).attr('showPop', 'false');
            $(this).removeClass('chapterFontSize-on');
            return;
        }

        if( show === 'false' ){
            $elemPopOver.show();
            $this.addClass('showPop');
            $(this).attr('showPop', 'true');
            $(this).addClass('chapterFontSize-on');
            return;
        }

        var defaults = {
            tpl: '<a>哈哈,我是popOver</a>',
            layout: '<div class="popOver" data-show=true></div>',
            direction: 'up'
        };

        var opts = $.extend(defaults, options);

        var IdProp = $(this).data('prop');
        var $tpl = $(opts.tpl);
        var $layout = $(opts.layout);
        $layout.attr('id', IdProp);

        $layout.append($tpl);
        $this.append($layout);

        function setLayoutPos(elem){
            var layoutHeight = $layout.innerHeight();
            var layoutWidth = $layout.innerWidth();

            var layoutTop = elem.offset().top;
            var layoutLeft = elem.offset().left;
            var layoutOffsetTop = 0;
            var layoutOffsetLeft = 0;
            var winHeight=$(window).height();


            if( opts.direction == 'up' ){
                layoutOffsetTop = (winHeight- elem.innerHeight() - layoutHeight - 30  );
                $layout.addClass('up');
                layoutOffsetLeft = layoutLeft;
            }
            if( opts.direction == 'down' ){
                // layoutOffsetTop = layoutHeight+10;
                $layout.addClass('down');
                layoutOffsetLeft = layoutLeft;
            }


            // $layout.css({
            //     top: layoutOffsetTop+'px',
            //     left: layoutOffsetLeft+'px'
            //
            // });
            $this.addClass('show');
        }

        setLayoutPos($this);

        $layout.show();

        $layout.on('touchend',function(event){
            event.preventDefault();
            event.stopPropagation();
        });


        $(this).attr('showPop', true);
    }
});

$.fn.scrollEnd = function(callback, timeout) {
    $(this).scroll(function(){
        var $this = $(this);
        if ($this.data('scrollTimeout')) {
            clearTimeout($this.data('scrollTimeout'));
        }
        $this.data('scrollTimeout', setTimeout(callback,timeout));
    });
};


$(function(){

    $('#fontBulb').on('touchend',function (e) {
        var $this = $(this);
        var $wrapper = $('.wrapper');
        var $lightImg = $this.find('img');
        var $lightText = $this.find('span');

        var $staticFontBulb = $('.fontBulb');
        var $staticFontBulbImg = $staticFontBulb.find('img');


        if( !$this.data('status')){
            localStorage.setItem('readStatus', 'night');
            $.cookie("fontBulb",'changBg', {path: "/", expires: 7 });
            $wrapper.removeClass('day-status').addClass('night-status');
            $lightImg.attr('src', window.GLOBAL_PATH + '/_resources/img/wx/laikan/chapter-menu_status-on.png');
            $staticFontBulbImg.attr('src',GLOBAL_PATH +'/_resources/img/mobile/chapter_nightn_ico.png');
            $lightText.html('黑夜');

            $this.data('status', true);
            $staticFontBulb.data('status', true);

            e.stopPropagation();
            e.preventDefault();
        }else{
            localStorage.setItem('readStatus', 'day');
            $.cookie("fontBulb",' ', {path: "/", expires: 7});
            $wrapper.removeClass('night-status').addClass('day-status');
            $lightImg.attr('src', window.GLOBAL_PATH  + '/_resources/img/wx/laikan/chapter-menu_status.png');
            $staticFontBulbImg.attr('src',GLOBAL_PATH +'/_resources/img/mobile/chapter_day_ico.png');
            $lightText.html('白天');

            $this.data('status', false);
            $staticFontBulb.data('status', false);
            e.stopPropagation();
            e.preventDefault();
        }
    });

    $('.fontBulb').on('touchend',function (e) {
        var $this = $(this);
        var $img = $this.find('img');
        var $menuFontBulb = $('#fontBulb');
        var $menuFontBulbLightImg = $menuFontBulb.find('img');
        var $menuFontBulbLightText = $menuFontBulb.find('span');

        var $wrapper = $('.wrapper');

        if( !$this.data('status')){
            $wrapper.removeClass('day-status').addClass('night-status');
            $img.attr('src', GLOBAL_PATH +'/_resources/img/mobile/chapter_nightn_ico.png');

            $menuFontBulbLightImg.attr('src', window.GLOBAL_PATH + '/_resources/img/wx/laikan/chapter-menu_status-on.png');
            $menuFontBulbLightText.html('黑夜');

            $this.data('status', true);
            $menuFontBulb.data('status', true);

            localStorage.setItem('readStatus', 'night');
            $.cookie("fontBulb",'changBg', {path: "/", expires: 7 });
            $this.data('status', true);
            e.stopPropagation();
            e.preventDefault();
        }else{
            $wrapper.removeClass('night-status').addClass('day-status');
            $img.attr('src', GLOBAL_PATH +'/_resources/img/mobile/chapter_day_ico.png');

            $menuFontBulbLightImg.attr('src', window.GLOBAL_PATH  + '/_resources/img/wx/laikan/chapter-menu_status.png');
            $menuFontBulbLightText.html('白天');

            $this.data('status', false);
            $menuFontBulb.data('status', false);

            localStorage.setItem('readStatus', 'day');
            $.cookie("fontBulb",' ', {path: "/", expires: 7});
            e.stopPropagation();
            e.preventDefault();
        }
    });

    //字体弹框
    var $topNav = $('.chapter-menu-top');
    var $botNav = $('.chapter-menu-bottom');
    var $topBotNav = $('.chapter-menu-top, .chapter-menu-bottom');
    var winHeight = $(window).height();
    var $fz = $botNav.find('#chapterFontSize');
    var $pd = $topNav.find('#chapterAutoBuy');


    function haveTap($elem){
        var show = $elem.data('show');
        if( show ){
            $('.popOver').hide();
            $topNav.removeClass('show').hide();
            $botNav.removeClass('show').hide();
            $fz.removeClass('showPop');
            $pd.removeClass('showPop');
            $('#chapterFontSize').attr('showPop', false);
            $botNav.find('li').removeClass('chapterFontSize-on');
            $elem.data('show',false);
            $('#chapterFontSize, #chapterAutoBuy').data('show', false);

        } else{
            $topNav.addClass('show').show();
            $botNav.addClass('show').show();

            $elem.data('show',true);
        }
    }

    var startX,startY,endX,endY,firstT, firstF = true, lastTap, showTap;


    function load (){

        document.addEventListener('touchstart',touch,false);
        document.addEventListener('touchmove',touch,false);
        document.addEventListener('touchend',touch,false);

        function touch (event){
            var event = event || window.event;
            var d = new Date();

            switch(event.type){
                case "touchstart":
                    var $targetElem = $(event.target.parentNode);
                    if( !$targetElem.hasClass('intro') ){
                        return;
                    }

                    startX = event.touches[0].clientX;
                    startY = event.touches[0].clientY;

                    var currentTime = d.getTime();
                    var tapLength = currentTime - lastTap;

                    if( tapLength < 300 && tapLength > 0 ){
                        clearTimeout(showTap);
                        if( $(document).data('show') ){

                            $('.popOver').hide();

                            $topNav.removeClass('show').hide();
                            $botNav.removeClass('show').hide();
                            $fz.removeClass('showPop');
                            $pd.removeClass('showPop');
                            $botNav.find('li').removeClass('chapterFontSize-on');
                            $(document).data('show',false);
                            $('#chapterFontSize').data('show', 'no');
                            $('#chapterAutoBuy').data('show', 'no');
                        }
                        event.preventDefault();
                    }

                    lastTap = currentTime;
                    break;

                case "touchend":
                    endX = event.changedTouches[0].clientX;
                    endY = event.changedTouches[0].clientY;

                    if( endX == startX && endY == startY ){

                        showTap = setTimeout(function(){
                            haveTap($(document));
                        },300);
                    }else {
                        if( $(document).data('show') ){
                            haveTap($(document));
                        }
                    }

                    break;
                case "touchmove":
                    if( $(document).data('show') ){
                        event.preventDefault();
                    }
                    break;
            }

        }

    }
    window.addEventListener('load',load,false);


    $('.chapter-menu a').on('touchend',function(event){
        var $this = $(this);
        location.href = $this.attr('href');
        event.preventDefault();
    });

    $topBotNav.on('touchend',function(e){
        e.stopPropagation();
        e.preventDefault();
    });

    $('.chapter-menu .status').on('touchend',function(event){
        var $this = $(this);
        var STATUS = $this.data('status');
        _hmt.push(['_trackEvent', 'menu', 'menu_'+STATUS, bookId+'/'+chapterId]);
        event.preventDefault();
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

    $('#chapterFontSize').on('touchend',function(e){
        var $this = $(this);
        $this.addClass('chapterFontSize-on');
        $this.addClass('showPop');
        $this.popOver({
            tpl:$('#template-dialog-font').html(),
            direction: 'up'
        });

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

    //自动购买
    $('#chapterAutoBuy').on('touchend',function(e){
        var self = $(this);
        self.addClass('showPop');
        self.popOver({
            tpl: $('#template-dialog-buy').html(),
            direction: 'down'
        });


        $('.chapterAuto').on('touchend',function(e) {
            var $this=$(this);
            var bookId=$this.find('input[name="bookId"]').val();
            $.ajax({
                type:'POST',
                url : '/wx/ajax/i/autofeed',
                data :  {"bookId" : bookId,"backUrl":'/book/' + bookId + '/' + window.chapterId},
                dataType : 'json',
                success:function(result){
                    if(result.status == 1){
                        location.href = result.url;
                        return;
                    }
                    if(result.status == 0){
                        if(!$this.data("auto")){
                            $this.addClass('on');
                            $this.data('auto',true);
                        }else{
                            $this.removeClass('on');
                            $this.data('auto',false);
                        }
                    }
                }
            });
            e.stopPropagation();
            e.preventDefault();
        });

        e.stopPropagation();
        e.preventDefault();
    });

});
















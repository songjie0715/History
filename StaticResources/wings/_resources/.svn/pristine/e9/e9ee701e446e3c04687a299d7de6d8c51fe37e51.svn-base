$(function() {

    $('.book-style-none').hide();//筛选框
    var refreshUrl = '/wx/ajax/book/category';
    var page = 1;
    var ifFinish = '',ifFree = '';

    var $bookHave = $('.this-book-list .book-list-have');
    var $listNull = $('.this-book-list .book-list-null');
    var $bookLoad = $('#book-style-container .book-loading');
    var $bookNull = $('#book-style-container .book-null');
    var commonAjax = function () {
        $.ajax({
            type: 'get',
            url: refreshUrl,
            data: {
                'rank': 'xinshu',
                'group': group,
                'free': ifFree,
                'finish': ifFinish,
                'pageSize': 10,
                'sort': sort,
                'page':page
            },
            success: function (data) {
                console.log(data);
                //var bookList = new Array();
                var bookList = data.result.bookList;
                console.log(bookList.length);
                console.log(page);
                var str = '';
                for (var i = 0; i < bookList.length; i++) {
                    var bookName = bookList[i].iName;
                    var bookPic = bookList[i].iconUrlSmall;
                    var bookTags = bookList[i].tags;
                    var bookWriter = bookList[i].userVO.name;
                    var writerId = bookList[i].id;
                    var bookIntro = bookList[i].iIntroduce;
                    var bookUrl = bookList[i].murl;
                    str += '<div class="book-name-1">' +
                        '<div class="book-pic">' +
                        '<a style="display:block;"  href="../'+bookUrl+'">' +
                        '<img  class="yizhe" src="' + bookPic + '" alt="">' +
                        '</a>' +
                        '</div>' +
                        '<div class="book-detail">' +
                        '<h2 class="book-det-h">' +'<a href="../'+bookUrl+'">'+bookName +'</a></h2>' +
                        '<div class="' + 'detail-1' + '">' + '<a href="../book/'+writerId+'/otherbooks'+'">'+ bookWriter + '</a>' + ' | ' + '<b>'+'<a href="/m/category/list#">' + aaaaa + '</a>'+'</b></div>' +
                        '<div class="detail-intro">'+'<a href="../'+bookUrl+'">' + bookIntro + '</a></div>' +
                        '</div>'+'</div>';
                }
                if(bookList.length == 0){
                    noGet = 0;
                    if(page == 1){
                        $bookHave.html('');
                        $listNull.show();
                        $bookLoad.hide();
                        $bookNull.hide();
                        $('.book-style-header').removeClass('book-header-fixed').addClass('book-header-wu');
                        $('.wrapper').addClass('wrapper-2');
                        $('.book-style-none').hide();
                    }else if(page > 1){
                        $bookLoad.hide();
                        $bookNull.show();
                    }
                }else if(0 < bookList.length && bookList.length < 10) {
                    noGet = 0;
                    $('.book-style-header').removeClass('book-header-wu').addClass('book-header-fixed');
                    $('.wrapper').removeClass('wrapper-2').addClass('wrapper-1');
                    if(page == 1){
                        $bookHave.html('');
                        $bookLoad.hide();
                        $bookNull.show();
                        $listNull.hide();
                    }else{
                        $bookLoad.hide();
                        $bookNull.show();
                        $listNull.hide();
                    }
                    $bookHave.append(str);

                }else if (bookList.length == 10) {
                    noGet = 1;
                    if(page == 1){
                        $bookHave.html('');
                    }
                    $listNull.hide();
                    $bookLoad.show();
                    $bookNull.hide();
                    $('.book-style-header').removeClass('book-header-wu').addClass('book-header-fixed');
                    $('.wrapper').removeClass('wrapper-2').addClass('wrapper-1');
                    $bookHave.append(str);
                    }
            },
            error: function () {
            }
        });
    };


    $(document).click(function(){
        $(".pop").hide();
    })
    function stopFunc(e){
        e.stopPropagation?e.stopPropagation():e.cancelBubble = true;
    }
    $('.book-style-none .btttn').click(function(e){
        var $that = $(this);
        $that.parent().find('ul').show();
        $that.parent().siblings().find('ul').hide();
        e = e||event; stopFunc(e);
        $that.parent().find('ul').find('li').click(function(e){
            $(this).addClass('option-active').siblings().removeClass('option-active');
            e = e||event; stopFunc(e);
        });
    });

    $('.book-style-none .select-paihang ul li').click(function(){
        $('.select-paihang .select-text').text($(this).text());
        if($(this).text() == '最热'){
            $('.filter1 li').eq(0).addClass('filter-active').removeClass('filter-no').siblings().removeClass('filter-active').addClass('filter-no');
        }else if($(this).text() == '最火'){
            $('.filter1 li').eq(1).addClass('filter-active').removeClass('filter-no').siblings().removeClass('filter-active').addClass('filter-no');
        }else{
            $('.filter1 li').eq(2).addClass('filter-active').removeClass('filter-no').siblings().removeClass('filter-active').addClass('filter-no');
        }
        var $this = $(this);
        if(document.body.scrollTop){
            document.body.scrollTop=0;
        }else if(document.documentElement.scrollTop){
            document.documentElement.scrollTop=0;
        };
    });

    $('.book-style-none .select-jiage ul li').click(function(){
        $('.select-jiage .select-text').text($(this).text());
        if($(this).text() == '免费'){
            ifFree = 'true';
            $('.filter3 li').eq(1).addClass('filter-active').removeClass('filter-no').siblings().removeClass('filter-active').addClass('filter-no');
        }else if($(this).text() == '全部'){
            ifFree = '';
            $('.filter3 li').eq(0).addClass('filter-active').removeClass('filter-no').siblings().removeClass('filter-active').addClass('filter-no');
        }else{
            ifFree = 'false';
            $('.filter3 li').eq(2).addClass('filter-active').removeClass('filter-no').siblings().removeClass('filter-active').addClass('filter-no');
        }
        page = 1;
        commonAjax();
        var $this = $(this);
        if(document.body.scrollTop){
            document.body.scrollTop=0;
        }else if(document.documentElement.scrollTop){
            document.documentElement.scrollTop=0;
        };
    });

    $('.book-style-none .select-jindu ul li').click(function(){
        $('.select-jindu .select-text').text($(this).text());
        if($(this).text() == '连载中'){
            ifFinish = 'false';
            $('.filter2 li').eq(1).addClass('filter-active').removeClass('filter-no').siblings().removeClass('filter-active').addClass('filter-no');
        }else if($(this).text() == '全部'){
            ifFinish = '';
            $('.filter2 li').eq(0).addClass('filter-active').removeClass('filter-no').siblings().removeClass('filter-active').addClass('filter-no');
        }else{
            ifFinish = 'true';
            $('.filter2 li').eq(2).addClass('filter-active').removeClass('filter-no').siblings().removeClass('filter-active').addClass('filter-no');
        }
        page = 1;
        commonAjax();
        var $this = $(this);
        if(document.body.scrollTop){
            document.body.scrollTop=0;
        }else if(document.documentElement.scrollTop){
            document.documentElement.scrollTop=0;
        };
    });




    $('.book-style-filter .filter2 .paihang-type li').on('click',function () {
        $(this).addClass('filter-active').removeClass('filter-no').siblings().removeClass('filter-active').addClass('filter-no');
        if($(this).text() == '全部'){
            ifFinish = '';
            $('.select-jindu .select-text').text('全部');
        }else if($(this).text() == '连载中'){
            ifFinish = 'false';
            $('.select-jindu .select-text').text('连载中');
        }else{
            ifFinish = 'true';
            $('.select-jindu .select-text').text('已完结');
        }
        page = 1;
        commonAjax();
    });
    $('.book-style-filter .filter1 .paihang-type li').on('click',function () {
        $(this).addClass('filter-active').removeClass('filter-no').siblings().removeClass('filter-active').addClass('filter-no');
        if($(this).text() == '最热'){
            $('.select-paihang .select-text').text('最热');
        }else if($(this).text() == '最火'){
            $('.select-paihang .select-text').text('最火');
        }else{
            $('.select-paihang .select-text').text('最新');
        }
    });
    $('.book-style-filter .filter3 .paihang-type li').on('click',function () {
        $(this).addClass('filter-active').removeClass('filter-no').siblings().removeClass('filter-active').addClass('filter-no');
        if($(this).text() == '全部'){
            ifFree = '';
            $('.select-jiage .select-text').text('全部');
        }else if($(this).text() == '免费'){
            ifFree = 'true';
            $('.select-jiage .select-text').text('免费');
        }else{
            ifFree = 'false';
            $('.select-jiage .select-text').text('收费');
        }
        page = 1;
        commonAjax();
    });


    var $winHeight = $(window).height();
    
    var $filterHeight = $('.book-style-filter').height();
    var $scrollHeight = $(window).scrollTop();
    console.log('ss' + 22);
    // $(window).scroll(function(){
    //     if($scrollHeight > $winHeight){
    //         $('.goto-top').show();
    //         $('.goto-top').on('click',function () {
    //             window.scrollTo(0,0);
    //             $('.goto-top').hide();
    //             $('.book-style-none').hide();
    //             $('.book-style-header').show();
    //         });
    //     }else{
    //         $('.goto-top').hide();
    //     }
    //     if($scrollHeight >= 118){
    //         $('.book-style-none').show();
    //         $('.book-style-header').hide();
    //     }else{
    //         $('.book-style-none').hide();
    //         $('.book-style-header').show();
    //     };
    // });


    // $(window).scroll(function () {
    //     $('.book-style-none ul').hide();
    //     if(scrollTop > windowHeight){
    //         $('.goto-top').show();
    //         $('.goto-top').on('click',function () {
    //             window.scrollTo(0,0);
    //             $('.goto-top').hide();
    //         });
    //     }else{
    //         $('.goto-top').hide();
    //     }
    //     if(scrollTop >= $filterHeight){
    //         $('.book-style-none').show();
    //         $('.book-style-header').hide();
    //     }else{
    //         $('.book-style-none').hide();
    //         $('.book-style-header').show();
    //     };
    //     if ( scrollTop + windowHeight == scrollHeight) {
    //         page ++;
    //         if(noGet == 1){
    //             commonAjax();
    //         }
    //     };
    // });

})
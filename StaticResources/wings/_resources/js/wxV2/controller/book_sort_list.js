    var page = 1;
    var dataCount = 0;
    var ifFinish = '',ifFree = '';
    var rank='';
    var flag=false;
    var $bookHave = $('.this-book-list .book-list-have');//一进来就有书的情况
    var $listNull = $('.this-book-list .book-list-null');//一进来就没书的情况
    var $bookLoad = $('#book-style-container .book-load');//下拉加载的效果
    var $bookNull = $('#book-style-container .book-null');//下拉已经没书
    var $bookList = $('#bookList').html();//模板
    function commonAjax(rank){
        var refreshUrl = '/wx/ajax/book/category';
        $.ajax({
            type: 'get',
            url: refreshUrl,
            data: {
                'rank':'xinshu',
                'group': group,
                'free': ifFree,
                'finish': ifFinish,
                'pageSize': 10,
                'sort': sort,
                'page':page
            },
            success: function (data) {
                var bookList = data.result;
                var bookLength = data.result.bookList.length;
                dataCount = data.result.bookList.length;
                var template = Handlebars.compile($bookList);
                bookListHtml = template(bookList);
                console.log(bookList);
                flag=false;
                if(bookLength == 0){
                    $bookLoad.hide();
                    $bookNull.show();
                }else{
                    $bookNull.hide();
                    $bookHave.append(bookListHtml);
                    $bookLoad.hide();
                    page ++;
                }
            },
            error: function () {
            }
        });
    };


$(function() {

    $('.book-style-none,.book-null,.book-list-null').hide();//筛选框
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


    // $('.filter2 .paihang-type li').on('click',function () {
    //     $(this).addClass('filter-active').removeClass('filter-no').siblings().removeClass('filter-active').addClass('filter-no');
    //     if($(this).text() == '全部'){
    //         ifFinish = '';
    //         $('.select-jindu .select-text').text('全部');
    //     }else if($(this).text() == '连载中'){
    //         ifFinish = 'false';
    //         $('.select-jindu .select-text').text('连载中');
    //     }else{
    //         ifFinish = 'true';
    //         $('.select-jindu .select-text').text('已完结');
    //     }
    //     page = 1;
    //     $bookHave.html('');
    //     commonAjax();
    // });

    // $('.filter1 .paihang-type li').on('click',function () {
    //     var $this=$(this);
    //     $this.addClass('filter-active').removeClass('filter-no').siblings().removeClass('filter-active').addClass('filter-no');
    //     var textMod = $this.text();
    //     $('.select-paihang .select-text').text(textMod);
    //     page =1;
    //     $bookHave.html('');
    //     commonAjax();
    // });

    // $('.filter3 .paihang-type li').on('click',function () {
    //     var $this=$(this);
    //     var textMod = $this.text();
    //     var $selectText = $('.select-jiage .select-text');
    //     $this.addClass('filter-active').removeClass('filter-no').siblings().removeClass('filter-active').addClass('filter-no');
    //     if(textMod == '全部'){
    //         ifFree = '';
    //         $selectText.text('全部');
    //     }else if(textMod == '免费'){
    //         ifFree = 'true';
    //         $selectText.text('免费');
    //     }else{
    //         ifFree = 'false';
    //         $selectText.text('收费');
    //     }
    //     page =1;
    //     $bookHave.html('');
    //     commonAjax();
    // });


    //滑动页面
    var $filterHeight = $('.book-style-filter').height();
    $(window).scroll(function(){
        var $winHeight = $(window).height();
        var $docHeight = $(document).height();
        $('.book-style-none ul').hide();
        if($(document).scrollTop() >= $winHeight){
            $('.goto-top').show();
            $('.goto-top').on('click',function () {
                window.scrollTo(0,0);
                $('.goto-top').hide();
                $('.book-style-none').hide();
                $('.book-style-header').show();
            });
        }else{
            $('.goto-top').hide();
        }
        if($(document).scrollTop() >= $filterHeight){
            $('.book-style-none').show();
            $('.book-style-header').hide();
        }else{
            $('.book-style-none').hide();
            $('.book-style-header').show();
        }
        if ($(document).scrollTop() + $(window).height() >= $(document).height()) {
            if(!flag){
                $bookLoad.show();
                commonAjax(rank);
            }
        }
    });

});

//封装nav
function clickNav(obj,rank,ifFree,ifFinish,textValue){
    var $this=$(obj);
    var textMod = $this.text();
    var $selectValue = $('.select-jindu .select-text');
    $this.addClass('filter-active').removeClass('filter-no').siblings().removeClass('filter-active').addClass('filter-no');
    if(textMod == textValue){
        if(ifFinish){
            ifFinish = ifFinish;
        }
        if(ifFree){
            ifFree = ifFree;
        }
        $selectValue.text(textValue);  
    }
    rank = $this.data('static');
    page = 1;
    $bookHave.html('');
    $bookLoad.show();
    commonAjax(rank);
    console.log(rank);
}
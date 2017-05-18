
    var group = 1;
    function setGroup(data){
        group = data;
    };
    function setSort(sort,e){
        var $this = $(e);
        var sortImg = $this.find('img').attr('src');
        var sortName = $this.parent().find('h2').text();
        var url = "/m/category/detail?sort="+sort+"&group="+group+"&sortImg="+sortImg+"&sortName="+sortName;
        window.location = url;
    };
    $('.pin-footer li').on('click',function(){
       $(this).addClass('footer-tab-active').siblings().removeClass('footer-tab-active');
        $('#book-style-box section').eq($(this).index()).show().siblings().hide();

    });
/*banner滚动*/
var num = 0,
    time = null;

function autoPlay() {
    num++;
    var len = $('#uls li').length;
    if (num > len - 1) num = 0;
    $("#uls li").removeClass("show").addClass("hide")
    $("#uls li:eq(" + num + ")").addClass("show").removeClass("hide")
    $('#lis li').removeClass('bg').addClass('out')
    $('#lis li:eq(' + num + ')').addClass('bg').removeClass('out')
    $("#text div").css('display', 'none')
    $("#text div:eq(" + num + ")").css('display', 'block')
}
time = setInterval(autoPlay, 3000)
$("#uls").mouseover(function () {
    clearInterval(time)
}).mouseout(function () {
    time = setInterval(autoPlay, 3000)
});


$("#lis li").mouseover(function () {
    clearInterval(time);
    num = $(this).index() - 1;
    autoPlay();
});


/*导航*/
$('#nav').on('mouseover', 'li', function () {
    $(this).addClass('br').siblings().removeClass('br')
});



/*浏览器滚动*/

var arr=[], l1=$('#home').offset().top;
$(window).scroll(function () {

    $('#nav').addClass('b_shadow');
    if ($(this).scrollTop() == 0) {
        $('#nav').removeClass('b_shadow');
    }

    var Height = $(this).scrollTop();
    $('.ConTxt').each(function (i) {
        arr[i] = $(this).offset().top-80;
    });
    $.each(arr, function (i,val) {
        if (Height >= val) {
            $('.con_bar li').eq(i).addClass('bgr').siblings().removeClass('bgr')
        }
    })
    if(Height<l1){
        $('.con_bar li').eq(0).removeClass('bgr')
    }
    else if(Height>$('#cooperation').offset().top+60){
    	$('.last').addClass('bgr')
    	$('.la_sec').removeClass('bgr')
    }
});


$(".con_bar li").click(function(){


	if($(this).hasClass('hover')){
		$(this).removeClass('hover')
	}
    $(this).addClass('bgr').siblings().removeClass('bgr')


});

$(".con_bar li").hover(function(){
	
	$(this).addClass('hover').siblings().removeClass('hover')
	if($(this).hasClass('bgr')){
		$(this).removeClass('hover')
	}
      
},function(){
	$(this).removeClass('hover')
});


(function(){
   var hash = location.hash.split('#')[1];
    $('.con_bar li[type='+ hash +']').addClass('bgr');
})();
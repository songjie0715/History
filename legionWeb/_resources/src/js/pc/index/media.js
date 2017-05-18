$(function(){ 
	var page=1;
	var i=4;
	var $p_Div=$(".modal_content");
	var $picDiv=$(".modal_list");
	var picNum=$picDiv.children("ul").children("li").length;
	var page_count=Math.ceil(picNum/4);
	var $pDiv_w=$p_Div.width();

	$(".right_btn").click(function(){
        $pDiv_w=$p_Div.width();
		if(page_count>page){
			$picDiv.animate({left:'-'+page*$pDiv_w+"px"},"normal");
			page++;
			$(".left_btn").css({'background':'#10c1ae'});
			if(page>=page_count){
				$(this).css({'background':'#e6e6e6'});
			}else{
				$(this).css({'background':'#10c1ae'});
			}
		} 
		$(this).siblings(".highlight_tip").find("span").eq((page-1)).addClass("current").siblings().removeClass("current"); 	
	});
	
	$(".left_btn").click(function(){
        $pDiv_w=$p_Div.width();
		if(page>1){
			$picDiv.animate({left:"+="+$pDiv_w+'px'},"normal");
			page--;
			$(".right_btn").css({'background':'#10c1ae'});
			if(page<=1){
				$(this).css({'background':'#e6e6e6'});	 
			}else{
				$(this).css({'background':'#10c1ae'});
			}
		}
		$(this).siblings(".highlight_tip").find("span").eq((page-1)).addClass("current").siblings().removeClass("current"); 	
	});
	$('body').on('mouseenter', '.pic_lists ul li a', function(){
		$(this).children(".showbox").show();
		//$(this).children(".showbox").fadeIn('slow').siblings();
	}).on('mouseleave', '.pic_lists ul li a', function(){
		$(this).children(".showbox").hide();
		//$(this).children(".showbox").fadeOut('slow').siblings();
	});

	
})

/*浏览器滚动*/

$(window).scroll(function () {

    $('#nav').addClass('b_shadow');
    if ($(this).scrollTop() == 0) {
        $('#nav').removeClass('b_shadow');
    }

});

$(".con_bar li").click(function(){


    if($(this).hasClass('hover')){
        $(this).removeClass('hover')
    }
    $(this).addClass('bgr').siblings().removeClass('bgr')


});


$(".con_bar li").hover(function(){
	
	$(this).addClass('hover').siblings().removeClass('hover');
	if($(this).hasClass('bgr')){
		$(this).removeClass('hover')
	}
      
},function(){
	$(this).removeClass('hover')
});
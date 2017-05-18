$.chapterList= $.chapterList || {};
$.chapterList={
    chapterLoad:function(currentPage,pageSize,isAsc){
        var chapterHtml='';
        $.ajax({
            type:'get',
            url:'/wx/ajax/book/'+bookId+'/catalogs',
            data:{
                page:currentPage,
                pageSize:pageSize,
                isAsc:isAsc
            },
            dataType : 'json',
            success:function(CatalogVO){
                var seltxt=''; 
                $('.beforesend').hide();
                currentPage = currentPage-1;
                $('.clist_select')
				    .find('option')
				    .filter(function() {
				        return this.value == currentPage; 
				    })
				    .prop('selected', true);
                seltxt = $(".clist_select").children("option").eq(currentPage).text();
                $(".selectbox-div").html(seltxt);

                for(var i=0;i<CatalogVO.catalogs.length;i++){
                	// console.log(CatalogVO.catalogs[i]);
                    if(CatalogVO.catalogs[i].vol){
                        chapterHtml +='<h2>'+CatalogVO.catalogs[i].volume.name+'</h2>';  
                    }else{
                        if(CatalogVO.catalogs[i].chapter.free){
                            isFree='<span class="free">免费</span>';
                        }else{
                            isFree='';
                        }
                        if(CatalogVO.catalogs[i].chapter.id == booklp){
                            chapterHtml +='<li class="on"><a href="'+website_DOMAIN + '/book/'+bookId+'/'+CatalogVO.catalogs[i].chapter.id+'">'+CatalogVO.catalogs[i].chapter.name+'<p class="chapter-tag">'+isFree+'</p></a></li>';
                        }else{
                            chapterHtml +='<li><a href="'+website_DOMAIN + '/book/'+bookId+'/'+CatalogVO.catalogs[i].chapter.id+'">'+CatalogVO.catalogs[i].chapter.name+'<p class="chapter-tag">'+isFree+'</p></a></li>';
                        } 
                    } 
                }
                $('.wrapper').scrollTop(0);
                $('#chapterUl').html(chapterHtml); 
                $("body").attr({"currentPage":currentPage,"totalPage":totalPage}); 
                if(parseInt($("body").attr("currentPage"))==(parseInt($("body").attr("totalPage"))-1)){
                    $('.mod-r ul li:eq(2)').css('background','#ddd').removeAttr('onclick');
                }else{
                    $('.mod-r ul li:eq(2)').css('background','#fafafa').attr('onclick','$.chapterList.chapterNext()');
                }
            },
            error:function(){}
        });
        
    },
    chapterPrev:function(){
        if(parseInt($("body").attr("currentPage"))==0){
            location.href=website_DOMAIN + "/book/"+bookId;
            return false;
        }
        $('#chapterUl').html(''); 
        $('.beforesend').show();
       currentPage--;
		$.chapterList.chapterLoad(currentPage,pageSize,isAsc);
    },
	chapterNext:function(){
        if(parseInt($("body").attr("currentPage"))==(parseInt($("body").attr("totalPage"))-1)){
            return false;
        }
        $('#chapterUl').html(''); 
        $('.beforesend').show();
        
       	currentPage++;
       	$.chapterList.chapterLoad(currentPage,pageSize,isAsc);
	}
};

$(function(){
	var winHeight=$(window).height();
	$('.wrapper').height(winHeight);
    $.chapterList.chapterLoad(currentPage,pageSize,isAsc);
});

$(".chapter-selectbox select").change(function(e) {
	var selectVal=$(this).val();
	currentPage = selectVal;
	currentPage++;
	$.chapterList.chapterLoad(currentPage,pageSize,isAsc);
});

$(".chapter-asc").on('touchend',function(e){
    var $that=$(this);
    if($that.data('status')){
        isAsc=false;
        location.href=website_DOMAIN + '/book/'+bookId+'/catalogs?isAsc=false';
    }else{
        isAsc=true;
        location.href=website_DOMAIN + '/book/'+bookId+'/catalogs?isAsc=true';
    }

    e.stopPropagation();
    e.preventDefault();
});
    

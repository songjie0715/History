$(function(){
	$(".page-recommend > a").live("click",function(){
		setFavorite($(this).attr("id"),4,$(this).find(".number"));
	});
	
	var loading = $(".loading"),buyok = false;
	
	var loadDialog = function(_self){
		var layer = _self.layer, 
			form = _self.layer.find('form'),
			checkAll = layer.find('.check-all'), 
			payChapter = layer.find('.btn-pay-chapters'),
			payAll = layer.find('.btn-pay-all'),
			cpCheckbox = layer.find('.cp-checkbox'),
			firstBox = layer.find('input[canbeclick]'),
			firstBoxText = firstBox.parent().parent().find('td:last').text(),
			bi = layer.find('.wait:gt(0)'),
			trs = layer.find('.data-table tr').css('cursor','pointer'),
			payMany = layer.find('#payMany'),
			balance = parseInt($.trim(layer.find('#balance').text())),
			status = layer.find('.status');
			
		layer.find('.loading-html').hide();	
		loading.show();	
		var count = function(checked){
			var c = 0, i = 0;
			cpCheckbox.each(function(index){
				$(this).is(':checked') && (c+=bi.eq(index).text()*1);
			})
			status.text(c+firstBoxText*1)
		}
		
		count();
		
		cpCheckbox.click(function(e){
			e.stopPropagation();
			count()
		});
		trs.hover(function(){
			$(this).parent().find('.hover-tr').removeClass().end().end().toggleClass('hover-tr')
		},function(){
			$(this).removeClass('hover-tr')
		}).click(function(){
			var box = $(this).find('.cp-checkbox');
			box.attr('checked',box.is(':checked')?'':'checked');
			count()
		});
		checkAll.click(function(){
			checkAll.is(':checked') ? cpCheckbox.attr('checked','checked') : cpCheckbox.removeAttr('checked');
			count()
		});
		
		firstBox.click(function(){
			firstBox.attr('checked','checked')
		});
		
		payChapter.click(function(){
			var buyChapterMoney = parseInt(status.text());
			if(balance == 0 || balance < buyChapterMoney){
				alert("余额不足，请充值");
				return false;
			}
			
			if(status.text() == 0){
				alert('请选择购买章节!');
				return false;
			}
			
			payMany.val("false");
			if(!confirm('确认支付?','点击确认将支付'+status.text()+'个磨铁币')){
				return false;
			}
			
		})
		
		payAll.click(function(){
			var buyChapterMoney = parseInt(status.text());
			if(balance == 0 || balance < buyChapterMoney){
				alert("余额不足，请充值");
				return false;
			}
			
			if(status.text() == 0){
				alert('请选择购买章节!');
				return false;
			}
			
			payMany.val('true');
			if(!confirm('确认支付?','点击确认将购买全本')){
				return false;
			}
		})
		
		form.ajaxForm({
			cache: false,
			success: function(text){
				if($.trim(text) == "购买成功"){
					Mo.getNextChaper(!first);
					buyok = true;
					_self.hideLayer(_self);
					//location.href = "/book/" +bookId + "_" + chapterId ;
				}else{
					alert(text)
				}
			}
		})
	}
	
	var delDialog = null;
	Mo.getNextChaper = function(nextChapter){
		loading.show();
		$.ajax({
			url: '/ajax/chapter/more',
			data: {nextChapter:nextChapter,chapterId:chapterId},
			cache: false,
			success: function(html){
				var wh = $(window).height(), dh = $(document).height(), obj = Mo.bookMark.cache[$('pre.note:last').attr('id')] || null, th = obj && obj.thumbtack || null
				    stBottom =  obj && th && ( ( dh - th.offset().top-th.height() ) > 300 );
				if($.trim(html)=="finished"){
					if(Motie.bookMark.id != 0 && Motie.bookMark.id !== null && ( stBottom === null || stBottom ) ){
						if(delDialog === null ){
							delDialog = $('<div class="bookmark"><div class="bg"><p class="area">本书已完结，是否要删除书签？</p></div></div>').dialog({
								autoOpen: true,
								minHeight:170,
								width:400,
								modal:true,
								resizable:false,
								title:'本书已完结',
								buttons:{
									"\u786E\u5B9A":function(){
										var cache = Motie.bookMark.cache;
										for(var i in cache){
											var tmp=cache[i];
											if(tmp.thumbtack!=null){
												tmp.hasMark=false;
												tmp.thumbtack.hide()
											}
										}
										$(this).dialog('close')
										$.ajax({
											url: '/ajax/book/bookmarker/del',
											type: 'post',
											cache: false,
											data: { id: Motie.bookMark.id },
											success: function(){
												Motie.bookMark.id = 0
											}
										})
									},
									"\u53D6\u6D88":function(){
										$(this).dialog("close");
									}
								}
							})
						}else{
							delDialog.dialog('show')
						}
					}
					loading.hide();
					return ;
				}
				if($.trim(html)=="over"){
					if( obj && Motie.bookMark.id != 0 && stBottom === null || stBottom ){
						obj.isOver()
					}
					loading.hide();
					return ;
				}
				var $html = $(html);
				if($html.find('#payMany').length){
					new Mo.layer({
						closeHandle: '#PayForChapters .pop-close',
						layerClass:'retwitter',
						layerId: 'PayForChapters',
						destroy: true,
						width: 800,
						draggable: false,
						onRendered: loadDialog,
						onHide: function(_self){
							if(!buyok){
								if(first){
									location.href = _self.layer.find(".btn-pay-cancel").attr('href')
								}else{
									$('body,html').scrollTop($win.scrollTop()-100);
								}
							}
							lock = false;
						},
						data: {html : html },
						tpl: '<div defaultTemplate="defaultTemplate" style="display: none; position: absolute;z-index: 1000">\
								<div style="position:relative">\
									<table style="width: 100%;height: 100%;" class="pop-dialog-table">\
										<tbody>\
											<tr>\
												<td class="pop-tl"></td>\
												<td class="pop-border"></td>\
												<td class="pop-tr"></td>\
											</tr>\
											<tr>\
												<td class="pop-border"></td>\
												<td class="pop-content"><div class="loading-html" style="margin:50px auto 30px auto;width:150px;line-height:30px;"><img alt="loading.." class="vm" src="'+ImgMotie+'/_assets/ajaxLoadingDialog.gif"><span class="vm fz-16" style="margin-left:20px;">载入中..</span></div><div class="pop-insert-here">{{{html}}}</div></td>\
												<td class="pop-border"></td>\
											</tr>\
											<tr>\
												<td class="pop-bl"></td>\
												<td class="pop-border"></td>\
												<td class="pop-br"></td>\
											</tr>\
										</tbody>\
									</table>\
								</div>\
							</div>'
					}).render();
					loading.hide();
				}else if($html.find("#loginForm").length){//没有登录的处理
					Motie.CheckLogin(true)
					//location.href = "/accounts/login";
				}else{
					first = false;
					if($.trim(html)=="over"){
						loading.hide();
						return ;
					}
					
					var title = $html.find(".title").val();
					document.title = title + "   ${TITLE}";
					
					chapterId = $html.find("input[name='chapterId']").val();
					
					$("#shadowDiv").hide();
					lock = false;
					new Mo.layer({
						data: { html: html },
						where: '#placeHolder',
						insertType: 'before',
						draggable: false,
						position: false,
						tpl: '{{{html}}}',
						overlay: false,
						onRendered: function(_self){
							<c:if test="${LOGIN_USER != null}">
							setTimeout(function(){
								Motie.bookMark.bind(_self.layer)
							}, 500)
							</c:if>
							_self.layer.find('*[rel^="pop-"]').each(function(){
								new Motie.popLayer($(this), $('#'+this.getAttribute('rel').substring( 4,10000 ) ) );
							});
						}
					}).render()
				}
			}
		})
	}
	
	
	//首次加载
	if($(".page-content pre").height() < $(window).height()){
		Mo.getNextChaper(false);
	}
	var lock = false; 
	//控制滚动
	$(window).scroll( function() {
		var wh = $(window).height();
		var dh = $(document).height();
		var st = $(document).scrollTop();
		if( dh - (wh + st) < 20 && !lock ){
			lock = true;
			Mo.getNextChaper(true);
		}
	});
});
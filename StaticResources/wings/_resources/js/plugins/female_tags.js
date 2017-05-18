$(function(){
	
	var insertTag = $('.insert-tags');
	var tagStore = [
	    ['现言言情',['都市','婚恋','总裁','职场','民国','明星','青春','校园']],
		['古言言情',['宫斗','宅斗','穿越','重生','历史','架空','种田','武侠']],
		['悬疑推理',['悬疑 ','推理','灵异','解谜','盗墓','探险','惊悚','暗黑']],
		['幻想言情',['仙侠','玄幻','纯爱','同人','网游','科幻','西方','机甲']],
		['通用标签',['励志','腹黑','轻松','搞笑','甜宠','萌宠','诙谐','契约','爽文','小白','正剧','美食','女配','宝宝','明星','校园','商战','虐恋情深','欢喜冤家','青梅竹马','民国浮影','青春年华','职场丽人','破镜重圆','日久生情','近水楼台','天作之和','铁汉柔情','七年之痒','灵魂转换','前世今生','先婚后爱','娱乐圈','业界精英','总裁豪门','阴差阳错','复仇之路','婆媳关系','家庭伦理','宫斗','宅斗','清穿','后宫','嫡女','庶女','女尊','医女','江湖','历史','种田','魂穿','女强','快穿','架空','古穿今','今穿古','古色古香','武侠江湖','两宋明史','穿越时空','王侯将相','解密','探险','恐怖','惊悚','侦探','穿越','考古','灵异','心理','重生','暗黑','鬼怪','巫蛊','僵尸','驱魔','算命','悬疑','本格','推理','血族','竞技','异能','宝藏','道士','法医','网游','唯美','系统','阴阳师','未来','修真','古武','废柴','升级','召唤','幻情','古典仙侠','系统快穿','幻想空间','网游情事','西方罗曼','异国情缘']]
	];
	
	var html = ['<table><tr><td><dl>'];
	for(var i=0; i<tagStore.length;i++){
		var tmp = tagStore[i], s = tmp[1];
		html.push('<dt>'+tmp[0]+'</dt><dd>');
		
		for(var k=0; k<s.length; k++){
			html.push('<a href="javascript:;">'+s[k]+'</a>');
		}
		html.push('</dd>')
	}
	html.push('</dl></td></tr></table>');
	
	var tags = null, be = false;
	if($('.book_edit').length){
		be = true
		var offset = {
			x: 0,
			y: -450
		}
	}else{
		offset = {
			x: 0,
			y: 0
		}
	}
	
	var input = insertTag.find('.input-tags'), enter = false;
	
	var iv = $('.invate-friends');
	var tpl = '<div defaultTemplate="defaultTemplate" style="display: none; position: absolute; z-index: 1000"><div style="position:relative; zoom: 1"><table width="100%" class="pop-dialog-table"><tbody><tr><td class="pop-tl"></td><td class="pop-border"></td><td class="pop-tr"></td></tr><tr><td class="pop-border"></td><td class="pop-content"><a class="fr pop-close" href="javascript:;"></a><h3>标签库（仅供参考）</h3><div class="sp-20"></div><div class="insert-here">{{{html}}}</div></td><td class="pop-border"></td></tr><tr><td class="pop-bl"></td><td class="pop-border"></td><td class="pop-br"></td></tr></tbody></table></div></div>';
	var moreTags = new Mo.layer({
		layerId: 'moreTagLayer',
		destroy: false,
		handle: be ? input : insertTag.find('.show-more'),
		data: { html : html.join('') },
		tpl: tpl,
		fixCenter: false,
		width: 600,
		height: 324,
		toggleShow: !be,
		draggable: false,
		overlay: false,
		position: insertTag,
		offset:offset,
		onRendered: function(_self){
			x && finder(x);
			_self.layer.find('dl a').click(function(){
				var $t = $(this), result = x.search($.trim($t.text()));
				if(x.isMax() || $t.hasClass('selected') || result[0]){
					return false
				}else{
					x.add($t.addClass('selected').text())
				}
			}).end().hover(function(){
				enter = true
			}, function(){
				enter = false
			})
			
			
		}
	});
	
	be && input.blur(function(){
		!enter && moreTags.hideLayer();
	}) && input.focus(function(){
		moreTags.render()
	})
	
	
	var finder = function(_self){
		var all = _self.getAll();
		if(moreTags.rendered){
			moreTags.position()
			if(tags == null){
				tags = moreTags.layer.find('dl a');
			}
			for(var i = 0 ; i<all.length;i++){
				tags.each(function(){
					if($.trim($(this).text()) == all[i]){
						$(this).addClass('selected');
						return false
					}
				})
			}
		}
	}
	
	var x = new Mo.tags({
		input: input,
		ul: insertTag.find('.names-tags'),
		max : 5,
		onAdd: function(_self){
			finder(_self)
		},
		onRemove: function(_self, ele){
			if(moreTags.rendered){
				if(tags == null){
					tags = moreTags.layer.find('dl a');
				}
				tags.each(function(){
					if($.trim($(this).text()) == ele.text()){
						$(this).removeClass('selected');
						return false
					}
				})
			}
		}
	});
	
})
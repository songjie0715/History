$(function(){
	
	var insertTag = $('.insert-tags');
	var tagStore = [
		['言情',['言情','都市','台言','总裁','穿越','架空','后宫','民国','种田','重生','宅斗','青春','虐恋','耽美','百合']],
		['玄幻',['玄幻','东方玄幻','异世大陆','领主贵族','奇遇升级','斗气魔法','黑暗血族','转世重生','异界争霸','热血','纨绔',' DND','魔法校园','兽族亡灵','异术超能','远古神话']],
		['灵异',['灵异','灵体','鬼怪','茅山道士','驱魔人','降头','湘西赶尸','僵尸','粽子','诅咒','灵异奇谈','风水异术','巫蛊','苗疆']],
		['悬疑',['悬疑','恐怖','惊悚','侦探','探险','奇遇','盗墓','神秘','刺激','诡异','考古','推理','探秘','解疑']],
		['历史',['历史','先秦','春秋战国','两汉三国','魏晋风流','隋唐盛世','五代十国','两宋元明','清史民国','抗战烽火','外国历史','近代史','戏说历史']],
		['军事',['军事','军旅生活','军事幻想','特种兵','残酷','血腥','战友','战史','二战','外国军事']],
		['都市',['都市','花花都市','娱乐明星','特工秘事','霸道情仇','现实百态','乡土风情','青春校园','谈情说爱',' 商战风云','官场浮沉','黑道争雄','种田生活','黑客','纨绔 ']],
		['游戏',['游戏','游戏生涯','虚拟网游','电子竞技','游戏异界','技术流','魔兽世界','WCj','全息网游']],
		['竞技',['竞技','体育竞技','篮球运动','足球运动','弈林生涯']],
		['科幻',['科幻','星际战争','机甲时代','时空穿梭','数字生命','末世危机','未来科技','进化变异']],
		['武侠',['武侠','奇侠武侠','传统武侠','现代武技','丹药','法宝','转世','国术武技','新派武侠']],
		['仙侠',['仙侠','古典仙侠','奇幻修真','现代修真','神魔','洪荒封神']],
		['文化',['文化','哲学','心理学','传记','艺术','政治','宗教社会','思想','回忆录','国学','人文','考古','纪实']],
		['文学',['文学','古典文学','现代文学','当代文学','文学评论','诗歌','散文','杂文']],
		['生活',['生活','旅行','摄影','女性','教育','美食','灵修','健康','情感','手工','养生','家居','两性','公关','启蒙','心灵']],
		['经管',['经管','管理','经济学','经济','金融','商业','投资','营销','广告','理财','创业','股票','企业史','策划','企业文化']],
		['励志',['励志','职场','成功','人生','心理','职业规划','职场']],
		['同人',['同人','动漫同人','武侠同人','影视同人','游戏同人','小说同人']]
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
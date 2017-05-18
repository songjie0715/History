$(function(){
	
	var insertTag = $('.insert-tags'), input = insertTag.find('.input-tags'), loadIco = insertTag.find('.loadIco'), more = insertTag.find('.show-more');
	
	var tags = null, dataStore = {}, tmpStore = {}, dataArray = [], pageStore = {}, num = 12, currentPage;
	
	var html = [
		'{{#follow }}',
		'<li id="{{id }}" class="status{{groupRoleType }}">',
			'<div class="head-wrap">',
				'<span>{{statusText }}</span>',
				'<img alt="{{name }}" src="{{iconUrlSmall }}">',
			'</div>',
			'<div class="user-name">',
				'<a href="javascript:;">{{name }}</a>',
			'</div>',
		'</li>',
		'{{/follow }}'
	]
	
	;var tagControal = {
		add: function(ele, key, value){
			tmpStore[key] = {
				id: key,
				selected: true,
				text: value,
				ele: ele
			}
			x.add(value);
			ele.addClass('selected')
		},
		del: function(key){
			var tmp = tmpStore[key];
			tmp.ele.removeClass('selected');
			delete tmpStore[key]
		},
		delByStr: function(str){
			for(var i in tmpStore){
				var tmp = tmpStore[i];
				if(tmp.text == str){
					tagControal.del(tmp.id)
				}
			}
		},
		search: function(str){
			var fo = dataStore.follow;
			for(var i in fo){
				var tmp = fo[i];
				if(tmp.name == str){
					return tmp
				}
			}
		}
	}
	
	;var moreTags = new Mo.layer({
		layerId: 'addFriendLayer',
		data: dataStore,
		tpl: Mo.layer.tplStore.basicTpl,
		destroy: false,
		data:{
			html: $('#invateFirendTpl').html()
		},
		handle: more,
		width: 550,
		toggleShow: true,
		draggable: false,
		overlay: false,
		position: insertTag,
		offset: {
			x: 0,
			y: 5
		},
		onRendered: function(_self){
			var layer = _self.layer;
			
			x && finder(x);
			
			function pageselectCallback(page_index, jq){
				more.hide();
				loadIco.show();
				currentPage = page_index;
				
				var process = function(data){
					var start = page_index*num, end = start+num ; 
					var new_content = $(Mustache.to_html(html.join(''), { follow: data }));
					new_content.each(function(){
						var $t = $(this), tmp = tmpStore[$t.attr('id')];
						tmp && tmp.selected && $t.addClass('selected');
						
					});
					$("#follow-list").empty().append(new_content);
					finder(x);
					more.show();
					loadIco.hide()
				}
				
				if(!pageStore[page_index]){
					$.ajax({
						url: MotieHost+'/ajax/group/get/follower',
						data: { page: page_index+1, size:num ,groupId: groupId},
						cache: false,
						success: function(data){
							
							//status groupRoleType
							// ok: [-4, -1]
							// reject: [-3,0,1,2,3,4]
 							
							pageStore[page_index] = data;
							process(data)
						}
					})
				}else{
					process(pageStore[page_index])
				}
				
				return false;
			}
			
			layer.find('#Pagination').pagination(totalPage, {
				num_edge_entries: 3,
				num_display_entries: 4, 
				items_per_page: num,
				prev_text: '上一页',
				next_text: '下一页',
				callback: pageselectCallback
			});
			
			pageselectCallback(0)
		}
	}).render()
	
	;$('#follow-list > li').live('click',function(){
		var $t = $(this), txt = $.trim($t.find('.user-name').text()), result = x.search(txt), id = $t.attr('id');
		if($t.hasClass('status-3') || $t.hasClass('status0') || $t.hasClass('status1') || $t.hasClass('status2') || $t.hasClass('status3') || $t.hasClass('status4')){
			return false
		}
		if($t.hasClass('selected') && result[0]){
			tagControal.del(id);
			x.remove(txt)
		}else{
			tagControal.add($t, id, txt)
		}
		moreTags.position()
	})
	
	;var finder = function(_self){
		var all = _self.getAll();
		if(moreTags.rendered){
			moreTags.position()
			var	tags = $('#follow-list li');
			for(var i = 0 ; i<all.length;i++){
				tags.each(function(){
					var $t = $(this), text = $.trim($t.find('.user-name').text());
					if(text == all[i]){
						tagControal.add($t, $t.attr('id'), text)
						return false
					}
				})
			}
		}
	}
	
	
	;var x = new Mo.tags({
		input: input,
		ul: insertTag.find('.names-tags'),
		defaultText: '',
		addAccordingTo: function(value){
			return true
		},
		disableEnter: true,
		onAdd: function(_self, ele){
			finder(_self);
			moreTags && moreTags.rendered && moreTags.position();
			if(_self.number > 0){
				te && te.text('')
			}
		},
		onRemove: function(_self, ele){
			if(moreTags.rendered){
				var tags = $('#follow-list li');
				tags.each(function(){
					var $t = $(this), id = $t.attr('id'), tmp = tmpStore[id];
					if(tmp && tmp.text == ele.text()){
						tagControal.del(id);
						return false
					}
				});
				
				tagControal.delByStr(ele.text())
				
				if(_self.number == 0){
					te && te.text('邀请人数不能为0')
				}else{
					te && te.text('')
				}
				
			}
			moreTags && moreTags.rendered && moreTags.position()
		}
	});
	
	;var ajaxing = false, ajax = null;
	
	;var keySelect = function(e){
		if(e.keyCode == 13){
			x.input.val('')
		}
	}
	
	//TODO autocomplete
	/*input.autocomplete({
		source: function( request, response ) {
			
			loadIco.show();
			more.hide();
			ajax = $.ajax({
				url: "http://ws.geonames.org/searchJSON",
				dataType: "jsonp",
				data: {
					featureClass: "P",
					style: "full",
					maxRows: 12,
					name_startsWith: request.term
				},
				success: function( data ) {
					response( $.map( data.geonames, function( item ) {
						return {
							label: item.name + (item.adminName1 ? ", " + item.adminName1 : "") + ", " + item.countryName,
							value: 2
						}
					}));
				}
			});
		},
		minLength: 1,
		select: function( e, ui ){
			x.add(ui.item.label);
			tagControal.add($(),ui.item.value, ui.item.label)
		},
		open: function() {
			if(moreTags.rendered){
				moreTags.layer.fadeOut('fast');
			}
			
			x.input.unbind('keyup', keySelect).bind('keyup', keySelect)
		},
		close: function() {
			loadIco.hide();
			more.show();
			if(moreTags.rendered){
				moreTags.layer.fadeIn('fast');
			}
		}
	});*/
	
	$('.ui-menu > li.ui-menu-item > a').live('mouseenter', function(){
		var txt = $(this).text();
		x.input.val(txt);
	}).live('click', function(){
		var txt = $(this).text();
		x.input.val('')
	})
	
	var submit = $('.btn-submit'), form = $('#form1'), groupid = $('#groupid').val(),
		textarea = form.find('textarea'), status = $('#msg'), me = $('#msg-error'), te = $('#tags-error');
	
	var check = function(){
		if (!Motie.limitTextarea(textarea, 140, status)) {
			status.addClass('text-wrong');
			return false;
		}
		return true;
	}
	check();
	textarea.keyup(function(){
	    if(check()){
	        status.removeClass('text-wrong');
	        me.text('')
	    };
	    if($.trim(textarea.val()) == ''){
			me.text('邀请原因不能为空');
		}
	});
	
	submit.click(function(){
		if(!check()){
			return false
		}
		
		if(x.number == 0 ){
			te.text('邀请人数不能为0');
			return false
		}else{
			te.text('');
		}
		
		if($.trim(textarea.val()) == ''){
			me.text('邀请原因不能为空');
			return false
		}
		
		x.hidden.val(function(){
			var ar = [];
			for(var i in tmpStore){
				ar.push(i)
			}
			return ar.join(' ')
		})
	});
		
	Motie.limitTextarea(textarea, 140, status);
	
	var alert = new Mo.alert({
		type: 'loading',
		html: '提交中..'
	});
	
	form.ajaxForm({
		beforeSubmit: function(){
			alert.render()
		},
		cache: false,
		success: function(text){
			var html = '', type, url;
			if(text.code == 'ok'){
				type = 'ok';
				url = '/group/'+groupid
				
			}else if (text.code == 'fail'){
				type = 'error';
				url = location.href
			}
			
			alert.change({
				type: type,
				html: text.message
			});
			
			setTimeout(function(){
				window.location.href = url
			}, 2000);
		}
	})
	
});







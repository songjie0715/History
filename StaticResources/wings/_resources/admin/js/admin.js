//for admin cp

function changeTwoDecimal_f(x) {
	var f_x = parseFloat(x);
	if(isNaN(f_x)) {
		alert('function:changeTwoDecimal->parameter error');
		return false;
	}
	var f_x = Math.round(x * 100) / 100;
	var s_x = f_x.toString();
	var pos_decimal = s_x.indexOf('.');
	if(pos_decimal < 0) {
		pos_decimal = s_x.length;
		s_x += '.';
	}
	while(s_x.length <= pos_decimal + 2) {
		s_x += '0';
	}
	return s_x;
}

function accDiv(arg1,arg2){  
    var t1=0,t2=0,r1,r2;  
    try{t1=arg1.toString().split(".")[1].length}catch(e){}  
    try{t2=arg2.toString().split(".")[1].length}catch(e){}  
    with(Math){  
        r1=Number(arg1.toString().replace(".",""));  
        r2=Number(arg2.toString().replace(".",""));  
        return (r1/r2)*pow(10,t2-t1);  
    }  
}  
Number.prototype.div = function (arg){  
    return accDiv(this, arg);  
};  
function accMul(arg1,arg2)  
{  
    var m=0,s1=arg1.toString(),s2=arg2.toString();  
    try{m+=s1.split(".")[1].length}catch(e){}  
    try{m+=s2.split(".")[1].length}catch(e){}  
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);  
}  
Number.prototype.mul = function (arg){  
    return accMul(arg, this);  
};  
function accAdd(arg1,arg2){  
    var r1,r2,m;  
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}  
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}  
    m=Math.pow(10,Math.max(r1,r2));  
    return (arg1*m+arg2*m)/m;  
}  
Number.prototype.add = function (arg){  
    return accAdd(arg,this);  
}  
function accSub(arg1,arg2){  
     var r1,r2,m,n;  
     try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}  
     try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}  
     m=Math.pow(10,Math.max(r1,r2));  
     n=(r1>=r2)?r1:r2;  
     return ((arg2*m-arg1*m)/m).toFixed(n);  
}  
Number.prototype.sub = function (arg){  
    return accSub(arg,this);  
} 

;Mo.register('verify', function(mo){
	var verifyWindow, verfyWindowLayer, callbackList = { onSubmit: $.noop };
	var verifyType = {
			reject: {
				html: '',
				title: '驳回原因',
				msgItem: [ 
		            { text: '含有广告或垃圾信息' },
		            { text: '含有情色、淫秽或暴力、低俗、迷幻药、出售枪支弹药等' },
		        	{ text: '含有反动、激进时政或意识形态、批评政府及国家领导人腐败等' },
		        	{ text: '含有人身攻击或者恶意言论等' },
		        	{ text: '含有迷信、极端宗教信仰、攻击少数民族等不法话题' },
		        	{ text: '含有其他违反国家相关政策法规的内容' },
		        	{ text: '含有反动、激进时政或政治敏感等' }
		          ]
			}
		};
	
	var template = '<div class="verify-window">\
						<ul class="list">{{#msgItem}}<li><label><input type="{{mulit}}" value="{{text}}" /> {{text}}</label></li>{{/msgItem}}</ul>\
						<textarea style="width:90%;height:100px;"></textarea>\
						<p><button>提交</button></p>\
					</div>';
	
	function createWindow(callback){
		if(verifyWindow)
			return verifyWindow;
		
		verfyWindowLayer = $('<div />').appendTo('body');
		
		verifyWindow = verfyWindowLayer.kendoWindow({
			visible: false,
			width: 500,
			modal: true,
			open: function(e){
				verfyWindowLayer.find('button').click(function(){
					var msg = [];
					verfyWindowLayer.find('ul.list li label').map(function(index, item){
						if($(item).find('input').is(':checked')){
							msg.push($(item).text());
						}
					});
					msg.push($.trim(verfyWindowLayer.find('textarea').val()));
					callbackList.onSubmit(msg.join(';'));
					verifyWindow.close();
				})
			}
		}).data('kendoWindow');
		
		return verifyWindow;
	}
	return function(type, mulit, eventHandle){
		var verifyWindow = createWindow(type), obj = verifyType[type], html = obj.html;
		if(eventHandle){
			$.extend(callbackList, eventHandle)
		}
		verifyWindow.title(obj.title);
		if(!html){
			obj.html = html = Mustache.to_html( template, { msgItem: obj.msgItem, mulit: mulit ? 'checkbox': 'radio' } );
		}
		verifyWindow.content(html);
		verifyWindow.center();
		verifyWindow.open();
	}
})

;$(document).ready(function() {
	
	var uploadObject = Mo.utils.upload, 
	ajaxStatus = Mo.core.ajaxStatus, 
	ico = Mo.ui.ico;
	
	$body = $('body');
	$win  = $(window);
	
	$IE = $.browser.msie;
	$IE6 = $IE && $.browser.version=='6.0';
	
	Mo.init.bindDelegate().ReturnTop();
	
	//button style
	$('.button').button();
	
	//button radio,checkbox
	$('.radio-wrap, .checkbox-wrap').buttonset();
	
	//main navigation style
	var mainnav = $('#main-nav'), toplevel = mainnav.find('.top-level');
	mainnav.delegate('.sub > a', 'click', function(){
		var anchor = $(this), parent = anchor.parent(), ul = anchor.next(), mark = anchor.find('span');
		if(ul.is(':visible')){
			mark.html('+');
			parent.removeClass('opened');
			ul.slideUp('fast');
		}else{
			mark.html('-');
			parent.addClass('opened');
			ul.slideDown('fast');
		}
	});
	
	//datepicker
	$('.datepicker').kendoDatePicker({
		format: 'yyyy-MM-dd'
	});
	
	var lc = $('.left-content')
	
	//slide nav
	$('#exp').click(function(){
		var $t = $(this);
		if(mainnav.is(':visible')){
			$t.text('>')
			mainnav.hide();
			lc.css('margin-left', 30)
		}else{
			$t.text('<')
			mainnav.show();
			lc.css('margin-left', 160)
		}
	})
	
	//transform select
	$('.select').kendoDropDownList();
	$('.combox').kendoComboBox();
	
	$('.uploadImage').each(function(){
		var anchor = $(this), input = anchor.parent().find('input[role=imgSrc]'), img = anchor.parent().find('img');
		upload = uploadObject({
			handle: anchor,
			url: '/ajax/icon/site/bg/upload',
			onSubmit: function(){
				anchor.find('span').html(ico.loading+'稍等..');
			},
			onComplete: function(file, res){
				var url = res.split('|')[0]
				anchor.find('span').html('上传图片');
				input.val(url).end();
				img.attr('src',url);
			}
		});
		
		Mo.utils.dom.delayKeyup({
			element: input,
			duration: 100,
			process: function(input){
				img.attr('src',input.val())
			}
		})
	})
	
	$("#bookUploadBtn").length &&  new AjaxUpload($('#bookUploadBtn'), {
        action: '/ajax/icon/book/upload',
        name: 'uploadfile',
        onSubmit: function(file, ext){
            if (!(ext && /^(jpg|jpeg|gif)$/i.test(ext))) {
                return false;
            }
        },
        onComplete: function(file, response){
            var index = response.indexOf("<");
            if (index != -1) {
                response = response.substring(0, index);
            }
            $("#viewImg").attr("src", response);
            $("#iconTempFile").val(response);
        }
    });
	
	$('.input-text').each(function(){
		$(this).addClass('k-input').wrap('<div class="k-widget k-combobox k-header"></div>').wrap('<div class="k-dropdown-wrap k-state-default" style="padding-right: 2px;"></div>')
	})
	
	var colorTr = function(){
		$(this).find(' > tbody > tr')
		.each(function(index){
			if(index%2)
				$(this).addClass('row-2')
		})
	}
	//grid style
	$('.grid table').first().nextAll().andSelf().each(colorTr);
	$('.form table').first().nextAll().andSelf().each(colorTr);
	$('.need-split').first().nextAll().andSelf().each(colorTr);
});
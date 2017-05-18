/**
 * Created by janey on 2017/4/27.
 */
define([
    'vue',
    'mixin/sidebar',
    '../../components/clipboard.min',
    // '../../components/ckeditor2/ckeditor',
    '../../components/html2canvas',
    '../../components/blueimp-canvas-to-blob/js/canvas-to-blob.min',
    '../../components/file-saver/FileSaver.min'
], function (Vue,sidebar, Clipboard) {
    return function(list){
        return new Vue({
            el: '#app',
            mixins:[sidebar],
            data: {
                channelList: list,
                channelGenerateList: ''
            },
            mounted: function () {

                // var self = this;

                //渠道分组展开
                $('.group-collapse')
                    .on('show.bs.collapse', function () {
                        var $this = $(this);
                        $this.closest('li').find('.glyphicon').removeClass('glyphicon-plus').addClass('glyphicon-minus');
                    }).on('hide.bs.collapse', function () {
                    var $this = $(this);
                    $this.closest('li').find('.glyphicon').removeClass('glyphicon-minus').addClass('glyphicon-plus');
                });


            },
            methods: {
                toImage(){

                    // var html = '<div class="textWrapper">'
                    //     +'<p class="image-align-center"><img alt="" height="389" src="http://ls.motieimg.com/RESOURCE/98/263/825d94b95fdb9993c4e911c1bb4f7555_1" width="500" /></p>'
                    //     +'<p></p>'
                    //     +'<p>一年前我遇见了P友阿恒，后来的事大家应该猜得到，我们找了个地儿进行了‘负距离接触’。</p>'
                    //     +'</div>';
                    let $wrapperHtml = $('.textWrapper');
                    let html = $wrapperHtml.html();
                    // $wrapperHtml.html('<p>'+ html +'</p>')
                    html = html.replace(/&lt;/g,'<');
                    html = html.replace(/&gt;/g,'>');
                    html = html.replace(/&nbsp;/g,'');

                    // var parser = new DOMParser();
                    // var doc = parser.parseFromString(html, "text/xml");
                    // var ht = doc.querySelector('.textWrapper').outerHTML;
                    // $('#hiddenContent').html(ht);

                    //如果内容有图片，则把图片url+@.jpg
                    let img = $wrapperHtml.find('img');
                    if(img){
                        $.each(img, function(i, v){

                            convertImgToBase64($(v).attr('src')+'@.jpg', function (base64Img) {
                                $(v).attr('src', base64Img);
                            });
                        });
                    }

                    // 转换图片为base64格式 解决跨域问题
                    function convertImgToBase64(url, callback, outputFormat){
                        var img = new Image();
                        var dataURL;
                        img.src = url;
                        img.crossOrigin="anonymous";
                        img.onload = function(){
                            var canvas = document.createElement('canvas');
                            var ctx = canvas.getContext('2d');
                            canvas.height = this.height;
                            canvas.width = this.width;
                            ctx.drawImage(this,0,0);
                            dataURL = canvas.toDataURL(outputFormat || 'image/jpeg');
                            callback(dataURL);
                            canvas = null;
                        };
                    }



                    setTimeout(function(){
                        var w = $(".textWrapper").width();
                        var h = $(".textWrapper").height();
                        var $generateImg = $('#generateImg');
                        //
                        // //要将 canvas 的宽高设置成容器宽高的 2 倍
                        var canvas = document.createElement("canvas");
                        canvas.width = w * 2;
                        canvas.height = h * 2;


                        var context = canvas.getContext("2d");
                        context.fillStyle="white";
                        //然后将画布缩放，将图像放大两倍画到画布上
                        context.scale(0.5,0.5);

                        html2canvas(document.querySelector(".textWrapper"), {
                            canvas: canvas,
                            onrendered: function(canvas) {
                                // $('.viewMaterial').append(canvas);
                                var dataUrl = canvas.toDataURL('image/png');
                                $generateImg.find('.modal-body').html('').append('<img src="'+ dataUrl +'" />');
                                $generateImg.modal('show');

                                if(canvas.toBlob){
                                    canvas.toBlob(
                                        function (blob) {
                                            saveAs(blob, "image.png");
                                        },
                                        'image/png'
                                    );


                                }
                            }
                        });
                    },10)

                },
                createLink(){
                    let $channelList = $('.select-channel').find('input[name="channelids"]');
                    var checkeditem = [];
                    $.each($channelList, function(i,v){
                        if( v.checked ){
                            checkeditem.push(v);
                        }
                    });
                    if( !checkeditem.length ){
                        alert('请先选择渠道');
                        return;
                    }


                    $.ajax({
                        type: "POST",
                        url:"/weidulm/channel/addOrder",
                        data:$('#linkChannel').serialize(),// 你的formid
                        async: false,
                        error: function(request) {
                            alert("Connection error");
                        },
                        success: function(data) {
                            var linkList = '<table class="table table-striped table-bordered material-table"><tbody>';
                            $.each(data, function(i,v){
                                for(var j in v){
                                    linkList += '<tr><th class="tit">'+ j +'</th><td>'+ v[j] +'</td><td><a href="javascript:;" class="copyLink" data-clipboard-action="copy" data-clipboard-text="'+ v[j] +'">复制</a></td></tr>';
                                }
                            });
                            linkList += '</tbody></table>';
                            $('.createLinkText').html('').append(linkList);
                            var clipboard = new Clipboard('.copyLink');

                        }
                    });
                },
                clipText(){
                    let clipboard = new Clipboard('.btn-clip');

                    clipboard.on('success', function(e) {
                        // alert('已复制');
                    });

                    clipboard.on('error', function(e) {
                        alert('报错了');
                    });
                },
                change(item){
                    if( item.parentId ){
                        let parent = this.channelList.find(d => d.id == item.parentId);
                        parent.checked = parent.children.filter(d => d.checked).length == parent.children.length;
                    } else {
                        let parent = item;
                        parent.children.forEach(d => {
                            d.checked = parent.checked;
                        })
                    }
                }
            }
        })
    }
});



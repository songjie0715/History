/**
 * Created by Janey on 2016/4/28 0028.
 */

// import FileService from 'src/FileService';

if (!HTMLCanvasElement.prototype.toBlob) {
	Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
		value: function (callback, type, quality) {

			var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
				len = binStr.length,
				arr = new Uint8Array(len);

			for (var i=0; i<len; i++ ) {
				arr[i] = binStr.charCodeAt(i);
			}

			callback( new Blob( [arr], {type: type || 'image/jpeg'} ) );
		}
	});
}

new Vue({
	el: 'body',
	data: {
		showOrigin: true,
		havePic: true
	},
	events: {
		crop: function(){

		}
	},
	init: function(){
		this.cropper = null;
		this.file = null;
        this.screenHeight = null;
	},
	compiled: function(){
		var self = this;
		this.createCrop();
	},
	methods: {
		createCrop: function(){
			var self = this;
			if( this.cropper ){
				this.cropper.destroy();
			}
			this.$els.originImage.addEventListener('built', function(){
				/*self.cropper.setData({
					width: 300,
					height: 300
				})*/


			});

			this.cropper = new Cropper(this.$els.originImage, {
				aspectRatio: 1 / 1, // 裁剪区域比例
				// responsive : false,
				checkCrossOrigin: false,
				// rotatable: false,
				dragMode: 'none', //允许再次裁剪
				restore: false, // 调整窗口大小重新保存
				scalable: false, // 允许缩放图片
				zoomable: false, // 允许缩放图片
				zoomOnTouch: false, // 触摸放大图片
				zoomOnWheel: false, // 触摸放大图片
				// cropBoxResizable : false, // 允许对裁剪区域进行缩放
				crop: function(e){
					self.$emit('crop', e);
				}
			});
		},
		crop: function(){
			if( !this.showOrigin ) return;
			var imgData = this.cropper.getCroppedCanvas().toDataURL('image/jpeg');
			this.$els.croppedImage.src = imgData;
			this.showOrigin = false;
		},
		upload: function(e){
			var self = this;
			var files = e.target.files;
			var file = files[0];
			this.file = file;
			this.imgFileName = file.name;
			var status = FileService.checkMIME(file);
			
			if(!status){
				alert('请上传正确的图片格式');
				return false;
			}
			
			var fileSize = FileService.fileSize(file.size);
			 
			 
			 if( fileSize.M > 1 ){
            
			 	setTimeout(function(){
			 		alert('图片大小超过1M, 请重新上传图片!');
			 	},0);
            
			 	return false;
			 };

			FileService.readImage(file).then(function(imgData){

				self.showOrigin = true;
                if( navigator.userAgent.match(/iphone/i) ){
                    self.checkFileImage(file);
                } else {
                    self.$els.originImage.src = imgData;
                    /*$(self.$els.originImage).height(self.screenHeight - 150);*/
                }
                self.havePic = false;
                /*if( fileSize.M > 2 ){

                    setTimeout(function(){
                        self.createCrop();
                    }, 1500)

                } else {

                    setTimeout(function(){
                        self.createCrop();

                    }, 800)
                }*/

			})
		},
		reset: function(){
			this.showOrigin = true;
			// this.cropper.reset();
		},
		uploadImg: function(){

			var self = this;
            var progress = $.AMUI.progress;
            /*var content = $('#content').val();*/
            var fileinfo = $('#fileinfo')[0];
        	
            var formData = new FormData(fileinfo);
            
            formData.set('uploadfile', self.file, self.imgFileName);

			/*formData.append('uploadfile', );
			formData.append('content', content);*/

			// Use `jQuery.ajax` method
			// 线上
			$.ajax({
				url: '/m/zyq/one/sentense/release',
				type: "POST",
				data: formData,
//				crossDomain: true,
				processData: false,
				contentType: false,
                xhr: function() {
                    var xhr = $.ajaxSettings.xhr();
                    //绑定上传进度的回调函数
                    xhr.upload.addEventListener('progress', function(e){

                        progress.set( Math.floor( e.loaded / e.total) );

                    }, false);

                    return xhr; //一定要返回，不然jQ没有XHR对象用了
                },
                success: function (data) {
                	alert("上传成功");
                    progress.set(1.0);
                    console.log('Upload success');
                    var $modalSuccess = $('#modal-success');
                    $modalSuccess.modal('open');
                    setTimeout(function(){
                        $modalSuccess.modal('close');
                        // 弹层消失 页面跳转
                        if(data.code == 0){
							window.location.href = "http://m.motie.com/" + data.data.url;
						}else{
							alert(data.msg);
						}
                        //
                    }, 2000);
                },
				error: function () {
					alert("上传失败");
                    var $modalFailed = $('#modal-failed');
                    $modalFailed.modal('open');
                    setTimeout(function(){
                        progress.set(1.0);
                        $modalFailed.modal('close');
//                        location.href.reload();
                    }, 1500);
				}
			});


			// 本地
			// $.ajax('http://10.1.16.13:8080/HttpToStatic/wapImage', {
			// 	type: "POST",
			// 	data: formData,
			// 	crossDomain: true,
			// 	processData: false,
			// 	contentType: false,
			// 	success: function () {
			// 		console.log('Upload success');
			// 	},
			// 	error: function () {
			// 		console.log('Upload error');
			// 	}
			// });

            // nodejs upload test
			// $.ajax('/upload', {
			// 	type: "POST",
			// 	data: formData,
			// 	// crossDomain: true,
			// 	processData: false,
			// 	contentType: false,
             //    xhr: function() {
             //        var xhr = $.ajaxSettings.xhr();
             //        //绑定上传进度的回调函数
             //        xhr.upload.addEventListener('progress', function(e){
            //
             //            progress.set( Math.floor( e.loaded / e.total) );
            //
             //        }, false);
            //
             //        return xhr; //一定要返回，不然jQ没有XHR对象用了
             //    },
			// 	success: function () {
             //        progress.set(1.0);
			// 		console.log('Upload success');
             //        var $modalSuccess = $('#modal-success');
             //        $modalSuccess.modal('open');
             //        setTimeout(function(){
             //            $modalSuccess.modal('close');
             //            // 弹层消失 页面跳转
             //        }, 1000);
			// 	},
			// 	error: function () {
			// 		console.log('Upload error');
             //        var $modalFailed = $('#modal-failed');
             //        $modalFailed.modal('open');
             //        setTimeout(function(){
             //            $modalFailed.modal('close');
             //        }, 1000);
			// 	}
			// });
		},
        checkFileImage: function(file){
            var self = this;
            if (file) {
                // console.log("正在上传,请稍后...");
                var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
                if (!rFilter.test(file.type)) {
                    alert("请选择jpeg、png格式的图片");
                    return;
                }
                // var URL = URL || webkitURL;
                //获取照片方向角属性，用户旋转控制
                EXIF.getData(file, function() {
                    // alert(EXIF.pretty(this));
                    EXIF.getAllTags(this);
                    //alert(EXIF.getTag(this, 'Orientation'));
                    Orientation = EXIF.getTag(this, 'Orientation');
                    //return;
                });

                var oReader = new FileReader();
                oReader.onload = function(e) {
                    //var blob = URL.createObjectURL(file);
                    //_compress(blob, file, basePath);
                    var image = new Image();
                    image.src = e.target.result;
                    image.onload = function() {
                        var expectWidth = this.naturalWidth;
                        var expectHeight = this.naturalHeight;

                        if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
                            expectWidth = 800;
                            expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
                        } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
                            expectHeight = 1200;
                            expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
                        }
                        var canvas = document.createElement("canvas");
                        var ctx = canvas.getContext("2d");
                        canvas.width = expectWidth;
                        canvas.height = expectHeight;
                        ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
                        var base64 = null;
                        var $originImage = $("#image");

                        //修复ios
                        if (navigator.userAgent.match(/iphone/i)) {
                            console.log('iphone');
                            //alert(expectWidth + ',' + expectHeight);
                            //如果方向角不为1，都需要进行旋转 added by lzk
                            if(Orientation != "" && Orientation != 1){
                                // alert('旋转处理');
                                switch(Orientation){
                                    case 6://需要顺时针（向左）90度旋转
                                        // alert('需要顺时针（向左）90度旋转');
                                        self.rotateImg(this,'left',canvas);
                                        break;
                                    case 8://需要逆时针（向右）90度旋转
                                        // alert('需要顺时针（向右）90度旋转');
                                        self.rotateImg(this,'right',canvas);
                                        break;
                                    case 3://需要180度旋转
                                        // alert('需要180度旋转');
                                        self.rotateImg(this,'right',canvas);//转两次
                                        self.rotateImg(this,'right',canvas);
                                        break;
                                }
                            }

                            /*var mpImg = new MegaPixImage(image);
                             mpImg.render(canvas, {
                             maxWidth: 800,
                             maxHeight: 1200,
                             quality: 0.8,
                             orientation: 8
                             });*/
                            base64 = canvas.toDataURL("image/jpeg", 0.8);
                        }else{
                            //alert(Orientation);
                            if(Orientation != "" && Orientation != 1){
                                //alert('旋转处理');
                                switch(Orientation){
                                    case 6://需要顺时针（向左）90度旋转
                                        // alert('需要顺时针（向左）90度旋转');
                                        self.rotateImg(this,'left',canvas);
                                        break;
                                    case 8://需要逆时针（向右）90度旋转
                                        // alert('需要顺时针（向右）90度旋转');
                                        self.rotateImg(this,'right',canvas);
                                        break;
                                    case 3://需要180度旋转
                                        // alert('需要180度旋转');
                                        self.rotateImg(this,'right',canvas);//转两次
                                        self.rotateImg(this,'right',canvas);
                                        break;
                                }
                            }

                            base64 = canvas.toDataURL("image/jpeg", 0.8);

                        }

                        //uploadImage(base64);
                        $originImage.attr("src", base64);
                        $originImage.height(self.screenHeight - 150);

                    };
                };
            }
            oReader.readAsDataURL(file);
        },
        rotateImg: function (img, direction,canvas) {
            //alert(img);
            //最小与最大旋转方向，图片旋转4次后回到原方向
            var min_step = 0;
            var max_step = 3;
            //var img = document.getElementById(pid);
            if (img == null)return;
            //img的高度和宽度不能在img元素隐藏后获取，否则会出错
            var height = img.height;
            var width = img.width;
            //var step = img.getAttribute('step');
            var step = 2;
            if (step == null) {
                step = min_step;
            }
            if (direction == 'right') {
                step++;
                //旋转到原位置，即超过最大值
                step > max_step && (step = min_step);
            } else {
                step--;
                step < min_step && (step = max_step);
            }
            //img.setAttribute('step', step);
            /*var canvas = document.getElementById('pic_' + pid);
             if (canvas == null) {
             img.style.display = 'none';
             canvas = document.createElement('canvas');
             canvas.setAttribute('id', 'pic_' + pid);
             img.parentNode.appendChild(canvas);
             }  */
            //旋转角度以弧度值为参数
            var degree = step * 90 * Math.PI / 180;
            var ctx = canvas.getContext('2d');
            switch (step) {
                case 0:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0);
                    break;
                case 1:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, 0, -height);
                    break;
                case 2:
                    canvas.width = width;
                    canvas.height = height;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, -height);
                    break;
                case 3:
                    canvas.width = height;
                    canvas.height = width;
                    ctx.rotate(degree);
                    ctx.drawImage(img, -width, 0);
                    break;
            }
        }
    }
});
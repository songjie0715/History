/**
 * Created by Janey on 2016/1/5.
 */


var BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.BlobBuilder;

var MIME = {
    txt: 'text/plain',
    csv: 'text/plain;application/vnd.ms-excel;',
    jpg: 'image/jpeg'
};

var FileService = {
    checkMIME: function(file, type){
        if( file && file.name){
            return this.split(file.name).ext.toLocaleLowerCase() in MIME;
        }
        return false;
    },
    arrayBufferToString: function(buf, callback){
        var blob;
        if (typeof(BlobBuilder) !== 'undefined') {
            var bb = new BlobBuilder();
            bb.append(buf);
            blob = bb.getBlob();
        } else {
            blob = new Blob([buf]);
        }
        var f = new FileReader();
        f.onload = function (e) {
            callback(e.target.result)
        };
        f.readAsText(blob);
    },
    readFile: function( file, options){
        var fr = new FileReader();

        options = $.extend({
            success:     $.noop,
            error:       $.noop,
            progress:    $.noop,
            abort:       $.noop,
            start:       $.noop
        }, options);

        fr.onloadstart = function(){
            options.start.apply(fr, arguments);
        };
        fr.onloadend = function(){
            options.success.apply(fr, arguments);
        };
        fr.onprogress = function(){
            options.progress.apply(fr, arguments);
        };
        fr.onerror = function(){
            options.error.apply(fr, arguments);
        };
        fr.onabort = function(){
            options.abort.apply(fr, arguments);
        };
        return fr;
    },
    readImage: function( file ){

        var p = $.Deferred();

        var fr = this.readFile(file, {
            success: function(){
                p.resolve( fr.result );
            },
            error: function(){
                p.reject( fr );
            }
        });

        fr.readAsDataURL(file);

        return p;
    },
    getRemoteImageBuffer: function( url, ext ){
        var p = $.Deferred();

        ext = ext || url.substring( url.lastIndexOf('.')+1, url.length);

        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        xhr.onload = function(){
            if( this.status == 200 ){
                p.resolve({
                    buffer: new Uint8Array(this.response),
                    ext: ext
                });
            }
        };
        xhr.onerror = function(err){
            p.reject(err);
        };
        xhr.send();

        return p;
    },
    readText: function(file, length){
        var service = this;

        var p = $.Deferred();

        if( !service.checkMIME(file, 'text/plain') ){
            p.reject({
                _result: false,
                message: 'not text'
            });
        }else{

            var blob = file.slice(0, length || file.size, 'text/plain;charset=UTF-8');

            var fr = this.readFile(file, {
                success: function(){
                    service.arrayBufferToString(fr.result, function(text){
                        p.resolve(text);
                    })
                }
            });

            fr.readAsArrayBuffer(blob);
        }
        return p;
    },
    split: function( name ){
        var n = name.lastIndexOf('.');
        if( n > -1 && n < name.length - 1 ){
            return {
                name: name.substring(0, n),
                ext: name.substring(n+1, name.length)
            }
        }
        return {
            name: name,
            ext: ''
        }
    },
    fileSize: function( size ){
        return {
            M: Math.round(size/1024/1024),
            KB: Math.round(size/1024)
        }
    }
};
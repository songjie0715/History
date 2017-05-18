/* 
* openLayer, 
* @params(handle,layer,options) string, string, object
*/
;
Motie.openLayer = function(handle, layer, options){
    if (!handle[0] || !layer[0]) 
        return false;
    var _self = this;
    this.options = options ||
    {};
    this.onHide = this.options.onHide ||
    function(){
    };
    this.onShow = this.options.onShow ||
    function(){
    };
    this.handle = handle;
    this.handleTop = this.handle.offset().top;
    this.handleLeft = this.handle.offset().left;
    this.layer = layer;
    this.icant = this.layer.attr('icant') || true;
    this.visible = this.layer.attr('visible') || 'position';
    if (this.icant != "true") {
        if (!layer.parent().is('body')) {
            this.layer = layer.clone();
            layer.remove();
            $('body').append(this.layer);
        };
            };
    this.x = this.layer.attr('x') || 0;
    this.x = this.x * 1;
    this.y = this.layer.attr('y') || 0;
    this.y = this.y * 1;
    this.left = function(){
        return _self.handle.offset().left + _self.x;
    };
    this.top = function(){
        return _self.handle.offset().top + _self.handle.height() + _self.y;
    };
    this.duration = this.options.duration !== undefined ? this.options.duration : 1000;
    this.showTime = this.options.showTime !== undefined ? this.options.showTime : 0;
    this.close = this.layer.find('.close-layer:first');
    this.eventType = this.options.eventType || 'mouseenter';
    var show = function(){
        _self.layer.hover(function(){
            if (_self.timer) {
                clearTimeout(_self.timer);
            }
            _self.showLayer(_self);
        }, function(){
            _self.lazyHide(_self);
        });
        _self.onShow(_self);
        _self.showLayer(_self);
    };
    this.handle.bind(this.eventType, function(e){
        _self.layer.unbind('hover');
        _self.timer = _self.layer.data('timer');
        _self.showTimer = _self.layer.data('showTimer');
        if (_self.timer) {
            clearTimeout(_self.timer);
        };
        if (_self.showTimer) {
            clearTimeout(_self.showTimer);
        };
        if (_self.showTime) {
            _self.showTimer = setTimeout(function(){
                show();
                _self.layer.data('showTimer', _self.showTimer);
            }, _self.showTime);
        }
        else {
            show();
        };
            });
    this.handle.bind('mouseout', function(){
        _self.lazyHide(_self);
    });
    this.layer.css('zIndex', '1000');
    this.close.click(function(){
        _self.hideLayer(_self);
        return false;
    });
};
Motie.openLayer.currentLayer = null;
Motie.openLayer.prototype.lazyHide = function(_self, hide){
    if (_self.showTimer) {
        clearTimeout(_self.showTimer);
    };
    if (_self.duration == 0) {
        _self.hideLayer(_self);
        return _self;
    };
    if (this.timer) {
        clearTimeout(this.timer);
    };
    this.timer = setTimeout(function(){
        _self.hideLayer(_self);
    }, this.duration);
    _self.layer.data('timer', this.timer);
};
Motie.openLayer.prototype.showLayer = function(_self){
    this.layer.css({
        left: _self.left(),
        top: _self.top()
    }).show();
};
Motie.openLayer.prototype.hideLayer = function(_self, fn){
    if (this.timer) {
        clearTimeout(this.timer);
    };
    if (this.visible == 'position') {
        this.layer.css({
            left: '-9999px',
            top: '-9999px'
        });
    }
    else {
        this.layer.hide();
    };
    _self.layer.unbind('hover');
    _self.onHide(_self);
};
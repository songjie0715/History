"use strict";define(["vue"],function(i){return new i({template:'<div class="shadow hidden" :class="{hidden: !isShow, zIndex: isZindex}"></div>',data:{isShow:!1,isZindex:!1},created:function(){this.$mount().$appendTo("body")},methods:{show:function(){this.isShow=!0},hide:function(){this.isShow=!1}}})});
//# sourceMappingURL=../../maps/wx/components/overlay.js.map

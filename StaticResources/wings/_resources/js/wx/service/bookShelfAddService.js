"use strict";define(["jquery","core"],function(e,a){return{getMoreRecordBook:function(r){return e.ajax({url:a.apiPath+"/ajax/i/reading",data:{page:r,pageSize:10}})},getMoreShelfBook:function(r){return e.ajax({url:a.apiPath+"/ajax/i/shelf",data:{sorts:0,page:r,pageSize:10}})}}});
//# sourceMappingURL=../../maps/wx/service/bookShelfAddService.js.map

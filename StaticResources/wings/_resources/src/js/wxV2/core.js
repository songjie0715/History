/**
 * Created by janey on 16/6/19.
 */

define(function(){
    var core = {};
    core.apiPath = window['API_PATH'] || '';
    core.wap_DOMAIN = window['wap_DOMAIN'] || '';
    core.website_DOMAIN = window['website_DOMAIN'] || '';
    return core;
});
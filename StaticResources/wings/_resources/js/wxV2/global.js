/**
 * Created by janey on 15/7/19.
 */


require.config({
    paths: {
        vue: '../../components/vue/dist/vue.min'
    }
});

require(['vue'],function(){

    if ('run' in window && typeof run == 'object' && Array.isArray(run)) {
        for(var i = 0; i < run.length; i++){
            run[i]();
        }
    }
});


//# sourceMappingURL=../maps/wxV2/main.js.map

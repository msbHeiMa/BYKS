define([
    'require',
    'vue',
    'systemConfig',
    'jQuery',
], function(require,Vue,config,$) {
    'use strict';
    var tableVm = new Vue({
        data:{

        }
    });
    return function(listEl){
        tableVm.$mount(listEl);
    }
});
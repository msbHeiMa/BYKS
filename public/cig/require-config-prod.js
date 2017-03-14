/* require config中的项暂时要用JSON格式，fis时暂时不支持写function */
requirejs.config({
    paths: {
        css: '/components/require-css/css',
        text: '/components/requirejs-plugins/lib/text',
        json: '/components/requirejs-plugins/src/json',
        jQuery: '/components/jquery-2.1.4/dist/jquery.min',
        jQueryAjaxFileUpload: '/cig/jquery.ajaxfileupload',
        chartJs:"/components/chart.js/dist/Chart.bundle.min",

        arbor:"/components/arbor/arbor",
        arborGraphics:"/components/arbor/arbor-graphics",

        echarts:"/components/echarts/dist/echarts.min",
        echartsExtDataTool:"/components/echarts/dist/extension/dataTool.min",
        echartsExtBmap:"/components/echarts/dist/extension/bmap.min",
        
        bootstrap:"/components/admin-lte/bootstrap/js/bootstrap.min",
        bootstrapDatePickerLang:"/components/admin-lte/plugins/datepicker/locales/bootstrap-datepicker.zh-CN",
        bootstrapDatePicker:"/components/admin-lte/plugins/datepicker/bootstrap-datepicker",
        systemConfig:'/zhzl/parent/js/config',
        cssBsTable:"/components/bootstrap-table/dist/bootstrap-table.min",
        cssBsDatePicker:"/components/admin-lte/plugins/datepicker/datepicker3",
        cssArea:"/cig/vue/vue-area/style",
        marked: "/components/marked/lib/marked",
        adminLteApp: "/components/admin-lte/dist/js/app.min",
        vueArbor:"/cig/vue/vue-arbor",
    },
    shim: {
        jQuery: {
            exports: "jQuery"
        },
        jQueryAjaxFileUpload:{
            deps:["jQuery"]
        },
        chartJs:{
            deps:["jQuery"]
        },
        echartsExtDataTool:{
            deps:["echarts"]
        },
        echartsExtBmap:{
            deps:["echarts","echartsExtDataTool"]
        },
        bootstrap: {
            deps: ["jQuery"]
        },
        bootstrapDatePicker: {
            deps: ["bootstrap"]
        },
        bootstrapDatePickerLang: {
            deps: ["bootstrapDatePicker"]
        },
        adminLteApp: {
            deps: ["bootstrap"]
        },
        arbor:{
            exports: "arbor",
            deps:["jQuery"]
        },
        arborGraphics:{
            deps:["arbor"]
        }
    }
});
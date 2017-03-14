/* require config中的项暂时要用JSON格式，fis时暂时不支持写function */
requirejs.config({
    paths: {
        css: '/components/require-css/css',
        text: '/components/requirejs-plugins/lib/text',
        json: '/components/requirejs-plugins/src/json',
        vue: '/components/vue/dist/vue',
        jQuery: '/components/jquery-2.1.4/dist/jquery.min',
        jQueryAjaxFileUpload: '/cig/jquery.ajaxfileupload',

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
        marked: "/components/marked/lib/marked",

        adminLteApp: "/components/admin-lte/dist/js/app.min",

        systemConfig: '/zhzl/parent/js/config',

        vueAlert: "/cig/vue/vue-alert",

        //components
        vueBsList:"/cig/vue/vue-bs-list/main",
        vueBsTable:"/cig/vue/vue-bs-table/main",
        vueBsTreeview:"/cig/vue/vue-bs-treeview/main",
        vueBsPop:"/cig/vue/vue-bs-pop/main",
        vueBsTab:"/cig/vue/vue-bs-tab",
        vueChart:"/cig/vue/vue-chart",
        vueArbor:"/cig/vue/vue-arbor",

        vuePopComponent:"/cig/vue/vue-popcomponent",
        vueTableFilter:"/cig/vue/vue-table-filter/main",
        vueJqTableFilter:"/cig/vue/vue-table-filter/jq",
        vueTable:"/cig/vue/vue-table",
        vueArea:"/cig/vue/vue-area/main",
        vueForm:"/cig/vue/vue-form/main",
        vueDomainPool:"/cig/vue/vue-domainpool",
        vueAttachment:"/cig/vue/vue-attachment/main",
        vueExcelImport:"/cig/vue/vue-excelImport/main",
        vueObjectSelector:"/cig/vue/vue-object-selector/main",
        vueDepMap:"/cig/vue/vue-depmap",

        //components's css
        cssBsTreeview:"/cig/vue/vue-bs-treeview/style",
        cssBsTable:"/components/bootstrap-table/dist/bootstrap-table.min",
        cssBsEditTable:"/cig/vue/vue-bs-table/style",
        cssBsDatePicker:"/components/admin-lte/plugins/datepicker/datepicker3",

        cssTableFilter:"/cig/vue/vue-table-filter/style",
        cssArea:"/cig/vue/vue-area/style",
        cssAttachment:"/cig/vue/vue-attachment/style",
        cssObjectSelector:"/cig/vue/vue-object-selector/style"
    },
    shim: {
        jQuery: {
            exports: "jQuery"
        },
        jQueryAjaxFileUpload: {
            deps: ["jQuery"]
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
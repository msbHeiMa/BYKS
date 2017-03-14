define([
    'require',
    'vue',
    'jQuery',
    'vueDomainPool',
    'vueBsTable',
], function(require, Vue, $ , domainPool) {
    'use strict';
    Vue.component("cig-table",{
        props:["columns","ajaxOptions","config","pageSize","loadingMessage"],
        template:'<bs-table ref="table"\
                :config="config"\
                :columns="columns"\
                :loading="loading"\
                :rows="rows"\
                :loading-message="loadingMessage"\
                :pager="pager"\
                @selectchange="selectChange"\
                @pagerchange="loadRows">\
            </bs-table>',
        data:function(){
            return {
                loading:true,
                rows:[],
                pager:{
                    total:0,
                    page:1,
                    size: this.pageSize || 10
                },
                ajax:null
            }
        },
        mounted:function(){
            this.loadRows();
        },
        watch:{
            ajaxOptions:function(){
                this.pager = {
                    total:0,
                    page:1,
                    size: this.pageSize || 10
                };
                this.loadRows();
            }
        },
        methods:{
            selectChange:function () {
                this.$emit("selectchange");
            },
            loadRows:function(){
                var isValidOption = false;
                if(this.ajaxOptions){
                    isValidOption = false;
                    for (var key in this.ajaxOptions) {
                        if (this.ajaxOptions.hasOwnProperty(key)) {
                            isValidOption = true;
                            break;                            
                        }
                    }
                }
                if(!isValidOption){
                    return;
                }
                if(this.ajax){
                    this.ajax.abort();
                }
                var ajaxOptions = $.extend({},this.ajaxOptions);
                ajaxOptions.url = mixUrl(ajaxOptions.url,{
                    offset:(this.pager.page - 1) * this.pager.size,
                    limit:this.pager.size
                });
                ajaxOptions.success = this.getRowsSuccess.bind(this);
                ajaxOptions.error = this.getRowsError.bind(this);
                this.loading = true;
                this.ajax = $.ajax(ajaxOptions);
                function mixUrl(url,param){
                    var rquery = ( /\?/ );
                    return url + (rquery.test(url) ? "&" : "?") + $.param(param);
                }
            },
            getRowsSuccess:function(res){
                this.loading = false;
                this.ajax = null;
                if(res.success && res.data){
                    this.$set(this,"rows",res.data.rows);
                    this.$set(this.pager,"total",res.data.total);
                    // this.rows = res.data.rows;
                    // this.pager.total = res.data.total;
                }
                else{
                    this.getRowsError();
                }
            },
            getRowsError:function(){
                this.loading = false;
                this.ajax = null;
                this.$set(this,"rows",[]);
                this.$set(this.pager,"total",0);
                this.$set(this.pager,"page",1);
                // this.rows = [];
                // this.pager.total = 0;
                // this.pager.page = 1;
            }
        },
        computed:{
            checkList:function () {
                return this.$refs.table.checkList;
            }
        }
    });
    var helper = {
        getDomainDisplayComponent:function(field,domainName){
            return {
                props:['row'],
                mixins:[
                    helper.getDomainMixin(domainName)
                ],
                template:"<span>{{text}}</span>",
                computed:{
                    text:function(){
                        var value = this.row[field];
                        return domainPool.getTextByValue(this.domain,value);
                    }
                }
            }
        },
        getDomainMixin:function(domainName){
            return {
                data:function(){
                    var domains = domainPool.getDomainOptions([domainName]);
                    return {
                        domain:domains[domainName],
                    }
                }
            }
        }
    };
    return {
        helper:helper
    };
});
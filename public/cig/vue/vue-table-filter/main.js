define([
    'require',
    'vue',
    'jQuery',
    'vueDomainPool',
    'vueBsList',
    'css!cssTableFilter'
], function(require, Vue, $, domainPool) {
    'use strict';
    /**
     * 通用查询条件，按照filters的设置进行
     * props:
     *  filters {name:"gender",text:"性别",all:true,type:"options",options:[{text:"男",value:"01"}]}
     *      type="options", options:[{text:"",value:""}]
     *      type="domain", all:true, domainName:"",options:[] //options = [] 必须写，后面会自动获取并填充
     *      type="custom", data:{}, component:"<input v-model='valueProxy' :value='valueProxy' :data='filter'>" //用data属性接收filter,用model双向绑定选中值
     *  value
     * events:
     *  valueChange
     */
    var tmpOptionsComponent = {
        props:["data","value"],
        data:function(){
            var allItem = this.data.allItem || {text:'全部',value:''};
            var valueProxy = this.value;
            if(this.data.multi === true){
                if(this.value == allItem.value && !(this.value && this.value.constructor == Array)){
                    valueProxy = this.data.options.map(function(option){
                        return option.value;
                    });
                }
            };
            return {
                itemComponent:{
                    template:'<a>{{item.text}}</a>',
                },
                valueProxy: valueProxy,
                allItem: allItem,
            }
        },
        watch:{
            value:function(){
                if(this.multi){
                    if($.isArray(this.value)){
                        this.valueProxy = this.value;
                    }
                    else if(this.value == this.allItem.value){
                        this.valueProxy = this.data.options.map(function(option){
                            return option.value;
                        });
                    }
                }
                else{
                    this.valueProxy = this.value;
                }
            },
            "data.options":function(){
                if(this.multi){
                    if(this.value == this.allItem.value && !(this.value && this.value.constructor == Array)){
                        this.valueProxy = this.data.options.map(function(option){
                            return option.value;
                        });
                    }
                }
            }
        },
        template:'<div :class="{clearfix:true, \'table-filter-options\':true, \'table-filter-options-multi\':multi}">\
            <ul v-if="data.all">\
                <li v-if="multi" :class="{active:selectAllMulti}">\
                    <div class="checkbox">\
                        <label>\
                            <input type="checkbox" v-model="selectAllMulti"/>\
                            <a >{{allItem.text}}</a>\
                        </label>\
                    </div>\
                </li>\
                <li v-if="!multi" :class="{active:selectAll}">\
                    <a href="javascript:;" @click="clickAll">{{allItem.text}}</a>\
                </li>\
            </ul>\
            <bs-list \
                v-model="valueProxy" \
                @input="input" \
                panel="ul"\
                value-path="value"\
                item-class=""\
                :multi="multi"\
                :data="data.options"\
                :item-component="itemComponent"\
                ></bs-list>\
            </div>',
        methods:{
            clickAll:function(){
                this.valueProxy = this.allItem.value;
                this.$emit("input",this.valueProxy);
            },
            input:function(){
                if(this.multi){
                    if(this.selectAllMulti){
                        this.$emit("input",this.allItem.value);
                    }
                    else{
                        this.$emit("input",this.valueProxy);
                    }
                }
                else{
                    this.$emit("input",this.valueProxy);
                }
            }
        },
        computed:{
            selectAllMulti:{
                get:function(){
                    return (this.valueProxy && this.valueProxy.length == this.data.options.length);
                },
                set:function(val){
                    if(val){
                        this.valueProxy = this.data.options.map(function(option){
                            return option.value;
                        });
                        this.$emit("input",this.allItem.value);
                    }
                    else{
                        this.valueProxy = [];
                        this.$emit("input",this.valueProxy);
                    }
                }
            },
            selectAll:function(){
                return this.value == this.allItem.value;
            },
            multi:function(){
                // return false;
                return this.data && this.data.multi === true;
            }
        }
    };
    Vue.component("cig-table-filter",{
        props:{
            filters:{
                type:Array,
                default:[]
            },
            value:{
            },
            domainAjaxOptions:{
                default:false
            }
        },
        template:'<div :class="[{\'table-filter\':true}]">\
                <template v-for="(filter,index) in filters">\
                    <div class="sl-wrap">\
                        <div class="sl-key"><span>{{filter.text}}</span></div>\
                        <div class="sl-value">\
                            <div :class="{\'sl-v-list\':filter.type != \'custom\'}">\
                                <span :is="getFilterComponentName(filter,index)" \
                                    :ref="filter.name"\
                                    v-model="valueProxy[filter.name]" \
                                    :value="valueProxy[filter.name]" \
                                    @input="input"\
                                    :data="filter"></span>\
                            </div>\
                        </div>\
                    </div>\
                </template>\
            </div>',
        components:{
            tmpOptions:tmpOptionsComponent
        },
        data:function(){
            return {
                valueProxy:this.value
            }
        },
        watch:{
            value:function(val){
                this.valueProxy = val;
            }
        },
        beforeCreate:function(){
            var filters = this.$options.propsData.filters;
            var getFilterComponentName = this.$options.methods.getFilterComponentName.bind(this);
            filters.forEach(function(filter,index) {
                if(filter.type == "custom"){
                    var name = getFilterComponentName(filter,index);
                    var customComponent = filter.component;
                    var tempComponent;
                    switch(typeof(customComponent)){
                        case"string":
                            tempComponent = {
                                template:customComponent,
                                props:["data","value"],
                                data:function(){
                                    return {
                                        valueProxy:this.value
                                    }
                                },
                                watch:{
                                    value:function(){
                                        this.valueProxy = this.value;
                                    }   
                                },
                                methods:{
                                    "input":function(){
                                        if(this.value != this.valueProxy){
                                            this.$emit("input",this.valueProxy);
                                        }
                                    }
                                }
                            };
                            break;
                        case"object":
                        default:
                            tempComponent = customComponent;
                            break
                    }
                    this.$options.components[name] = tempComponent;
                }
                else if(filter.type == "domain"){
                    this.$set(filter,"options",[]);
                }
            }, this);
        },
        mounted:function(){
            var filters1 = this.filters.filter(function(filter){
                return filter.type == "domain";
            });
            if(filters1.length > 0) {
                var domainNames = filters1.map(function(filter){return filter.domainName});
                var isValidOptions = typeof(this.domainAjaxOptions) == "object";
                if(isValidOptions){
                    isValidOptions = false;
                    for (var key in this.domainAjaxOptions) {
                        if (this.domainAjaxOptions.hasOwnProperty(key)) {
                            isValidOptions = true;
                            break;
                        }
                    }
                }
                if(!isValidOptions){
                    var data = domainPool.getDomainOptions(domainNames);
                    filters1.forEach(function(filter){
                        if(data[filter.domainName]){
                            this.$set(filter,"options",data[filter.domainName]);
                        }
                    },this);
                }
                else{
                    var ajaxOptions = $.extend({},this.domainAjaxOptions);
                    ajaxOptions.data = $.extend({
                        domainNames:domainNames.join(",")
                    },ajaxOptions.data);
                    ajaxOptions.success = this.getDomainsOptionsSuccess.bind(this,filters1);
                    ajaxOptions.error = this.getDomainsOptionsError.bind(this,filters1);
                    $.ajax(ajaxOptions);
                }
            }
        },
        methods:{
            getDomainsOptionsSuccess:function(filters,res){
                if(res.success){
                    var data = res.data;
                    filters.forEach(function(filter){
                        if(data[filter.domainName]){
                            this.$set(filter,"options",data[filter.domainName]);
                        }
                    },this);
                }
                else{
                    this.getDomainsOptionsError(filters);
                }
            },
            getDomainsOptionsError:function(filters,res){
            },
            getFilterComponentName:function(filter,index){
                switch(filter.type){
                    case "options":
                        return "tmpOptions";
                    case "domain":
                        return "tmpOptions";
                }
                return "tmp"+this._uid+"_"+index;
            },
            input:function(){
                this.$emit("input",this.valueProxy);
            }
        }
    })
});
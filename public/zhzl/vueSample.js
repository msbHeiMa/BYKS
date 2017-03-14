define([
    'require',
    'vue',
    'vueForm',
    'css!cssBsTreeview',
    'vueBsTable',
    'vueTableFilter',
    'vueDepMap'
], function(require, Vue,form) {
    'use strict';

    // requirejs([""],function(){

    // })

    var vm1 = new Vue({
        el: '#main',
        data: {
            message: 'Hello'
        },
        computed: {
            // a computed getter
            reversedMessage: function () {
            // `this` points to the vm instance
                return this.message.split('').reverse().join('')
            }
        }
    });
    function randomData() {
        return Math.round(Math.random()*1000);
    }
    setTimeout(function(){
        vmTest.mapName = "system:province/fujian";
    },10000);
    var vmTest = new Vue({
        el:"#test",
        data:{
            map:"system:province/zhejiang",
            /**
             * col1.group = "合并"
             * col2.group = "合并"
             * col3.group = ["合并","子表头"]
             * col4.group = null
             * col5.group = ["合并","子表头"]
             * col6.group = ["合并",null]
             * col7.group = "合并"
             */
            columns:[
                {title:"身份证号码1",field:"c1",align:"center",valign:"middle",visible:true,
                    group:"合并"
                },
                {title:"身份证号码2",field:"c2",align:"center",valign:"middle",visible:true,
                    group:"合并"
                },
                {title:"身份证号码3",field:"c3",align:"center",valign:"middle",visible:true,
                    group:["合并","子表头"]
                },
                {title:"身份证号码4",field:"c4",align:"center",valign:"middle",visible:true,
                    group:""
                },
                {title:"身份证号码5",field:"c5",align:"center",valign:"middle",visible:true,
                    group:["合并","子表头"]
                },
                {title:"身份证号码6",field:"c6",align:"center",valign:"middle",visible:true,
                    group:["合并",null]
                },
                {title:"身份证号码7",field:"c7",align:"center",valign:"middle",visible:true,
                    group:["合并"]
                },
            ],
            columns2:[
                {title:"身份证号码1",field:"c1",align:"center",valign:"middle",visible:true,
                },
                {title:"身份证号码2",field:"c2",align:"center",valign:"middle",visible:true,
                },
                {title:"身份证号码3",field:"c3",align:"center",valign:"middle",visible:true,
                },
                {title:"身份证号码4",field:"c4",align:"center",valign:"middle",visible:true,
                },
                {title:"身份证号码5",field:"c5",align:"center",valign:"middle",visible:true,
                },
                {title:"身份证号码6",field:"c6",align:"center",valign:"middle",visible:true,
                },
                {title:"身份证号码7",field:"c7",align:"center",valign:"middle",visible:true,
                },
            ],
            filters:[
                {name:"a",text:"b",type:"options",all:true,options:[
                    // {value:"aa",text:"abbbbbbabb"},
                    // {value:"a1",text:"abbbbbb1bb"},
                    // {value:"a2",text:"abbbbbb2bb"},
                    // {value:"a3",text:"abbbbbb3bb"},
                    // {value:"a4",text:"abbbbbb4bb"},
                    // {value:"a5",text:"abbbbbb5bb"},
                    // {value:"a6",text:"abbbbbb6bb"},
                    // {value:"a7",text:"abbbbbb7bb"},
                    // {value:"a8",text:"abbbbbb8bb"},
                    // {value:"a9",text:"abbbbbb9bb"},
                    // {value:"a0",text:"abbbbbb0bb"},
                    {value:"b",text:"b"},
                    {value:"c",text:"c"}
                    ]
                    ,multi:true}  
            ],
            filter:{a:""},
            list:[
                "abc",
                "def",
                "ggg",
            ],
            fields:[
                {name:"a",label:"字段a",type:"text",colSpan:1},
                {name:"b",label:"字段b",type:"text",colSpan:2},
                {name:"c",label:"字段c",type:"text",colSpan:1},
                {name:"d",label:"字段d",type:"text",colSpan:2},
                {name:"e",label:"字段e",type:"text",colSpan:1},
                {name:"f",label:"字段f",type:"text",colSpan:1},
                {name:"g",label:"字段g",type:"text",colSpan:2},
                {name:"h",label:"字段h",type:"text",colSpan:2},
            ],
            data:{
                a:"1",
                b:"2",
                c:"3",
                d:"4",
                e:"4",
                f:"4",
                g:"4",
                h:"4",
            },
            render:form.renders.groupRender.bind(null,[
                {title:"哈哈",fields:['a','b','c']},
                {title:"哈哈2",fields:['d','e','f']},
                {title:"哈哈3",fields:['g','h']},
            ],form.renders.table2Render)
        }
    })

    var componentButton = Vue.component('t-bs-button', {
        props: {
            'name':String,'disabled':Boolean,
            'baseClass':{type:String,default:"btn"},
            'disableClass':{type:String,default:"disabled"},
            'enableClass':{type:String,default:""},
        },
        // 选项
        template: '\<button \
                    :class="[baseClass, disabled ? disableClass : enableClass]" \
                    :disabled="disabled" \
                    @click="click">{{name}}</button>',
        data:function(){
            return {
            }
        },
        methods:{
            click:function(){
                this.$emit('click');
            }
        }
    });

    var componentToolbar = Vue.component('t-bs-toolbar', {
        props: ['btns'],
        // 选项
        template: '\
            <div>\
                <t-bs-button v-for="btn in btns" \
                    :name="btn.name" \
                    :disabled="btn.disabled" \
                    :baseClass="btn.baseClass" \
                    :disableClass="btn.disableClass" \
                    :enableClass="btn.enableClass" \
                    @click="btn.click"></t-bs-button>\
            </div>'
    });

    var componentTable = Vue.component('t-bs-table',{
        props:{
            loadingMessage:{
                type:String,
                default:"正在努力地加载数据中，请稍候……"
            },
            loading:Boolean,
            rows: {
                type: Array,
                default: function () {
                    return []
                }
            },
            clickCell:Object,
            columns: {
                type: Array,
                default: function () {
                    return []
                }
            },
            config: {
                type: Object,
                default: function () {
                    return {}
                }
            },
            pager: Object,
        },
        template:'\
        <div class="fixed-table-container">\
            <div class="fixed-table-body">\
                <div v-if="loading" class="fixed-table-loading">{{loadingMessage}}</div>\
                <table v-if="!loading" class="table table-hover table-striped">\
                    <thead>\
                        <tr role="row">\
                            <th class="bs-checkbox" \
                                v-if="!!config.checkbox" \
                                style="text-align: center; vertical-align: middle; width: 36px;"\
                                >\
                                <div class="th-inner">\
                                    <input type="checkbox" v-model="checkAll" />\
                                </div>\
                            </th>\
                            <template v-for="col in columns" >\
                                <th :style=\'{"text-align": col.align,"vertical-align":col.valign}\'\
                                    v-show="col.visible">\
                                    <div class="th-inner">\
                                        {{col.title}}\
                                    </div>\
                                    <div class="fht-cell">\
                                    </div>\
                                </th>\
                            </template>\
                        </tr>\
                    </thead>\
                    <tbody>\
                        <tr v-for="(row, index) in rows">\
                            <td style="text-align: center;" class="bs-checkbox" v-if="!!config.checkbox">\
                                <input type="checkbox" v-model="checkList" :value="row" class="checkbox" />\
                            </td>\
                            <template v-for="col in columns" >\
                                <td :style=\'{"text-align": col.align,"vertical-align":col.valign}\'\
                                    v-show="col.visible"\
                                    @click="cellClick(col,row)"\
                                    >\
                                    <template v-if="!col.component">\
                                        {{row[col.field]}}\
                                    </template>\
                                    <template v-else>\
                                        <span :is="getComponentName(col)" :row="row"></span>\
                                    </template>\
                                </td>\
                            </template>\
                        </tr>\
                        <tr class="no-records-found" v-if="rows.length === 0">\
                            <td colspan="999" class="text-center">没有找到匹配的记录</td>\
                        </tr>\
                    </tbody>\
                </table>\
            </div>\
            <pager v-if="pager" :pager="pager" @pagerChange="pagerChange"></pager>\
        </div>',
        components:{
            "pager":{
                template:'\
                    <div class="fixed-table-pagination" style="display: block;height:56px;">\
                        <div class="pull-left pagination-detail">\
                            <span class="pagination-info">显示第 {{rowStart}} 到第 {{rowEnd}} 条记录，总共 {{pager.total}} 条记录</span>\
                            <span class="page-list">每页显示 \
                                <span class="btn-group dropup">\
                                    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">\
                                        <span class="page-size">{{pager.size}}</span><span class="caret"></span>\
                                    </button>\
                                    <ul class="dropdown-menu" role="menu">\
                                        <li class="active"><a href="javascript:void(0)">10</a></li>\
                                        <li><a href="javascript:void(0)">25</a></li>\
                                        <li><a href="javascript:void(0)">50</a></li>\
                                        <li><a href="javascript:void(0)">100</a></li>\
                                    </ul>\
                                </span> 条记录\
                            </span>\
                        </div>\
                        <div class="pull-right pagination">\
                            <ul class="pagination">\
                                <li :class=\'{disabled:!pagerInfo.hasPre,"page-pre":true}\'><a href="javascript:void(0)" @click="pagerInfo.hasPre && pageJump(pager.page-1)">‹</a></li>\
                                <li v-show="pagerInfo.hasFirst" class="page-number"><a href="javascript:void(0)" @click="pageJump(1)">1</a></li>\
                                <li v-show="pagerInfo.hasPreSeparator" class="page-last-separator disabled"><a href="javascript:void(0)">...</a></li>\
                                <li v-for="page in pagerInfo.prePages" class="page-number"><a href="javascript:void(0)" @click="pageJump(page)">{{page}}</a></li>\
                                <li class="page-number active"><a href="javascript:void(0)">{{pager.page}}</a></li>\
                                <li v-for="page in pagerInfo.nextPages" class="page-number"><a href="javascript:void(0)" @click="pageJump(page)">{{page}}</a></li>\
                                <li v-show="pagerInfo.hasNextSeparator" class="page-last-separator disabled"><a href="javascript:void(0)">...</a></li>\
                                <li v-show="pagerInfo.hasLast" class="page-last"><a href="javascript:void(0)" @click="pageJump(pagerInfo.totalPages)">{{pagerInfo.totalPages}}</a></li>\
                                <li :class=\'{disabled:!pagerInfo.hasNext,"page-next":true}\'><a href="javascript:void(0)" @click="pagerInfo.hasNext && pageJump(pager.page+1)">›</a></li>\
                            </ul>\
                        </div>\
                    </div>',
                props:["pager"],
                beforeCreate:function(){
                    var pager = this.$options.propsData.pager;
                    if(!pager){
                        pager = {total:0,size:10};
                        this.$options.propsData.pager = pager;
                    }
                    if(pager.total<0)pager.total = 0;
                    if(pager.size <= 0)pager.size = 10;
                    var totalPages = Math.ceil(pager.total / pager.size);
                    totalPages = totalPages < 1 ? 1 : totalPages;
                    if(pager.page > totalPages){
                        pager.page = totalPages;
                    }
                    else if (pager.page < 1){
                        pager.page = 1;
                    }
                },
                computed:{
                    //pager
                    rowStart:function(){
                        return (this.pager.page - 1) * this.pager.size + 1;
                    },
                    rowEnd:function(){
                        var rowEnd = (this.pager.page) * this.pager.size;
                        rowEnd = rowEnd > this.pager.total ? this.pager.total : rowEnd;
                        return rowEnd;
                    },
                    pagerInfo:function(){
                        var totalPages = Math.ceil(this.pager.total / this.pager.size);
                        totalPages = totalPages < 1 ? 1 : totalPages;
                        var hasPre,
                            hasFirst,
                            hasPreSeparator,
                            prePages=[],nextPages=[],
                            hasNextSeparator,
                            hasLast,
                            hasNext;
                        var from,to,i;
                        hasPre = this.pager.page > 1;
                        if (totalPages < 5) {
                            from = 1;
                            to = totalPages;
                        } else {
                            from = this.pager.page - 2;
                            to = from + 4;
                            if (from < 1) {
                                from = 1;
                                to = 5;
                            }
                            if (to > totalPages) {
                                to = totalPages;
                                from = to - 4;
                            }
                        }

                        if (totalPages >= 6) {
                            if (this.pager.page >= 3) {
                                hasFirst = true;
                                from++;
                            }

                            if (this.pager.page >= 4) {
                                if (this.pager.page == 4 || totalPages == 6 || totalPages == 7) {
                                    from--;
                                } else {
                                    hasPreSeparator = true;
                                }
                                to--;
                            }
                        }

                        if (totalPages >= 7) {
                            if (this.pager.page >= (totalPages - 2)) {
                                from--;
                            }
                        }

                        if (totalPages == 6) {
                            if (this.pager.page >= (totalPages - 2)) {
                                to++;
                            }
                        } else if (totalPages >= 7) {
                            if (totalPages == 7 || this.pager.page >= (totalPages - 3)) {
                                to++;
                            }
                        }

                        for (i = from; i <= to; i++) {
                            if(i < this.pager.page){
                                prePages.push(i);
                            }
                            else if(i> this.pager.page){
                                nextPages.push(i);
                            }
                        }

                        if (totalPages >= 8) {
                            if (this.pager.page <= (totalPages - 4)) {
                                hasNextSeparator = true;
                            }
                        }

                        if (totalPages >= 6) {
                            if (this.pager.page <= (totalPages - 3)) {
                                hasLast = totalPages === this.pager.page ? false : true;
                            }
                        }
                        hasNext = totalPages > this.pager.page;
                        return {
                            hasPre:hasPre,
                            hasFirst:hasFirst,
                            hasPreSeparator:hasPreSeparator,
                            prePages:prePages,nextPages:nextPages,
                            hasNextSeparator:hasNextSeparator,
                            hasLast:hasLast,
                            hasNext:hasNext,
                            totalPages:totalPages
                        }
                    },
                },
                methods:{
                    pageJump:function(page){
                        this.pager.page = page;
                        this.$emit("pagerChange");
                    }
                }
            }
        },
        data:function(){
            return {
                checkList: [],
                sort: {
                },
            }
        },
        computed:{
            //check
            checkAll:{
                set:function(value){
                    if(value){
                        this.checkList = [].concat(this.rows);
                    }
                    else{
                        this.checkList = [];
                    }
                },
                get:function(){
                    return (this.rows && this.rows.length) ? this.checkList.length == this.rows.length : false;
                }
            }
        },
        methods:{
            cellClick:function(column,row){
                this.$options.propsData.clickCell = {column:column,row:row};
                this.$emit("cellClick");
            },
            getComponentName:function(column){
                return "tmp"+this._uid+"_"+column.field;
            },
            pagerChange:function(){
                this.$emit("pagerChange");
            }
        },
        beforeCreate:function(){
            var columns = this.$options.propsData.columns;
            if(columns){
                columns.forEach(function(column) {
                    if(column.component){
                        var name = "tmp"+this._uid+"_"+column.field;
                        var tempComponent;
                        switch(typeof(column.component)){
                            case"string":
                                tempComponent= {
                                    template:column.component,
                                    props:["row"]
                                };
                                break;
                            case"object":
                            default:
                                tempComponent = column.component;
                                tempComponent.props = ['row'];
                                break
                        }
                        this.$options.components[name] =  tempComponent
                    }
                }, this);
            }
        },
        created:function(){
        },
        updated:function(){
        },
        destroyed:function(){
        }
    });

    var componentListGroup = Vue.component('t-bs-list-group',{
        props:{
            data:{
                type:Array,
                default:[
                ]
            },
            itemComponent:{
                default:"<li>{{item}}</li>"
            },
            panel:{
                default:"ul"
            }
        },
        template:'<span :is="panel">\
                <template v-for="item in data">\
                    <span :is="getComponentName()" :item="item"></span>\
                </template>\
            </span>',
        beforeCreate:function(){
            var itemComponent = this.$options.propsData.itemComponent;
            if(!itemComponent){
                itemComponent = "<li>{{item}}</li>";
            }
            var name = "tmp"+this._uid;
            var tempComponent;
            switch(typeof(itemComponent)){
                case"string":
                    tempComponent= {
                        template:itemComponent,
                        props:["item"]
                    };
                    break;
                case"object":
                default:
                    tempComponent = itemComponent;
                    tempComponent.props = ['item'];
                    break
            }
            this.$options.components[name] =  tempComponent
        },
        methods:{
            getComponentName:function(){
                return "tmp"+this._uid;
            }
        }
    });

    //   <link rel="stylesheet" href="/cig/vue/vue-treeview/vue-treeview.css" />
    var componentTree = Vue.component("t-bs-tree",{
        props:{
            data:{
                type:Array,
                default:[
                ]
            },
            nodeComponent:{
                default:"<span>{{item}}</span>"
            },
            nodesPath:{
                type:String,
                default:"nodes"
            }
        },
        data:function(){
            return {
                value:null
            };
        },
        render:function(createElement){
            var self = this;
            function renderNode(node,parent,level){
                var indents = [];
                for(var i =0;i<level;i++){
                    indents.push(createElement("span",{class:{"indent":true}}));
                }
                var hasNodes = node[self.nodesPath] && node[self.nodesPath].length > 0;
                var res = [
                    createElement('li',
                        {
                            domProps:{
                                style:{
                                    color:"#FFFFFF","background-color":"black"
                                }
                            },
                            class:{
                                "list-group-item":true,
                                "node-tree":true,
                                "node-selected":node == self.value
                            },
                            on:{
                                click:function($event){
                                    self.selectNode(node);
                                }
                            }
                        },
                        indents.concat(
                            [
                                createElement("span",{
                                    class:{
                                        "icon":true,
                                        "expand-icon":hasNodes,
                                        "glyphicon":true,
                                        "glyphicon-minus":hasNodes && node.expand,
                                        "glyphicon-plus":hasNodes && !node.expand
                                    },
                                    on:{
                                        click:function($event){
                                            $event.stopPropagation();
                                            self.nodeExpand(node);
                                        }
                                    }
                                }),
                                createElement("span",{class:{"icon":true,"node-icon":true}}),
                                createElement(self.getComponentName(),{props:{item:node}})
                            ]
                        )
                    )
                ];
                return res.concat(
                    node.expand ?
                        renderNodes(node[self.nodesPath],node,level+1)
                    :[]
                );
            }
            function renderNodes(nodes,parent,level){
                var res = [];
                if(nodes){
                    nodes.forEach(function(node){
                        res = res.concat(renderNode(node,parent,level));
                    });
                }
                return res;
            }
            var elements = this.data ? renderNodes(this.data,null,0) : [];
            return createElement("div",{
                class:{
                    "treeview":true
                }
            },[
                createElement("ul",{
                    class:{
                        "list-group":true
                    }
                },elements)
            ]);
        },
        beforeCreate:function(){
            var data = this.$options.propsData.data;
            var nodesPath = this.$options.propsData.nodesPath;
            function defaultNode(node){
                if(typeof(node.expand) == "undefined"){
                    node.expand = false;
                }
                if(node[nodesPath]){
                    node[nodesPath].forEach(defaultNode);
                }
            }
            if(data)data.forEach(defaultNode);
            var nodeComponent = this.$options.propsData.nodeComponent;
            if(!nodeComponent){
                nodeComponent = "<li>{{item}}</li>";
            }
            var name = "tmp"+this._uid;
            var tempComponent;
            switch(typeof(nodeComponent)){
                case"string":
                    tempComponent= {
                        template:nodeComponent,
                        props:["item"]
                    };
                    break;
                case"object":
                default:
                    tempComponent = nodeComponent;
                    tempComponent.props = ['item'];
                    break
            }
            this.$options.components[name] =  tempComponent
        },
        methods:{
            getComponentName:function(){
                return "tmp"+this._uid;
            },
            nodeExpand:function(node){
                node.expand = !node.expand;
            },
            selectNode:function(node){
                this.value = node;
                this.$emit('input', node);
            }
        }
    });

    var componentForm = Vue.component('t-bs-form',{
        template:'<form><slot name="form-body"></slot></form>',
        data:function(){
            return {
            };
        }
    });

    var cmd = {
        enableClass:"btn-danger",
        disabled:false,
        name:"删除",
        click:function(){
            alert(1);
        }
    };
    var vmTableLayout = new Vue({
        el:"#tableLayout",
        data:{
            btns:[
                cmd
            ],
            keyword:"",
            table:{
                config:{
                    checkbox:true
                },
                columns:[
                    {
                        title: '学校名称',
                        field: 'schoolName',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '安全负责人/联系方式',
                        field: 'manager',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: '<input v-model="row.manager">',
                    },
                    {
                        title: '是否关注',
                        field: 'isFocus',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                        component: {
                            template:'<input type="checkbox" v-model="row.isFocus" @change="change"></checkbox>',
                            methods:{
                                "change":function(){
                                    var row = this.$options.propsData.row;
                                    alert("changed:"+row.manager+","+row.isFocus);
                                }
                            }
                        },
                    },
                    {
                        title: '警示范围（米）',
                        field: 'safetyRange',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '所属乡镇',
                        field: 'areaName',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    },
                    {
                        title: '操作',
                        field: 'operate',
                        align: 'center',
                        valign: 'middle',
                        visible: true,
                    }
                ],
                rows:[
                    {
                        schoolName:"1",
                        manager:"2",
                        isFocus:true,
                        safetyRange:"4",
                        areaName:"5",
                        operate:"6",
                    },
                    {
                        schoolName:"2",
                        manager:"4",
                        isFocus:false,
                        safetyRange:"666",
                        areaName:"777",
                        operate:"aaa",
                    }
                ],
                loading:false,
                pager:{
                    total:41,
                    size:10,
                    page:2
                }
            }
        },
        methods:{
            doSearch:function(){
                alert(this.keyword);
            }
        }
    })
    var vmForm = new Vue({
        el:"#form",
        data:{
            form:{
                data:{
                    name:"aaa",
                    age:10,
                    gender:'01'
                },
                serchResult:{}
            }
        },
        methods:{
            findPerson:function(){
                var self = this;
                // $.get("",function(){
                //     self.form.serchResult = {
                //         cardNum:"123",
                //         birthDate:"2001-12-01",
                //         gender:'01'
                //     };
                // });
                setTimeout(function(){
                    self.form.serchResult = {
                        cardNum:"123",
                        birthDate:"2001-12-01",
                        gender:'01'
                    }
                })
            }
        }
    });
    var vmTree = new Vue({
        el:"#tree",
        data:{
            list:["a","b","c"],
            tree:[
                {
                    id:1,
                    name:"test",
                    expand:false,
                    nodes:[
                        {
                            id:3,
                            name:"test2",
                            expand:false,
                            nodes:[

                            ]
                        },
                        {
                            id:2,
                            name:"test3",
                            expand:false,
                            nodes:[

                            ]
                        }
                    ]
                },
                {
                    id:11,
                    name:"test11",
                    expand:false,
                    nodes:[
                        {
                            id:13,
                            name:"test112",
                            expand:false,
                            nodes:[

                            ]
                        },
                        {
                            id:12,
                            name:"test113",
                            expand:false,
                            nodes:[

                            ]
                        }
                    ]
                },
                {
                    id:1122,
                    name:"test11222",
                    expand:false,
                    nodes:[
                        {
                            id:1322,
                            name:"test112222",
                            expand:false,
                            nodes:[
                                {
                                    id:1322111,
                                    name:"test112222222",
                                    expand:false,
                                    nodes:[

                                    ]
                                },
                                {
                                    id:1222222,
                                    name:"test113222222",
                                    expand:false,
                                    nodes:[

                                    ]
                                }
                            ]
                        },
                        {
                            id:1222,
                            name:"test113222",
                            expand:false,
                            nodes:[

                            ]
                        }
                    ]
                },
                {
                    id:111,
                    name:"test22",
                    expand:false,
                    nodes:[
                    ]
                }
            ],
            treeSelect:null
        },
        methods:{
            alertSelect:function(){
                if(this.treeSelect){
                    alert(this.treeSelect.name);
                }
            }
        }
    })
});
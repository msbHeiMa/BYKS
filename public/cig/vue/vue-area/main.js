define([
    'require',
    'vue',
    'jQuery',
    'vuePopComponent',
    'css!cssArea'
], function(require, Vue, $, popComponent) {
    'use strict';
    Vue.component("cig-area",{
        mixins:[popComponent],
        props:{
            data:{
                type:Array,
                default:function(){
                    return [
                    ]
                }
            },
            valuePath:{
                default:""
            },
            loading:{
                default:false
            },
            value:{},
            namePath:{
                default:""
            },
            nodeComponent:{
                default:"<span>{{item}}</span>"
            },
            nodesPath:{
                type:String,
                default:"nodes"
            },
            emptyText:{
                type:String,
                default:"请选择",
            }
        },
        data:function(){
            return {
                valueProxy:this.value,
                tabNodes:[],
                selectedNodes:[],
                selectedNode:null,
                tabLevel:0,
                isopen:false,
            };
        },
        
        template:'\
        <div :class="[{hover:isopen},\'store-selector\']" :style="[isopen?{}:{\'z-index\':0}]">\
           <div class="text" @click="openPop()" :title="displayName">{{displayName || emptyText}}<b></b></div>\
           <div class="content">\
             <div class="m area-pop">\
               <div class="mt">\
                 <ul class="tab">\
                    <template v-for="(node,index) in selectedNodes">\
                        <li :class="[{\'curr\':!hasChildren(selectedNode) && selectedNode == node}]">\
                            <a href="javascript:;" @click="reselect(index)"><span>{{getName(node)}}</span><i></i></a>\
                        </li>\
                    </template>\
                    <li class="curr" v-if="!selectedNode || hasChildren(selectedNode)">\
                        <a href="javascript:;" @click="selectFolderNode()"><span>请选择</span><i></i></a>\
                    </li>\
                 </ul>\
                 <div class="stock-line"></div>\
               </div>\
               <div class="mc">\
                 <ul class="area-list">\
                   <template v-for="(node,index) in tabNodes">\
                        <li><a href="javascript:;" @click="expandNode(node)"><span :is="getComponentName()" :item="node"></span></a></li>\
                   </template>\
                 </ul> \
               </div>\
             </div>\
             <div class="all"><a @click="selectAll()">确定</a></div>\
           </div>\
           <div class="close" @click="closePop()"></div>\
         </div>',
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
            this.$options.components[name] =  tempComponent;
        },
        watch:{
            "data":function(){
                this.update();
            },
            "value":function(newVal){
                if(newVal != this.valueProxy){
                    this.valueProxy = newVal;
                    this.update();
                }
            }
        },
        mounted:function(){
            this.update();
        },
        computed:{
            displayName:function(){
                return this.selectedNodes.map(function(node){return this.getName(node)},this).join("");
            }
        },
        methods:{
            update:function(){
                var value = this.value;
                if(value){
                    this.init(value);
                }
                else{
                    this.expandNode();
                }
            },
            init:function(value){
                //通过初始值进行初始化
                this.$set(this,"selectedNodes",[]);
                var findNodeProxy = findNode.bind(this);
                var node = value ? findNodeProxy(this.data,0,value) : null;
                function findNode(nodes,level,value){
                    for(var i = 0,l = nodes.length ;i<l;i++){
                        var node = nodes[i];
                        if(this.getValue(node) == value){
                            this.expandNode(node);
                            if(this.hasChildren(node)){
                                this.selectFolderNode(node);
                            }
                            return node;
                        }
                        else{
                            if(this.hasChildren(node)){
                                this.expandNode(node);
                                var subNode = findNodeProxy(node[this.nodesPath],level+1,value);
                                if(subNode){
                                    return subNode;
                                }
                                else{
                                    this.reselect(level);
                                }
                            }
                        }
                    }
                    return null;
                }
            },
            getComponentName:function(){
                return "tmp"+this._uid;
            },
            getValue:function(node){
                var value = node ? (this.valuePath ? node[this.valuePath] : node) : node;
                return value;
            },
            getName:function(node){
                var value = node ? (this.namePath ? node[this.namePath] : node) : node;
                return value;
            },
            hasChildren:function(node){
                return node && node[this.nodesPath] && node[this.nodesPath].length > 0;
            },
            reselect:function(level){
                if(this.loading)return;
                while(this.selectedNodes.length > level){
                    this.selectedNodes.pop();
                }
                this.tabLevel = level-1;
                this.expandNode(this.selectedNodes.pop());
            },
            selectFolderNode:function(){
                var node = this.selectedNodes[this.selectedNodes.length - 1];
                this.selectNode(node);
            },
            selectAll:function(){
                if(!this.selectedNode || this.hasChildren(this.selectedNode)){
                    this.selectFolderNode();
                }
                else{
                    this.reselect(this.selectedNodes.length-1);
                    this.selectFolderNode();
                }
            },
            expandNode:function(node){
                if(this.loading)return;
                if(!node){
                    this.$set(this,"selectedNodes",[]);
                    this.selectedNode = null;
                    this.tabNodes = this.data;
                    this.tabLevel = 0;
                }
                else{
                    if(typeof(node._loaded) == "undefined" || node._loaded === true){
                        this.selectedNode = node;
                        if(this.hasChildren(node)){
                            this.tabLevel += 1;
                            while(this.selectedNodes.length > this.tabLevel){
                                this.selectedNodes.pop();
                            }
                            this.$set(this.selectedNodes,this.tabLevel-1,node);
                            this.tabNodes = node[this.nodesPath];
                        }
                        else{
                            this.$set(this.selectedNodes,this.tabLevel,node);
                            this.hasLeaf = true;
                            this.selectNode(node);
                        }
                    }
                    else{
                        this.$emit("expand",node);
                    }
                }
            },
            openPop:function(){
                this.$set(this,'isopen',!this.isopen);
            },
            selectNode:function(node){
                this.$set(this,'isopen',false);
                var value = this.getValue(node);
                if(value!==this.valueProxy){
                    this.valueProxy = value;
                    this.$emit('input', this.valueProxy);
                }
            },
            closePop:function(){
                this.$set(this,'isopen',false);
            }
        }
    });
    Vue.component("cig-ajax-area",{
        props:{
            "ajaxOptions":{
            },
            "emptyText":{
                default:"请选择",
            },
            "nodeComponent":{
                default:"<span>{{item.name}}</span>"
            },
            "namePath":{
                default:"name"
            },
            "valuePath":{
                default:"id"
            },
            value:{},
            "nodesPath":{
                default:"nodes"
            },
            "isLeafPath":{
                default:""
            },
            rootPid:{
                default:""
            }
        },
        template:'<cig-area\
            ref="area"\
            :loading="loading" \
            :data="areas" \
            :value-path="valuePath" \
            :name-path="namePath" \
            :nodes-path="nodesPath" \
            @input="input" \
            @expand="expandNode" \
            v-model="valueProxy" \
            :value="valueProxy" \
            :empty-text="emptyText"\
            :node-component="nodeComponent" \
                ></cig-area>',
        data:function(){
            return {
                valueProxy:this.value,
                areas:[
                ],
                loading:false
            };
        },
        watch:{
            "value":function(newVal){
                this.valueProxy = this.value;
            }
        },
        mounted:function(){
            this.loadChildren();
        },
        computed:{
            selectedNode:function(){
                return this.$refs.area.selectedNode;
            }
        },
        methods:{
            loadChildren:function(node){
                var pid = node ? node[this.valuePath] : this.rootPid;
                var ajaxOptions = $.extend({},this.ajaxOptions);
                ajaxOptions.url = mixUrl(ajaxOptions.url,{
                    pid:pid
                });
                ajaxOptions.success = this.getAreaSuccess.bind(this,node);
                ajaxOptions.error = this.getAreaError.bind(this,node);
                $.ajax(ajaxOptions);
                this.loading = true;
                function mixUrl(url,param){
                    var rquery = ( /\?/ );
                    return url + (rquery.test(url) ? "&" : "?") + $.param(param);
                }
            },
            expandNode:function(node,select){
                this.loadChildren(node); 
                if(select){
                    this.$refs.area.selectFolderNode();
                }
            },
            getIsLeaf:function(node){
                if(this.isLeafPath){
                    return node[this.isLeafPath];
                }
                else{
                    return false;
                }
            },
            getAreaSuccess:function(node,res){
                this.loading = false;
                if(res.success){
                    var areas = res.data;
                    areas.forEach(function(area) {
                        if(this.getIsLeaf(area)){
                            area._loaded = true;
                        }
                        else{
                            area._loaded = false;
                            area[this.nodesPath] = new Vue({});
                        }
                    }, this);
                    if(node){
                        this.$set(node,this.nodesPath,areas);
                        this.$set(node,"_loaded",true);
                    }
                    else{
                        this.$set(this,'areas',areas);
                    }
                    var componentArea = this.$refs.area;
                    this.$nextTick(function(){
                        componentArea.expandNode(node);
                    });
                }
                else{
                    this.getAreaError(node);
                }
            },
            getAreaError:function(node){
                this.loading = false;
                var areas = [];
                if(node){
                    this.$set(node,this.nodesPath,areas);
                    this.$set(node,"_loaded",true);
                }
                else{
                    this.$set(this,'areas',areas);
                }
            },
            input:function(){
                this.$emit("input",this.valueProxy);
            }
        }
    });
});
define([
    'require',
    'vue',
    'css!cssBsTreeview'
], function(require, Vue) {
    Vue.component("bs-treeview",{
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
            value:{
            },
            treeClass:{

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
                valueProxy:this.value
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
                                "node-selected":self.getValue(node) == self.valueProxy
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
            var cls = {
                "treeview":true,
            };
            if(this.treeClass){
                cls[this.treeClass] = true;
            }
            return createElement("div",{
                class:cls
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
                this.$set(node,'expand', !node.expand);
            },
            getValue:function(node){
                var value = node ? (this.valuePath ? node[this.valuePath] : node) : node;
                return value;
            },
            selectNode:function(node){
                var value = this.getValue(node);
                if(this.valueProxy != value){
                    this.valueProxy = value;
                    this.$emit('input', this.valueProxy);
                }
            }
        }
    });
});
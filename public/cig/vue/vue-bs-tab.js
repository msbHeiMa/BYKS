define([
    'require',
    'vue'
], function(require, Vue) {
    'use strict';
    var tab = {
        props:["tabs"],
        data:function(){
            return {
                curTab:null
            }
        },
        render:function(createElement){
            var curTab = this.curTab || this.tabs[0];
            return createElement("div",{
                class:{
                    "nav-tabs":true
                }
            },[
                createElement("ul",{
                        class:{
                            "nav":true,
                            "nav-tabs":true,
                            "ui-sortable-handle":true
                        }
                    },this.tabs.map(function(tab){
                        return createElement('li',{
                                class:{
                                    "active":(tab && curTab && tab.name == curTab.name)
                                },
                            },[
                                createElement('a',{
                                    class:{
                                    },
                                    domProps:{
                                        "href":"javascript:;"
                                    },
                                    on:{
                                        click:this.tabClick.bind(this,tab)
                                    }
                                },[tab.text])
                            ]);
                    },this)),
                createElement("div",{
                        class:{
                            "tab-content":true,
                            "no-padding":true
                        }
                    },this.tabs.map(function(tab){
                        var slot = this.$slots[tab.name];
                        return createElement("div",{
                            class:{
                                "tab-pane":true,
                                "content":true,
                                "active":(tab && curTab && tab.name == curTab.name)
                            },
                        },slot);
                    },this))
            ]);
        },
        methods:{
            tabClick:function(tab){
                this.$set(this,"curTab",tab);
                this.$emit("select",tab);
            }
        }
    };
    Vue.component("bs-tab",tab);
});
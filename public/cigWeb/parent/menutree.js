define([
    'require',
    'vue'
], function(require, Vue) {
    'use strict';
    Vue.component("cig-menu-tree",{
        data:function(){
            return {
                activeItems : []
            }
        },
        props:[
            "menus","itemComponent"
        ],
        template:'<div class="cig-content">\
            <div :class="{\'cig-menu-level1\':true,\'cig-menu-expand\':activeItems.length > 1}">\
                <ul>\
                    <li v-for="menu in menus" @click="selectItem(menu,0)" :class="{\'active\':activeItems.indexOf(menu)>=0}">\
                        <a :href="menu.url ? menu.url : \'javascript:;\'" class="cig-content-a">{{menu.title}}</a>\
                        <a v-if="!menu.url" class="glyphicon glyphicon-chevron-right"></a>\
                    </li>\
                </ul>\
            </div>\
            <template v-for="(item,index) in activeItems">\
                <div v-if="(item.items && item.items.length)" :class="[\'cig-menu-level2\',\'cig-menu-level\'+(index+2),{\'cig-menu-expand\':activeItems.length > index+1,\'cig-menu-level-leaf\':item.lastFolder}]">\
                    <h3>{{item.title}}</h3>\
                    <ul>\
                        <li v-for="subItem in item.items" @click="selectItem(subItem,index+1)" :class="{\'active\':activeItems.indexOf(subItem)>=0}">\
                            <template>\
                                <a class="tit" :href="subItem.url ? subItem.url : \'javascript:;\'">{{subItem.title}}</a>\
                                <p>{{subItem.desc}}</p>\
                                <a class="glyphicon glyphicon-chevron-right"></a>\
                            </template>\
                        </li>\
                    </ul>\
                </div>\
                <div v-else :class="[\'cig-menu-level2\',\'cig-menu-level\'+(index+2),{\'cig-menu-expand\':activeItems.length > index+1,\'cig-menu-level-leaf\':item.lastFolder}]">\
                    <h3>{{item.title}}</h3>\
                    <span is="itemComponent" :data="item">\
                    </span>\
                </div>\
            </template>\
            ',
        beforeCreate:function(){
            var itemComponent = this.$options.propsData.itemComponent;
            var tempComponent;
            switch(typeof(itemComponent)){
                case"string":
                    tempComponent= {
                        template:itemComponent,
                        props:["data"]
                    };
                    break;
                case"object":
                default:
                    tempComponent = itemComponent;
                    tempComponent.props = ["data"];
                    break
            }
            this.$options.components["itemComponent"] =  tempComponent;
        },
        methods:{
            selectItem:function(item,level){
                // if(item.items && item.items.length){
                    while(level<this.activeItems.length){
                        this.activeItems.pop();
                    }
                    this.activeItems.push(item);
                    this.$emit("menuchange",this.activeItems);
                // }
            },
            clearSelect:function(){
                while(this.activeItems.length){
                    this.activeItems.pop();
                }
            }
        }
    });
});
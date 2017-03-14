define([
    'require',
    'vue',
    'jQuery',
    'bootstrap'
], function(require, Vue, $) {
    'use strict';
    Vue.component("bs-pop",{
        props:{
            class:{
            },
            title:{
            },
            type:{
                default:""
            }
        },
        data:function(){
            return {
                hasFooter:false
            }
        },
        template:'<div class="modal fade">\
                    <div :class="[\'modal-dialog\',{\'modal-lg\':type==\'lg\'},{\'modal-sm\':type==\'sm\'}]">\
                        <div class="modal-content">\
                            <div class="modal-header">\
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">\
                            &times;\
                        </button>\
                                <!-- /.modal-header -->\
                                <h4 class="modal-title">\
                                    {{title}}\
                                </h4>\
                            </div>\
                            <div class="modal-body">\
                                <slot></slot>\
                            </div>\
                            <div class="modal-footer" v-if="hasFooter">\
                                <slot name="footer"></slot>\
                            </div>\
                        </div>\
                    </div>\
                </div>',
        mounted:function(){
            this.$set(this,'hasFooter',!!this.$slots.footer);
            $(this.$el).on("hidden.bs.modal",this.closed.bind(this));
        },
        methods:{
            hide:function(){
                $(this.$el).modal("hide");
            },
            show:function(){
                $(this.$el).modal("show");
            },
            closed:function(){
                this.$emit("closed");
            }
        }
    });
});
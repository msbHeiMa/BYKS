{% extends '../parent/layoutvue.tpl' %} {% block title %}我的审核{%endblock%} {% block style %}{% endblock %} {% block body %}
{%endblock%} {% block content %}
<!--引用样式-->
<!--<link rel="stylesheet" href="/zhzl/zszh/css/style.css" />-->

<style>
    /****************** 面包屑start *************/
    
    .content-header {
        padding-top: 20px;
        padding-bottom: 30px;
    }
    /* 面包屑的靠左  */
    
    .breadcrumb {
        left: 10px;
    }
    /* 面包屑的字体大小  */
    
    .breadcrumb li {
        font-size: 14px;
    }
    /****************** 面包屑end *************/
    /* 头像位置 */
    
    .imgPosition {
        margin-left: 90px;
        margin-top: 20px
    }
    
    .content {
        min-height: 100px;
    }
    
    .nav-tabs {
        border-bottom: none;
    }
</style>

<div class="content-wrapper">
    {% raw %}
    <!--内容-->
    <div class="content">
        <div id="detail" class="bg-white detail-stage">
            <!-- /.modal-content -->
            <div is="bs-tab" :tabs="tabs.rqTabs" @select="rqTabSelect">
                <!--待办-->
                <div slot="unfinishedMain">
                    <div class="bootstrap-table">
                        <cig-table 
                        :columns="columns.unfinishedMain"                   
                        :ajax-options="undoAjaxOptions"><!--:rows="unfinishedRow"-->
                        </cig-table>
                    </div>
                </div>
                <!--已办-->
                <div slot="finishedMain">
                    <div class="bootstrap-table">
                        <cig-table 
                        :columns="columns.finishedMain"                     
                        :ajax-options="doneAjaxOptions"><!--:rows="finishedRow"-->
                        </cig-table>
                    </div>
                </div>
            </div>
        </div>
        {% endraw %}
    </div>
</div>
</div>
{% endblock %} {% block script%}
<script type="text/javascript">
    var curModule = "人口管理/特殊人群/肇事肇祸精神病/我的审核";
    requirejs([
        '{{static}}zhzl/zszh/js/request.js'], function () {
    });
</script> {% endblock %}
{% extends '../parent/layoutvue.tpl' %} {% block title %}{%endblock%}审核详情{% block style %} {% endblock %} {% block body %}
{%endblock%} {% block content %}
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
    
    .btn-footer {
        margin-top: 50px;
        margin-bottom: 50px;
    }
</style>
<div class="content-wrapper">
    <!--面包屑导航-->
    <section class="content-header">
        <ol class="breadcrumb">
            <li class="active"> 审核详情
            </li>
        </ol>
    </section>
    <div class="content">
        <!-- 详细信息內容-->
        <div id="detail" class="bg-white detail-stage">
            <!-- /.modal-content -->
            <!--人员基本信息-->
            <div slot="main">
                <div class="row">
                    <div class="col-md-1">
                    </div>
                    <div class="col-md-9">
                        <div class="form-horizontal form-group-sm">
                            <cig-form :fields="fields.main" data-path="mainInfo">
                            </cig-form>
                        </div>
                    </div>
                </div>
                <div class="btn-footer">
                    <center>
                        <button type="button" class="btn btn-primary" @click="save">同意</button>
                        <button type="button" class="btn btn-default" @click="back">驳回</button>
                    </center>
                </div>
            </div>
        </div>
    </div>
    {% endblock %} {% block script%}
    <script type="text/javascript">
    var curModule = "人口管理/特殊人群/肇事肇祸精神病/我的审核";
    requirejs([
        '{{static}}zhzl/zszh/js/requestDetailDanger.js'], function () {
    });
</script> {% endblock %}
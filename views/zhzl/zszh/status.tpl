{% extends '../parent/layoutvue.tpl' %} {% block title %}流程状态{%endblock%} {% block style %}{% endblock %} {% block body %}
{%endblock%} {% block content %}
<style>
    li {
        list-style: none;
        font-size: 14px;
        float: left;
        padding: 0px 28px 0px 5px;
    }
    
    .circle1 {
        background: url(../lcgl/img/green.png) no-repeat center left;
    }
    
    .circle2 {
        background: url(../lcgl/img/blue.png) no-repeat center left;
    }
    
    .circle3 {
        background: url(../lcgl/img/gray.png) no-repeat center left;
    }
    
    .circle4 {
        background: url(../lcgl/img/orange.png) no-repeat center left;
    }
    
    .ystep1 {
        margin-left: 110px;
    }
</style>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <div style="height:200px"></div>
    <!-- ystep容器 -->
    <div class="ystep1">
    </div>
</div>
<!-- /.content-wrapper -->

{% endblock %} {% block script%}
<script type="text/javascript">
    var curModule = "人口管理/特殊人群/肇事肇祸精神病/我的审核";
    requirejs([
        '{{static}}cig/zhzlobject/js/ystep.js',
        '{{static}}zhzl/zszh/js/status.js'], function () {
    });
</script> {% endblock %}
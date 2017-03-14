{% extends '../parent/layoutvue.tpl' %} {% block title %}审核状态{%endblock%} {% block style %}
<link rel="stylesheet" href="./css/status.css"> {% endblock %} {% block body %} {%endblock%} {% block content %}
<div class="content-wrapper">
    {% raw %}
    <div class="content">
        <div class="hint">
            <ul>
                <li class="circle1">已完成</li>
                <li class="circle2">进行中</li>
                <li class="circle3">未完成</li>
            </ul>
        </div>
        <div id="detail" class="bg-white detail-stage" v-cloak>
            <!--流动轨迹-->
            <ldgj :data="data"></ldgj>
        </div>
    </div>
    {% endraw %}
</div>
{% endblock %} {% block script%}
<script type="text/javascript">
    var curModule = "人口管理/特殊人群/肇事肇祸精神病/我的审核";
    requirejs([
        '{{static}}zhzl/zszh/js/requestStatus.js'], function () {
    });
</script> {% endblock %}
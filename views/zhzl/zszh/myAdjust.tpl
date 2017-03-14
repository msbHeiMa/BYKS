{% extends '../parent/layoutvue.tpl' %} {% block title %}我的申请{%endblock%} {% block style %} {% endblock %} {% block body
%} {%endblock%} {% block content %}

<div class="content-wrapper">
    {% include "../parent/queryTable.tpl" %}
</div>
{% endblock %} {% block script%}
<script type="text/javascript">
    var curModule = "人口管理/特殊人群/肇事肇祸精神病/我的申请";
    requirejs([
        '{{static}}zhzl/zszh/js/myAdjust.js'], function () {
    });
</script> {% endblock %}
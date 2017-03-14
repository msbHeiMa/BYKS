{% extends '../parent/layoutvue.tpl' %} {% block title %}移除迁出{%endblock%} {% block style %} {% endblock %} {% block body
%} {%endblock%} {% block content %}

<div class="content-wrapper">
    {% include "../parent/queryTable.tpl" %}
</div>
{% endblock %} {% block script%}
<script type="text/javascript">
    var curModule = "人口管理/特殊人群/肇事肇祸精神病/迁入移除管理";
    requirejs([
        '{{static}}zhzl/zszh/js/move.js'], function () {
    });
</script> {% endblock %}
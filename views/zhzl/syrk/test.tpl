{% extends '../parent/layoutvue.tpl' %} 
{% block title %}测试页面{%endblock%} 
{% block style %} 
{% endblock %} 
{% block body %}
{%endblock%} 
{% block content %}
<div class="content-wrapper">
{% raw %}
<div class="content">
    <div id="detail" class="bg-white detail-stage" v-cloak style="background-color: black">
        <cig-arbor :value="value" width="1200" height="600"></cig-arbor>
    </div>
</div>
{% endraw %}
</div>
{% endblock %}

{% block script%}
<script type="text/javascript">
    var curModule = "物的管理/车辆查询";
    requirejs([
        '{{static}}zhzl/syrk/test.js'], function () {
    });
</script>
{% endblock %}
{% extends '../parent/layoutvue.tpl' %} 
{% block title %}户主亲属关系维护{%endblock%} 
{% block style %} 

{% endblock %} 
{% block body %}
	
{%endblock%} 
{% block content %}

<div class="content-wrapper">
{% include "../parent/queryTable.tpl" %}
</div>

{% raw %}
<div id="edit" is="bs-pop" 
    type="lg" title="信息维护" ref="pop">
    <div ref="alert"></div>
    <div class="bootstrap-table">
        <bs-table 
            :config="tableConfig"
            :columns="tableColumns"
            :loading="!load"
            :rows="relation">
        </bs-table>
    </div>
    <div class="form-horizontal form-group-sm">
        <cig-form :fields="fields" data-path="data" ref="form">
        </cig-form>
    </div>
    <template slot="footer">
        <button type="button" class="btn btn-default" @click="close">关闭</button>
        <button type="button" class="btn btn-primary" @click="save">保存</button>
    </template>
</div>
{% endraw %}
{% endblock %}

{% block script%}
<script type="text/javascript">
    var curModule = "人口管理/实有人口/户主亲属关系维护";
    requirejs([
        '{{static}}zhzl/syrk/hzqsEdit.js'], function () {
    });
</script>
{% endblock %}
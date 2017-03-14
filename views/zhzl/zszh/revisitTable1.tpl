{% extends '../parent/layoutvue.tpl' %} {% block title %}随访记录{%endblock%} {% block style %} {% endblock %} {% block body
%} {%endblock%} {% block content %}
<div class="content-wrapper">
    {% include "../parent/queryTable.tpl" %}
    <!--录入弹出框 -->
	<div id="enter" is="bs-pop" type="lg" title="添加随访记录" ref="pop">
		<div ref="alert"></div>
		<div class="form-horizontal form-group-sm">
			<cig-form :fields="fields" data-path="data" ref="form">
			</cig-form>
		</div>
		<template slot="footer">
			<button type="button" class="btn btn-default" @click="close">关闭</button>
			<button type="button" class="btn btn-primary" @click="save">保存</button>
		</template>
	</div>
</div>
{% endblock %} {% block script%}
<script type="text/javascript">
    var curModule = "人口管理/特殊人群/肇事肇祸精神病/服务管理";
    requirejs([
        '{{static}}zhzl/zszh/js/revisitTable1.js'], function () {
    });
</script> {% endblock %}
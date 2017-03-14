{% extends '../parent/layoutvue.tpl' %} {% block title %}无网格员{%endblock%} {% block style %} {% endblock %} {% block body
%} {%endblock%} {% block content %}

<div class="content-wrapper">
    {% include "../parent/queryTable.tpl" %}
    <!--分配网格员弹出框 -->
	<div id="allot" is="bs-pop" type="lg" v-bind:title="allotName" ref="pop">
		<div ref="alert"></div>
		<div class="form-horizontal form-group-sm">
			<cig-form :fields="fields" data-path="data" ref="form">
				<div slot="fieldslot.gridName" class="form-control">
					<cig-ajax-area :ajax-options="areaAjaxOptions" @input="gridSelected()" v-model="data.gridName" empty-text="请选择"></cig-ajax-area>
				</div>
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
    var curModule = "人口管理/特殊人群/肇事肇祸精神病/无网格员";
    requirejs([
        '{{static}}zhzl/zszh/js/noGridList1.js'], function () {
    });
</script> {% endblock %}
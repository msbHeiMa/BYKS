{% extends '../parent/layoutvue.tpl' %} {% block title %}服务管理{%endblock%} {% block style %} {% endblock %} {% block body
%} {%endblock%} {% block content %}
<div class="content-wrapper">
	{% include "../parent/queryTable.tpl" %}
	<!--新增弹出框 -->
	<div id="add" is="bs-pop" type="lg" title="新增人员" ref="pop">
		<div ref="alert"></div>
		<div class="row form-group-sm form-inline">
			<div class="col-md-12" style="text-align: center;">
				<label class="label-control">身份证号码：</label>
				<input class="form-control" maxlength="18" v-model.trim="keyword" @keyup.enter="doSearch()" type="text">
				<button class="btn btn-sm btn-primary" :disabled="!keyword" @click="doSearch()">查询</button>
			</div>
		</div>
		<div class="form-horizontal form-group-sm">
			<cig-form :fields="fields" data-path="data" ref="form">
				<input type="hidden" name="userId" value="">
			</cig-form>
		</div>
		<template slot="footer">
			<button type="button" class="btn btn-default" @click="close">关闭</button>
			<button type="button" class="btn btn-primary" @click="save">保存</button>
		</template>
	</div>
	<!--危险级别更改弹出框 -->
	<div id="danger" is="bs-pop" type="lg" v-bind:title="dangerName" ref="pop">
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
	<!--管理级别更改弹出框 -->
	<div id="manage" is="bs-pop" type="lg" v-bind:title="manageName" ref="pop">
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
	<!--随访周期设定弹出框 -->
	<div id="revisit" is="bs-pop" type="lg" v-bind:title="revisitName" ref="pop">
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
	<!--移除弹出框   ref="pop"引用的集合    -->
	<div id="removeModal" is="bs-pop" type="mg" v-bind:title="ycInfo.removeName" ref="pop">
		<div ref="alert"></div>
		<!-- /.modal-content -->
		<div class="form-horizontal form-group-sm">
			<cig-form :fields="fields.ycMain" data-path="ycInfo">
			</cig-form>
		</div>
		<template slot="footer">
			<button type="button" class="btn btn-default" @click="close">关闭</button>
			<button type="button" class="btn btn-primary" @click="save">保存</button>
		</template>
	</div>
	<!--迁出弹出框   ref="pop"引用的集合    -->
	<div id="emigrantModal" is="bs-pop" type="mg" v-bind:title="'被迁出人:'+qcInfo.name" ref="pop">
		<div ref="alert"></div>
		<!-- /.modal-content -->
		<div class="form-horizontal form-group-sm">
			<!--<cig-form :fields="fields.qcMain" data-path="qcInfo">
			</cig-form>-->
			<cig-form :fields="filterFields" data-path="data" ref="form">
				<div slot="fieldslot.finalAddr" class="form-control">
					<cig-ajax-area :ajax-options="areaAjaxOptions"  @input="gridSelected()" v-model="data.finalAddr" empty-text="请选择"></cig-ajax-area>
				</div>
			</cig-form>
		</div>
		<template slot="footer">
			<button type="button" class="btn btn-default" @click="close">关闭</button>
			<button type="button" class="btn btn-primary" @click="save">保存</button>
		</template>
	</div>
</div>




</div>
{% raw %} {% endraw %} {% endblock %} {% block script%}
<script type="text/javascript">
    var curModule = "人口管理/特殊人群/肇事肇祸精神病/服务管理";
    requirejs([
        '{{static}}zhzl/zszh/js/peopleList1.js'], function () {
    });
</script> {% endblock %}
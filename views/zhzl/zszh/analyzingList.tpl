{% extends '../parent/layout.tpl' %} {% block title %}研判分析{%endblock%} {% block body %}class="hold-transition skin-blue sidebar-collapse
sidebar-mini"{%endblock%} {% block content %}
<!--样式表-->
<style>
	.choose td {
		font-size: 12px;
	}
	
	.choose {
		position: relative;
		top: 20px;
	}
	
	#chooseTable td:hover {
		color: #35bae5;
	}
	
	.bootstrap-table,
	.th-inner {
		font-weight: normal;
	}
	
	.th-inner {
		background: #e5e5e5;
	}
	
	.form-control {
		border-radius: 3;
		background: url('../images/icon_navi/search.png') no-repeat right center;
		height: 32px;
	}
	
	.title_line {
		float: left;
		width: 2px;
		height: 16px;
		margin: 10px 8px 10px 5px;
		background-color: #e6992e;
	}
</style>
<div class="content-wrapper">

	<!--写死的图片以后改动态的-->
	<div style="height:26px;"></div>
	<div style="width:1100px;height:400px;border:1px solid #ccc;">
		<img src="img/1.png" alt="图片1">
		<img src="img/3.png" alt="图片3">
	</div>
	<div style="width:1100px;height:392px;">
		<div style="height:30px;width:100%;"></div>
		<div style="width:330px;height:100%;margin-right:50px;float:left;">
			<span style="display:block;height:36px;background:#e6e6e6;margin：16px,auto;line-height:36px;">
				<i class="title_line"></i>
				<span>肇事肇祸事件统计</span>
			</span>
			<img src="img/4.png" alt="图片4">
		</div>
		<div style="width:330px;height:100%;margin-right:50px;float:left;">
			<span style="display:block;height:36px;background:#e6e6e6;margin：16px,auto;line-height:36px;">
				<i class="title_line" style="background-color: #a8e62e;"></i>
				<span>肇事肇祸事件统计</span>
			</span>
			<img src="img/5.png" alt="图片5">
		</div>
		<div style="width:330px;height:100%;float:left;">
			<span style="display:block;height:36px;background:#e6e6e6;margin：16px,auto;line-height:36px;">
				<i class="title_line" style="background-color: #2ea8e6;"></i>
				<span>肇事肇祸事件统计</span>
			</span>
			<img src="img/6.png" alt="图片6">
		</div>
	</div>


	<div class="choose">

		<table class="table" id="chooseTable">
			<tr>
				<td colspan="3" style="color:#808080">地区：</td>
				<td>泗安镇</td>
				<td>泗安镇</td>
				<td>泗安镇</td>
				<td>泗安镇</td>
				<td>泗安镇</td>
				<td>泗安镇</td>
				<td>泗安镇</td>
				<td>泗安镇</td>
				<td>泗安镇</td>
				<td>泗安镇</td>
				<td>泗安镇</td>
				<td>泗安镇</td>
			</tr>
			<tr>
				<td colspan="3"></td>
				<td>泗安镇</td>
				<td>泗安镇</td>
				<td>泗安镇</td>
				<td class="td">泗安镇</td>
				<td class="td">泗安镇</td>
				<td class="td">泗安镇</td>
				<td class="td">泗安镇</td>
				<td class="td">泗安镇</td>
				<td class="td">泗安镇</td>
				<td><input type="button" id="hide" style="border:0;background:#f5f5f5;color:#2ea8e6" value="全部" /></td>
			</tr>
			<tr>
				<td colspan="3" style="color:#808080">排序方式：</td>
				<td>危险等级</td>
				<td>管理等级</td>
				<td>随访周期</td>
				<td>稳定期</td>
			</tr>
		</table>

	</div>
	<!--<p>龙山街道  白溪桥街道</p>-->

	<!--导航栏-->
	<table class="col-sm-4" id="table" style="background:white" data-toolbar="#toolbar" data-search="true">
		<tr>

			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
		</tr>
		<tr>

			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
		</tr>
		<tr>

			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
		</tr>
		<tr>

			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
			<td>123</td>
		</tr>
	</table>

</div>
<!-- /.content-wrapper -->
{% endblock %} {% block script%}
<script type="text/javascript" src="js/analyzingList.js"></script>
<script>var curModule="人口管理/肇事肇祸精神病/研判分析" </script> {% endblock %}
{% extends 'parent/layout.tpl' %} {% block title %}服务管理与发布{%endblock%} {% block body %}class="hold-transition
skin-blue sidebar-collapse sidebar-mini"{%endblock%} {% block content %}

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->
	<div class="panel panel-default">
		<div class="panel-body">
			<section class="content-header">
				<h3>
					服务API详情
				</h3>
				<ol class="breadcrumb">
					<li><a href="service.html"><i class="fa fa-home"></i> 首页</a></li>
					<li>
						<a href="sercive.html">
							<li class="active">服务概况</a>
						</li>
						<li class="active">服务详情</a>
						</li>
				</ol>
			</section>
			<div style="display:inline" class="header">
				<img src="img\ip.png" style="float:left;margin:50px;margin-right:20px;margin-right:80px">

				<h4>IP地址查询企业版</h4> <br>
				<table>
					<tr>
						<td>服务商：APIStore</td>
						<td>所属分类：生活常用</td>
						<td>更新时间：2016-04-12</td>
					</tr>
					<tr>
						<td colspan="3">服务简介： 获取IP地址对应的省、市、区以及运营商名称。 付费版本每天更新IP地址库，免费版本每个星期更新IP地址库。</td>
					</tr>
				</table>
			</div>
			<hr>
			<div>
				<table>
					<tr>
						<td>接口地址：</td>
						<td>http://apis.baidu.com/apistore/iplookup/iplookup_paid</td>
					</tr>d
					<tr>
						<td>请求方法 :</td>
						<td>GET</td>
					</tr>
					<tr>
						<td style="colspan:2">请求参数(header) : </td>
					</tr>
				</table>

				<table id="table" data-toggle="table" data-striped="true">
					<tr>
						<td>参数名</td>
						<td>类型</td>
						<td>必填</td>
						<td>参数位置</td>
						<td>描述</td>
						<td>默认值</td>
					</tr>
					<tr>
						<td>apikey</td>
						<td>string</td>
						<td>是</td>
						<td>header</td>
						<td>API密钥</td>
						<td></td>
					</tr>
				</table>

				<!--  <table id="table" data-toggle="table" data-striped="true">
                <tr>
                    <td>参数名</td>
                    <td>类型</td>
                    <td>必填</td>
                    <td>参数位置</td>
                    <td>描述</td>
                    <td>默认值</td>
                </tr>
                <tr>
                    <td>apikey</td>
                    <td>string</td>
                    <td>是</td>
                    <td>header</td>
                    <td>API密钥</td>
                    <td>您自己的apikey</td>
                </tr></table>-->

			</div>
		</div>
	</div>
</div>

<!-- /.content-wrapper -->
{% endblock %}

<!-- jQuery 2.2.0 -->
<script src="/components/jquery-2.1.4/dist/jquery.min.js"></script>

<!-- Bootstrap 3.3.6 -->
<script src="/components/bootstrap-3.3.5-dist/dist/js/bootstrap.min.js"></script>
<script src="/components/bootstrap-table/dist/bootstrap-table.min.js"></script>
<script src="/components/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.min.js"></script> {% block script %}
<!-- AdminLTE App -->
<script src="/components/admin-lte/dist/js/app.min.js"></script>
<script type="text/javascript" src="js/servicedetail.js"></script> {% endblock %}
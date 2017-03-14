{% extends 'parent/layout.tpl' %} {% block title %}服务管理与发布{%endblock%} {% block body %}class="hold-transition skin-blue
sidebar-collapse sidebar-mini"{%endblock%} {% block content %}

<style>
	.col-center-block {
		float: none;
		display: block;
		margin-left: auto;
		margin-right: auto;
	}
</style>
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->

	<section class="content-header">
		<h3>
			服务注册
		</h3>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
			<li><a href="app"> 服务列表</a></li>
			<li class="active"> 服务注册
			</li>
		</ol>
	</section>
	<div class="col-xs-6 col-md-4 col-center-block">
		<form role="form" action="app.html">
			<div class="box-body ">
				<div class="form-group">
					<label for="CATEGORY">类别</label>
					<select id="CATEGORY" class="form-control select2" style="width: 100%;">
                  <option selected="selected">应用</option>
                  <option>API</option>
                  <option>图表</option>
                  <option>地图</option>
                </select>
				</div>
				<div class="form-group">
					<label for="NAME">名称</label>
					<input type="text" class="form-control" id="NAME" placeholder="应用名称">
				</div>
				<div class="form-group">
					<label for="CIGNODE">节点</label>
					<input type="text" class="form-control" id="CIGNODE" placeholder="节点">
				</div>
				<div class="form-group">
					<label for="ACCESSADDRESS">地址</label>
					<input type="text" class="form-control" id="ACCESSADDRESS" placeholder="地址">
				</div>

			</div>

			<!-- /.box-body -->
			<div>
				<center>
					<button type="submit" class="btn btn-primary" style="margin-left:20px" onclick="addapp()">保存</button>
					<button type="submit" class="btn btn-default">取消</button>
				</center>
			</div>
		</form>
		</br>
		</br>
		</br>
	</div>
	<!-- /.box -->
</div>

<!-- /.content -->



<!-- /.content-wrapper -->
{% endblock %}

<!-- jQuery 2.2.0 -->
<script src="/components/jquery-2.1.4/dist/jquery.min.js"></script>
<!-- Bootstrap 3.3.6 -->
<script src="/components/bootstrap-3.3.5-dist/dist/js/bootstrap.min.js"></script>
<script src="/components/bootstrap-table/dist/bootstrap-table.min.js"></script>
<script src="/components/bootstrap-editable/src/js/bootstrap-editable.js"></script>
<script src="/components/bootstrap-table/src/extensions/editable/bootstrap-table-editable.js"></script>
<script src="/components/bootstrap-select/dist/js/bootstrap-select.min.js"></script>
<script src="/components/bootstrap-switch/dist/js/bootstrap-switch.min.js"></script>
<script src="/components/bootstrap/docs/assets/js/bootstrap-dropdown.js"></script>
<script src="http://cdn.bootcss.com/bootstrap-table/1.9.1/locale/bootstrap-table-zh-CN.min.js"></script> {% block script
%}
<!-- AdminLTE App -->
<script src="/components/admin-lte/dist/js/app.min.js"></script>
<script type="text/javascript" src="js/appadd.js"></script>
<script type="text/javascript" src="js/config.js"></script> {% endblock %}
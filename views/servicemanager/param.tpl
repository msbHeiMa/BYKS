 {% extends 'parent/layout.tpl' %} {% block title %}服务管理与发布{%endblock%} {% block body %}class="hold-transition
skin-blue sidebar-collapse sidebar-mini"{%endblock%} {% block content %}

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->

	<section class="content-header">
		<h3>参数设置</h3>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
			<li><a href="app.html"> 服务列表</a></li>
			<li class="active">参数设置</li>
		</ol>
	</section></br>

	<div class="col-md-12">
		<!-- Horizontal Form -->
		<div class="box box-info">
			<div class="box-header with-border ">
				<h3 class="col-sm-6 box-title" id="h3"></h3>
			</div>
			<form class="form-horizontal">
        <div class="form-group">
							<label for="ISNEEDLOGIN" class="col-sm-4 control-label">登录</label>
              <div class="col-sm-5">
							<input class=".i-checkbox" name="isneedlogin" type="checkbox" onclick="check()">
						</div>
				</div>
				
					<div class="form-group">
						<label for="CREATOR" class="col-sm-4 control-label">创建人</label>
						<div class="col-sm-5">
							<input type="text" class="form-control" id="CREATOR">
						</div>
					</div>
					<div class="form-group">
						<label for="CREATEDATE" class="col-sm-4 control-label">创建时间</label>
						<div class="col-sm-5">
							<input type="datetime" class="form-control" id="CREATEDATE">
						</div>
					</div>
				  
				<!-- /.box-body -->
				<div class="box-footer" class="col-md-6">
					<center><button type="submit" class="btn btn-default">取消</button>
						<button type="submit" class="btn btn-primary">保存</button></center>
				</div>
        </form>
		</div>
		<!-- /.box-footer -->
		
	</div>

</div>
	<!--<div class="form-group">
							<label for="RECEIVERID">From:</label>
							<input class="form-control" name="isneedlogin">
						</div>-->



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
	<script src="http://cdn.bootcss.com/bootstrap-table/1.9.1/locale/bootstrap-table-zh-CN.min.js"></script> {% block script
	%}
	<!-- AdminLTE App -->
	<script src="/components/admin-lte/dist/js/app.min.js"></script>
	<script type="text/javascript" src="js/param.js"></script>
	<script type="text/javascript" src="js/config.js"></script> {% endblock %}
{% extends 'parent/layout.tpl' %} {% block title %}服务管理与发布{%endblock%} {% block body %}class="hold-transition
skin-blue sidebar-collapse sidebar-mini"{%endblock%} {% block content %}

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->
	<div class="panel panel-default">
		<div class="panel-body">
			<section class="content-header">

				<ol class="breadcrumb">
					<li><a href="#"><i class="fa fa-dashboard"></i> 首页</a></li>
					<li class="active">搜索</a>
					</li>
				</ol>
			</section>
		</div>

		<center>
			<div id="toolbar">
				<button id="remove" class="btn btn-link"></span>服务名</button>&#124
				<button id="plus" class="btn btn-link"></i> 应用名</button>&#124
				<button id="remove" class="btn btn-link">机器IP</button>
			</div>
		</center>
		<center>
			<div class="input-group col-sm-4">
				<input type="text" class="form-control"><span class="input-group-addon btn btn-defualt">搜索</span>
			</div>
		</center>


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
<script type="text/javascript" src="js/service.js"></script> {% endblock %}
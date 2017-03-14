  {% extends 'parent/layout.tpl' %} {% block title %}服务发布与管理{%endblock%} {% block body %}class="hold-transition skin-blue
sidebar-collapse sidebar-mini"{%endblock%} {% block content %}
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->
	<section class="content-header">

		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-dashboard"></i> 首页</a></li>
			<li class="active">通知</li>
		</ol>
	</section>
	</br>
	<!-- Main content -->
	<section class="content">
		<div class="row">
			<div class="col-md-3">

				<div class="box box-solid">
					<div class="box-header with-border">
						<h3 class="box-title"><i class="fa fa-bell-o"></i>&nbsp通&nbsp知</h3>

						<div class="box-tools">
							<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
						</div>
					</div>
					<div class="box-body no-padding">
						<ul class="nav nav-pills nav-stacked">
							<li><a href="notification.html"><i class="fa fa-envelope-o"></i></i> 未读通知</a></li>
							<li><a href="notifications.html"><i class="fa fa-inbox"></i>  全部通知</a></li>
							<li><a href="reply.html"><i class="fa fa-send-o"></i> 发送</a></li>
						</ul>
					</div>
				</div>
			</div>

			<div class="col-md-9">

				<div class="box box-primary">
				
				
					<div class="box-header with-border" style="height: 500px">
						
							<h3 class="box-title"><i class="fa fa-inbox"></i>&nbsp全部通知</h3>
							<div id="toolbar">
	<button class="btn btn-danger" id="remove">批量删除</button>
	</div>
							<table id="table" data-toggle="table" data-method="get" data-toolbar="#toolbar" data-show-export="true" data-show-columns="true"
		data-search="true" data-striped="true" data-show-refresh="true" data-show-pagination-switch="true" data-show-toggle="true"
		data-editable="true">
	</table>
							<!-- /.box-body -->
							<div class="box-footer no-padding">

							</div>
						</div>
				

				</div>
			</div>
		</div>
	</section>
</div>
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
<script src="http://cdn.bootcss.com/bootstrap-table/1.9.1/locale/bootstrap-table-zh-CN.min.js"></script> {% block script%}
<!-- AdminLTE App -->
<script src="/components/admin-lte/dist/js/app.min.js"></script>
<script type="text/javascript" src="js/notifications.js"></script>
<script type="text/javascript" src="js/config.js"></script
{% endblock %}
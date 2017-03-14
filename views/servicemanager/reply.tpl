{% extends 'parent/layout.tpl' %} {% block title %}服务发布与管理{%endblock%} {% block body %}class="hold-transition skin-blue sidebar-collapse
sidebar-mini"{%endblock%} {% block content %}
<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->
	<section class="content-header">

		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-dashboard"></i> 首页</a></li>
			<li class="active">编辑信息</li>
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
							<li><a href="reply.html" ><i class="fa fa-send-o"></i> 发送</a></li>
						</ul>
					</div>
					<!-- /.box-body -->
				</div>

			</div>
			<!-- /.col -->
			<div class="col-md-9">
				<div class="box box-primary">
					<div class="box-header with-border">
						<h3 class="box-title"><i class="fa fa-send-o"></i>&nbsp发送通知</h3>
					</div>
					<!-- /.box-header -->
					<div class="box-body">
						<div class="form-group">

							<label for="RECEIVERID"  placeholder="To:">接收人</label>

							<!--<input class="form-control" id="RECEIVERID" placeholder="To:">-->
							<select id="username"  multiple="multiple" class="selectpicker show-tick form-control" multiple data-live-search="true">  
                            
                            </select></div>
							<div class="form-group">
								<label for="HEADER">标 题</label>
								<input class="form-control" id="HEADER">
							</div>
							<div class="form-group">
								<label for="CONTENT">内 容</label>
								<textarea id="CONTENT" class="form-control" style="height: 200px">
                    
                    </textarea>
							</div>


							<!-- /.box-body -->
							<div class="box-footer">
								<div class="pull-right">
									<button type="reset" class="btn btn-default" onclick="notifications.html"><i class="fa fa-times"></i> 放弃</button>
									<button type="submit" class="btn btn-primary" onclick="sendnotification()"><i class="fa fa-envelope-o"></i> 发送</button>
								</div>

							</div>
							<!-- /.box-footer -->
						</div>
						<!-- /. box -->
					</div>
					<!-- /.col -->
				</div>
				<!-- /.row -->
	</section>
	<!-- /.content -->
	</div>
	<!-- /.content-wrapper -->

	<!-- /.control-sidebar -->
	<!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
	<div class="control-sidebar-bg"></div>
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
	<script src="/cig/svmobject/js/bootstrap-select.js"></script>
	<script src="http://cdn.bootcss.com/bootstrap-table/1.9.1/locale/bootstrap-table-zh-CN.min.js"></script> 
  {% block script%}
	<!-- AdminLTE App -->
	<script src="/components/admin-lte/dist/js/app.min.js"></script>
	<script type="text/javascript" src="js/reply.js"></script>
	<script type="text/javascript" src="js/config.js"></script
  {% endblock %}
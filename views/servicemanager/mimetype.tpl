{% extends 'parent/layout.tpl' %} {% block title %}服务管理与发布{%endblock%} {% block body %}class="hold-transition
skin-blue sidebar-collapse sidebar-mini"{%endblock%} {% block content %}

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->
	<div class="panel panel-default">
		<div class="panel-body">
			<section class="content-header">
				<h3>
					媒体类型列表
				</h3>
				<ol class="breadcrumb">
					<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
					<li class="active">媒体类型列表
					</li>
				</ol>
			</section>

			<div id="toolbar">
				<button id="remove" class="btn btn-danger" disabled>批量删除</button>&nbsp
				<button id="myModal" class="btn btn-success" data-toggle="modal" data-target="#myModal">&nbsp&nbsp新&nbsp&nbsp建&nbsp&nbsp</button>
			</div>

			<!-- 模态框（Modal） -->
			<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
							<!-- /.modal-header -->
							<h4 class="modal-title" id="myModalLabel">
								注册
							</h4>
						</div>
						<div class="modal-body">
							<form class="form-horizontal">
								<div class="box-body">
									<!-- /.modal-content -->
									<div class="form-group">
										<label for="EXTENSIONNAME" class="col-sm-3 control-label">扩展名：</label>
										<div class="col-sm-8">
											<input type="text" class="form-control" id="EXTENSIONNAME">
										</div>
									</div>
									<div class="form-group">
										<label for="MIMETYPE" class="col-sm-3 control-label">文件类型：</label>
										<div class="col-sm-8">
											<input type="text" class="form-control" id="MIMETYPE">
										</div>
									</div>
								</div>
								<!-- /.box-body -->
								<div class="box-footer">
									<center><button type="submit" class="btn btn-primary" style="margin-left:20px" onclick="addapp()">保存</button>
										<button type="submit" class="btn btn-default">取消</button></center>
								</div>
								<!-- /.box-footer -->
							</form>
						</div>
					</div>
					<!-- /.modal-content -->
				</div>
				<!-- /.modal -->

			</div>

			<table id="table" data-toggle="table" data-method="get" data-toolbar="#toolbar" data-show-export="true" data-show-columns="true"
				data-search="true" data-striped="true" data-show-refresh="true" data-show-pagination-switch="true" data-show-toggle="true"
				data-editable="true">
			</table>

		</div>
	</div>
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
<script src="http://cdn.bootcss.com/bootstrap-table/1.9.1/locale/bootstrap-table-zh-CN.min.js"></script> {% block script
%}
<!-- AdminLTE App -->
<script src="/components/admin-lte/dist/js/app.min.js"></script>
<script type="text/javascript" src="js/mimetype.js"></script>
<script type="text/javascript" src="js/config.js"></script> {% endblock %}
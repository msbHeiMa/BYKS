{% extends 'parent/layout.tpl' %} {% block title %}02.Swig&Bootstrap.User{%endblock%} {% block body %}class="hold-transition
skin-blue sidebar-collapse sidebar-mini"{%endblock%} {% block content %}

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->
	<!-- <div class="panel panel-default">
    <div class="panel-body">-->
	<section class="content-header">
		<h3 id="h3"></h3>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
			<li><a href="app.tpl"> 服务列表</a></li>
			<li class="active">节点列表</a>
			</li>
		</ol>
	</section>

	<div id="toolbar">
		&nbsp <button id="remove" class="btn btn-danger" disabled>&nbsp&nbsp删&nbsp&nbsp除&nbsp&nbsp</button>&nbsp
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
						新增节点
					</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal">
						<div class="box-body">

							<!-- /.modal-content -->
							<div class="form-group">
								<label for="ADDRESS" class="col-sm-4 control-label">节点地址：</label>
								<div class="col-sm-5">
									<input type="text" class="form-control" id="ADDRESS">
								</div>
							</div>
							<div class="form-group">
								<label for="WEIGHT" class="col-sm-4 control-label">权重</label>
								<div class="col-sm-5">
									<select id="WEIGHT" class="form-control select2" style="width: 100%;">
                  <option selected="selected">50</option>
                  <option>100</option>
                </select>
								</div>
							</div>

						</div>
						<!-- /.box-body -->
						<div class="box-footer">
							<center><button type="submit" class="btn btn-primary" style="margin-left:20px" onclick="addapp()">保存</button>
								<!--<button type="value" class="btn btn-default">取消</button>--></center>
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

<script type="text/javascript" src="js/node.js"></script>
<script type="text/javascript" src="js/config.js"></script> {% endblock %}
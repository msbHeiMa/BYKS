{% extends 'parent/layout.tpl' %} {% block title %}服务管理与发布{%endblock%} {% block body %}class="hold-transition skin-blue
sidebar-collapse sidebar-mini"{%endblock%} {% block content %}

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->
	<section class="content-header">
		<h3 id="h3">
			服务列表
		</h3>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
			<li>
				<a href="app.html"></i> 服务列表</a>
			</li>
			<li class="active">
				</i> restAPI</a>
			</li>
			</li>
		</ol>
	</section>

	<div id="toolbar">
		&nbsp <button id="remove" class="btn btn-danger" disabled>&nbsp&nbsp删&nbsp&nbsp除&nbsp&nbsp</button>&nbsp
		<!--<a href="appadd"><button id="addapp" class="btn btn-success" href="appadd">应用注册</button></a>-->
		<button id="myModal" class="btn btn-success" data-toggle="modal" data-target="#myModal">&nbsp&nbsp注&nbsp&nbsp册&nbsp&nbsp</button>
	</div>

	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
					<!-- /.modal-header -->
					<h4 class="modal-title" id="myModalLabel">
						注册服务
					</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal">
						<div class="box-body">

							<!-- /.modal-content -->

							<div class="form-group">
								<label for="NAME" class="col-sm-4 control-label">名称</label>
								<div class="col-sm-5">
									<input type="text" class="form-control" id="NAME" placeholder="应用名称">
								</div>
							</div>
							<div class="form-group">
								<label for="METHOD" class="col-sm-4 control-label">方法</label>
								<div class="col-sm-5">
									<select id="METHOD" class="form-control select2" style="width: 100%;">
                  <option selected="selected">Get</option>
                  <option>Post</option>
                  <option>Delete</option>
                  <!--<option>Update</option>
                  <option>Insert</option>-->
                </select>
								</div>
							</div>
							<div class="form-group">
								<label for="ADDRESS" class="col-sm-4 control-label">地址</label>
								<div class="col-sm-5">
									<input type="text" class="form-control" id="ADDRESS" placeholder="地址">
								</div>
							</div>
							<div class="form-group">
								<label for="INSTRUCTION" class="col-sm-4 control-label">说明</label>
								<div class="col-sm-5">
									<input type="text" class="form-control" id="INSTRUCTION" placeholder="说明">
								</div>
							</div>
						</div>
						<!-- /.box-body -->
						<div class="box-footer">
							<center><button type="submit" class="btn btn-primary" style="margin-left:20px" onclick="addapp()">保存</button>
							</center>
						</div>
						<!-- /.box-footer -->
					</form>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
		<!-- 参数设置模态框（Modal） -->
	</div>
	<div class="modal fade" id="myParameter" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
					<!-- /.modal-header -->
					<h4 class="modal-title" id="myModalLabel">
						<span class="fa fa-cog" style="color:#00a65a"></span> 参数设置
					</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal">
						<div class="box-body">
							<!-- /.modal-content -->
							<div class="form-group">
								<label for="servicename" class="col-sm-5 control-label">XXX： </label>
								<div class="col-sm-4">
									<input type="text" class="form-control" id="hostname" placeholder="">
								</div>
							</div>
							<div class="form-group">
								<label for="servicename" class="col-sm-5 control-label">XXX：</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" id="servicename">
								</div>
							</div>
							<div class="form-group">
								<label for="servicename" class="col-sm-5 control-label">XXX：</label>
								<div class="col-sm-4">
									<input type="text" class="form-control" id="servicename">
								</div>
							</div>
						</div>
						<!-- /.box-body -->
						<div class="box-footer">
							<center><button type="submit" class="btn btn-primary" style="margin-left:20px">保存</button>
						</div>
						<!-- /.box-footer -->
					</form>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	<!--导航栏-->

	<table id="table" data-toggle="table" data-method="get" data-toolbar="#toolbar" data-striped="true" data-show-pagination-switch="true"
		data-show-toggle="true" data-editable="true">
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
<script src="/components/bootstrap/docs/assets/js/bootstrap-dropdown.js"></script>
<script src="http://cdn.bootcss.com/bootstrap-table/1.9.1/locale/bootstrap-table-zh-CN.min.js"></script> {% block script%}
<!-- AdminLTE App -->
<script src="/components/admin-lte/dist/js/app.min.js"></script>
<script type="text/javascript" src="js/api.js"></script>
<script type="text/javascript" src="js/config.js"></script> {% endblock %}
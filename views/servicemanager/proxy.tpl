{% extends 'parent/layout.tpl' %} {% block title %}服务管理与发布{%endblock%} {% block body %}class="hold-transition skin-blue
sidebar-collapse sidebar-mini"{%endblock%} {% block content %}

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->
	<section class="content-header">
		<h3>
			反向代理
		</h3>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
			<li class="active">反向代理
			</li>
		</ol>
	</section>

	<div id="toolbar">
		&nbsp <button id="remove" class="btn btn-danger" disabled>&nbsp&nbsp删&nbsp&nbsp除&nbsp&nbsp</button>&nbsp
		<!--<a href="appadd"><button id="addapp" class="btn btn-success" href="appadd">应用注册</button></a>-->
		<button id="myModal" class="btn btn-success" data-toggle="modal" data-target="#myModal">&nbsp&nbsp注&nbsp&nbsp册&nbsp&nbsp</button>&nbsp
		
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
						注册应用
					</h4>
				</div>
				<div class="modal-body">
					<form class="form-horizontal">
						<div class="box-body">

							<!-- /.modal-content -->
							<div class="form-group">
								<label for="CATEGORY" class="col-sm-4 control-label">类别</label>
								<div class="col-sm-5">
									<select id="CATEGORY" class="form-control select2" style="width: 100%;">
                  <option selected="selected">应用</option>
                  <option>静态应用</option>
                  <option>API</option>
                  <option>图表</option>
                  <option>地图</option>
                </select>
								</div>
							</div>
							<div class="form-group">
								<label for="NAME" class="col-sm-4 control-label">名称</label>
								<div class="col-sm-5">
									<input type="text" class="form-control" id="NAME" placeholder="应用名称">
								</div>
							</div>
							<div class="form-group">
								<label for="CIGNODE" class="col-sm-4 control-label">节点</label>
								<div class="col-sm-5">
									<input type="text" class="form-control" id="CIGNODE" placeholder="节点">
								</div>
							</div>
							<div class="form-group">
								<label for="ACCESSADDRESS" class="col-sm-4 control-label">地址</label>
								<div class="col-sm-5">
									<input type="text" class="form-control" id="ACCESSADDRESS" placeholder="地址">
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
	
	<table id="table" data-toggle="table" data-method="get" data-toolbar="#toolbar" data-show-export="true" data-show-columns="true"
		data-search="true" data-striped="true" data-show-refresh="true" data-show-pagination-switch="true" data-show-toggle="true"
		data-editable="true">
	</table>
	
				
</div>


<!-- /.content -->



<!-- /.content-wrapper -->
{% endblock %}
 {% block script%}
<!-- AdminLTE App -->
<script src="/components/admin-lte/dist/js/app.min.js"></script>
<script type="text/javascript" src="js/proxy.js"></script>
<script type="text/javascript" src="js/config.js"></script>
{% endblock %}
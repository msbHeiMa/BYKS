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

 <!-- Donut chart -->
          <div class="box box-primary">
            <div class="box-header with-border">
              <i class="fa fa-bar-chart-o"></i>

              <h3 class="box-title">Donut Chart</h3>

              <div class="box-tools pull-right">
                <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
                <button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
              </div>
            </div>
            <div class="box-body">
              <div id="donut-chart" style="height: 300px;"></div>
            </div>
            <!-- /.box-body-->
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
<script src="/components/bootstrap/docs/assets/js/bootstrap-dropdown.js"></script>
<script src="/components/chart.js/dist/Chart.js"></script>
<script src="http://cdn.bootcss.com/bootstrap-table/1.9.1/locale/bootstrap-table-zh-CN.min.js"></script> {% block script%}
<!-- AdminLTE App -->
<script src="/components/admin-lte/dist/js/app.min.js"></script>
<script type="text/javascript" src="js/charttt.js"></script>
<script type="text/javascript" src="js/config.js"></script> {% endblock %}
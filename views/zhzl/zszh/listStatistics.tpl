{% extends '../parent/layout.tpl' %} {% block title %}综合治理{%endblock%} {% block body %}class="hold-transition skin-blue
sidebar-collapse sidebar-mini"{%endblock%} {% block content %}

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->

	<div class="row">
	<!--左边表格 -->
		<div class="col-md-8" style="margin-left:20px">
			<div class="box box-primary">
				<table id="table" data-toggle="table" data-method="get"  
		   data-show-export="true" data-show-columns="true"
		data-search="true" data-striped="true" data-show-refresh="true" data-show-pagination-switch="true" data-show-toggle="true"
		data-editable="true" >
				</table>
			</div>
		</div>
		<!-- 右边图表 -->
		<div class="col-md-3" style="margin-left:20px">
			<div class="box box-primary">
				<div class="box-header with-border">
					<h3 class="box-title" id="upName"></h3>
					<div class="box-tools pull-right">
						<button class="btn btn-box-tool" type="button" data-widget="collapse"><i class="fa fa-minus"></i></button>
						<button class="btn btn-box-tool" type="button" data-widget="remove"><i class="fa fa-times"></i></button>
					</div>
				</div>
				<div class="box-body">
					<div class="row">
						<div class="col-md-7">
							<div class="chart-responsive">
								<canvas id="myChart" height="195" style="width:160px;height:195px;" width="160"></canvas>
							</div>
						</div>
						 <div class="col-md-4">
						 	<div class="row" >
							 	<div class="col-md-14" >
									<ul class="chart-legend clearfix pull-right">
										<li>
											<i class="fa fa-circle-o text-red"></i>一级管理
										</li>
										<li>
											<i class="fa fa-circle-o text-yellow"></i>二级管理
										</li>
										<li>
											<i class="fa fa-circle-o text-blue"></i>三级管理
										</li>
										<li>
											<i class="fa fa-circle-o text-green"></i>四级管理
										</li>
									</ul>
								</div>
							</div>
							<div class="row" style="margin-top:30px;">
								<div class="col-md-14 pull-right">
									<h4 id="total"></h4>
								</div>
							</div>	
						</div> 

					</div>
				</div>
				<div class="box-footer no-padding">
					<ul class="nav nav-pills nav-stacked">
						<li>
							<a href="#">一级管理
								<span id="firstLevel" class="pull-right text-red">
								
								</span>
							</a>
						</li>
						<li>
							<a href="#">二级管理
								<span id="seconeLevel" class="pull-right text-yellow">
									
								</span>
							</a>
						</li>
						<li>
							<a href="#">三级管理
								<span id="thirdLevel" class="pull-right text-blue">
									
								</span>
							</a>
						</li>
						<li>
							<a href="#">四级管理
								<span id="forthLevel" class="pull-right text-green">
								
								</span>
							</a>
						</li>
					</ul>
				</div>
			</div>
	   </div>	
   </div>
</div >




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
<script type="text/javascript" src="http://cdn.gbtags.com/Chart.js/0.2.0/Chart.min.js"></script>
<script type="text/javascript" src="js/listStatistics.js"></script>
 {% endblock %}
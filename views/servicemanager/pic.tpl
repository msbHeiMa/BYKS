{% extends 'parent/layout.tpl' %} {% block title %}服务管理与发布{%endblock%} {% block body %}class="hold-transition
skin-blue sidebar-collapse sidebar-mini"{%endblock%} {% block content %}

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->
	<div class="panel panel-default">
		<div class="panel-body">

			<section class="content">
				<div class="row">
					<div class="col-md-6">
						<div class="box box-primary">
							<div class="box-header with-border">
								<i class="fa fa-bar-chart-o"></i>
								<h3 class="box-title">应用数量分类</h3>
								<div class="box-tools pull-right">
									<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                                </button>
									<button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
								</div>
							</div>
							<div class="box-body">
								<div id="bar-chart" style="height: 300px;"></div>
							</div>
						</div>
					</div>



					<div class="col-md-6">
						<!-- Bar chart -->
						<div class="box box-primary">
							<div class="box-header with-border">
								<i class="fa fa-bar-chart-o"></i>

								<h3 class="box-title">应用提供服务</h3>

								<div class="box-tools pull-right">
									<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
									<button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
								</div>
							</div>
							<div class="box-body">
								<div id="bar-chart1" style="height: 300px;"></div>
							</div>
							<!-- /.box-body-->
						</div>
					</div>
					<!-- /.box -->
			</section>
			<section class="content">
				<div class="row">
					<div class="col-md-6">
						<!-- Bar chart -->
						<div class="box box-primary">
							<div class="box-header with-border">
								<i class="fa fa-bar-chart-o"></i>

								<h3 class="box-title">应用部署节点</h3>

								<div class="box-tools pull-right">
									<button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                </button>
									<button type="button" class="btn btn-box-tool" data-widget="remove"><i class="fa fa-times"></i></button>
								</div>
							</div>
							<div class="box-body">
								<div id="bar-chart2" style="height: 300px;"></div>
							</div>
							<!-- /.box-body-->
						</div>
					</div>
					<!-- /.box -->
			</section>
			</div>
			</div>
		</div>
	</div>

	<!-- /.content -->



	<!-- /.content-wrapper -->
	{% endblock %}


	<script src="/components/jquery-flot/jquery.flot.js"></script>
	<script src="/components/jquery-flot/jquery.flot.categories.js"></script> {% block script %}
	<!-- AdminLTE App -->

	<script type="text/javascript" src="js/pic.js"></script> {% endblock %}
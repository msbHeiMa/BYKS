{% extends 'parent/layout.tpl' %} {% block title %}服务管理与发布{%endblock%} {% block body %}class="hold-transition
skin-blue sidebar-collapse sidebar-mini"{%endblock%} {% block content %}

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->
	<div class="panel panel-default">
		<div class="panel-body">
			<section class="content-header">
				<h3>
					**应用详情
				</h3>
				<ol class="breadcrumb">
					<li><a href="app.html"><i class="fa fa-home"></i> 首页</a></li>
					<li>
						<a href="app.html">
							<li class="active">应用概况</a>
						</li>
						<li class="active">**应用详情</a>
						</li>
				</ol>
			</section>
			<div id="all" style="height:400px;width:600px;margin:0 auto;">
				<div id="myCarousel" class="carousel slide">
					<!-- 轮播（Carousel）指标 -->
					<ol class="carousel-indicators">
						<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
						<li data-target="#myCarousel" data-slide-to="1"></li>
						<li data-target="#myCarousel" data-slide-to="2"></li>
					</ol>
					<!-- 轮播（Carousel）项目 -->
					<div class="carousel-inner">
						<div class="item active">
							<img src="img/slide1.png" style="width:100%" alt="First slide">
							<div class="carousel-caption">标题1</div>
						</div>
						<div class="item">
							<img src="img/slide2.png" style="width:100%" alt="Second slide">
							<div class="carousel-caption">标题2</div>
						</div>
						<div class="item">
							<img src="img/slide3.png" style="width:100%" alt="Third slide">
							<div class="carousel-caption">标题3</div>
						</div>
					</div>
					<!-- 轮播（Carousel）导航 -->
					<a class="carousel-control left" href="#myCarousel" data-slide="prev">&lsaquo;</a>
					<a class="carousel-control right" href="#myCarousel" data-slide="next">&rsaquo;</a>
				</div>
				<p>说明：</p>
			</div>






		</div>
	</div>
</div>
{% endblock %}

<!-- jQuery 2.2.0 -->
<script src="/components/jquery-2.1.4/dist/jquery.min.js"></script>

<!-- Bootstrap 3.3.6 -->
<script src="/components/bootstrap-3.3.5-dist/dist/js/bootstrap.min.js"></script>
<script src="/components/bootstrap-table/dist/bootstrap-table.min.js"></script>
<script src="/components/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.min.js"></script> {% block script %}
<!-- AdminLTE App -->
<script src="/components/admin-lte/dist/js/app.min.js"></script>
<script type="text/javascript" src="js/appdetail.js"></script> {% endblock %}
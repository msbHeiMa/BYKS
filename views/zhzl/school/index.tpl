{% extends '../parent/layout.tpl' %} 
{% block title %}校园周边安全{%endblock%} 
{% block style %} 
<link rel="stylesheet" href="css/index.css" />
{% endblock %} 
{% block body %}
	class="hold-transition skin-blue sidebar-collapse sidebar-mini"
{%endblock%} 
{% block content %}

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->
	<section class="content-header">
		<h1>
			重点学校周边概览 &nbsp &nbsp<button id="allSchool" class="btn btn-info" onclick="location.href='school.html'">&nbsp&nbsp全&nbsp部&nbsp学&nbsp校&nbsp&nbsp</button>
		</h1>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
			<li class="active">校园周边安全
			</li>
		</ol>
	</section>
	<div class="row" id="focusDiv">
	</div>
	<h3 class="content-header">周边存在隐患学校</h3>
	<div class="row" id="top5Div">
	</div>
</div>
<!-- /.content-wrapper -->
{% endblock %}

{% block script%}
<script type="text/javascript" src="js/index.js"></script>
{% endblock %}
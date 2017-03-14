{% extends '../parent/layout.tpl' %} 
{% block title %}详细安全监控{%endblock%} 
{% block style %} 
<link rel="stylesheet" href="{{ esrimap }}esri/css/esri.css" />
<link rel="stylesheet" href="/cig/map/css/cigmap.css" />
<link rel="stylesheet" href="/cig/map/css/infowindow.css" />
<link rel="stylesheet" href="/cig/map/css/calcite.css" />
{% endblock %} 
{% block body %}
	class="hold-transition skin-blue sidebar-collapse sidebar-mini"
{%endblock%} 
{% block content %}

<div class="content-wrapper">
	<section class="content-header">
		<h1>
			<span id="schoolName"></span>详细安全监控
		</h1>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
			<li><a href="index.html">校园周边安全</a></li>
			<li class="active">详细安全监控
			</li>
		</ol>
	</section>
	<section class="content">
		<div id="main_map" class="row" style="position:relative;" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'center'">
		</div>
	</section>
</div>
<!-- /.content-wrapper -->
{% endblock %}

{% block script%}
<script src="js/detail.js"></script>
<script src="/cig/map/app.js"></script>
<script src="{{ esrimap }}init.js"></script>
{% endblock %}
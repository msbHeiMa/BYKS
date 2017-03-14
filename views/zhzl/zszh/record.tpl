{% extends '../parent/layout.tpl' %} {% block title %}回访记录{%endblock%} {% block body %}class="hold-transition skin-blue
sidebar-collapse sidebar-mini"{%endblock%} {% block content %}

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper" style="height:300px">
	<!-- Content Header (Page header) -->
<div>
	<section class="content-header">
		<h3>
			回访记录
		</h3>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
			<li class="active"> 回访记录
			</li>
		</ol>
	</section>
	</div>
<div id="toolbar">
        <button id="add" class="btn btn-success" style="margin-left:15px" onclick="jump()">&nbsp录&nbsp入&nbsp</button>
	
	</div>

	<!--导航栏-->
	<table class="col-sm-4"
	       id="table" 
		   data-toggle="table" 
		   data-method="get" 
		   data-toolbar="#toolbar" 
		   data-show-export="true" 
		   data-show-columns="true"
		   data-search="true" 
		   data-striped="true" 
		   data-show-refresh="true" 
		   data-show-pagination-switch="true" 
		   data-show-toggle="true"
		   data-editable="true">
	</table>


    <!--<section class="content-header">
		<h3>
			<i class="fa fa-paperclip">附件</i>
		</h3> 	</section>
		<div class="box box-primary">
    <img src="img/fujian.png">
        </div>-->
		
</div>




<!-- /.content -->



<!-- /.content-wrapper -->
{% endblock %}
{% block script%}
<script type="text/javascript" src="js/record.js"></script>
{% endblock %}
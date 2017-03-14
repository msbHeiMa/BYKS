{% extends '../parent/layout.tpl' %} {% block title %}分配网格员{%endblock%} {% block body %}class="hold-transition skin-blue sidebar-collapse
sidebar-mini"{%endblock%} {% block content %}

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper" style="height:850px">
	<!-- Content Header (Page header) -->
	<div style="margin-bottom:20px">
		<section class="content-header">
			<h3>
				分配网格员
			</h3>
			<ol class="breadcrumb">
				<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
				<li><a href="#"> 无网格员列表</a></li>
				<li class="active"> 分配网格员
				</li>
			</ol>
		</section>
	</div>

	<div class="row">
		<!--左边表格 -->

		<div class="col-md-5 col-sm-6" style="margin-left:40px">
			<div class="box box-primary" style="height:300px">
				<div id="peopleImage" style="float:left;">
				</div>
				<div style="float:right;width:400px;margin-top:20px">
					<form class="form-horizontal">
						<div class="form-group">
							<label class="col-sm-1 col-md-3 control-label">姓名</label>
							<div class="col-sm-3 col-md-6">
								<input type="text" class="form-control" id="name" disabled="ture">
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-3 col-md-3 control-label">身份证号</label>
							<div class="col-sm-6 col-md-6">
								<input type="text" class="form-control" id="cardNum" disabled="ture">
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 col-md-3 control-label">性别</label>
							<div class="col-sm-2 col-md-6">
								<input type="text" class="form-control" id="gender" disabled="ture">
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 col-md-3 control-label">日常行为</label>
							<div class="col-sm-2 col-md-6">
								<input type="text" class="form-control" id="dailyActions" disabled="ture">
							</div>
						</div>
						<div class="form-group">
							<label class="col-sm-2 col-md-3 control-label">备注</label>
							<div class="col-sm-2 col-md-6">
								<input type="text" class="form-control" id="remarks" disabled="ture">
							</div>
						</div>
					</form>
				</div>
			</div>

		</div>
		<!-- 右边图表 -->
		<div class="col-md-6 col-sm-5" style="margin-left:20px">
			<div class="box box-primary">
				<div class="form-group">
					<label for="RECEIVERID" placeholder="To:"></label>
					<select name="GRID_NAME" id="select3" class="from-control .col-lg-5 input-sm" onChange="thirdChange()"></select>
					<select name="GRID_NAME" id="select4" class="from-control .col-lg-5 input-sm" onChange="select4()"></select>
				</div>
				<table id="table" data-toggle="table" data-method="get" data-striped="true"></table>
			</div>
		</div>
	</div>
</div>




<!-- /.content -->



<!-- /.content-wrapper -->
{% endblock %} 
{% block script%}
<script type="text/javascript" src="js/allot.js"></script>
{% endblock %}
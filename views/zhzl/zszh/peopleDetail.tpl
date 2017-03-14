{% extends '../parent/layout.tpl' %} {% block title %}人员详情{%endblock%} {% block body %}class="hold-transition skin-blue sidebar-collapse
sidebar-mini"{%endblock%} {% block content %}

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper" style="height:750px">
	<section class="content-header">
		<h3>
			人员详情
		</h3>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
			<li><a href="peopleList.html"> 人员列表</a></li>
			<li class="active"> 人员详情
			</li>
		</ol>
	</section>

	<div class="col-md-9" style="margin-top:40px">
		<div class="col-md-3">
			<div id="peopleImage"  style="margin-left:100px">
			<!--照片-->
			</div>
			
		</div>
		<div class="col-md-9">
			<form class="form-horizontal">

				<div class="box-body">
					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">所属网格</label>
						<div class="col-sm-3 col-md-10">
							<input type="text" class="form-control" id="gridName" disabled="ture">
						</div>
					</div>

					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">姓名</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" id="name" disabled="ture">
						</div>
						<label class="col-sm-2 col-md-2 control-label">身份证号</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" id="cardNum" disabled="ture">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">性别</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" id="gender" disabled="ture">
						</div>
						<label class="col-sm-2 col-md-2 control-label">出生日期</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" id="birthDate" disabled="ture">
						</div>
					</div>
                    <div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">民族</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" id="nation" disabled="ture">
						</div>
						<label class="col-sm-2 col-md-2 control-label">籍贯</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" id="nativePlace" disabled="ture">
						</div>
					</div>
                    <div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">固定电话</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" id="phone" disabled="ture">
						</div>
						<label class="col-sm-2 col-md-2 control-label">现住地详细地址</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" id="rAddr" disabled="ture">
						</div>
					</div>
                    <div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">肇事次数</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" id="cTroubleCount" disabled="ture">
						</div>
						<label class="col-sm-2 col-md-2 control-label">治疗情况</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" id="treatS" disabled="ture">
						</div>
					</div>
                    <div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">上次回放日期</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" id="preVisitDate" disabled="ture">
						</div>
						<label class="col-sm-2 col-md-2 control-label">数据来源</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" id="dataSources" disabled="ture">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">危险级别</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" id="dangerRank" disabled="ture">
						</div>
						<label class="col-sm-2 col-md-2 control-label">目前诊断类型</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" id="attackType" disabled="ture">
						</div>
					</div>
				
	
				</div>
			</form>
		</div>
	</div>
	<div class="col-md-12">
		<center>
			<button id="reback" class="btn btn-default" onclick="javascript:history.back(-1);">&nbsp返&nbsp回&nbsp</button>&nbsp
		</center>
	</div>
</div>
{% endblock %}
<!-- jQuery 2.2.0 -->
<script src="/components/jquery-2.1.4/dist/jquery.min.js"></script>
<!-- Bootstrap 3.3.6 -->
<script src="/components/bootstrap-3.3.5-dist/dist/js/bootstrap.min.js"></script>
<script src="/components/bootstrap-3.0.3/dist/js/bootstrap.js"></script>
<script src="/components/bootstrap-table/dist/bootstrap-table.min.js"></script>
<script src="/components/bootstrap-editable/src/js/bootstrap-editable.js"></script>
<script src="/components/bootstrap-table/src/extensions/editable/bootstrap-table-editable.js"></script>
<script src="/components/bootstrap-select/dist/js/bootstrap-select.min.js"></script>
<script src="/components/bootstrap-datetimepicker/src/js/bootstrap-datetimepicker.js"></script>
<script src="/components/bootstrap-switch/dist/js/bootstrap-switch.min.js"></script>
<script src="/components/bootstrap/docs/assets/js/bootstrap-dropdown.js"></script>
<script src="/components/bootstrap-select/dist/js/bootstrap-select.js"></script>
<script src="/components/bootstrap-treeview/dist/bootstrap-treeview.min.js"></script>
<script src="http://cdn.bootcss.com/bootstrap-table/1.9.1/locale/bootstrap-table-zh-CN.min.js"></script> {% block script%}
<script type="text/javascript" src="js/peopleDetail.js"></script> {% endblock %}
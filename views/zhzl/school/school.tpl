{% extends '../parent/layout.tpl' %} 
{% block title %}学校列表{%endblock%} 
{% block style %} 
<link rel="stylesheet" href="/components/bootstrap-treeview/dist/bootstrap-treeview.min.css" />
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
			学校列表
		</h1>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
			<li><a href="index.html">校园周边安全</a></li>
			<li class="active">学校列表
			</li>
		</ol>
	</section>

	<div id="toolbar">
		&nbsp <button id="remove" class="btn btn-danger" disabled>&nbsp&nbsp删&nbsp&nbsp除&nbsp&nbsp</button>&nbsp
		<button id="addSchool" onclick="addSchool()" class="btn btn-success" >&nbsp&nbsp新&nbsp&nbsp增&nbsp&nbsp</button>&nbsp
	</div>

    <table id="table" data-toggle="table" data-method="get" data-toolbar="#toolbar" data-show-export="true" data-show-columns="true"
		data-search="true" data-striped="true" data-show-refresh="true" data-show-pagination-switch="true" data-show-toggle="true"
		data-editable="true">
	</table>

	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
					<!-- /.modal-header -->
					<h4 class="modal-title" id="myModalLabel">
						学校信息
					</h4>
				</div>
				<div class="modal-body">
					<form id="schoolForm" class="form-horizontal">
						<div class="box-body">
						<!-- /.modal-content -->
						<div class="form-group">
							<label for="schoolName" class="col-sm-4 control-label">学校名称</label>
							<div class="col-sm-5">
								<input type="hidden" id="schoolId"  name="schoolId" >
								<input type="text" class="form-control" id="schoolName" name="schoolName" placeholder="学校名称">
							</div>
						</div>
						<div class="form-group">
							<label for="safetyManager" class="col-sm-4 control-label">安全负责人</label>
							<div class="col-sm-5">
								<input type="text" class="form-control" id="safetyManager"  name="safetyManager" placeholder="安全负责人">
							</div>
						</div>
						<div class="form-group">
							<label for="safetyContact" class="col-sm-4 control-label">联系方式</label>
							<div class="col-sm-5">
								<input type="text" class="form-control" id="safetyContact"  name="safetyContact" placeholder="联系方式">
							</div>
						</div>
						<div class="form-group">
							<label for="aId" class="col-sm-4 control-label">所属辖区</label>
							<div class="col-sm-5">
								<input type="text" class="form-control" id="townName" name="townName" readonly placeholder="所属辖区">
								<input type="hidden" id="aId">
								<div class="tree-div">
									<div id="tree"></div>
								</div>
							</div>
						</div>
					</div>
						<!-- /.box-body -->
						<div class="box-footer">
							<center><button type="button" class="btn btn-primary" style="margin-left:20px" onclick="saveOrUpdateSchool()">保存</button>
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
	<div class="modal fade" id="myParam" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
					<h4 class="modal-title">
						<span class="fa fa-cog" style="color:#00a65a"></span> 警示项设置
					</h4>
				</div>
				<div class="modal-body">
					<form id="configForm" class="form-horizontal">
						<div class="box-body">
							<div class="form-group">
								<label for="safetyRange" class="col-sm-5 control-label">警示范围（米）： </label>
								<div class="col-sm-4">
									<input type="hidden" id="cfg_schoolId" >
									<input type="text" class="form-control" id="safetyRange" name="safetyRange" placeholder="">
								</div>
							</div>
							<div class="form-group">
								<label for="servicename" class="col-sm-5 control-label">关注指标：</label>
								<div class="col-sm-4" id="checkConfigDiv">
								</div>
							</div>
						</div>
						<!-- /.box-body -->
						<div class="box-footer">
							<center><button type="button" class="btn btn-primary" style="margin-left:20px" onclick="saveCfg()">保存</button>
						</div>
						<!-- /.box-footer -->
					</form>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
	<!--导航栏-->
	<div class="modal fade" id="focusModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  &times;
            </button>
					<h4 class="modal-title">
						<span class="fa fa-cog" style="color:#00a65a"></span>提示
					</h4>
				</div>
				<div class="modal-body">
					 <div class="container-fluid bd-example-row">
						<div class="row">
							<center><div id="focusText"></div>
						</div>
					</div>
				</div>
			</div>
			<!-- /.modal-content -->
		</div>
		<!-- /.modal -->
	</div>
</div>
{% endblock %}

{% block script%}
<script type="text/javascript" src="../parent/js/cigTable.js"></script>
<script type="text/javascript" src="../parent/js/config.js"></script>
<script type="text/javascript" src="js/school.js"></script>
<script>var curModule="校园及周边安全/学校周边重点人员"</script>
{% endblock %}

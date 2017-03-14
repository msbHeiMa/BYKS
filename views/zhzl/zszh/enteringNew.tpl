{% extends '../parent/layoutvue.tpl' %} {% block title %}肇事肇祸精神病详细信息{%endblock%} {% block style %}{% endblock %} {% block
body %} {%endblock%} {% block content %}
<!--引用样式-->
<!--<link rel="stylesheet" href="/zhzl/zszh/css/style.css" />-->

<style>
	/****************** 面包屑start *************/
	
	.content-header {
		padding-top: 20px;
		padding-bottom: 30px;
	}
	/* 面包屑的靠左  */
	
	.breadcrumb {
		left: 10px;
	}
	/* 面包屑的字体大小  */
	
	.breadcrumb li {
		font-size: 14px;
	}
	/****************** 面包屑end *************/
	/* 头像位置 */
	
	.imgPosition {
		margin-left: 90px;
		margin-top: 20px
	}
	
	.content {
		min-height: 100px;
	}
	
	.nav-tabs {
		border-bottom: none;
	}
</style>

<div class="content-wrapper">
	{% raw %}
	<!--面包屑导航-->
	<section class="content-header">
		<ol class="breadcrumb">
			<li><a href="peopleList1.html"> 服务管理</a></li>
			<li><a href="revisitTable1.html"> 随访记录</a></li>
			<li class="active"> 录入
			</li>
		</ol>
	</section>
	<!--内容-->
	<div class="content">
		<!-- 详细信息內容-->
		<div id="detail" class="bg-white detail-stage">
			<!-- /.modal-content -->
			<!--随访员信息-->
			<div is="bs-tab" :tabs="tabs.hfyTabs">
				<div slot="hfyMain">
					<div class="row">
						<div class="col-md-2">
						</div>
						<div class="col-md-9">
							<div class="form-horizontal form-group-sm">
								<cig-form :fields="fields.hfyMain" data-path="hfyInfo">
								</cig-form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--精神病人员信息-->
			<div is="bs-tab" :tabs="tabs.pdTabs">
				<div slot="main">
					<!--人员基本信息-->
					<div class="row">
						<div class="col-md-2">
							<img v-bind:src="imgUrl" class="imgPosition" />
						</div>
						<div class="col-md-9">
							<div class="form-horizontal form-group-sm">
								<cig-form :fields="fields.main" data-path="mainInfo">
								</cig-form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--监护人信息-->
			<div is="bs-tab" :tabs="tabs.glTabs">
				<div slot="jhrMain">
					<div class="row">
						<div class="col-md-2">
						</div>
						<div class="col-md-9">
							<div class="form-horizontal form-group-sm">
								<cig-form :fields="fields.jhrMain" data-path="jhrInfo"></cig-form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--录入随访信息-->
			<div is="bs-tab" :tabs="tabs.hfTabs">
				<div slot="hfMain">
					<div class="row">
						<div class="col-md-2">
						</div>
						<div class="col-md-9">
							<div class="form-horizontal form-group-sm">
								<cig-form :fields="fields.hfMain" data-path="hfInfo">
								</cig-form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="box-footer">
				<center>
					<button type="button" class="btn btn-primary" @click="save">保存</button>
					<button type="button" class="btn btn-default" @click="back">返回</button>
				</center>
			</div>
		</div>
		{% endraw %}

	</div>
	{% endblock %} {% block script%}
	<script type="text/javascript">
    var curModule = "人口管理/特殊人群/肇事肇祸精神病/服务管理"+(zhzlconfig.getQueryParams().module || "录入详细信息");
    requirejs([
        '{{static}}zhzl/zszh/js/enteringNew.js'], function () {
    });
</script> {% endblock %}
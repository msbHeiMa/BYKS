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
	
	.idCardNum {
		color: #444;
	}
	
	.searchMargin {
		padding-top: 10px;
		padding-bottom: 30px;
	}
</style>

<div class="content-wrapper">
	{% raw %}
	<!--面包屑导航-->
	<section class="content-header">
		<ol class="breadcrumb">
			<li><a href="peopleList1.html"> 服务管理</a></li>
			<li class="active"> 新增人员
			</li>
		</ol>
	</section>
	<!--内容-->
	<div class="content">
		<!-- 详细信息內容-->
		<div id="detail" class="bg-white detail-stage">
			<div class="row form-group-sm form-inline">
				<div class="col-md-12  searchMargin">
					<span class="label-control idCardNum">公民身份号码：</span>
					<input class="form-control" v-model.trim="keyword" @keyup.enter="doSearch()" type="text">
					<button class="btn btn-sm btn-primary" @click="doSearch()">查询</button>
				</div>
			</div>
			<!-- /.modal-content -->
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
			<!--<div is="bs-tab" :tabs="tabs.glTabs">
				<div slot="jhrMain">
					<div class="row">
						<div class="col-md-2">
						</div>
						<div class="col-md-9">
							<div class="form-horizontal form-group-sm">
								<cig-form :fields="jhrMainFields" data-path="jhrInfo">
								</cig-form>
							</div>
						</div>
					</div>
				</div>
			</div>-->
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
    var curModule = "人口管理/特殊人群/肇事肇祸精神病/服务管理";
    requirejs([
        '{{static}}zhzl/zszh/js/addPeople.js'], function () {
    });
</script> {% endblock %}
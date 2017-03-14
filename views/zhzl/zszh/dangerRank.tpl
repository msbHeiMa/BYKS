{% extends '../parent/layoutvue.tpl' %} {% block title %}危险性评估等级变更{%endblock%} {% block style %}{% endblock %} {% block body
%} {%endblock%} {% block content %}
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
	
	.btn-footer {
		margin-top: 50px;
		margin-bottom: 50px;
	}
</style>
<div class="content-wrapper">
	{% raw %}
	<!--面包屑导航-->
	<section class="content-header">
		<ol class="breadcrumb">
			<li><a href="peopleList1.html"> 服务管理</a></li>
			<li class="active"> 危险性评估等级变更
			</li>
		</ol>
	</section>
	<!--内容-->
	<div class="content">
		<!-- 详细信息內容-->
		<div id="detail" class="bg-white detail-stage">
			<!-- /.modal-content -->
			<div is="bs-tab" :tabs="tabs.mainTabs">
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
			<!--肇事肇祸史表-->
			<div is="bs-tab" :tabs="tabs.zszhTabs">
				<div slot="zszh">
					<div class="row">
						<div class="col-md-2"> </div>
						<div class="col-md-9">
							<div class="bootstrap-table">
								<bs-table ref="table" :columns="columns.zszh" :rows="rows1">
								</bs-table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--随访记录表-->
			<div is="bs-tab" :tabs="tabs.recordTabs">
				<div slot="record">
					<div class="row">
						<div class="col-md-2"> </div>
						<div class="col-md-9">
							<div class="bootstrap-table">
								<bs-table ref="table" :columns="columns.record" :rows="rows2">
								</bs-table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--治疗病史表-->
			<div is="bs-tab" :tabs="tabs.zlbsTabs">
				<div slot="zlbs">
					<div class="row">
						<div class="col-md-2"> </div>
						<div class="col-md-9">
							<div class="bootstrap-table">
								<bs-table ref="table" :columns="columns.zlbs" :rows="rows3">
								</bs-table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="btn-footer">
				<center>
					<button type="button" class="btn btn-primary" @click="save">保存</button>
					<button type="button" class="btn btn-default" @click="close">关闭</button>
				</center>
			</div>
		</div>
	</div>
	{% endraw %}
</div>
{% endblock %} {% block script%}
<script type="text/javascript">
    var curModule = "人口管理/特殊人群/肇事肇祸精神病/服务管理";
    requirejs([
        '{{static}}zhzl/zszh/js/dangerRank.js'], function () {
    });
</script> {% endblock %}
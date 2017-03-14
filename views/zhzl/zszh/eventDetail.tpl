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
			<li><a href="event.html"> 事件查看</a></li>
			<li class="active"> 详细信息
			</li>
		</ol>
	</section>
	<!--内容-->
	<div class="content">
		<!-- 详细信息內容-->
		<div id="detail" class="bg-white detail-stage">
			<!-- /.modal-content -->
			<div is="bs-tab" :tabs="tabs.pdTabs">
				<div slot="main">
					<!--基本信息-->
					<div class="form-horizontal form-group-sm">
						<cig-form :fields="fields.main" data-path="mainInfo">
							<textarea slot="fieldslot.sjms" class="form-control" rows="3" cols="2" disabled>{{mainInfo.sjms}}</textarea>
							<textarea slot="fieldslot.beizhu" class="form-control" rows="3" cols="2" disabled>{{mainInfo.beizhu}}</textarea>
						</cig-form>
					</div>
				</div>
			</div>
			<!--事前处理图片信息-->
			<div is="bs-tab" :tabs="tabs.sqTabs">
				<div slot="sqMain">
					<div class="form-horizontal form-group-sm">
						<cig-form :fields="fields.sqMain" data-path="sqInfo">
							<!--<div class="form-control">-->
							<img v-bind:src="sqimgUrl" slot="fieldslot.sqimg" />
							<!--</div>-->
						</cig-form>
					</div>
				</div>
			</div>
			<!--事后处理图片信息-->
			<div is="bs-tab" :tabs="tabs.shTabs">
				<div slot="shMain">
					<div class="form-horizontal form-group-sm">
						<cig-form :fields="fields.shMain" data-path="shInfo">
							<img v-bind:src="shimgUrl" slot="fieldslot.shimg" />
						</cig-form>
					</div>
				</div>
			</div>
		</div>
	</div>
	{% endraw %}

</div>
{% endblock %} {% block script%}
<script type="text/javascript">
    var curModule = "人口管理/特殊人群/肇事肇祸精神病/服务管理";
    requirejs([
        '{{static}}zhzl/zszh/js/eventDetail.js'], function () {
    });
</script> {% endblock %}
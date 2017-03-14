{% extends '../parent/layoutvue.tpl' %} {% block title %}分配网格员{%endblock%} {% block style %}{% endblock %} {% block body
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
	<!--<section class="content-header">
		<ol class="breadcrumb">
			<li><a href="noGridList1.html"> 无网格员</a></li>
			<li class="active"> 分配网格员
			</li>
		</ol>
	</section>-->
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
									<span slot="fieldslot.zlbs" class="form-control" @click="doThisYl">
									       <a href="javascipt:void(0);">随访记录</a>
								        </span>
								</cig-form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--迁入迁出记录-->
			<div is="bs-tab" :tabs="tabs.qrqcTabs">
				<div slot="qrqc">
					<div class="row">
						<div class="col-md-2"> </div>
						<div class="col-md-9">
							<div class="bootstrap-table">
								<bs-table ref="table" :columns="columns.qrqc" :rows="rows">
								</bs-table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--分配网格-->
			<div is="bs-tab" :tabs="tabs.fpwgTabs">
				<div slot="fpwg">
					<div class="row">
						<div class="col-md-2">
						</div>
						<div class="col-md-9">
							<div class="form-horizontal form-group-sm">
								<cig-form :fields="fields.fpwg" data-path="fpwgInfo">
								</cig-form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--footer-->
			<div class="btn-footer">
				<center>
					<button type="button" class="btn btn-primary" @click="save">分配</button>
					<button type="button" class="btn btn-default" @click="close">关闭</button>
				</center>
			</div>
		</div>
		<!--随访记录弹出框   ref="pop"引用的集合    -->
		<div id="ylmodal" is="bs-pop" type="lg" title="随访记录" ref="pop">
			<div ref="alert"></div>
			<div class="bootstrap-table">
				<bs-table ref="table" :columns="tableColumns" :rows="rows">
				</bs-table>
			</div>
		</div>
		<!--弹出框end-->
	</div>
	{% endraw %}
</div>
{% endblock %} {% block script%}
<script type="text/javascript">
    var curModule = "人口管理/特殊人群/肇事肇祸精神病/无网格员";
    requirejs([
        '{{static}}zhzl/zszh/js/noGridAllot1.js'], function () {
    });
</script> {% endblock %}
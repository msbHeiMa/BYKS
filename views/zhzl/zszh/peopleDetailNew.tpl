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
	<!--<section class="content-header">
		<ol class="breadcrumb">
			<li class="active"> 人员详细
			</li>
		</ol>
	</section>-->
	<!--内容-->
	<div class="content">
		<!-- 详细信息內容-->
		<div id="detail" class="bg-white detail-stage">
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
			<!--管理小组信息-->
			<div is="bs-tab" :tabs="tabs.glTabs" @select="glTabSelect">
				<!--监护人信息-->
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
				<!--村委会干部-->
				<div slot="cwhMain">
					<div class="row">
						<div class="col-md-2">
						</div>
						<div class="col-md-9">
							<div class="form-horizontal form-group-sm">
								<cig-form :fields="fields.cwhMain" data-path="cwhInfo"></cig-form>
							</div>
						</div>
					</div>
				</div>
				<!--社区医生信息-->
				<div slot="doctorMain">
					<div class="row">
						<div class="col-md-2">
						</div>
						<div class="col-md-9">
							<div class="form-horizontal form-group-sm">
								<cig-form :fields="fields.doctorMain" data-path="doctorInfo"></cig-form>
							</div>
						</div>
					</div>
				</div>
				<!--社区警察信息-->
				<div slot="policeMain">
					<div class="row">
						<div class="col-md-2">
						</div>
						<div class="col-md-9">
							<div class="form-horizontal form-group-sm">
								<cig-form :fields="fields.policeMain" data-path="policeInfo"></cig-form>
							</div>
						</div>
					</div>
					</d>
				</div>
			</div>
			<!--肇事肇祸信息-->
			<div is="bs-tab" :tabs="tabs.zhTabs">
				<div slot="zhMain">
					<div class="row">
						<div class="col-md-2">
						</div>
						<div class="col-md-9">
							<div class="form-horizontal form-group-sm">
								<cig-form :fields="fields.zhMain" data-path="zhInfo">
									<span slot="fieldslot.cTroubleCount" class="form-control" @click="doThisZs">
									       <a href="javascipt:void(0);">肇事肇祸次数</a>
								        </span>
								</cig-form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--医疗信息-->
			<div is="bs-tab" :tabs="tabs.ylTabs">
				<div slot="ylMain">
					<div class="row">
						<div class="col-md-2">
						</div>
						<div class="col-md-9">
							<div class="form-horizontal form-group-sm">
								<cig-form :fields="fields.ylMain" data-path="ylInfo">
									<span slot="fieldslot.zlbs" class="form-control" @click="doThisYl">
									       <a href="javascipt:void(0);" >治疗病史</a>
								        </span>
								</cig-form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--财务信息-->
			<div is="bs-tab" :tabs="tabs.cwTabs">
				<div slot="cwMain">
					<div class="row">
						<div class="col-md-2">
						</div>
						<div class="col-md-9">
							<div class="form-horizontal form-group-sm">
								<cig-form :fields="fields.cwMain" data-path="cwInfo">
									<span slot="fieldslot.caiwu" class="form-control">
									        <a href="javascipt:void(0);"><i class="fa fa-hand-o-right">房屋</i></a>
								        </span>
									<span slot="fieldslot.cheliang" class="form-control">
									        <a href="javascipt:void(0);"><i class="fa fa-hand-o-right">车辆</i></a>
									   </span>
									<span slot="fieldslot.yhcunkuang" class="form-control">
									        <a href="javascipt:void(0);"><i class="fa fa-hand-o-right">银行存款</i></a>
								        </span>
								</cig-form>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--迁入迁出记录-->
			<div is="bs-tab" :tabs="tabs.qrTabs" v-if="role != 'wanggeyuan'">
				<div slot="qrMain">
					<div class="row">
						<div class="col-md-2">
						</div>
						<div class="col-md-9">
							<div class="bootstrap-table">
								<bs-table :columns="tableColumns" :rows="qrRows">
								</bs-table>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--帮扶情况-->
			<!--<div is="bs-tab" :tabs="tabs.bfTabs">
				<div slot="bfMain">
					<div class="row">
						<div class="col-md-2">
						</div>
						<div class="col-md-9">
							<div class="form-horizontal form-group-sm">
								<cig-form :fields="fields.bfMain" data-path="bfInfo">
									<span slot="fieldslot.minzheng" class="form-control">
									        <a href="javascipt:void(0);"><i class="fa fa-hand-o-right">民政</i></a>
								        </span>
									<span slot="fieldslot.canlian" class="form-control">
									        <a href="javascipt:void(0);"><i class="fa fa-hand-o-right">残联</i></a>
									   </span>
									<span slot="fieldslot.renshe" class="form-control">
									        <a href="javascipt:void(0);"><i class="fa fa-hand-o-right">人社</i></a>
								        </span>
									<span slot="fieldslot.caizheng" class="form-control">
									        <a href="javascipt:void(0);"><i class="fa fa-hand-o-right">财政</i></a>
								        </span>
								</cig-form>
							</div>
						</div>
					</div>
				</div>
			</div>-->
		</div>
		<!--治疗病史弹出框   ref="pop"引用的集合    -->
		<div id="ylmodal" is="bs-pop" type="lg" title="治疗病史" ref="pop">
			<div ref="alert"></div>
			<!-- /.modal-content -->
			<div class="bootstrap-table">
				<bs-table ref="table" :columns="tableColumns" :rows="rows">
				</bs-table>
			</div>
		</div>
		<!--肇事次数弹出框   ref="pop"引用的集合    -->
		<div id="zsmodal" is="bs-pop" type="lg" title="肇事次数" ref="pop">
			<div ref="alert"></div>
			<div class="bootstrap-table">
				<bs-table ref="table" :columns="tableColumns" :rows="rows">
				</bs-table>
			</div>
		</div>
		{% endraw %}

	</div>
	{% endblock %} {% block script%}
	<script type="text/javascript">
    var curModule = "人口管理/特殊人群/肇事肇祸精神病/服务管理";
    requirejs([
        '{{static}}zhzl/zszh/js/peopleDetailNew.js'], function () {
    });
</script> {% endblock %}
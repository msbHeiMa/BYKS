{% extends '../parent/layoutvue.tpl' %} 
{% block title %}流程业务角色{%endblock%} 
{% block style %} 
<style>
    body{
		padding-right:0 !important;
	}
 	textarea{
       resize:none !important;
	   width:45%;
    }
	dd{
		width:45%
	}
	#success .ziti{
		text-align: -webkit-center;
        font-size: 30px;
	}
	#success .xianshi{
		text-align: -webkit-center;
        font-size: 100px;
	}
	#failure .ziti{
		text-align: -webkit-center;
        font-size: 30px;
	}
	#failure .xianshi{
		text-align: -webkit-center;
        font-size: 100px;
	}
</style>
{% endblock %} 
{% block body %}
	
{%endblock%} 
{% block content %}
<div class="content-wrapper">
	<section class="content-header">
		<h3 id="roleshow">		
          流程业务角色
		</h3>	
	</section>
	{% include "../parent/queryTable.tpl" %}
	<div id="add" is="bs-pop" type="mg" title="流程角色管理-新增角色" ref="pop" >
		<div ref="alert"></div>
		<div class="form-horizontal form-group-sm">
			<cig-form :fields="fields" data-path="info"  ref="form">
			</cig-form>

		</div>
		<template slot="footer">
			<button type="button" class="btn btn-primary" @click="save">保存</button>
			<button type="button" class="btn btn-default" @click="close">取消</button>		
		</template>
	</div>
	<div id="edit" is="bs-pop" type="mg" title="流程角色管理-编辑角色" ref="pop" >
		<div ref="alert"></div>
		<div class="form-horizontal form-group-sm">
			<cig-form :fields="fields" data-path="info"  ref="form">
			</cig-form>

		</div>
		<template slot="footer">
			<button type="button" class="btn btn-primary" @click="save">保存</button>
			<button type="button" class="btn btn-default" @click="close">取消</button>		
		</template>
	</div>
	<div id="success" is="bs-pop" type="mg"  ref="pop" >
		<div ref="alert"></div>
		<div class="form-horizontal form-group-sm">
			<div class="ziti">操作成功</div>
			<div class="xianshi">
				<b class="glyphicon glyphicon-ok-sign" style="color:green"></b>
			</div>
		</div>
		<template slot="footer">
			<button type="button" class="btn btn-primary" @click="save">确定</button>
			<button type="button" class="btn btn-default" @click="close">取消</button>		
		</template>
	</div>
	<div id="failure" is="bs-pop" type="mg"  ref="pop" >
		<div ref="alert"></div>
		<div class="form-horizontal form-group-sm">
			<div class="ziti">操作失败</div>
			<div class="xianshi">
				<b class="glyphicon glyphicon-remove-sign " style="color:red"></b>
			</div>
		</div>
		<template slot="footer">
			<button type="button" class="btn btn-primary" @click="save">确定</button>
			<button type="button" class="btn btn-default" @click="close">取消</button>		
		</template>
	</div>
</div>

{% endblock %}
{% block script%}
<script type="text/javascript">
    requirejs([
        '{{static}}zhzl/lcgl/js/role.js'], function () {
    });
</script>
{% endblock %}
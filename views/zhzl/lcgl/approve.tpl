{% extends '../parent/layoutvue.tpl' %} 
{% block title %}流程角色管理-配置审批人{%endblock%} 
{% block style %} 
<style>
    body{
		padding-right:0 !important;
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
    #warning .ziti{
		text-align: -webkit-center;
        font-size: 30px;
	}
	#warning .xianshi{
		text-align: -webkit-center;
        font-size: 100px;
	}
</style>
{% endblock %} 
{% block body %}
	
{%endblock%} 
{% block content %}

<div class="content-wrapper">
    {% raw %}
     <section class="content-header">
            <h3>		
               流程角色管理-配置审批人
            </h3>	
    </section>
<div class="content">
    <div id="detail" class="bg-white detail-stage">
        <!-- /.modal-content -->
        <cig-table-filter v-if="filters && filters.length > 0" :filters="filters" :domain-ajax-options="domainAjaxOptions" v-model="filter" @input="doSearch_kpzyh()"></cig-table-filter>
        
        <div is="bs-tab" :tabs="tabs.kpzyhTabs">
            <div slot="kpzyh">
                <!--角色-->
                <div class="fixed-table-toolbar">
                <div class="bs-bars pull-left cig-bars">
                    <template v-for="btn in btns_kpzyh">
                        <button v-if="btn.visible !== false"
                            :class="['btn btn-sm',btn.baseClass, btn.disabled ? 'disabled' : btn.enableClass]" 
                            :disabled="btn.disabled" 
                            @click="executeCommand(btn.id)">{{btn.name}}</button>
                    </template>
                </div>
                <div class="columns columns-right btn-group pull-right">
                </div>
                <div class="pull-right search">
                    <input class="form-control" v-model="keyword_kpzyh" @keyup.enter="doSearch_kpzyh()" type="text" placeholder="搜索">
                </div>
                </div>
                <div class="bootstrap-table">
                    <cig-table ref="table"
                        :config="tableConfig.kpzyh"
                        :columns="columns.kpzyh"
                        :ajax-options="tableAjaxOptions_kpzyh">
                    </cig-table>
                </div>
            </div>
        </div>
        <div is="bs-tab" :tabs="tabs.jsxyhTabs">
            <div slot="jsxyh">
                <!--用户-->
                <div class="fixed-table-toolbar">
                
                <div class="columns columns-right btn-group pull-right">
                </div>
                <div class="pull-right search">
                    <input class="form-control" v-model="keyword_jsxyh" @keyup.enter="doSearch_jsxyh()" type="text" placeholder="搜索">
                </div>
               </div>
                <div class="bootstrap-table">
                    <cig-table ref="table"
                        :config="tableConfig.jsxyh"
                        :columns="columns.jsxyh"
                        :ajax-options="tableAjaxOptions_jsxyh">
                    </cig-table>
                </div>
            </div>
        </div>
    </div>
    <div id="warning" is="bs-pop" type="mg"  ref="pop" >
		<div ref="alert"></div>
		<div class="form-horizontal form-group-sm">
			<div class="ziti">{{ message }}</div>
			<div class="xianshi">
				<b class="glyphicon glyphicon-exclamation-sign" style="color:red"></b>
			</div>
		</div>
		<template slot="footer">
			<button type="button" class="btn btn-primary" @click="save">确定</button>
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
    {% endraw %}
</div>

{% endblock %}

{% block script%}
<script type="text/javascript">
    requirejs([
        '{{static}}zhzl/lcgl/js/approve.js'], function () {
    });
</script>
{% endblock %}
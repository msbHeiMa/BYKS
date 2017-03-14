{% extends 'parent/layoutvue.tpl' %} 
{% block title %}vue样例{%endblock%} 
{% block style %} 

{% endblock %} 
{% block body %}
	
{%endblock%} 
{% block content %}

<div class="content-wrapper">
<!--因为tpl和vue模板冲突，所以加上raw，直接输出里面的内容-->
{% raw %}
    <div id="main">
        <p>Original message: "{{ message }}"</p>
        <p>Computed reversed message: "{{ reversedMessage }}"</p>
    </div>

	<div id="test" >
		<cig-dep-map :map="map"></cig-dep-map>
		<bs-list :multi="true" :data="list"></bs-list>
		<cig-table-filter :filters="filters" v-model="filter"></cig-table-filter>
		<bs-table :columns="columns" :config="{checkbox:true}">
		</bs-table>
		<bs-table :columns="columns2" :config="{checkbox:true}">
		</bs-table>
		<div class="form-group-sm">
			<cig-form :fields="fields" data-path="data" :fields-render="render">
			</cig-form>
		</div>
	</div>
    
    <div class="bootstrap-table" id="tableLayout">
        <div class="fixed-table-toolbar">
            <div class="t-bs-bars pull-left">
                <t-bs-toolbar id="toolbar" :btns="btns"></t-bs-toolbar>
            </div>
            <div class="columns columns-right btn-group pull-right">
            </div>
            <div class="pull-right search">
                <input class="form-control" v-model="keyword" @keyup.enter="doSearch()" type="text" placeholder="搜索">
            </div>
        </div>
        <div id="table">
            <t-bs-table
                :config="table.config"
                :columns="table.columns"
                :loading="table.loading"
                :rows="table.rows"
                :pager="table.pager">
            </t-bs-table>
        </div>
    </div>
	<div class="row" id="tree" style="margin: 0;">
		<t-bs-list-group :data="list"></t-bs-list-group>
		<t-bs-list-group :data="list" panel="dl" item-component='<dd>{{item}}</dd>'></t-bs-list-group>
		<t-bs-list-group :data="list" panel="div" item-component='<span>{{item}}</span>'></t-bs-list-group>
		<t-bs-tree 
			:data="tree" 
			nodes-path="nodes" 
			node-component="<span>{{item.name}}</span>"
			v-model="treeSelect"
			></t-bs-tree>
		<t-bs-button @click="alertSelect()" name="不同"></t-bs-button>
	</div>
	<div class="row" id="form">
		<t-bs-form class="form-horizontal" :data="form.data">
			<div slot="form-body" class="box-body">
				<div class="form-group">
					<label class="col-sm-3 col-md-2 control-label">所属网格</label>
					<div class="col-sm-6 col-md-10">
						<!--<cig-dep rest="zhzlBackend/system/current" range="current" :select="form.data.depId">
						</cig-dep>-->
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 col-md-2 control-label">姓名</label>
					<div class="col-sm-6 col-md-5 ">
						<input type="text" class="form-control" v-model="form.data.name">
						<!--<select id="nameSelect" class="selectpicker show-tick form-control" data-live-search="true" onChange="nameChange()">  
						</select>-->
					</div>
					<div class="col-sm-6 col-md-4 ">
						<button type="button" @click="findPerson()">搜索</button>
					</div>
				</div>
				<table class="col-sm-4" id="table" data-toggle="table" data-striped="true"></table>
				<!--下面为读取数据-->
				<div class="form-group" style="margin-top:15px">
					<label class="col-sm-3 col-md-2 control-label">身份证号</label>
					<div class="col-sm-3 col-md-4">
						<input type="text" class="form-control" name="cardNum" v-model="form.serchResult.cardNum">
					</div>
					<label class="col-sm-3 col-md-2 control-label">出生日期</label>
					<div class="col-sm-3 col-md-4">
						<input type="date" class="form-control" name="birthDate" v-model="form.serchResult.birthDate">
					</div>
				</div>
				<div class="form-group">
					<!--<cig-options name="gender"></cig-options>-->
					<label class="col-sm-3 col-md-2 control-label">性别</label>
					<div class="col-sm-3 col-md-4">
						<input type="text" class="form-control" name="gender" v-model="form.serchResult.gender">
					</div>
					<label class="col-sm-2 col-md-2 control-label">曾用名</label>
					<div class="col-sm-3 col-md-4">
						<input type="text" class="form-control" name="userdName" id="userdName">
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-2 col-md-2 control-label">电子邮箱</label>
					<div class="col-sm-3 col-md-4">
						<input type="text" class="form-control" name="email" id="email">
					</div>
					<label class="col-sm-2 col-md-2 control-label">职业</label>
					<div class="col-sm-3 col-md-4">
						<input type="text" class="form-control" name="occupation" id="occupation">
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 col-md-2 control-label">身高</label>
					<div class="col-sm-3 col-md-4">
						<input type="text" class="form-control" name="height" id="height">
					</div>
					<label class="col-sm-2 col-md-2 control-label">血型</label>
					<div class="col-sm-3 col-md-4">
						<input type="text" class="form-control" name="bloodType" id="bloodType">
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 col-md-2 control-label">宗教信仰</label>
					<div class="col-sm-3 col-md-4">
						<input type="text" class="form-control" name="relBelief" id="relBelief">
					</div>
					<label class="col-sm-3 col-md-2 control-label">现住地</label>
					<div class="col-sm-3 col-md-4">
						<input type="text" class="form-control" name="residence" id="residence">
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 col-md-2 control-label">户籍</label>
					<div class="col-sm-3 col-md-4">
						<input type="text" class="form-control" name="domicile" id="domicile">
					</div>
					<label class="col-sm-2 col-md-2 control-label">户籍派出所</label>
					<div class="col-sm-3 col-md-4">
						<input type="text" class="form-control" name="policeStation" id="policeStation">
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 col-md-2 control-label">户籍详细地</label>
					<div class="col-sm-6 col-md-10">
						<input type="text" class="form-control" name="dAddr" id="dAddr">
					</div>
				</div>
				<div class="form-group">
					<label class="col-sm-3 col-md-2 control-label">现住地详细地址</label>
					<div class="col-sm-6 col-md-10">
						<input type="text" class="form-control" name="rAddr" id="rAddr">
					</div>
				</div>
				<!--下面为输入数据-->
				<div class="form-group">
					<label class="col-sm-3 col-md-2 control-label">家庭经济情况</label>
					<div class="col-sm-3 col-md-4">
						<input type="text" class="form-control" name="ecoSituatio" id="ecoSituatio">
					</div>
					<label class="col-sm-3 col-md-2 control-label">是否纳入低保</label>
					<div class="col-sm-3 col-md-4">
						<select name="isEfficiency" id="isEfficiency" class="form-control">
							<option>-请选择-</option>
							<option value="0">是</option>
							<option value="1">否</option>
						</select>
					</div>
				</div>
			</div>
		</t-bs-form>
	</div>
{% endraw %}
</div>
{% endblock %}

{% block script%}
<script type="text/javascript">
    requirejs([
        '{{static}}zhzl/vueSample.js'], function (sample) {
    });
</script>
{% endblock %}
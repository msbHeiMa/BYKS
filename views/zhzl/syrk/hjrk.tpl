{% extends '../parent/layoutvue.tpl' %} 
{% block title %}户籍人口{%endblock%} 
{% block style %} 

{% endblock %} 
{% block body %}
	
{%endblock%} 
{% block content %}

<div class="content-wrapper">
{% include "../parent/queryTable.tpl" %}
</div>
{% raw %}
<div id="add" is="bs-pop" 
    type="lg" title="县内人员流入" ref="pop">
    <div ref="alert"></div>
    <div class="row form-group-sm form-inline">
        <div class="col-md-12" style="text-align: center;">
            <label class="label-control">身份证号码：</label>
            <input class="form-control" maxlength="18" v-model.trim="keyword" @keyup.enter="doSearch()" type="text" >
            <button class="btn btn-sm btn-danger" :disabled="!keyword" @click="doSearch()">查询</button>
        </div>
    </div>
    <div class="form-horizontal form-group-sm">
        <cig-form :fields="fields" data-path="data" ref="form">
        </cig-form>
    </div>
    <template slot="footer">
        <button type="button" class="btn btn-default" @click="close">关闭</button>
        <button type="button" class="btn btn-primary" @click="save">保存</button>
    </template>
</div>
<div id="edit" is="bs-pop" 
    type="lg" title="信息维护" ref="pop">
    <div ref="alert"></div>
    <!-- /.modal-content -->
    <div class="form-horizontal form-group-sm">
        <cig-form :fields="fields" data-path="data" ref="form">
            <div slot="fieldslot.residence" class="form-control">
                <cig-area
                    :loading="false" 
                    :data="hjd" 
                    value-path="id" 
                    name-path="text" 
                    nodes-path="nodes" 
                    v-model="data.residence" 
                    node-component="<span>{{item.text}}</span>" 
                ></cig-area>
            </div>
        </cig-form>
    </div>
    <template slot="footer">
        <button type="button" class="btn btn-default" @click="close">关闭</button>
        <button type="button" class="btn btn-primary" @click="save">保存</button>
    </template>
</div>
<div id="remove" is="bs-pop"
    type="lg" title="人员流出" ref="pop">
    <div ref="alert"></div>
    <div class="form-horizontal form-group-sm">
        <cig-form :fields="filterFields" data-path="data" ref="form">
            <div slot="fieldslot.inGId" class="form-control">
                <cig-ajax-area
                    :ajax-options="areaAjaxOptions" 
                    v-model="data.inGId" 
                    empty-text="请选择"></cig-ajax-area>
            </div>
        </cig-form>
    </div>
    <template slot="footer">
        <button type="button" class="btn btn-default" @click="close">关闭</button>
        <button type="button" class="btn btn-primary" @click="save">保存</button>
    </template>
</div>
{% endraw %}

{% endblock %}

{% block script%}
<script type="text/javascript">
    var curModule = "人口管理/实有人口/户籍人口";
    requirejs([
        '{{static}}zhzl/syrk/hjrk.js'], function () {
    });
</script>
{% endblock %}
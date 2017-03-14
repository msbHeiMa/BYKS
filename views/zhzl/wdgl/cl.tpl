{% extends '../parent/layoutvue.tpl' %} 
{% block title %}车辆{%endblock%} 
{% block style %} 

{% endblock %} 
{% block body %}
	
{%endblock%} 
{% block content %}

<div class="content-wrapper">
{% include "../parent/queryTable.tpl" %}
</div>

{%raw%}
<div id="edit" is="bs-pop" 
    type="lg" title="编辑车辆" ref="pop">
    <div ref="alert"></div>
    <div class="form-horizontal form-group-sm">
        <cig-form :fields="fields" data-path="data" ref="form">
            <span slot="fieldslot.pName" class="form-control">
                <a target='_blank' :href='data.pId?"../syrk/rkDetail.html?id="+data.pId:"javascript:;"'>{{data.pName}}</a>
            </span>
            <cig-person-selector slot="fieldslot.pId"
                v-model="data.pCardNum"
                :data-mapper="{
                        id:'pId',
                        cardNum:'pCardNum',
                        name:'pName',
                        phone:'pPhone',
                        address:'pAddress',
                        isSameGrid:'isSameGrid',
                    }"
                :data="data">
            </cig-person-selector>
            <cig-files slot="fieldslot.carImage"
                wrap-class="form-control"
                :bus-id="id"
                v-model="data.carImage"
                file-type="car">
            </cig-files>
        </cig-form>
    </div>
    <template slot="footer">
        <button type="button" class="btn btn-default" @click="close">关闭</button>
        <button type="button" class="btn btn-primary" @click="save">保存</button>
    </template>
</div>
<div id="add" is="bs-pop" 
    type="lg" title="添加车辆" ref="pop">
    <div ref="alert"></div>
    <div class="form-horizontal form-group-sm">
        <cig-form :fields="fields" data-path="data" ref="form">
            <span slot="fieldslot.pName" class="form-control">
                <a target='_blank' :href='data.pId?"../syrk/rkDetail.html?id="+data.pId:"javascript:;"'>{{data.pName}}</a>
            </span>
            <cig-person-selector slot="fieldslot.pId"
                v-model="data.pCardNum"
                :data-mapper="{
                        id:'pId',
                        cardNum:'pCardNum',
                        name:'pName',
                        phone:'pPhone',
                        address:'pAddress',
                        isSameGrid:'isSameGrid',
                    }"
                :data="data">
            </cig-person-selector>
            <cig-files slot="fieldslot.carImage" ref="carImage"
                wrap-class="form-control"
                v-model="data.carImage"
                file-type="car">
            </cig-files>
        </cig-form>
    </div>
    <template slot="footer">
        <button type="button" class="btn btn-default" @click="close">关闭</button>
        <button type="button" class="btn btn-primary" @click="save">保存</button>
    </template>
</div>
{%endraw%}

{% endblock %}

{% block script%}
<script type="text/javascript">
    var curModule = "物的管理/车辆";
    requirejs([
        '{{static}}zhzl/wdgl/cl.js'], function () {
    });
</script>
{% endblock %}
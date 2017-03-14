{% extends '../parent/layoutvue.tpl' %} 
{% block title %}楼栋{%endblock%} 
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
    type="lg" title="编辑楼栋" ref="pop">
    <div ref="alert"></div>
    <div class="form-horizontal form-group-sm">
        <cig-form :fields="formFields" data-path="data" :fields-render="groupRender" ref="form">
            <span slot="fieldslot.pName" class="form-control">
                <a target='_blank' :href='data.cqId?"../syrk/rkDetail.html?id="+data.cqId:"javascript:;"'>{{data.cqName}}</a>
            </span>
            <cig-person-selector slot="fieldslot.cqId"
                v-model="data.cqCardNum"
                :data-mapper="{
                        id:'cqId',
                        cardNum:'cqCardNum',
                        name:'cqName',
                        phone:'cqPhone'}"
                :data="data">
            </cig-person-selector>
            <span slot="fieldslot.ldzName" class="form-control">
                <a target='_blank' :href='data.ldzId?"../syrk/rkDetail.html?id="+data.ldzId:"javascript:;"'>{{data.ldzName}}</a>
            </span>
            <cig-person-selector slot="fieldslot.ldzId"
                v-model="data.ldzCardNum"
                :data-mapper="{
                        id:'ldzId',
                        cardNum:'ldzCardNum',
                        name:'ldzName',
                        phone:'ldzPhone'}"
                :data="data">
            </cig-person-selector>
            <cig-address-selector slot="fieldslot.addressDetail"
                :data="data"
                >
            </cig-address-selector>
            <cig-files slot="fieldslot.buildingImage"
                wrap-class="form-control"
                :bus-id="id"
                v-model="data.buildingImage"
                file-type="building">
            </cig-files>
        </cig-form>
    </div>
    <template slot="footer">
        <button type="button" class="btn btn-default" @click="close">关闭</button>
        <button type="button" class="btn btn-primary" @click="save">保存</button>
    </template>
</div>
<div id="editPart" is="bs-pop" 
    type="lg" title="编辑楼栋" ref="pop">
    <div ref="alert"></div>
    <div class="form-horizontal form-group-sm">
        <cig-form :fields="formFields" data-path="data" :fields-render="groupRender" ref="form">
            <span slot="fieldslot.pName" class="form-control">
                <a target='_blank' :href='data.cqId?"../syrk/rkDetail.html?id="+data.cqId:"javascript:;"'>{{data.cqName}}</a>
            </span>
            <cig-person-selector slot="fieldslot.cqId"
                v-model="data.cqCardNum"
                :data-mapper="{
                        id:'cqId',
                        cardNum:'cqCardNum',
                        name:'cqName',
                        phone:'cqPhone'}"
                :data="data">
            </cig-person-selector>
            <span slot="fieldslot.ldzName" class="form-control">
                <a target='_blank' :href='data.ldzId?"../syrk/rkDetail.html?id="+data.ldzId:"javascript:;"'>{{data.ldzName}}</a>
            </span>
            <cig-person-selector slot="fieldslot.ldzId"
                v-model="data.ldzCardNum"
                :data-mapper="{
                        id:'ldzId',
                        cardNum:'ldzCardNum',
                        name:'ldzName',
                        phone:'ldzPhone'}"
                :data="data">
            </cig-person-selector>
            <span slot="fieldslot.addressDetail" class="form-control">
                {{data.place + data.addressDetail}}
            </span>
            <cig-files slot="fieldslot.buildingImage"
                wrap-class="form-control"
                :bus-id="id"
                v-model="data.buildingImage"
                file-type="building">
            </cig-files>
        </cig-form>
    </div>
    <template slot="footer">
        <button type="button" class="btn btn-default" @click="close">关闭</button>
        <button type="button" class="btn btn-primary" @click="save">保存</button>
    </template>
</div>
<div id="add" is="bs-pop" 
    type="lg" title="添加楼栋" ref="pop">
    <div ref="alert"></div>
    <div class="form-horizontal form-group-sm">
        <cig-form :fields="fields" data-path="data" :fields-render="groupRender" ref="form">
            <span slot="fieldslot.pName" class="form-control">
                <a target='_blank' :href='data.cqId?"../syrk/rkDetail.html?id="+data.cqId:"javascript:;"'>{{data.cqName}}</a>
            </span>
            <cig-person-selector slot="fieldslot.cqId"
                v-model="data.cqCardNum"
                :data-mapper="{
                        id:'cqId',
                        cardNum:'cqCardNum',
                        name:'cqName',
                        phone:'cqPhone'}"
                :data="data">
            </cig-person-selector>
            <span slot="fieldslot.ldzName" class="form-control">
                <a target='_blank' :href='data.ldzId?"../syrk/rkDetail.html?id="+data.ldzId:"javascript:;"'>{{data.ldzName}}</a>
            </span>
            <cig-person-selector slot="fieldslot.ldzId"
                v-model="data.ldzCardNum"
                :data-mapper="{
                        id:'ldzId',
                        cardNum:'ldzCardNum',
                        name:'ldzName',
                        phone:'ldzPhone'}"
                :data="data">
            </cig-person-selector>
            <cig-address-selector slot="fieldslot.addressDetail"
                :data="data"
                >
            </cig-address-selector>
            <cig-files slot="fieldslot.buildingImage"
                wrap-class="form-control"
                v-model="data.buildingImage"
                file-type="building">
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
    var curModule = "物的管理/楼栋";
    requirejs([
        '{{static}}zhzl/wdgl/ld.js'], function () {
    });
</script>
{% endblock %}
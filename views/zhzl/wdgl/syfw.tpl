{% extends '../parent/layoutvue.tpl' %} 
{% block title %}实有房屋{%endblock%} 
{% block style %} 

{% endblock %} 
{% block body %}
	
{%endblock%} 
{% block content %}

<div class="content-wrapper">
{% include "../parent/queryTable.tpl" %}
</div>
{%raw%}
<div id="add" is="bs-pop" 
    type="lg" title="添加房屋" ref="pop">
    <div ref="alert"></div>
    <div class="form-horizontal form-group-sm">
        <cig-form :fields="formFields" data-path="data" ref="form">
            <cig-address-selector slot="fieldslot.bId"
                :detail-data-mapper="{
                    addressDetail:'addressDetail',
                    bId:'bId',
                    bInfo:'bInfo'
                }"
                :place-ajax="placeAjax"
                :detail-ajax="detailAjax"
                :data="data"
                >
            </cig-address-selector>
            <cig-files slot="fieldslot.houseImage" ref="houseImage"
                wrap-class="form-control"
                v-model="data.houseImage"
                file-type="house">
            </cig-files>
            <span slot="fieldslot.cqName" class="form-control">
                <a target='_blank' :href='data.cqId?"../syrk/rkDetail.html?id="+data.cqId:"javascript:;"'>{{data.cqName}}</a>
            </span>
            <template slot="fieldslot.cqId">
                <span v-if="data.bInfo && data.bInfo.isSingleRight == 1" class="form-control">
                    {{data.cqCardNum}}
                </span>
                <cig-person-selector v-else
                    v-model="data.cqCardNum"
                    :data-mapper="{
                            id:'cqId',
                            cardNum:'cqCardNum',
                            name:'cqName',
                            phone:'cqPhone'}"
                    :data="data">
                </cig-person-selector>
            </template>
        </cig-form>
    </div>
    <div class="bootstrap-table form-group-sm">
        <div class="fixed-table-toolbar">
            <div class="bs-bars pull-left">
                <h4>居住信息</h4>
            </div>
            <div class="columns columns-right btn-group pull-right cig-bars">
                <button class="btn btn-sm btn-danger" @click="addPerson">新增</button>
            </div>
        </div>
        <bs-edit-table ref="personTable"
            :loading='persons == null'
            :rows='persons || []'
            :columns='personsColumns'>
        </bs-edit-table>
    </div>
    <template slot="footer">
        <button type="button" class="btn btn-default" @click="close">关闭</button>
        <button type="button" class="btn btn-primary" @click="save">保存</button>
    </template>
</div>
<div id="edit" is="bs-pop" 
    type="lg" title="编辑房屋" ref="pop">
    <div ref="alert"></div>
    <div class="form-horizontal form-group-sm">
        <cig-form :fields="formFields" data-path="data" ref="form">
            <cig-address-selector slot="fieldslot.bId"
                :detail-data-mapper="{
                    addressDetail:'addressDetail',
                    bId:'bId',
                    bInfo:'bInfo'
                }"
                :place-ajax="placeAjax"
                :detail-ajax="detailAjax"
                :data="data"
                >
            </cig-address-selector>
            <cig-files slot="fieldslot.houseImage"
                wrap-class="form-control"
                :bus-id="id"
                v-model="data.houseImage"
                file-type="house">
            </cig-files>
            <span slot="fieldslot.cqName" class="form-control">
                <a target='_blank' :href='data.cqId?"../syrk/rkDetail.html?id="+data.cqId:"javascript:;"'>{{data.cqName}}</a>
            </span>
            <template slot="fieldslot.cqId">
                <span v-if="data.bInfo && data.bInfo.isSingleRight == 1" class="form-control">
                    {{data.cqCardNum}}
                </span>
                <cig-person-selector v-else
                    v-model="data.cqCardNum"
                    :data-mapper="{
                            id:'cqId',
                            cardNum:'cqCardNum',
                            name:'cqName',
                            phone:'cqPhone'}"
                    :data="data">
                </cig-person-selector>
            </template>
        </cig-form>
    </div>
    <div class="bootstrap-table form-group-sm">
        <div class="fixed-table-toolbar">
            <div class="bs-bars pull-left">
                <h4>居住信息</h4>
            </div>
            <div class="columns columns-right btn-group pull-right cig-bars">
                <button class="btn btn-sm btn-danger" @click="addPerson">新增</button>
            </div>
        </div>
        <bs-edit-table ref="personTable"
            :loading='persons == null'
            :rows='persons || []'
            :columns='personsColumns'>
        </bs-edit-table>
    </div>
    <template slot="footer">
        <button type="button" class="btn btn-default" @click="close">关闭</button>
        <button type="button" class="btn btn-primary" @click="save">保存</button>
    </template>
</div>
<div id="editPart" is="bs-pop" 
    type="lg" title="编辑房屋" ref="pop">
    <div ref="alert"></div>
    <div class="form-horizontal form-group-sm">
        <cig-form :fields="formFields" data-path="data" ref="form">
            <span slot="fieldslot.bId" class="form-control">
                <a target='_blank' :href='data.bId?"../ldDetail.html?id="+data.bId:"javascript:;"'>{{data.place + data.addressDetail}}</a>
            </span>
            <cig-files slot="fieldslot.houseImage"
                wrap-class="form-control"
                :bus-id="id"
                v-model="data.houseImage"
                file-type="house">
            </cig-files>
            <span slot="fieldslot.cqName" class="form-control">
                <a target='_blank' :href='data.cqId?"../syrk/rkDetail.html?id="+data.cqId:"javascript:;"'>{{data.cqName}}</a>
            </span>
            <span slot="fieldslot.cqId" class="form-control">
                {{data.cqCardNum}}
            </span>
        </cig-form>
    </div>
    <div class="bootstrap-table form-group-sm">
        <div class="fixed-table-toolbar">
            <div class="bs-bars pull-left">
                <h4>居住信息</h4>
            </div>
            <div class="columns columns-right btn-group pull-right cig-bars">
                <button class="btn btn-sm btn-danger" @click="addPerson">新增</button>
            </div>
        </div>
        <bs-edit-table ref="personTable"
            :loading='persons == null'
            :rows='persons || []'
            :columns='personsColumns'>
        </bs-edit-table>
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
    var curModule = "物的管理/实有房屋";
    requirejs([
        '{{static}}zhzl/wdgl/syfw.js'], function () {
    });
</script>
{% endblock %}
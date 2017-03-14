{% extends '../parent/layoutvue.tpl' %} 
{% block title %}户籍维护{%endblock%} 
{% block style %} 

{% endblock %} 
{% block body %}
	
{%endblock%} 
{% block content %}

<div class="content-wrapper">
{% include "../parent/queryTable.tpl" %}
</div>

{% raw %}
<div id="edit" is="bs-pop" 
    type="lg" title="信息维护" ref="pop">
    <div ref="alert"></div>
    <!-- /.modal-content -->
    <h4>基本信息</h4>
    <div class="form-horizontal form-group-sm">
        <cig-form :fields="fields" data-path="data" ref="form">
        </cig-form>
    </div>
    <div class="bootstrap-table">
        <div class="fixed-table-toolbar">
            <div class="bs-bars pull-left">
                <h4>家庭成员信息</h4>
            </div>
            <div class="columns columns-right btn-group pull-right cig-bars">
            </div>
        </div>
        <bs-table
            :loading='hjcyRows == null'
            :rows='hjcyRows || []'
            :columns='hjcyColumns'>
        </bs-table>
    </div>
    <div class="bootstrap-table form-group-sm">
        <div class="fixed-table-toolbar">
            <div class="bs-bars pull-left">
                <h4>亲属关系</h4>
            </div>
            <div class="columns columns-right btn-group pull-right cig-bars">
                <button class="btn btn-sm btn-danger" @click="addHzqs">新增</button>
            </div>
        </div>
        <bs-edit-table ref="hzqsTable"
            :loading='hzqsRows == null'
            :rows='hzqsRows || []'
            :columns='hzqsColumns'>
        </bs-edit-table>
    </div>
    <template slot="footer">
        <button type="button" class="btn btn-default" @click="hide">关闭</button>
        <button type="button" class="btn btn-primary" @click="save">保存</button>
    </template>
</div>
{% endraw %}
{% endblock %}

{% block script%}
<script type="text/javascript">
    var curModule = "人口管理/实有人口/户籍维护";
    requirejs([
        '{{static}}zhzl/syrk/hjEdit.js'], function () {
    });
</script>
{% endblock %}
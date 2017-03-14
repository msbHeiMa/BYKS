{% extends '../../parent/layout.tpl' %}
 {% block title %}导入任务{%endblock%} 
 {% block style %} {% endblock %} 
 {% block content%}
 <div id="content" class="content-wrapper">
        {% include '../../parent/queryTable.tpl' %}
    </div>
{% raw %}

<div id="importexcel" is="bs-pop" 
    type="lg" title="导入Excel数据" ref="pop">
    <div ref="alert"></div>
    <div class="form-horizontal form-group-sm">
        <cig-form :fields="fields" data-path="data" ref="form">
            <cig-excelfiles slot="fieldslot.datasourceId"
                wrap-class="form-control"
                :bus-id="id"
                v-model="data.datasourceId"
                file-type="xls"
                ref="excelImport">
            </cig-excelfiles>
        </cig-form>
    </div>
    <template slot="footer">
        <button type="button" class="btn btn-default" @click="close">关闭</button>
        <button type="button" class="btn btn-primary" @click="save">保存</button>
    </template>
</div>
{% endraw %}
{% endblock %} {% block script%}
<script>
    requirejs(["/cigWeb/cigjoin/source/importtasks.js"], function (mountFn) {
        mountFn("#content");
    });
</script>
{% endblock %}
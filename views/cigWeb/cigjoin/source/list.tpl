{% extends '../../parent/layout.tpl' %} 
{% block title %}数据源列表{%endblock%} 
{% block style %} {% endblock %} 

{% block content %}
    <div id="content" class="content-wrapper">
        {% include '../../parent/queryTable.tpl' %}
    </div>
{% raw %}
<div id="remove" is="bs-pop"
    type="lg" title="删除数据源" ref="pop">
    <div ref="alert"></div>
    <div class="form-horizontal form-group-sm">
        是否删除该条数据？
    </div>
    <template slot="footer">
        <button type="button" class="btn btn-default" @click="close">关闭</button>
        <button type="button" class="btn btn-primary" @click="save">删除</button>
    </template>
</div>
{% endraw %}
{% endblock %} 
{% block script%} 
    <script>
        requirejs(["/cigWeb/cigjoin/source/list.js"],function(mountFn){
            mountFn("#content")
        });
    </script>
{% endblock %}
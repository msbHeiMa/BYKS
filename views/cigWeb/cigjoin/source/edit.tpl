{% extends '../../parent/layout.tpl' %} 
{% block title %}数据源维护{%endblock%} 
{% block style %} {% endblock %} 

{% block content %}
{% raw %}
    <div id="content" class="content-wrapper">
        <section class="content-header">
            <h1>{{title}}</h1>
        </section>
        <div class="content form-horizontal form-group-sm">
            <cig-form 
                form-class=""
                :fields="fields" 
                :fields-render="customRender"
                data-path="data" 
                ref="form">
            </cig-form>
            <div class="">
                <button class="btn btn-danger btn-sm" @click="save">保存</button>
            </div>
        </div>
    </div>
{% endraw %}
{% endblock %} 
{% block script%} 
    <script>
        requirejs(["/cigWeb/cigjoin/source/edit.js"],function(mountFn){
            mountFn("#content")
        });
    </script>
{% endblock %}
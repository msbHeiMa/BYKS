{% extends '../../parent/layout.tpl' %} 
{% block title %}自定义服务{%endblock%} 
{% block style %} {% endblock %} 

{% block content %}
    <div class="content-wrapper">

    </div>
{% endblock %} 
{% block script%} 
    <script>
        requirejs(["/cigWeb/cigjoin/service/custom.js"],function(mountFn){
            mountFn("#mainTable")
        });
    </script>
{% endblock %}
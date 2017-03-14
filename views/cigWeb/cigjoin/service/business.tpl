{% extends '../../parent/layout.tpl' %} 
{% block title %}业务服务{%endblock%} 
{% block style %} 

<link rel="stylesheet" href="/cigWeb/parent/css/marked.css" />
{% endblock %} 

{% block content %}
  <div id="mainContent" :class="{'cig-hide-menu':showMd}">
    <cig-menu-tree 
        :menus="menuTree" 
        ref="menuTree" 
        @menuchange="menuChange"
        :item-component='serviceComponent'>
    </cig-menu-tree>
    <div v-html="mdContent" class="md-wrapper" v-if="showMd">
    </div>
  </div>
{% raw %}
<!--<div id="mainContent" class="content row">
    <div class="col-lg-3 no-padding">
        <bs-treeview
            :data="serviceTree"
            v-model="curService"
            nodes-path="nodes"
            node-component="<span>{{item.name}}</span>">
        </bs-treeview>
    </div>
    <div class="col-lg-9 md-wrapper" v-html="mdContent">
    </div>
</div>-->
{% endraw %}

{% endblock %} 
{% block script%} 
    <script>
        requirejs(["/cigWeb/cigjoin/service/business.js"],function(mountFn){
            mountFn("#mainContent")
        });
    </script>
{% endblock %}
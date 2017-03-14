{% extends '../parent/layout.tpl' %} 
{% block title %}zhzl{%endblock%} 
{% block style %} 
<link rel="stylesheet" href="/components/bootstrap-treeview/dist/bootstrap-treeview.min.css" />
{% endblock %} 
{% block body %}
	class="hold-transition skin-blue sidebar-collapse sidebar-mini"
{%endblock%} 
{% block content %}

<div class="content-wrapper">
<h4>tree</h4>
  <div id="treeView"></div>
</div>
<!-- /.content-wrapper -->
{% endblock %}

{% block script%}
  <script type="text/javascript" src="../parent/js/menu.js"></script>
{% endblock %}
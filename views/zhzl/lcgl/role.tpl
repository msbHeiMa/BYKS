{% extends '../parent/layout.tpl' %} {% block title %}综合治理{%endblock%} {% block body %}class="hold-transition skin-blue sidebar-collapse
sidebar-mini"{%endblock%} {% block content %}


<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	
	<section class="content-header">
		<h3>		
          流程业务角色
		</h3>	
	</section>
	
		<div id="toolbar">
			&nbsp&nbsp&nbsp <button id="" class="btn btn-primary" onclick="location.href='addrole.html'" >&nbsp&nbsp新&nbsp&nbsp增&nbsp&nbsp角&nbsp&nbsp色</button>	
		</div>
	

	<table id="table" data-toggle="table" data-method="get" data-toolbar="#toolbar" data-show-export="true" data-show-columns="true"
		data-search="true" data-striped="true" data-show-refresh="true" data-show-pagination-switch="true" data-show-toggle="true"
		data-editable="true">
	</table>
	

</div>

<!-- /.content -->



<!-- /.content-wrapper -->
{% endblock %}
<!-- jQuery 2.2.0 -->
<script src="/components/jquery-2.1.4/dist/jquery.min.js"></script>
<!-- Bootstrap 3.3.6 -->
<script src="/components/bootstrap-3.3.5-dist/dist/js/bootstrap.min.js"></script>
<script src="/components/bootstrap-table/dist/bootstrap-table.min.js"></script>
<script src="/components/bootstrap-editable/src/js/bootstrap-editable.js"></script>
<script src="/components/bootstrap-table/src/extensions/editable/bootstrap-table-editable.js"></script>
<script src="/components/bootstrap-select/dist/js/bootstrap-select.min.js"></script>
<script src="/components/bootstrap-switch/dist/js/bootstrap-switch.min.js"></script>
<script src="/components/bootstrap/docs/assets/js/bootstrap-dropdown.js"></script>
<script src="http://cdn.bootcss.com/bootstrap-table/1.9.1/locale/bootstrap-table-zh-CN.min.js"></script> {% block script%}
<!-- AdminLTE App -->


<script type="text/javascript" src="js/role.js"></script>
{% endblock %}
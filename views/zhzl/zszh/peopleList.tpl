{% extends '../parent/layout.tpl' %} {% block title %}肇事肇祸人员列表{%endblock%} {% block body %}class="hold-transition skin-blue
sidebar-collapse sidebar-mini"{%endblock%} {% block content %}

<div class="content-wrapper">
	<div>
	    <section class="content-header">
		    <h3>人员列表</h3> 
        	    <ol class="breadcrumb">
		            <li>当前辖区</li>
		            <li>龙山街道</li>
		        </ol>
	    </section>
    </div>
	<div id="toolbar">&nbsp 
		<button id="remove" class="btn btn-danger" onclick="remove()">&nbsp&nbsp移&nbsp&nbsp除&nbsp&nbsp</button>&nbsp
        <button id="add" class="btn btn-success" onclick="location.href='addlist.html'">&nbsp&nbsp新&nbsp&nbsp增&nbsp&nbsp</button>&nbsp
		<button id="myModal" class="btn btn-warning" onclick="location.href='noGridList.html'">无网格员</button>&nbsp
		<button id="myModal" class="btn btn-primary" data-toggle="modal" data-target="#myModal">启动跟踪</button>&nbsp
		<!--<button id="myModal" class="btn btn-warning" onclick="location.href='level.html'">级别调整</button>-->
	</div>
	<!--导航栏-->
	<table class="col-sm-4"
	       id="table" 
		   data-toggle="table" 
		   data-method="get" 
		   data-toolbar="#toolbar" 
		   data-show-export="true" 
		   data-show-columns="true"
		   data-search="true" 
		   data-striped="true" 
		   data-show-refresh="true" 
		   data-show-pagination-switch="true" 
		   data-show-toggle="true"
		   data-editable="true">
	</table>
 </div>
<!-- /.content-wrapper -->
{% endblock %}
{% block script%}
<script type="text/javascript" src="js/peopleList.js"></script>
{% endblock %}
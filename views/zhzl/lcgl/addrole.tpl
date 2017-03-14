{% extends '../parent/layout.tpl' %} {% block title %}综合治理{%endblock%} {% block body %}class="hold-transition skin-blue sidebar-collapse
sidebar-mini"{%endblock%} {% block content %}


<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	
	<section class="content-header">
		<h3>		
          流程角色管理-新增角色
		</h3>	
	</section>
	  <!--<div id="toolbar">
		&nbsp <button id="" class="btn btn-primary" >&nbsp&nbsp保&nbsp&nbsp存&nbsp&nbsp</button>
		<button  class="btn btn-defalut" onclick="javascript:window.history.back(-1);">&nbsp&nbsp返&nbsp&nbsp回&nbsp&nbsp</button>
	</div>-->


    <form class="form-horizontal">
            <div class="form-group">
                <label class="col-sm-3 control-label">业务ID</label>
                <div class="col-sm-5">
                   <input type="text" class="form-control" id="ID">
                </div>
            </div>  
              <div class="form-group">
                <label class="col-sm-3 control-label">角色代码</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" id="ROLE_CODE">
                </div>
            </div>           
            <div class="form-group">
                <label class="col-sm-3 control-label">角色名称</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" id="ROLE_NAME">
                </div>
            </div>
             <div class="form-group">
                <label class="col-sm-3 control-label">序号</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" id="ORDER">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label">状态</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" id="STATUS">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label">说明</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" id="DES">
                </div>
            </div>
        <center>
            <button type="button" class="btn btn-primary" onclick="save()" >&nbsp&nbsp保&nbsp&nbsp存&nbsp&nbsp</button>
            <button type="button" class="btn btn-defalut" onclick="javascript:window.history.back(-1);" >&nbsp&nbsp返&nbsp&nbsp回&nbsp&nbsp</button>
       </center>

    </form>

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

<script type="text/javascript" src="js/addrole.js"></script>
 {% endblock %}
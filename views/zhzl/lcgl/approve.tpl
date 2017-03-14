{% extends '../parent/layout.tpl' %} {% block title %}综合治理{%endblock%} {% block body %}class="hold-transition skin-blue sidebar-collapse
sidebar-mini"{%endblock%} {% block content %}

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	
        <section class="content-header">
            <h3>		
               流程角色管理-配置审批人
            </h3>	
        </section>
       

   
     <form class="form-horizontal">
            <div class="form-group">
                <label class="col-sm-3 control-label">角色名称</label>
                <div class="col-sm-5">
                     <input type="text" class="form-control">
                </div>
            </div>              
            <div class="form-group">
                <label class="col-sm-3 control-label">审批人</label>
                <div class="col-sm-5">
                    <select class="form-control">
                            <option>option1</option>
                            <option>option2</option>
                            <option>option3</option>
                            <option>option4</option>
                        </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label">描&nbsp&nbsp&nbsp&nbsp述</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control">
                </div>
            </div>
           <center>
            <button type="button" class="btn btn-primary" onclick="save()" >&nbsp&nbsp保&nbsp&nbsp存&nbsp&nbsp</button>
            <button type="button" class="btn btn-defalut" onclick="javascript:window.history.back(-1);" >&nbsp&nbsp返&nbsp&nbsp回&nbsp&nbsp</button>
       </center>

    </form>
     
            <h3>		
                审批人列表
            </h3>	
       
   <table id="table" data-toggle="table" data-method="get"  data-show-export="true" data-show-columns="true"
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

<script type="text/javascript" src="js/approve.js"></script>
{% endblock %}
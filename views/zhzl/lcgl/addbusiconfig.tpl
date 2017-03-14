{% extends '../parent/layout.tpl' %} {% block title %}综合治理{%endblock%} {% block body %}class="hold-transition skin-blue sidebar-collapse
sidebar-mini"{%endblock%} {% block content %}

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	
        <section class="content-header">
            <h3>		
               新增流程业务配置
            </h3>	
        </section>
       
     <form class="form-horizontal">
            <div class="form-group">
                <label class="col-sm-3 control-label">功能模块</label>
                <div class="col-sm-5">
                    <select class="form-control" id="FUNMODEL_ID">
                            <option>一</option>
                            <option>二</option>
                            <option>三</option>
                            <option>四</option>
                    </select>
                </div>
            </div> 
            <div class="form-group">
                <label class="col-sm-3 control-label">功能模块名称</label>
                <div class="col-sm-5">
                     <input type="text" class="form-control" id="FUNMODEL_NAME">
                </div>
            </div>  
            <div class="form-group">
                <label class="col-sm-3 control-label">功能模块类型</label>
                <div class="col-sm-5">
                    <select class="form-control" id="FUNMODEL_TYPE">
                            <option>肇事肇祸</option>
                            <option>事件上报</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label">功能模块业务表名称</label>
                <div class="col-sm-5">
                     <input type="text" class="form-control" id="FUNMODEL_TABLENAME">
                </div>
            </div>        
            <div class="form-group">
                <label class="col-sm-3 control-label">状&nbsp&nbsp&nbsp&nbsp态</label>
                <div class="col-sm-5">
                    <select class="form-control" id="STATUS">
                            <option>1</option>
                            <option>0</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label">说&nbsp&nbsp&nbsp&nbsp明</label>
                <div class="col-sm-5">
                    <input type="text" class="form-control" id="DES">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label">功能模块发起页面</label>
                <div class="col-sm-5">
                     <input type="url" class="form-control" id="FUNMODEL_SPAGEURL">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-3 control-label">流程业务模板</label>
                <div id="table" class="col-sm-5">
                    <!--<select class="form-control" id="BUSI_ID">
                            <!--<option>一</option>
                            <option>二</option>
                            <option>三</option>
                            <option>四</option>-->
                    </select>
                    <input type="text" class="form-control" id="BUSI_ID">
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

<script type="text/javascript" src="js/addbusiconfig.js"></script>
{% endblock %}
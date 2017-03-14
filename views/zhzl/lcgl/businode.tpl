{% extends '../parent/layout.tpl' %} {% block title %}综合治理{%endblock%} {% block body %}class="hold-transition skin-blue sidebar-collapse
sidebar-mini"{%endblock%} {% block content %}


<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	
	<section class="content-header">
		<h3>		
          流程业务管理-增加节点
		</h3>	
	</section>
	  <!--<div id="toolbar">
		&nbsp <button id="save" class="btn btn-primary" onclick="save()"  >&nbsp&nbsp保&nbsp&nbsp存&nbsp&nbsp</button>
		<button type="button"  class="btn btn-defalut" onclick="javascript:window.history.back(-1);" >&nbsp&nbsp返&nbsp&nbsp回&nbsp&nbsp</button>
       
	</div>-->



    <form  class="form-horizontal">
        <div class="form-group">
            <label class="col-sm-3 control-label">节点名称</label>
            <div class="col-sm-5">
                <input type="text" class="form-control" id="NODE_NAME">
            </div>
                    
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label">节点CODE</label>
            <div class="col-sm-5">
                <input type="text" class="form-control" id="NODE_CODE">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label">节点页面url</label>
            <div class="col-sm-5">
                <input type="text" class="form-control" id="NODE_PAGEURL">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label">节点审核通过方式</label>
            <div class="col-sm-5">
                <input type="text" class="form-control" id="NODE_APPROVETYPE">
            </div>
        </div>
        <div class="form-group">
            <label class="col-sm-3 control-label">序号</label>
            <div class="col-sm-5">
                <input type="text" class="form-control" id="NODE_ORDER">
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
        <button type="button"  class="btn btn-primary" onclick="save()">&nbsp&nbsp保&nbsp&nbsp存&nbsp&nbsp</button>
		<button type="button"  class="btn btn-defalut" onclick="javascript:window.history.back(-1);" >&nbsp&nbsp返&nbsp&nbsp回&nbsp&nbsp</button>
       </center>

    </form>

</div>

{% block script%}
<!-- AdminLTE App -->

 <script type="text/javascript" src="js/addbusiness.js"></script>
<script type="text/javascript" src="js/businode.js"></script>
 {% endblock %}

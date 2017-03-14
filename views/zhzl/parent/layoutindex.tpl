<!DOCTYPE html>
<html>
  <head> 
      <meta charset="utf-8" /> 
      <meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
      <title>{% block title %}{% endblock %} -{{title}}</title> 
      <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" /> 
      <link rel="stylesheet" href="/components/bootstrap-3.3.5-dist/dist/css/bootstrap.min.css" /> 
      <link rel="stylesheet" href="/components/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css" /> 
      <link rel="stylesheet" href="/components/bootstrap-table/dist/bootstrap-table.min.css" /> 
      <link rel="stylesheet" href="/components/x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css" /> 
      <link rel="stylesheet" href="/components/font-awesome/css/font-awesome.min.css" /> 
      <link rel="stylesheet" href="/components/ionicons/css/ionicons.min.css" /> 
      <link rel="stylesheet" href="/components/admin-lte/dist/css/AdminLTE.min.css" /> 
      <link rel="stylesheet" href="/components/admin-lte/dist/css/skins/skin-blue.min.css" />
      <link rel="stylesheet" href="/components/bootstrap-select/dist/css/bootstrap-select.css" />
      <link rel="stylesheet" href="/components/bootstrapvalidator/dist/css/bootstrapValidator.min.css" />
      <link rel="stylesheet" href="/cig/common/css/admin-lte-fix.css" />
      <link rel="stylesheet" href="/cig/common/css/skin-blue-fix.css" />
      <link rel="stylesheet" href="/cig/common/css/style.css" />
      {% block style %} {% endblock %} 
  </head>
<body class="skin-blue sidebar-mini">
  <div class="wrapper"> 
    <div class="l-head">
        <div class="l-topbar">
            <span class="l-header-logo"></span>
            <span class="l-header-left">长兴县社会治理综合管理信息系统</span>       
        </div>
    </div>
    <div class="l-content">
        {% block content_wrap%} {% endblock %} 
    </div> 
  </div> 
  <!-- ./wrapper --> 
  <!-- REQUIRED JS SCRIPTS --> 
  <!-- jQuery 2.2.0 --> 
  <script src="/components/jquery-2.1.4/dist/jquery.min.js"></script> 
  <script src="/components/jquery-cookie/jquery.cookie.js"></script>
  <!-- Bootstrap 3.3.6 --> 
  <script src="/components/bootstrap-3.3.5-dist/dist/js/bootstrap.min.js"></script> 
  <script src="/components/bootstrap-table/dist/bootstrap-table.min.js"></script> 
  <script src="/components/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.min.js"></script> 
  <script src="/components/bootstrap-table/src/extensions/editable/bootstrap-table-editable.js"></script> 
  <script src="/components/bootstrap-select/dist/js/bootstrap-select.min.js"></script> 
  <script src="/cig/svmobject/js/bootstrap-select.js"></script>
  <script src="/components/bootstrap-switch/dist/js/bootstrap-switch.min.js"></script> 
  <script src="/components/bootstrap/js/dropdown.js"></script> 
  <script src="/components/bootstrapvalidator/dist/js/bootstrapValidator.min.js"></script>
  <script src="http://cdn.bootcss.com/bootstrap-table/1.9.1/locale/bootstrap-table-zh-CN.min.js"></script> 
  <script src="/components/bootstrap-treeview/dist/bootstrap-treeview.min.js"></script>
  <script src="/cig/svmobject/js/bootstrap-select.js"></script>
  <script src="/cig/zhzlobject/js/bootstrap-datetimepicker.js"></script>
  <script src="/components/chart.js/dist/Chart.js"></script>
  <!--汉化--> 
  <script src="/components/jquery-flot/jquery.flot.js"></script> 
  <script src="/components/jquery-flot/jquery.flot.categories.js"></script> 
  <script src="/components/admin-lte/dist/js/app.min.js"></script> 
  <script type="text/javascript" src="/zhzl/parent/js/config.js"></script> 
  <script type="text/javascript" src="/zhzl/parent/js/common.js"></script>
  <script type="text/javascript" src="/zhzl/parent/js/cigTable.js"></script>
  <script type="text/javascript" src="/zhzl/parent/js/menu.js"></script>
  {% block script %} 
  {% endblock %} 
 </body>
</html>

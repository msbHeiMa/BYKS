<!DOCTYPE html>
<html>
  <head> 
      <meta charset="utf-8" /> 
      <meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
      <title>{% block title %}{% endblock %} -{{title}}</title> 
      <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" /> 
      <link rel="stylesheet" href="/components/bootstrap-3.3.5-dist/dist/css/bootstrap.min.css" /> 
      <!--<link rel="stylesheet" href="/components/bootstrap-table/dist/bootstrap-table.min.css" /> -->
      <!--<link rel="stylesheet" href="/components/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.min.css" /> 
      <link rel="stylesheet" href="/components/x-editable/dist/bootstrap3-editable/css/bootstrap-editable.css" /> -->
      <link rel="stylesheet" href="/components/font-awesome/css/font-awesome.min.css" /> 
      <link rel="stylesheet" href="/components/ionicons/css/ionicons.min.css" /> 
      
      <link rel="stylesheet" href="/cig/common/css/style.css" />
      <link rel="stylesheet" href="/components/admin-lte/dist/css/AdminLTE.min.css" /> 
      <link rel="stylesheet" href="/components/admin-lte/dist/css/skins/skin-blue.min.css" />
      <!--<link rel="stylesheet" href="/components/bootstrap-select/dist/css/bootstrap-select.css" />
      <link rel="stylesheet" href="/components/bootstrapvalidator/dist/css/bootstrapValidator.min.css" />-->
      <link rel="stylesheet" href="/cig/common/css/admin-lte-fix.css" />
          
      <link rel="stylesheet" href="/components/artDialog-5.0.3/skins/opera.css" />
      {% block style %} {% endblock %} 
  </head>
<body class="skin-blue sidebar-mini">
  <div class="wrapper"> 
    <div class="l-head">
        {% include 'header.tpl'%}
    </div>
    <div class="l-content">
        {% block content_wrap%} {% endblock %} 
    </div> 
  </div> 
  {% block script_wrap %} 
  {% endblock %} 
 </body>
</html>

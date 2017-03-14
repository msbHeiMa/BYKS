<!DOCTYPE html>
<html>
  <head> 
      <meta charset="utf-8" /> 
      <meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
      <title>{% block title %}{% endblock %} -{{title}}</title> 
      <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" /> 
      <link rel="stylesheet" href="/components/bootstrap-3.3.5-dist/dist/css/bootstrap.min.css" /> 
      <link rel="stylesheet" href="/components/font-awesome/css/font-awesome.min.css" /> 
      <link rel="stylesheet" href="/components/ionicons/css/ionicons.min.css" /> 
      <link rel="stylesheet" href="/cigWeb/parent/css/style.css" /> 
      
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
  
    <script type="text/javascript" src="/cig/common/js/common.js"></script> 
    {% include "requireConfig.tpl" %}

    <script>
        // requirejs(["/cigjoin/parent/user.js"],function(user){
        //     user.$mount("#uNameSpan");
        // });
    </script>
  {% block script_wrap %} 
  {% endblock %} 
 </body>
</html>

{% extends 'layoutbase.tpl' %} 
{% block content_wrap %}
   <aside class="main-sidebar"> 
    <!-- sidebar: style can be found in sidebar.less -->  
     <!-- Sidebar Menu --> 

     <ul class="sidebar-menu"> 
      <!-- Optionally, you can add icons to the links --> 
      <!-- <li class="active"><a href="#"><i class="fa fa-link"></i> <span>Link</span></a></li> --> 
     </ul> 

     <div id="treeViewSlider" class="menu-tree" style="font-size:14px"></div>

     <!-- /.sidebar-menu --> 
    <!-- /.sidebar -->
   </aside>
   <div id="submenu"></div>
{% block content %} {% endblock %} 
{% endblock %} 

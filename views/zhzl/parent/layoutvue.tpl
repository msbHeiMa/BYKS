{% extends 'layoutvuebase.tpl' %} 
{% block content_wrap %}
   <aside class="main-sidebar"> 
     <div id="treeViewSlider" class="menu-tree" style="font-size:14px"></div>
   </aside>
   <div id="submenu"></div>
    {% block content %} 
    {% endblock %} 

{% endblock %} 

{% block script_wrap %} 
    <script type="text/javascript" src="/zhzl/parent/js/common.js"></script> 
    <script type="text/javascript" src="/zhzl/parent/js/config.js"></script> 
    {% include "requireConfig.tpl" %}
  <script type="text/javascript">
        requirejs([
            'jQuery',
            'css!cssBsTreeview'], function (sample) {
            requirejs([
                'bootstrap',
                '{{static}}components/bootstrap-treeview/dist/bootstrap-treeview.min.js'
                ],function(){
                requirejs([
                    '{{static}}zhzl/parent/js/menu.js',
                    '{{static}}zhzl/parent/js/layout.js',
                    '{{static}}components/admin-lte/dist/js/app.min.js',
                    '{{static}}components/artDialog-5.0.3/artDialog.min.js'],function(){
                });
            });
        });
   </script>
    {% block script %} 
    {% endblock %} 
{% endblock %} 

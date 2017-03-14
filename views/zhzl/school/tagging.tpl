{% extends '../parent/layout.tpl' %} 
{% block title %}校区标注{%endblock%} 
{% block style %} 
<link rel="stylesheet" href="css/tagging.css" />
{% endblock %} 
{% block body %}
	class="hold-transition skin-blue sidebar-collapse sidebar-mini"
{%endblock%} 
{% block content %}

<div class="content-wrapper">

	<section class="content-header">
		<h1>
			校区标注
		</h1>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
			<li class="active">校区标注
			</li>
		</ol>
	</section>
	<div class="row">
  <div>
    <table>
        <tr>
            <td class="queryTd"><span>学校：长兴中学</span></td>
            <td class="queryTd"><div><span>地图要素分类：</span><select name="mapType"><option>学校</option></select></div></td>
            <td class="queryTd"><div><span>选中要素：</span><select name="checkMap"><option>长兴中学</option></select></div></td>
            <td class="queryTd"><button type="button">确定</button></td>
        </tr>
    </table>
</div>
	</div>
</div>
<!-- /.content-wrapper -->
{% endblock %}

{% block script%}
<script type="text/javascript" src="js/tagging.js"></script>
{% endblock %}
{% extends 'parent/layout.tpl' %} {% block title %}服务管理与发布{%endblock%} {% block body %}class="hold-transition
skin-blue sidebar-collapse sidebar-mini"{%endblock%} {% block content %}

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
	<!-- Content Header (Page header) -->
	
			<section class="content-header">
				 <!--<button class="btn btn-primary btn-sm" name="Submit" onclick="javascript:history.back(1)" ><i class="fa fa-reply" ></i> 返回</button>-->
				<h3>
					AdminLET
				</h3>
				<ol class="breadcrumb">
					<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
					<li>
						<a href="app.html">
							服务列表</a>
						</li>
						<li class="active">AdminLET</a>
                        </li>
				</ol>
			</section>
			</br>
			<p align="left" style="margin-left:15px;line-height:22px ">
				AdminLTE是一个很受欢迎的开放源代码WebApp模板管理仪表板和控制面板。一个响应的HTML模板,基于CSS3框架引导。</br>
				它利用所有的引导组件在其设计和重新设置许多常用的插件创建一个一致的设计,可以用作后端应用程序的用户界面。AdminLTE基于模块化设计,这使得它很容易定制和建立。</br>
				这个文档将指导您完成安装模板和探索各种组件绑定的模板。
			</p></br></br>
		
	 <div style="width: 640px; height: 480px; margin-right: auto; margin-left: auto;">  
  
                <div id="carousel" class="carousel slide" data-ride="carousel" data-interval="2000" >  
  
                    <ol class="carousel-indicators" >  
                        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>  
                        <li data-target="#carousel-example-generic" data-slide-to="1"></li>  
                        <li data-target="#carousel-example-generic" data-slide-to="2"></li>  
                    </ol>  
  
                    <div class="carousel-inner" role="listbox" >  
                      
                        <div class="item active">  
                            <a href="images/img0.jpg"><img src="img/appinstruction1.png" alt="img0"></a>  
                            <div class="carousel-caption" style="color:#5B5B5B">  
                                <h3>  
                                    Charts  
                                </h3>  
                                <p>  
                                    图表样式模板  
                                </p>  
                            </div>  
                        </div>  
                          
                        <div class="item">  
                            <a href="images/img10.jpg"><img src="img/appinstruction21.png" alt="img10"></a>  
                            <div class="carousel-caption" style="color:#5B5B5B">  
                                <h3>  
                                    Calendar  
                                </h3>  
                                <p>  
                                    日历样式模板 
                                </p>  
                            </div>  
                        </div>  
  
                        <div class="item">  
                            <a href="images/img2.jpg"><img src="img/appinstruction31.png" alt="img2"></a>  
                            <div class="carousel-caption" style="color:#5B5B5B">  
                                <h3>  
                                    Widgets  
                                </h3>  
                                <p>  
                                    小部件样式  
                                </p>  
                            </div>  
                        </div>  
  
                    </div>  
  
                    <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">   
                    <span class="glyphicon glyphicon-chevron-left" style="color:#5B5B5B"></span> </a>  
                    <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">   
                    <span class="glyphicon glyphicon-chevron-right" style="color:#5B5B5B"></span> </a>  
  
                </div>  
            </div>  
</div>
{% endblock %}

<!-- jQuery 2.2.0 -->
<script src="components/jquery-2.1.4/dist/jquery.min.js"></script>

<!-- Bootstrap 3.3.6 -->
<script src="components/bootstrap-3.3.5-dist/dist/js/bootstrap.min.js"></script>
<script src="components/bootstrap-table/dist/bootstrap-table.min.js"></script>
<script src="components/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.min.js"></script> {% block script %}
<!-- AdminLTE App -->
<script src="components/admin-lte/dist/js/app.min.js"></script>
<script type="text/javascript" src="js/appdetail.js"></script> {% endblock %}
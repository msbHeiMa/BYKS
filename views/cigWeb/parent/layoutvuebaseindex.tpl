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

	<link rel="stylesheet" href="/components/admin-lte/dist/css/AdminLTE.min.css" />
	<!--<link rel="stylesheet" href="/components/admin-lte/dist/css/skins/skin-blue.min.css" />-->
	<!--<link rel="stylesheet" href="/components/bootstrap-select/dist/css/bootstrap-select.css" />
      <link rel="stylesheet" href="/components/bootstrapvalidator/dist/css/bootstrapValidator.min.css" />-->
	<link rel="stylesheet" href="/cig/common/css/admin-lte-fix.css" />
	<link rel="stylesheet" href="/cigWeb/portal/css/style.css" />
	<link rel="stylesheet" href="/cigWeb/parent/css/style.css" /> {% block style %} {% endblock %}
</head>

<body>
	{% raw %}
	<!--导航条-->
	<header id="headerMenu">
		<nav class="navbar navbar-inverse">
			<div class="container">
				<ul class="navUl">
					<li class="logoLi"><b class="cigLogo"></b><a href="/cigWeb/index.html">CIG信息资源整合平台</a></li>
					<li class="menuLi"><a href="#" @click="menuShow">菜单<b class="muneImg"></b></a></li>
					<li class="loginBtn"><a href="/cigWeb/afterLogin.html" class="loginBg"><b class="loginImg"></b></a></li>
				</ul>
			</div>
		</nav>
	</header>
	<!--弹出菜单-->
	<div id="menu" :class="{'full-page-menu':true,'show':showMenu}">
		<div ref="alert"></div>
		<!--导航条-->
		<header>
			<nav class="navbar navbar-inverse">
				<div class="container">
					<ul class="navUl">
						<li class="logoLi"><b class="cigLogo"></b><a href="/cigWeb/index.html">CIG信息资源整合平台</a></li>
						<li class="menuLi"><a href="#" @click="hide">菜单<b class="muneClose"></b></a></li>
						<li class="loginBtn"><a href="/cigWeb/afterLogin.html" class="loginBg"><b class="loginImg"></b></a></li>
						<!--<li class="loginBtn">你好！{{userName}}</li>-->
						<!--<li class="loginBtn"><a href="/cigWeb/afterLogin.html" class="loginBg"><b class="loginImg"></b></a></li>-->
					</ul>
				</div>
			</nav>
		</header>
		<section class="section">
			<div class="container">
				<!--搜素框-->
				<div class="row searchPadding">
					<div class="col-md-3"></div>
					<div class="col-md-6"><input type="text" class="searchInput"><a href="#" class="search">搜索</a></div>
				</div>
				<div class="row systemkuang">
					<div class="col-md-5"><b class="line"></b></div>
					<div class="col-md-2"><span class="systemName">五大系统</span></div>
					<div class="col-md-5"><b class="line"></b></div>
				</div>
				<div class="row">
					<div class="col-md-1"></div>
					<div class="col-md-2">
						<a href="#" class="serviceA">
							<i class="serviceImg servicePeople "></i>
							<span class="fiveSpan">服务发布与管理分系统</span>
						</a>
					</div>
					<div class="col-md-2">
						<a href="#" class="serviceA">
							<i class="serviceImg servicebig"></i>
							<span class="fiveSpan">大数据服务分系统</span>
						</a>
					</div>
					<div class="col-md-2">
						<a href="http://portal.giscloud.cx/arcgis/changxing/viewer/dataGallery.html" class="serviceA">
							<i class="serviceImg serviceyun"></i>
							<span class="fiveSpan">时空云服务分系统</span>
						</a>
					</div>
					<div class="col-md-2">
						<a href="/cigweb/portal/business.html" class="serviceA">
							<i class="serviceImg servicegezi"></i>
							<span class="fiveSpan">流程服务分系统</span>
						</a>
					</div>
					<div class="col-md-2">
						<a href="/cigweb/cigjoin/service/business.html" class="serviceA">
							<i class="serviceImg servicexinfeng"></i>
							<span class="fiveSpan">信息聚合服务系统</span>
						</a>
					</div>
					<div class="col-md-1"> </div>
				</div>
				<!--十大平台-->
				<div class="row systemkuang">
					<div class="col-md-5"><b class="line"></b></div>
					<div class="col-md-2"><span class="systemName">十大平台</span></div>
					<div class="col-md-5"><b class="line"></b></div>
				</div>
				<div class="row">
					<div class="col-md-1"></div>
					<div class="col-md-2">
						<a href="#" class="serviceA">
							<i class="tenPImg ten01"></i>
							<span class="tenSpan">时空云平台</span>
						</a>
					</div>
					<div class="col-md-2">
						<a href="#" class="serviceA">
							<i class="tenPImg ten02"></i>
							<span class="tenSpan">信息聚合服务平台</span>
						</a>
					</div>
					<div class="col-md-2">
						<a href="#" class="serviceA">
							<i class="tenPImg ten03"></i>
							<span class="tenSpan">消息列队平台</span>
						</a>
					</div>
					<div class="col-md-2">
						<a href="#" class="serviceA">
							<i class="tenPImg ten04"></i>
							<span class="tenSpan">流程平台</span>
						</a>
					</div>
					<div class="col-md-2">
						<a href="#" class="serviceA">
							<i class="tenPImg ten05"></i>
							<span class="tenSpan">数据管理平台</span>
						</a>
					</div>
					<div class="col-md-1"></div>
				</div>
				<div class="row">
					<div class="col-md-1"></div>
					<div class="col-md-2">
						<a href="#" class="serviceA">
							<i class="tenPImg ten06"></i>
							<span class="tenSpan">储存平台 </span>
						</a>
					</div>
					<div class="col-md-2">
						<a href="#" class="serviceA">
							<i class="tenPImg ten07"></i>
							<span class="tenSpan">应用云管理平台</span>
						</a>
					</div>
					<div class="col-md-2">
						<a href="#" class="serviceA">
							<i class="tenPImg ten08"></i>
							<span class="tenSpan">安全管理平台</span>
						</a>
					</div>
					<div class="col-md-2">
						<a href="#" class="serviceA">
							<i class="tenPImg ten09"></i>
							<span class="tenSpan">运维监控平台</span>
						</a>
					</div>
					<div class="col-md-2">
						<a href="#" class="serviceA">
							<i class="tenPImg ten10"></i>
							<span class="tenSpan">大数据管理平台</span>
						</a>
					</div>
					<div class="col-md-1"> </div>
				</div>
			</div>
		</section>

	</div>
	{% endraw %} {% include "requireConfig.tpl" %}
	<script>
	
    requirejs([
        '/cigWeb/parent/headerindex.js'], function () {
    });
	</script> {% block content_wrap%} {% endblock %}


	<footer>
		<div class="container">
			<div class="row">
				<div class="col-md-4"></div>
				<div class="col-md-4">
					<!--<b><img src="img/serviceTel.png" alt=""></b>-->
					<span class="serviceTelSpan">服务热线：0572-1234567</span>
				</div>
			</div>
			<div class="row">
				<div class="col-md-3"></div>
				<div class="col-md-6">
					<span>主办单位：浙江省人民政府办公厅 备案：浙ICP备12000333号-2 浙公网安备 33010602004556号 中文域名：浙江政务服务.政务 建议使用1366*768分辨率/IE9.0或以上浏览器访问达到最佳效果
                    </span>
				</div>
				<!--<div class="col-md-2"></div>-->
			</div>

		</div>
	</footer>
	{% block script_wrap %} {% endblock %}

</body>

</html>
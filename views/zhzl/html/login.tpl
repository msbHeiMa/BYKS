<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>毕业课设</title>
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
	{% include 'stylesheet.tpl' %}
	<link rel="stylesheet" href="../../../zhzl/lcgl/css/login.css" />
</head>

<body class="skin-blue sidebar-mini">
	{% include 'nav.tpl' %}
	<div id="main">
		<div class="main">
			{% include 'main-left.tpl' %}
			<div class="main-right">
				<div class="main-right-top">
					<div>
						<ul class="nav nav-tabs" role="tablist">
							<li role="presentation" class="active"><a href="#landing" aria-controls="landing" role="tab" data-toggle="tab">马上登陆</a></li>
							<li role="presentation"><a href="#register" aria-controls="register" role="tab" data-toggle="tab">开始注册</a></li>
						</ul>
						<div class="tab-content">
							<!--马上登陆-->
							<div role="tabpanel" class="tab-pane active" id="landing">
								<div class="input-group">
									<span class="input-group-addon" id="basic-addon1">用户名</span>
									<input type="text" class="form-control" placeholder="请输入您的用户名" aria-describedby="basic-addon1">
								</div>
								<div class="input-group">
									<span class="input-group-addon" id="basic-addon2">密&nbsp&nbsp&nbsp码</span>
									<input type="password" class="form-control" placeholder="请输入您的密码" aria-describedby="basic-addon2">
								</div>
								<div class="input-group">
									<a href="#" class="button button-action   button-rounded button-jumbo button-small" role="button">马上登陆</a>
								</div>	
							</div>
							<!--开始注册-->
							<div role="tabpanel" class="tab-pane" id="register">
								<div class="input-group">
									<span class="input-group-addon" id="basic-addon1">输入名称</span>
									<input type="text" class="form-control" placeholder="请输入用户名" aria-describedby="basic-addon1">
								</div>
								<div class="input-group">
									<span class="input-group-addon" id="basic-addon2">输入密码</span>
									<input type="password" class="form-control" placeholder="请输入密码" aria-describedby="basic-addon2">
								</div>
								<div class="input-group">
									<span class="input-group-addon" id="basic-addon3">确认密码</span>
									<input type="password" class="form-control" placeholder="请再次输入密码" aria-describedby="basic-addon3">
								</div>
								<div class="input-group">
									<a href="#" class="button button-action   button-rounded button-jumbo button-small" role="button">马上注册</a>
								</div>
							</div>
						</div>

					</div>
				</div>
				<div class="main-right-mid">

				</div>
				<div class="main-right-bottom">

				</div>
			</div>
		</div>

	</div>
	<div id="footer">
		毕业设计机器人教育网站©2017 马帅彬版权所有
	</div>
	{% include 'script.tpl' %}
	<script type="text/javascript" src="../../../zhzl/lcgl/js/login.js"></script>
	<script>
		$('.carousel').carousel();
		$('#someTab').tab('show')
	</script>

</body>

</html>
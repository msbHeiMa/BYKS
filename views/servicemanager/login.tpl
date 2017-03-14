{% extends 'parent/layout-admin.tpl' %} {% block style %}
<!-- iCheck -->
<link rel="stylesheet" href="/components/iCheck/skins/flat/blue.css"> {%endblock%} {% block bodyclass %}hold-transition login-page{% endblock %} {% block content %}

<div class="container" style="margin-top:50px">
	<div class="col-lg-4 col-lg-offset-4 col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2" id="logindev">
		<form class="form">
			<center>
				<h2>用户登录</h2>
			</center>
			<div class="form-group has-feedback">
				<label for="inputEmail" class="sr-only">Email address</label>
				<input type="email" id="inputEmail" class="form-control" placeholder="邮箱" required="" autofocus="">
				<span class="glyphicon glyphicon-envelope form-control-feedback"></span></div>
			<div class="form-group has-feedback">
				<label for="inputPassword" class="sr-only">Password</label>
				<input type="password" id="inputPassword" class="form-control" placeholder="密码" required="">
				<span class="glyphicon glyphicon-lock form-control-feedback"></span></div>
			<div class="checkbox">
				<label>
            <input type="checkbox" value="remember-me"> 记住我
          </label>
			</div>
			<button class="btn btn-lg btn-primary btn-block" type="submit">登录</button></br>
			<center><a href="#">忘记密码</a>
				<a href="register.html" class="text-center">注册账号</a></center>

		</form>
	</div>
</div>
<!-- /container -->
{% endblock %} {% block script %}
<!-- iCheck -->
{% endblock %}
	<!-- jQuery 2.2.0 -->
	<script src="/components/jquery-2.1.4/dist/jquery.min.js"></script>
	<!-- Bootstrap 3.3.6 -->
	<script src="/components/bootstrap-3.3.5-dist/dist/js/bootstrap.min.js"></script>
	<script src="/components/bootstrap-table/dist/bootstrap-table.min.js"></script>
	<script src="/components/bootstrap-editable/src/js/bootstrap-editable.js"></script>
	<script src="/components/bootstrap-table/src/extensions/editable/bootstrap-table-editable.js"></script>
	<script src="/components/bootstrap-select/dist/js/bootstrap-select.min.js"></script>
	<script src="/components/bootstrap-switch/dist/js/bootstrap-switch.min.js"></script>
	<script src="/components/bootstrap/docs/assets/js/bootstrap-dropdown.js"></script>
	<script src="/cig/svmobject/js/bootstrap-select.js"></script>
	<script src="http://cdn.bootcss.com/bootstrap-table/1.9.1/locale/bootstrap-table-zh-CN.min.js"></script> 
  {% block script%}
	<!-- AdminLTE App -->
	<script src="/components/admin-lte/dist/js/app.min.js"></script>
	<script type="text/javascript" src="js/notificationdetail.js"></script>
	<script type="text/javascript" src="js/config.js"></script
 
<script src="/components/iCheck/icheck.min.js"></script> {%endblock%}
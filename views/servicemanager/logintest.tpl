{% extends 'parent/layout-admin.tpl' %} {% block style %}
<!-- iCheck -->
<link rel="stylesheet" href="/components/iCheck/skins/flat/blue.css"> {%endblock%} {% block bodyclass %}hold-transition login-page{% endblock %} {% block content %}

<div class="container">
	<div class="col-lg-4 col-lg-offset-4 col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2" id="logindev">
		<form class="form">
			<center>
				<h2>用户登录</h2>
			</center>
			<label for="inputEmail" class="sr-only">Email address</label>
			<input type="email" id="inputEmail" class="form-control" placeholder="Email address" required="" autofocus="">
			<label for="inputPassword" class="sr-only">Password</label>
			<input type="password" id="inputPassword" class="form-control" placeholder="Password" required="">
			<div class="checkbox">
				<label>
            <input type="checkbox" value="remember-me"> Remember me
          </label>
			</div>
			<button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button></br>
			<center><a href="#">忘记密码</a>
				<a href="register.html" class="text-center">注册账号</a></center>

		</form>
	</div>
</div>
<!-- /container -->
{% endblock %} {% block script %}
<!-- iCheck -->
<script src="/components/iCheck/icheck.min.js"></script> {%endblock%}
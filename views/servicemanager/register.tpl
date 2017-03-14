{% extends 'parent/layout-admin.tpl' %} {% block style %}
<!-- iCheck -->
<link rel="stylesheet" href="/components/iCheck/skins/flat/blue.css"> {%endblock%} {% block bodyclass %}hold-transition register-page{% endblock %} {% block content %}
<div class="col-lg-4 col-lg-offset-4 col-sm-6 col-sm-offset-3 col-xs-8 col-xs-offset-2" id="logindev">
	<div class="register-box" style="margin-top:50px">
		<div class="register-logo">
			<h3><b>CIG</b>服务发布与管理</h3>
		</div>

		<div class="register-box-body">
			</br>
			<p class="login-box-msg">注册新用户</p>
			<form action="../../index.html" method="post">
				<div class="form-group has-feedback">
					<input type="text" class="form-control" placeholder="昵称">
					<span class="glyphicon glyphicon-user form-control-feedback"></span>
				</div>
				<div class="form-group has-feedback">
					<input type="email" class="form-control" placeholder="邮箱">
					<span class="glyphicon glyphicon-envelope form-control-feedback"></span>
				</div>
				<div class="form-group has-feedback">
					<input type="password" class="form-control" placeholder="密码">
					<span class="glyphicon glyphicon-lock form-control-feedback"></span>
				</div>
				<div class="form-group has-feedback">
					<input type="password" class="form-control" placeholder="重复密码">
					<span class="glyphicon glyphicon-log-in form-control-feedback"></span>
				</div>
				<div class="row">
					<div class="col-xs-8">
						<!--<div class="checkbox icheck">
                <label>
                  <input type="checkbox"> I agree to the <a href="#">terms</a>
                </label>
              </div> -->
					</div>
					<div class="col-xs-4">
						<button type="submit" class="btn btn-primary btn-block btn-flat">注册</button>
					</div>
					<!-- /.col -->
				</div>
			</form>

			<!-- <div class="social-auth-links text-center">
          <p>- OR -</p>
          <a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign up using Facebook</a>
          <a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign up using Google+</a>
        </div>-->

			<a href="login.html" class="text-center">已有账户去登录</a>
		</div>
		<!-- /.form-box -->
	</div>
	<!-- /.register-box -->
</div>
{% endblock %} {% block script %}
<!-- iCheck -->
<script src="/components/iCheck/icheck.min.js"></script>
<script>
      $(function () {
        $('input').iCheck({
          checkboxClass: 'icheckbox_square-blue',
          radioClass: 'iradio_square-blue',
          increaseArea: '20%' // optional
        });
      });
    </script> {%endblock%}
<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>CIG服务发布与管理 | Log in</title>
	<!-- Tell the browser to be responsive to screen width -->
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
	<!-- Bootstrap 3.3.5 -->
	<link rel="stylesheet" href="components/bootstrap-3.3.5-dist/dist/css/bootstrap.min.css">
	<link rel="stylesheet" href="components/bootstrap-table/dist/bootstrap-table.min.css">
	<!-- Font Awesome -->
	<link rel="stylesheet" href="components/font-awesome/css/font-awesome.min.css">
	<!-- Ionicons -->
	<link rel="stylesheet" href="components/ionicons/css/ionicons.min.css">
	<!-- Theme style -->
	<link rel="stylesheet" href="plugins/AdminLTE-2.3.0-dist/css/AdminLTE.min.css"> {% block style %} {% endblock %}
</head>

<body class="{% block bodyclass %}{% endblock %}">
	{% block content %} {% endblock %}
	<!-- jQuery 2.2.0 -->
	<script src="/components/jquery-2.1.4/dist/jquery.min.js"></script>
	<!-- Bootstrap 3.3.6 -->
	<script src="/components/bootstrap-3.3.5-dist/dist/js/bootstrap.min.js"></script>
	<script src="/components/bootstrap-table/dist/bootstrap-table.min.js"></script> {% block script %} {% endblock %}
</body>

</html>
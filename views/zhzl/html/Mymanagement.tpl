<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>毕业课设</title>
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
	{% include 'stylesheet.tpl' %}
	<link rel="stylesheet" href="../../../zhzl/lcgl/css/Mymanagement.css" />
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
							<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab" @click="lunhuan('上传')">我的上传</a></li>
							<li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab" @click="lunhuan('报名')">报名的课程</a></li>
							<li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab" @click="lunhuan('关注')">我的关注</a></li>
						</ul>
						<div class="tab-content">
							<!--我的上传-->
							<byks-shangchuan :row="row"></byks-shangchuan>
							<!--报名的课程-->
							<byks-baoming :row="row"></byks-baoming>
							<!--我的关注-->
							<byks-guanzhu :row="row"></byks-guanzhu>
						</div>

					</div>
				</div>
				<div class="main-right-bottom">

				</div>
				<div class="main-right-mid">
					<!--弹出课程安排-->
					<byks-tanchu :rowtanchu="rowtanchu"></byks-tanchu>
				</div>
			</div>
		</div>

	</div>
	<div id="footer">
		毕业设计机器人教育网站©2017 马帅彬版权所有
	</div>
	{% include 'script.tpl' %}
	<script type="text/javascript" src="../../../zhzl/lcgl/js/Mymanagement.js"></script>
	<script>
		$('.carousel').carousel();
		$('#someTab').tab('show')
	</script>

</body>

</html>
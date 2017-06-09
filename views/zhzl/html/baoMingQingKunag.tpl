<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>毕业课设</title>
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
	{% include 'stylesheet.tpl' %}
	<link rel="stylesheet" href="../../../zhzl/lcgl/css/baoMingQingKunag.css" />
</head>

<body class="skin-blue sidebar-mini">
	{% include 'nav.tpl' %}
	<div id="main"> 
		<div class="main">
			{% include 'main-left.tpl' %}
			<div class="main-right">
				<div class="main-right-top">
					<byks-bmuser :row="row"></byks-bmuser>
				</div>
				<div class="main-right-bottom">
				
				</div>
				<div class="main-right-mid">
					
				</div>
			</div>
		</div>

	</div>
	<div id="footer">
		毕业设计机器人教育网站©2017 华北理工大学轻工学院马帅彬版权所有
	</div>
	{% include 'script.tpl' %}
	<script type="text/javascript" src="../../../zhzl/lcgl/js/baoMingQingKunag.js"></script>
	<script>
		$('.carousel').carousel();
		$('#someTab').tab('show')
	</script>
</body>

</html>
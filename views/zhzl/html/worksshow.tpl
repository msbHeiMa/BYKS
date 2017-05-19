<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>毕业课设</title>
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
	{% include 'stylesheet.tpl' %}
	<link rel="stylesheet" href="../../../zhzl/lcgl/css/worksshow.css" />
</head>

<body class="skin-blue sidebar-mini">
	{% include 'nav.tpl' %}
	<div id="main">
		<div class="main">
			{% include 'main-left.tpl' %}
			<div class="main-right">
				<div class="main-right-top">
					<!--作品展示组件-->
					<byks-zuopin :row="row" :type="type"></byks-zuopin>
				</div>
				<div class="main-right-bottom">
					<nav aria-label="Page navigation">
                        <ul class="pagination">
                            <li>
                            <a href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                            </li>
                            <li><a href="#">1</a></li>
                            <li><a href="#">2</a></li>
                            <li><a href="#">3</a></li>
                            <li><a href="#">4</a></li>
                            <li><a href="#">5</a></li>
                            <li>
                            <a href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                            </li>
                        </ul>
                    </nav>
				</div>
				<div class="main-right-mid">
					
				</div>
			</div>
		</div>

	</div>
	<div id="footer">
		毕业设计机器人教育网站©2017 马帅彬版权所有
	</div>
	{% include 'script.tpl' %}
	<script type="text/javascript" src="../../../zhzl/lcgl/js/worksshow.js"></script>
	<script>
		$('.carousel').carousel();
		$('#someTab').tab('show')
	</script>

</body>

</html>
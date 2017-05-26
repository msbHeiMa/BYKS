<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>毕业课设</title>
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
	{% include 'stylesheet.tpl' %}
	<link rel="stylesheet" href="../../../zhzl/lcgl/css/Videoteaching.css" />
</head>

<body class="skin-blue sidebar-mini">
	{% include 'nav.tpl' %}
	<div id="main">
		<div class="main">
			{% include 'main-left.tpl' %}
			<div class="main-right">
				<div class="main-right-top">
					<div class="border-left-biaoti">
                        <h4>视频教学</h4>
                    </div>
					<div class="row">
						<div class="col-md-4">
							<video poster="http://www.abilix.com/images/krypton/test/video1.jpg" width="100%" src="http://www.abilix.com/video/web2/k-b1-jieshao.mp4"
								preload="none" onclick="this.controls=1; if(this.paused)this.play();" controls=""></video>
							<p>积木系列氪介绍篇</p>
						</div>
						<div class="col-md-4">
							<video poster="http://www.abilix.com/images/krypton/test/video2.jpg" width="100%" src="http://www.abilix.com/video/web2/k-b2.mp4"
								preload="none" onclick="this.controls=1; if(this.paused)this.play();" controls=""></video>
							<p>实施履带机器人项目</p>
						</div>
						<div class="col-md-4">
							<video poster="http://www.abilix.com/images/krypton/test/video3.jpg" width="100%" src="http://www.abilix.com/video/web2/k-b3-eyuzui.mp4"
								preload="none" onclick="this.controls=1; if(this.paused)this.play();" controls=""></video>
							<p>积木系列案例-鳄鱼嘴</p>
						</div>
						<div class="col-md-4">
							<video poster="http://www.abilix.com/images/krypton/test/video4.jpg" width="100%" src="http://www.abilix.com/video/web2/k-b4-shoubi.mp4"
								preload="none" onclick="this.controls=1; if(this.paused)this.play();" controls=""></video>
							<p>积木系列案例-工业机械手</p>
						</div>
						<div class="col-md-4">
							<video poster="http://www.abilix.com/images/krypton/test/video5.jpg" width="100%" src="http://www.abilix.com/video/web2/k-b5-yaobairen.mp4"
								preload="none" onclick="this.controls=1; if(this.paused)this.play();" controls=""></video>
							<p>积木系列案例-齿轮驱动的摇摆人</p>
						</div>
						<div class="col-md-4">
							<video poster="http://www.abilix.com/images/krypton/test/video6.jpg" width="100%" src="http://www.abilix.com/video/web2/k-b6-yueyeche.mp4"
								preload="none" onclick="this.controls=1; if(this.paused)this.play();" controls=""></video>
							<p>积木系列案例-越野车</p>
						</div>
						<div class="col-md-4">
							<video poster="http://www.abilix.com/images/krypton/test/video4.jpg" width="100%" src="http://www.abilix.com/video/web2/k-b4-shoubi.mp4"
								preload="none" onclick="this.controls=1; if(this.paused)this.play();" controls=""></video>
							<p>积木系列案例-工业机械手</p>
						</div>
						<div class="col-md-4">
							<video poster="http://www.abilix.com/images/krypton/test/video5.jpg" width="100%" src="http://www.abilix.com/video/web2/k-b5-yaobairen.mp4"
								preload="none" onclick="this.controls=1; if(this.paused)this.play();" controls=""></video>
							<p>积木系列案例-齿轮驱动的摇摆人</p>
						</div>
						<div class="col-md-4">
							<video poster="http://www.abilix.com/images/krypton/test/video6.jpg" width="100%" src="http://www.abilix.com/video/web2/k-b6-yueyeche.mp4"
								preload="none" onclick="this.controls=1; if(this.paused)this.play();" controls=""></video>
							<p>积木系列案例-越野车</p>
						</div>
					</div>
				</div>
				<div class="main-right-bottom">
					<!--<nav aria-label="Page navigation">
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
                    </nav>-->
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
	<script type="text/javascript" src="../../../zhzl/lcgl/js/Videoteaching.js"></script>
	<script>
		$('.carousel').carousel();
		$('#someTab').tab('show')
	</script>

</body>

</html>
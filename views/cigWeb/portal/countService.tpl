{% extends '../parent/layoutvue.tpl' %} {% block title %}统计服务{%endblock%} {% block style %}{% endblock %} {% block body %}
{%endblock%} {% block content %}

<!--内容-->
{% raw %}
<div id="detail">
	<!--面包屑导航-->
	<div class="container">
		<!--<section class="content-header">
			<ol class="breadcrumb">
				<li><a href="index.html"> 首页</a></li>
				<li><a href="business.html"> 流程服务分系统</a></li>
				<li>统计服务</li>
			</ol>
		</section>-->
		<div class="cig-breadcrumb">
			<a href="../index.html"> 首页&nbsp;></a>
			<a href="business.html"> 流程服务分系统&nbsp;>	</a>
			<a href="javascript:;"> 统计服务</a>
		</div>
		<div class="row">
			<div class="col-md-5">
				<div class="conuntchat">
					<span class="conuntLine">实例数统计</span>
					<div class="rightLine"><img src="img/countImg01.png" alt="">
					</div>

				</div>
			</div>
			<div class="col-md-1" class="rightLine"></div>
			<div class="col-md-6">
				<div class="conuntchat">
					<span class="conuntLine">服务量统计</span>
					<div><img src="img/countImg02.png" alt=""></div>
				</div>
			</div>
			<div class="clear"></div>
			<div class="countNumber">
				<div class="row">
					<div class="col-md-3">
						<div class="count-box">
							<span class="count-box-bg backg-blue"><i class="count-box-bg count-bg-img01"></i></span>
							<div class="count-box-content">
								<span class="count-box-text">累计流程数</span>
								<span class="count-box-number number-blue">3010290<span class="count-untis">条</span></span>
							</div>
						</div>
					</div>

					<div class="col-md-3">
						<div class="count-box">
							<span class="count-box-bg backg-red"><i class="count-box-bg count-bg-img02"></i></span>
							<div class="count-box-content">
								<span class="count-box-text">月流程实例数</span>
								<span class="count-box-number number-red">49893<span class="count-untis">条</span></span>
							</div>
						</div>
					</div>

					<div class="col-md-3">
						<div class="count-box">
							<span class="count-box-bg backg-yellow"><i class="count-box-bg count-bg-img03"></i></span>
							<div class="count-box-content">
								<span class="count-box-text">活跃用户</span>
								<span class="count-box-number number-yellow">2148<span class="count-untis">个</span></span>
							</div>
						</div>
					</div>

					<div class="col-md-3">
						<div class="count-box">
							<span class="count-box-bg backg-green"><i class="count-box-bg count-bg-img04"></i></span>
							<div class="count-box-content">
								<span class="count-box-text">覆盖单位</span>
								<span class="count-box-number number-green">548<span class="count-untis">家</span></span>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>

</div>


{% endraw %} {% endblock %} {% block script%}

<script type="text/javascript">
var curModule = "";
    requirejs([
        '/cigWeb/portal/js/countService.js'], function () {
    });
</script> {% endblock %}
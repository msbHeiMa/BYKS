{% extends 'parent/layoutvueindex.tpl' %} {% block title %}首页{%endblock%} {% block style %}{% endblock %} {% block body %} {%endblock%}
{% block content %}
<!--引用样式-->



<!--内容-->
{% raw %}
<div id="detail">
	<section>
		<!--轮播图-->
		<div class="banner">
			<!--背景图片-->
			<!--<span class="banner-img"></span>-->
			<div id="slider" class="slider">
				<img src="portal/img/bannerNew.png" class="banner-show" />
				<img src="portal/img/banner01.jpg" class="banner-hide" />
				<img src="portal/img/banner02.jpg" class="banner-hide" />
				<ul class="banner-cut">
					<li class="current" data-click='0'></li>
					<li data-click='1'></li>
					<li data-click='2'></li>
				</ul>
			</div>
			<!--<img v-bind:src="imgUrl" class="bannerImg" />-->
			<!--文字-->
			<!--<div class="bannerWenzi">
				<span class="come">限量提供免费服务，等你来</span>
				<span>大数据全新上线，开发免费体验</span>
				<a href="#">查看详情</a>
			</div>-->
		</div>
		<!--聚合信息-->
		<div class="aggregating">
			<div class="container ">
				<div class="row">
					<div class="col-md-3">
						<ul class="aggregatingUL">
							<li><span class="aggregatingImg aggregatingImg01"></span></li>
							<li><b class="aggregatingCount">{{countInfo.aggregateData}}<i class="aggregatingUnits">条</i></b></li>
							<li class="aggregatingContent">聚合信息数</li>
						</ul>
					</div>
					<div class="col-md-3">
						<ul class="aggregatingUL">
							<li><span class="aggregatingImg aggregatingImg02"></span></li>
							<li><b class="aggregatingCount">{{countInfo.accessToAuthority}}<i class="aggregatingUnits">家</i></b></li>
							<li class="aggregatingContent">聚合信息覆盖单位</li>
						</ul>
					</div>
					<div class="col-md-3">
						<ul class="aggregatingUL">
							<li><span class="aggregatingImg aggregatingImg03"></span></li>
							<li><b class="aggregatingCount">{{countInfo.wfOfficeNum}}<i class="aggregatingUnits">个</b></i>
							</li>
							<li class="aggregatingContent">流程服务总数</li>
						</ul>
					</div>
					<div class="col-md-3">
						<ul class="aggregatingUL">
							<li><span class="aggregatingImg aggregatingImg04"></span></li>
							<li><b class="aggregatingCount">{{countInfo.wfServiceNum}}<i class="aggregatingUnits">家</i></b></li>
							<li class="aggregatingContent">流程服务覆盖单位</li>
						</ul>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<h3>集约、安全、泛在的信息资源整合服务</h3>
					</div>
				</div>

				<div class="row">
					<ul class="content-UL">
						<li class="normal-Li">
							<ul class="normalUl">
								<li><span class="manager manager01"></span></li>
								<li><b class="normalTitle">服务发布与管理</b></li>
								<li class="normalContent">全方位、高系统性、高鲁棒性</li>
							</ul>
							<ul class="managerUL">
								<li style="margin-top:25px;"><a href="javascript:;">服务管理</a></li>
								<li style="margin-bottom:25px;"><a href="javascript:;">服务注册</a></li>
								<!--<li ><a href="javascript:;">&nbsp;</a></li>-->
								<!--<li><a href="javascript:;">&nbsp;</a></li>
								<li><a href="javascript:;">&nbsp;</a></li>-->
							</ul>
						</li>
						<li class="normal-Li">
							<ul class="normalUl">
								<li><span class="manager manager02"></span></li>
								<li><b class="normalTitle ">大数据服务</b></li>
								<li class="normalContent ">海量数据、专家库、决策支持</li>
							</ul>
							<ul class="managerUL">
								<!--<li><a href="javascript:;">云服务器ECS</a></li>
								<li><a href="javascript:;">内容分发网络CDN</a></li>-->
								<li><a href="javascript:;">数据资源自定义组织</a></li>
								<li><a href="javascript:;">数据分析模型服务</a></li>
								<li><a href="javascript:;">数据分析流程自定义</a></li>
							</ul>
						</li>
					</ul>
					<!--服务发布-->
					<ul class="contentUL" id="contentUL">
						<!--<li :class="{normalLi:true, activeLi:activeIndex == 0}" @mouseover="activeItem($event,0)">
							<ul class="normalUl">
								<li><span class="manager manager01"></span></li>
								<li><b class="normalTitle">服务发布与管理</b></li>
								<li class="normalContent">专业领先、高性能、高可用</li>
							</ul>
							<ul class="managerUL">
								<li><a href="#">云服务器ECS</a></li>
								<li><a href="#">内容分发网络CDN</a></li>
								<li><a href="#">云数据库RDS</a></li>
							</ul>
						</li>-->
						<!--大数据-->
						<!--<li :class="{normalLi:true,split:true, activeLi:activeIndex == 1}" @mouseover="activeItem($event,1)">
							<ul class="normalUl">
								<li><span class="manager manager02"></span></li>
								<li><b class="normalTitle ">大数据服务</b></li>
								<li class="normalContent ">专业领先、高性能、高可用</li>
							</ul>
							<ul class="managerUL">
								<li><a href="#">云服务器ECS</a></li>
								<li><a href="#">内容分发网络CDN</a></li>
								<li><a href="#">&nbsp;</a></li>
							</ul>
						</li>-->
						<!--时空云-->
						<li :class="{normalLi:true, activeLi:activeIndex == 0}" @mouseover="activeItem($event,0)" @click="linkYun">
							<ul class="normalUl">
								<li><span class="manager manager03"></span></li>
								<li><b class="normalTitle ">时空云服务</b></li>
								<li class="normalContent ">专业领先、高性能、高可用</li>
							</ul>
							<ul class="managerUL">
								<li><a href="javascript:;">时空数据服务</a></li>
								<li><a href="javascript:;">时空数据服务</a></li>
								<li><a href="javascript:;">三维场景</a></li>
								<!--<li><a href="javascript:;">云服务</a></li>
								<li><a href="javascript:;">智能地图</a></li>-->
							</ul>
						</li>
						<!--流程服务-->
						<li :class="{normalLi:true, activeLi:activeIndex == 1,split:true} " @mouseover="activeItem($event,1)" @click="linkLCFW">
							<ul class="normalUl">
								<li><span class="manager manager04"></span></li>
								<li><b class="normalTitle ">流程服务</b></li>
								<li class="normalContent ">标准化、集约化、科学化</li>
							</ul>
							<ul class="managerUL">
								<li style="margin-top:25px;"><a href="javascript:;">统计服务</a></li>
								<li style="margin-bottom:25px;"><a href="javascript:;">流程服务</a></li>
								<!--<li><a href="javascript:;">&nbsp;</a></li>
								<li><a href="javascript:;">&nbsp;</a></li>-->
							</ul>
						</li>
						<!--信息聚合-->
						<li :class="{normalLi:true, activeLi:activeIndex == 2}" @mouseover="activeItem($event,2)" @click="linkXXJH">
							<ul class="normalUl">
								<li><span class="manager manager05"></span></li>
								<li><b class="normalTitle ">信息聚合服务</b></li>
								<li class="normalContent ">信息齐全、按需聚合、高时效性</li>
							</ul>
							<ul class="managerUL">
								<li style="margin-top:25px;"><a href="javascript:;">信息聚合服务</a></li>
								<li style="margin-bottom:25px;"><a href="javascript:;">数据服务</a></li>
								<!--<li><a href="javascript:;">&nbsp;</a></li>
								<li><a href="javascript:;">&nbsp;</a></li>-->
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>


		<!--关于我们-->
		<div class="aboutUs">
			<div class="container ">
				<div class="row">
					<div class="col-md-12">
						<h3>关于我们</h3>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<img src="portal/img/company.png" alt="关于我们的图片">
					</div>
					<div class="col-md-6">
						<p>航天神舟智慧系统技术有限公司成立于2015年成立，注册资本9900万元，隶属于中国航天科技集团公司五院，以推动实现城市治理体系和治理能力现代化为目标，面向国家智慧城市建设、行业和区域信息化建设领域，以城市发展问题为导向、以方法论为指导、以能力为驱动、以数据为核心、以架构为基础，分层、分类、聚类相结合，研究解决智慧城市产业技术应用服务和成果落地转化。公司已在国内多个城市深入开展相关...
						</p>
						<div class="companyMessage">
							<ul>
								<li>电话： 010-1234556</li>
								<li>传真： 1234-123-123</li>
								<li>邮箱： djkjdwn@163.com</li>
								<li>地址： 北京市朝阳区民族园路5号</li>
							</ul>
						</div>

					</div>
				</div>
			</div>
		</div>
	</section>
</div>
{% endraw %} {% endblock %} {% block script%}

<script type="text/javascript">
var curModule = "";
    requirejs([
        '/cigWeb/parent/index.js'], function () {
    });
</script> {% endblock %}
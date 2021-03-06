<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>毕业课设</title>
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
	{% include 'stylesheet.tpl' %}
	<link rel="stylesheet" href="../../../zhzl/lcgl/css/index.css" />
</head>

<body class="skin-blue sidebar-mini">
	{% include 'nav.tpl' %}
	<div id="main">
		<div class="main">
			{% include 'main-left.tpl' %}
			<div class="main-right">
				<div class="main-right-top">
					<div class="main-left-guanggao">
						<h3>最新机器人展示</h3>
						<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
							<!-- Indicators -->
							<ol class="carousel-indicators">
								<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
								<li data-target="#carousel-example-generic" data-slide-to="1"></li>
								<li data-target="#carousel-example-generic" data-slide-to="2"></li>
							</ol>

							<!-- Wrapper for slides -->
							<div class="carousel-inner" role="listbox">
								<div class="item active">
									<img src="../../../zhzl/lcgl/images/16.jpg" alt="...">
									<div class="carousel-caption">
										<h4>第一张</h4>
										<p>霸气侧漏</p>
									</div>
								</div>
								<div class="item">
									<img src="../../../zhzl/lcgl/images/17.jpg" alt="...">
									<div class="carousel-caption">
										<h4>第二张</h4>
										<p>霸气侧漏</p>
									</div>
								</div>
								<div class="item">
									<img src="../../../zhzl/lcgl/images/20.jpg" alt="...">
									<div class="carousel-caption">
										<h4>第三张</h4>
										<p>霸气侧漏</p>
									</div>
								</div>
							</div>

							<!-- Controls -->
							<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
								<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
								<span class="sr-only">Previous</span>
							</a>
							<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
								<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
								<span class="sr-only">Next</span>
							</a>
						</div>
					</div>
					<div class="main-right-redian">
						<h3>热点推送</h3>
						<!--热点组件-->
						<byks-redian :redian="redian"></byks-redian>
						<!--热点详情弹框组件-->
						<byks-rdtanchu :rdtanchu="rdtanchu"></byks-rdtanchu>
						
					</div>
				</div>
				<div class="main-right-bottom">
					<h3>精彩内容欣赏</h3>
					<!--精彩内容展示组件-->
					<byks-zhanshi :row="row"></byks-zhanshi>
					<!--精彩内容详情弹框组件-->
					<byks-zstanchu :zstanchu="zstanchu"></byks-zstanchu>
				</div>
				<div class="main-right-mid">
					<h3>机器人教育发展历程</h3>
					<div id="someTab">
						<ul class="nav nav-tabs" role="tablist">
							<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">机器人教育历史</a></li>
							<li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab" onclick=xianzhuang()>机器人教育现状</a></li>
							<li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab" onclick=weilai()>机器人教育未来</a></li>
						</ul>
						<div class="tab-content">
							<div role="tabpanel" class="tab-pane active" id="home">								
							</div>
							<div role="tabpanel" class="tab-pane" id="profile">
							</div>
							<div role="tabpanel" class="tab-pane" id="messages">
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>

	</div>
	<div id="footer">
		毕业设计机器人教育网站©2017 华北理工大学轻工学院马帅彬版权所有
	</div>
	{% include 'script.tpl' %}
	<script type="text/javascript" src="../../../zhzl/lcgl/js/index.js"></script>
	<script>
		$('.carousel').carousel();
		$('#someTab').tab('show')
	</script>
    <script>
	    var url="http://localhost:3002";
		$(function(){
			var data=[];
			$.ajax({
                url:url+"/byks/getTuBiao?type=LISHI",  
                type: "get",
                success: function(res){
                        data=res.data
						var chart = new iChart.Pie3D({
							render : 'home',
							data: data,
							title : {
								text : '机器人教育行业历史数据',
								height:40,
								fontsize : 30,
								color : '#282828'
							},
							sub_option : {
								mini_label_threshold_angle : 40,//迷你label的阀值,单位:角度
								mini_label:{//迷你label配置项
									fontsize:20,
									fontweight:600,
									color : '#ffffff'
								},
								label : {
									background_color:null,
									sign:false,//设置禁用label的小图标
									padding:'0 4',
									border:{
										enable:false,
										color:'#666666'
									},
									fontsize:11,
									fontweight:600,
									color : '#4572a7'
								},
								border : {
									width : 2,
									color : '#ffffff'
								},
								listeners:{
									parseText:function(d, t){
										return d.get('value')+"%";//自定义label文本
									}
								} 
							},
							legend:{
								enable:true,
								padding:0,
								offsetx:120,
								offsety:50,
								color:'#3e576f',
								fontsize:20,//文本大小
								sign_size:20,//小图标大小
								line_height:28,//设置行高
								sign_space:10,//小图标与文本间距
								border:false,
								align:'left',
								background_color : null//透明背景
							},
							animation : true,//开启过渡动画
							animation_duration:800,//800ms完成动画 
							shadow : true,
							shadow_blur : 6,
							shadow_color : '#aaaaaa',
							shadow_offsetx : 0,
							shadow_offsety : 0,
							background_color:'#f1f1f1',
							align:'right',//右对齐
							offsetx:-100,//设置向x轴负方向偏移位置60px
							offset_angle:-90,//逆时针偏移120度
							width : 800,
							height : 400,
							radius:150
						});
						//利用自定义组件构造右侧说明文本
						chart.plugin(new iChart.Custom({
								drawFn:function(){
									//在右侧的位置，渲染说明文字
									chart.target.textAlign('start')
									.textBaseline('top')
									.textFont('600 20px Verdana')
									.fillText('数据统计:\n近几年数据\n概念图',120,80,false,'#be5985',false,24)
									.textFont('600 12px Verdana')
									.fillText('统计区间,2012-2016',120,160,false,'#999999');
								}
						}));
						
						chart.draw();
                },
                error:function(){},
                });
			
		});
		function xianzhuang(){
			$(function() {
				$.ajax({
                url:url+"/byks/getTuBiao?type=XIANZHUANG",  
                type: "get",
                success: function(res){
					data=res.data
					var chart = new iChart.Column2D({
					render : 'profile',
					data : data,
					title : {
						text : '2017年个别月份收入占比统计',
						color : '#3e576f'
					},
					subtitle : {
						text : '模拟数据',
						color : '#6d869f'
					},
					width : 800,
					height : 400,
					label : {
						fontsize:11,
						color : '#666666'
					},
					animation : true,//开启过渡动画
					animation_duration:800,//800ms完成动画
					shadow : true,
					shadow_blur : 2,
					shadow_color : '#aaaaaa',
					shadow_offsetx : 1,
					shadow_offsety : 0,
					column_width : 62,
					sub_option : {
						listeners : {
							parseText : function(r, t) {
								return t + "%";
							}
						},
						label : {
							fontsize:11,
							fontweight:600,
							color : '#4572a7'
						},
						border : {
							width : 2,
							color : '#ffffff'
						}
					},
					coordinate : {
						background_color : null,
						grid_color : '#c0c0c0',
						width : 680,
						axis : {
							color : '#c0d0e0',
							width : [0, 0, 1, 0]
						},
						scale : [{
							position : 'left',
							start_scale : 0,
							end_scale : 60,
							scale_space : 10,
							scale_enable : false,
							label : {
								fontsize:11,
								color : '#666666'
							}
						}]
					}
				 });			
				
					chart.plugin(new iChart.Custom({
							drawFn:function(){
								/**
								 *计算位置
								*/	
								var coo = chart.getCoordinate(),
									x = coo.get('originx'),
									y = coo.get('originy'),
									H = coo.height;
								/**
								 *在左侧的位置，设置逆时针90度的旋转，渲染文字。
								*/
								chart.target.textAlign('center')
								.textBaseline('middle')
								.textFont('600 13px Verdana')
								.fillText('百分比制度',x-40,y+H/2,false,'#6d869f', false,false,false,-90);
								
							}
					}));
					chart.draw();
				},
                error:function(){},
                });
				
				
			});
		};
		function weilai(){
			$(function(){
				$.ajax({
                url:url+"/byks/getTuBiao?type=WEILAI",  
                type: "get",
                success: function(res){
					data=res.data;
					var chart = new iChart.Donut2D({
						render : 'messages',
						data: data,
						title : {
							text : '预测未来一年12个月份收入占比统计(预计总产值可达10个亿)',
							color : '#3e576f'
						},
						center : {
							text:'100%',
							color:'#3e576f',
							shadow:true,
							shadow_blur : 2,
							shadow_color : '#557797',
							shadow_offsetx : 0,
							shadow_offsety : 0,
							fontsize : 40
						},
						sub_option : {
							label : {
								background_color:null,
								sign:false,//设置禁用label的小图标
								padding:'0 4',
								border:{
									enable:false,
									color:'#666666'
								},
								fontsize:11,
								fontweight:600,
								color : '#4572a7'
							},
							border : {
								width : 2,
								color : '#ffffff'
							}
						},
						shadow : true,
						shadow_blur : 6,
						shadow_color : '#aaaaaa',
						shadow_offsetx : 0,
						shadow_offsety : 0,
						background_color:'#fefefe',
						offset_angle:-120,//逆时针偏移120度
						showpercent:true,
						decimalsnum:2,
						width : 800,
						height : 400,
						radius:120
					});
					chart.draw();
				},
                error:function(){},
                });
				
			});
		}
	</script>
</body>

</html>
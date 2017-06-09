<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>毕业课设</title>
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
	{% include 'stylesheet.tpl' %}
	<link rel="stylesheet" href="../../../zhzl/lcgl/css/zuoPinShenHe.css" />
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
							<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab" @click="lunhuan('待办')">待办</a></li>
							<li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab" @click="lunhuan('通过')">审核通过</a></li>
							<li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab" @click="lunhuan('未通过')">未通过审核</a></li>
						</ul>
						<div class="tab-content">
							<!--作品审核-->
                            <byks-zpsh :row="row" :type="type"></byks-zpsh>
                            <!--作品详情弹出框 -->
                            <byks-zptc :zstanchu="zstanchu"></byks-zptc>
						</div>

					</div>
				</div>
				<div class="main-right-bottom">
                       <div class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
                        <div class="modal-dialog modal-sm" role="document">
                            <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                        <h4 class="modal-title" id="mySmallModalLabel">未通过原因</h4>
                                    </div>
                                    <div class="modal-body ">
								<div class="row">
                                         <textarea class="textarea" v-model="wtgsj.wtgyy" ></textarea>
                                </div>
                                <div class="modal-footer">
								    <button type="button" class="btn btn-default" data-dismiss="modal" @click="tijiaowtg()">提交</button>
							    </div>
							</div>
                            </div>
                        </div>
                      </div>
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
	<script type="text/javascript" src="../../../zhzl/lcgl/js/zuoPinShenHe.js"></script>
	<script>
		$('.carousel').carousel();
		$('#someTab').tab('show')
	</script>
</body>

</html>
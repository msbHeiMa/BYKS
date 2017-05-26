<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>毕业课设</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
    {% include 'stylesheet.tpl' %}
    <link rel="stylesheet" href="../../../zhzl/lcgl/css/worksdetail.css" />
</head>

<body class="skin-blue sidebar-mini">
    {% include 'nav.tpl' %}
    <div id="main">
        <div class="main">
           {% include 'main-left.tpl' %}
            <div class="main-right">
                <div class="main-right-top">
                     <!--作品详情组件-->
                    <byks-zpdetail :row="row"></byks-ZPDetail>
                </div>
                <div class="main-right-mid">
                    <div class="border-top-biaoti">
                        <h4>评论区</h4>
                    </div>
                    <byks-pinglun :pinglun="pinglun"></byks-pinglun>
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
                <div class="main-right-bottom">
                    <div class="border-top-biaoti">
                        <h4>发表评论</h4>
                    </div>
                    <p>
                        <textarea name="" id="" cols="30" rows="10" v-model="textarea"></textarea>
                    </p>
                    <a href="javascript:void(0)" class="button button-glow button-rounded button-royal" @click="save">发表</a>
                    <a href="javascript:void(0)" class="button button-glow button-rounded button-royal" @click="back">返回</a>
                </div>
                <!--模态框部分-->
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
						<div class="modal-dialog" role="document">
							<div class="modal-content">
							<div class="modal-header">
								<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
								<h4 class="modal-title" id="myModalLabel">图片详情</h4>
							</div>
							<div class="modal-body ">
								<img class="model_img">
							</div>
							<div class="modal-footer">
								<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
								<!--<button type="button" class="btn btn-primary">Save changes</button>-->
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
    <script type="text/javascript" src="../../../zhzl/lcgl/js/worksdetail.js"></script>
    <script>
		$('.carousel').carousel();
		$('#someTab').tab('show')
	</script>

</body>

</html>
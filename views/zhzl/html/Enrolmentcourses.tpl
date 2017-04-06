<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>毕业课设</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
    <link rel="stylesheet" href="../../../components/bootstrap-3.3.7-dist/css/bootstrap.css" />
    <link rel="stylesheet" href="../../../components/bootstrap-3.3.7-dist/css/buttons.css" />
    <link rel="stylesheet" href="../../../zhzl/lcgl/css/Enrolmentcourses.css" />
    <link rel="stylesheet" href="../../../zhzl/lcgl/css/layout.css" />
    <link rel="SHORTCUT ICON" href="../../../logo.ico"/>

</head>

<body class="skin-blue sidebar-mini">
    <div id="nav">
        <ul class="daohang">
            <li>
                <a href="index.html" class="img">
                    <img src="../../../zhzl/lcgl/images/logo.jpg" alt="" id="logo">
                </a>
            </li>
            <li><a href="index.html">首页</a></li>
            <li><a href="Videoteaching.html">视频教学</a></li>
            <li><a href="Enrolmentcourses.html">报名课程</a></li>
            <li><a href="worksshow.html">作品展示</a></li>
            <li><a href="Mymanagement.html">我的管理</a></li>
            <li><a href="login.html">登陆/注册</a></li>
        </ul>

    </div>
    <div id="main">
        <div class="main">
            <div class="main-left">
                <ul>
                    <li><a href="sczp.tpl">上传作品</a></li>
					<li><a href="#">了解机器人</a></li>
					<li><a href="#">了解课程</a></li>
					<li><a href="worksshow.html">查看大家作品</a></li>
					<li><a href="#">关注热点</a></li>
					<li><a href="#">联系我们</a></li>
                </ul>
            </div>
            <div class="main-right">
                <div class="main-right-top">
                    <div class="border-left-biaoti">
                        <h4>课程特色</h4>
                    </div>
                    <img src="../../../zhzl/lcgl/images/course.jpg">
                </div>
                <div class="main-right-mid">
                    <div class="border-left-biaoti">
                        <h4>课程体系</h4>
                    </div>
                    <!--vue.js框架自定义标签-->
                    <byks-kecheng  :row="row"></byks-kecheng>
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
                <div class="main-right-bottom">

                </div>
            </div>
        </div>

    </div>
    <div id="footer">
        毕业设计机器人教育网站©2017 马帅彬版权所有
    </div>
    <script src="../../../components/jquery/dist/jquery.min.js"></script>
    <script src="../../../components/bootstrap-3.3.7-dist/js/bootstrap.js"></script>
    <script src="../../../components/vue/dist/vue.js"></script>
    <script type="text/javascript" src="../../../zhzl/lcgl/js/Enrolmentcourses.js"></script>
    <script>
		$('.carousel').carousel();
		$('#someTab').tab('show')
	</script>

</body>

</html>
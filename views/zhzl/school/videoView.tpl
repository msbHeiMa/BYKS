<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>子界面的显示</title>
	<meta charset="utf-8" />
    <script src="/cig/map/cigmap/ciglib/jquery-1.11.3.min.js"></script>
    <style>
        p{margin:0;padding:0;}
        .VideoShow{margin-top:0px;text-decoration:none;font-size:12px;}
        .videoView{
            width:280px;
            height:240px;
            background-color:antiquewhite;
            display:none;
        }
    </style>
    <script>
        $(function ($) {
            //设置和获取href属性中跟在问号后面的值
            var category = window.location.search;
            //截取，获取获得category的具体值
            var showData = category.substring(category.lastIndexOf('=') + 1, category.length);
            var show = decodeURI(showData);
            $(".TitleShow").html(show);

            const toggleShow = $("#VideoShow");
            var toggle = false;
            toggleShow.click(function () {
                if (toggle) {
                    toggle = false;
                    toggleShow.html("显示视频");
                    $(".videoView").css("display", "none");
                   
                } else {
                    toggle = true;
                    toggleShow.html("收起");
                    $(".videoView").css("display", "block");
                   
                }
            });
        });
    </script>
</head>
<body>
    <div>
        <div class="list">
            <div><p class="TitleShow"></p></div>
            <a class="VideoShow" id="VideoShow" href="javascript:void(0)">显示视频</a>
            <div class="videoView" id="videoView">
            </div>
        </div>
    </div>
</body>
</html>

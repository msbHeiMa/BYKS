<!DOCTYPE html>
<html>

<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<title>毕业课设</title>
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
	{% include 'stylesheet.tpl' %}
	<link rel="stylesheet" href="../../../zhzl/lcgl/css/Mymanagement.css" />
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
							<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab" @click="lunhuan('上传')">我的上传</a></li>
							<li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab" @click="lunhuan('报名')">报名的课程</a></li>
							<li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab" @click="lunhuan('关注')">我的关注</a></li>
							<li role="presentation"><a href="#touxiang" aria-controls="touxiang" role="tab" data-toggle="tab">上传头像</a></li>
						</ul>
						<div class="tab-content">
							<!--我的上传-->
							<byks-shangchuan :row="row"></byks-shangchuan>
							<!--报名的课程-->
							<byks-baoming :row="row"></byks-baoming>
							<!--我的关注-->
							<byks-guanzhu :row="row"></byks-guanzhu>
							<!--上传头像-->
							<byks-sctx></byks-sctx>
						</div>

					</div>
				</div>
				<div class="main-right-bottom">

				</div>
				<div class="main-right-mid">
					<!--弹出课程安排-->
					<byks-tanchu :rowtanchu="rowtanchu"></byks-tanchu>
				</div>
			</div>
		</div>

	</div>
	<div id="footer">
		毕业设计机器人教育网站©2017 华北理工大学轻工学院马帅彬版权所有
	</div>
	{% include 'script.tpl' %}
	<script type="text/javascript" src="../../../zhzl/lcgl/js/Mymanagement.js"></script>
	<script>
		$('.carousel').carousel();
		$('#someTab').tab('show')
	</script>
	 <script>
       var params = {
            fileInput: $("#fileImage").get(0),
            dragDrop: $("#fileDragArea").get(0),
            upButton: $("#fileSubmit").get(0),
            // url: "http://localhost:3002/byks/getAllCourse",
            url:null,
            Y:0,
            filter: function(files) {
                var arrFiles = [];
                for (var i = 0, file; file = files[i]; i++) {
                    if (file.type.indexOf("image") == 0) {
                        if (file.size >= 512000) {
                            alert('您这张"'+ file.name +'"图片大小过大，应小于500k');	
                        } else {
                            arrFiles.push(file);	
                        }			
                    } else {
                        alert('文件"' + file.name + '"不是图片。');	
                    }
                }
                return arrFiles;
            },
            onSelect: function(files) {
                var html = '', i = 0;
                $("#preview").html('<div class="upload_loading"></div>');
                this.Y++;
                // console.log(this.Y)
                if(this.Y>5){
                    alert("图片最多上传5张");
                }else{
                    
                }
                var funAppendImage = function() {
                    file = files[i];
                    if (file) {
                        var reader = new FileReader()
                        reader.onload = function(e) {
                            html = html + '<div id="uploadList_'+ i +'" class="upload_append_list"><p><strong>' + file.name + '</strong>'+ 
                                '<a href="javascript:" class="upload_delete" title="删除" data-index="'+ i +'">删除</a><br />' +
                                '<img id="uploadImage_' + i + '" src="' + e.target.result + '" class="upload_image" /></p>'+ 
                                '<span id="uploadProgress_' + i + '" class="upload_progress"></span>' +
                            '</div>';
                            
                            i++;
                            funAppendImage();
                        }
                        reader.readAsDataURL(file);
                    } else {
                        $("#preview").html(html);
                        if (html) {
                            //删除方法
                            $(".upload_delete").click(function() {
                                ZXXFILE.funDeleteFile(files[parseInt($(this).attr("data-index"))]);
                                return false;	
                            });
                            //提交按钮显示
                            $("#fileSubmit").show();	
                        } else {
                            //提交按钮隐藏
                            $("#fileSubmit").hide();	
                        }
                    }
                };
                if(this.Y>5){
                    alert("图片最多上传5张");
                }else{
                    funAppendImage();
                }
                		
            },
            onDelete: function(file) {
                $("#uploadList_" + file.index).fadeOut();
            },
            onDragOver: function() {
                $(this).addClass("upload_drag_hover");
            },
            onDragLeave: function() {
                $(this).removeClass("upload_drag_hover");
            },
            onProgress: function(file, loaded, total) {
                var eleProgress = $("#uploadProgress_" + file.index), percent = (loaded / total * 100).toFixed(2) + '%';
                eleProgress.show().html(percent);
            },
            // onSuccess: function(file, response) {
            //     $("#uploadInf").append("<p>上传成功，图片地址是：" + response + "</p>");
            // },
            // onFailure: function(file) {
            //     $("#uploadInf").append("<p>图片" + file.name + "上传失败！</p>");	
            //     $("#uploadImage_" + file.index).css("opacity", 0.2);
            // },
            // onComplete: function() {
            //     //提交按钮隐藏
            //     $("#fileSubmit").hide();
            //     //file控件value置空
            //     $("#fileImage").val("");
            //     $("#uploadInf").append("<p>当前图片全部上传完毕，可继续添加上传。</p>");
            // }
        };
        ZXXFILE = $.extend(ZXXFILE, params);
        ZXXFILE.init();
    </script>
</body>

</html>
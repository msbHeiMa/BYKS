<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>毕业课设</title>
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
    {% include 'stylesheet.tpl' %}
    <link rel="stylesheet" href="../../../zhzl/lcgl/css/sczp.css" />
</head>

<body class="skin-blue sidebar-mini">
    {% include 'nav.tpl' %}
    <div id="main">
        <div class="main">
            {% include 'main-left.tpl' %}
            <div class="main-right">
                <div class="main-right-top">
                    <div class="border-top-biaoti">
                        <h4>上传图片</h4>
                    </div>
                    <div class="shangchuan">
                        <div class="upload_box">
                            <div class="upload_main">
                                <div class="upload_choose">
                                    <input id="fileImage" class="fileupload" type="file" size="30" name="fileselect[]" multiple />
                                    <span id="fileDragArea" class="upload_drag_area">或者将图片拖到此处</span>
                                </div>
                                <div id="preview" class="upload_preview"></div>
                            </div>
                            <!--<div class="upload_submit">
                                <button type="button" id="fileSubmit" class="upload_submit_btn">确认上传图片</button>
                            </div>-->
                            <div id="uploadInf" class="upload_inf"></div>
                        </div>
                    </div>
                </div>
                <div class="main-right-mid">
                    <div class="border-top-biaoti">
                        <h4>作品详情</h4>
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon1">作品名称</span>
                        <input type="text" class="form-control" placeholder="请输入您的作品名称" aria-describedby="basic-addon1" v-model="mc">
                    </div>
                    <div class="input-group">
                        <span class="input-group-addon" id="basic-addon1">作品介绍</span>
                        <input type="text" class="form-control" placeholder="请输入您的作品介绍" aria-describedby="basic-addon1" v-model="js">
                    </div>
                    <div class="input-group leixing">
                        <div>
                            <p>请选择作品类型</p>
                        </div>
                        <ul id="getType">
                            <li @click="getType('积木类型')"><a href="javascript:" class="first">积木类型</a></li>
                            <li @click="getType('变形金刚')"><a href="javascript:">变形金刚</a></li>
                            <li @click="getType('星际争霸')"><a href="javascript:">星际争霸</a></li>
                            <li @click="getType('其他')"><a href="javascript:">其他</a></li>
                        </ul>
                    </div>
                </div>
                <div class="main-right-bottom">
                    <div class="border-top-biaoti">
                        <h4>操作</h4>
                    </div>
                    <div class="caozuo">
                        <button type="button" id="fileSubmit" class="upload_submit_btn button button-glow button-rounded button-royal" @click="upload()">上传作品</button>
                        <!--<a href="#" class="button button-glow button-rounded button-royal">上传作品</a>-->
                        <a href="index.html" class="button button-glow button-rounded button-highlight">暂不上传</a>
                    </div>
                </div>
            </div>
        </div>

    </div>
    <div id="footer">
        毕业设计机器人教育网站©2017 马帅彬版权所有
    </div>
    {% include 'script.tpl' %}
    <script type="text/javascript" src="../../../zhzl/lcgl/js/sczp.js"></script>
    <script type="text/javascript" src="../../../zhzl/lcgl/js/zxxFile.js"></script>
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
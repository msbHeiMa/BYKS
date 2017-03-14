<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <title>系统管理-中国石油地理信息系统(A4)</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
   <meta http-equiv="Content-Type" content="charset=UTF-8" />
    <!-- Bootstrap 3.3.5 -->
    <link href="//a4.petrochina/A4Libs/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">    
    <!-- Customer -->
    <link href="/Assets/Default.css" rel="stylesheet">   
    {% block stylesheet %}
    {% endblock %}  
</head>
<body>
     <!-- navbar -->
    <div class="navbar-wrapper">
        <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
            <div class="navbar-header">
                <img style="margin-top: 5px; margin-left: 10px; margin-right: 10px; height: 40px; width: 200px;" src="/Assets/logo.png" />
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul id="nav_root" class="nav navbar-nav">
                </ul>
                <ul class="nav navbar-nav navbar-right" style="padding-right: 20px">
                    <li><a href="#"><span class="glyphicon glyphicon-user"></span>
                        <label id="label_UserName" class="control-label"></label>
                    </a></li>
                    <li><a href="/A4admin/SAML/Logout.aspx" target="_top">注销</a></li>
                </ul>
            </div>
        </nav>
    </div>
    <div class="content"  style="overflow-y:auto;">
        {% block iframe %}
        {% endblock %}  
    </div>
    {% block modaldialog %}
    {% endblock %}   
    <!-- jQuery 1.11.3 -->
    <script src="/components/jquery-2.1.4/dist/jquery.min.js"></script>
	<script src="/components/jquery-cookie/jquery.cookie.js"></script>
	<!-- Bootstrap 3.3.6 -->
	<script src="/components/bootstrap-3.3.5-dist/dist/js/bootstrap.min.js"></script>
	<script src="/components/bootstrap-table/dist/bootstrap-table.min.js"></script>
	<script src="/components/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.min.js"></script>
	<script src="/components/bootstrap-table/src/extensions/editable/bootstrap-table-editable.js"></script>
	<script src="/cig/svmobject/js/bootstrap-select.js"></script>
	<script src="/components/bootstrap-switch/dist/js/bootstrap-switch.min.js"></script>
	<script src="http://cdn.bootcss.com/bootstrap-table/1.9.1/locale/bootstrap-table-zh-CN.min.js"></script>
	<!--汉化-->
	<script src="/components/jquery-flot/jquery.flot.js"></script>
	<script src="/components/jquery-flot/jquery.flot.categories.js"></script> {% block script %}
	<script src="/components/admin-lte/dist/js/app.min.js"></script> {% endblock %}
	<script type="text/javascript" src="js/config.js"></script>
	<script src="/cig/svmobject/js/socket.io.js"></script>
	<script type="text/javascript" src="js/messagecount.js"></script>
	<script type="text/javascript" src="js/admin.js"></script>
	<script type="text/javascript" src="js/menu.js"></script>
    <script src="//a4.petrochina/A4Libs/jQuery-1.11.3.min.js"></script>
    <!-- Bootstrap 3.3.5 -->
    <script src="//a4.petrochina/A4Libs/bootstrap/3.3.5/js/bootstrap.min.js"></script>  
    <script src="/A4admin/Rest/Services/Config?f=js"></script> 
    {% block script %}
    {% endblock %} 
     
    <script>
        var pCurrentUser = {
            UserId: null,
            UserName: null,
            Ssdwdm: null
        }

        $(function () { 
            var pConfig = new SysManager_CurrentUser();
            pCurrentUser.UserId = pConfig.UserId;
            pCurrentUser.UserName = pConfig.UserName;
            pCurrentUser.Ssdwdm = pConfig.Ssdwdm;
          var  token=typeof(token)=='undefined'?pConfig.token:token; 
            var pUserName = pCurrentUser.UserName;
            if (pUserName == undefined || pUserName.length == 0) pUserName = pCurrentUser.UserId;

            $("#label_UserName").html(' ' + pUserName);
    var pmUrl = "../Rest/Services/PrivateModule?teamname=HTGL&" + token;
            $.ajax({
                type: "GET",
                url: pmUrl,
                headers: {
                    Accept: "application/json"
                },
                success: function (data) {
                    //Todo:在这里构建菜单
                    var root = data[0];
                    if (root.hasOwnProperty("Children")) {
                        var pHtml = [];
                        for (var i = 0; i < root.Children.length; i++) {
                            var row = root.Children[i];
                            pHtml.push(get_ModuleParent(row));
                        }
                        $('#nav_root').html(pHtml.join(''));
                    }
                }
            });
        });

        function get_ModuleParent(row) {
            var pResult = [
                '<li class="dropdown">',
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown">',
                row.Name,
                '<b class="caret"></b>',
                '</a>'];
            if (row.hasOwnProperty("Children")) {
                pResult.push('<ul class="dropdown-menu">')
                pResult.push(get_ModuleItem(row.Children));
                pResult.push('</ul>')
            }
            pResult.push('</li>');
            return pResult.join('');
        }

        function get_ModuleItem2(children) {
            var pResult = [];
            var pNames = ['用户管理', '单位管理', '岗位管理', '菜单管理', '图层管理', '表的维护',
            '单位权限', '岗位权限', '图层管理-上传MapJson', '图层管理-ArcGISServerAsyc', '单位管理-排序&显示名', '工具下载'];
            for (var i = 0; i < children.length; i++) {
                var index = $.inArray(children[i].Name, pNames);
                var pItem = '';
                if (index > -1)
                    pItem = DOE.Core.StringHelper.Format('<li><a href="{0}">{1}</a></li>', children[i].Url, children[i].Name);
                else {
                    pItem = DOE.Core.StringHelper.Format('<li><a href="{0}" disabled>{1}</a></li>', children[i].Url, children[i].Name);
                }
                pResult.push(pItem);
            }
            return pResult.join('<li class="divider"></li>');
        }

        function get_ModuleItem(children) {
            var pResult = [];
            for (var i = 0; i < children.length; i++) {
                pItem = DOE.Core.StringHelper.Format('<li><a href="{0}">{1}</a></li>', children[i].Url, children[i].Name);
                pResult.push(pItem);
            }
            return pResult.join('<li class="divider"></li>');
        }
    </script> 
</body>
</html>
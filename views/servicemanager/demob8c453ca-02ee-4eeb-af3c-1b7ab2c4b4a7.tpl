{% extends 'parent/layout.tpl' %} {% block title %}服务管理与发布{%endblock%} {% block body %}class="hold-transition
skin-blue sidebar-collapse sidebar-mini"{%endblock%} {% block content %}

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
   
            <section class="content-header">
               <button class="btn btn-primary btn-sm" name="Submit" onclick="javascript:history.back(1)" ><i class="fa fa-reply" ></i> 返回</button>
                <h3>
                    restAPI
                </h3>
                <ol class="breadcrumb">
                    <li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
                    
                        
                            <li class="active"><a href="app.html">服务列表</a>
                        </li>
                        <li class="active">服务详情</a>
                        </li>
                        <li class="active">服务详情</a>
                        </li>

                </ol>
            </section></br>
            <div class="header">
                <div  style="margin-left:20px">
              
                <p>最近更新：2016.10.10</br>
                    服务简介：基础表服务，对服务发布与管理平台中的表进行增删改查</br>
                   请求方法：GET</br>
                   请求参数(url)：
                </p></div>
                <div style="margin-left:10px;margin-right:10px">
                    
                <table id="table" data-toggle="table" data-striped="true">
                    <tr>
                        <td>参数名</td>
                        <td>类型</td>
                        <td>必填</td>
                        <td>参数位置</td>
                        <td>描述</td>
                        <td>默认值</td>
                    </tr>
                    <tr>
                        <td>Tablename</td>
                        <td>string</td>
                        <td>是</td>
                        <td>url</td>
                        <td>查询表名</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>sort</td>
                        <td>string</td>
                        <td>否</td>
                        <td>url</td>
                        <td>字段</td>
                        <td>主键id</td>
                    </tr>
                    <tr>
                        <td>Order</td>
                        <td>string</td>
                        <td>否</td>
                        <td>url</td>
                        <td>排序顺序</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Search</td>
                        <td>string</td>
                        <td>否</td>
                        <td>url</td>
                        <td>查询数值</td>
                        <td>默认查询主键列</td>
                    </tr>
                    <tr>
                        <td>limit</td>
                        <td>string</td>
                        <td>否</td>
                        <td>url</td>
                        <td>分页：每页条数</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Offset</td>
                        <td>string</td>
                        <td>否</td>
                        <td>url</td>
                        <td>页数</td>
                        <td></td>
                    </tr>
                </table>
                </div>
               
            </div></br></br></br></br></br></br>
        </div>

<!-- /.content-wrapper -->
{% endblock %}

<!-- jQuery 2.2.0 -->
<script src="components/jquery-2.1.4/dist/jquery.min.js"></script>

<!-- Bootstrap 3.3.6 -->
<script src="components/bootstrap-3.3.5-dist/dist/js/bootstrap.min.js"></script>
<script src="components/bootstrap-table/dist/bootstrap-table.min.js"></script>
<script src="components/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.min.js"></script> {% block script %}
<!-- AdminLTE App -->
<script src="components/admin-lte/dist/js/app.min.js"></script>
<script type="text/javascript" src="js/servicedetail.js"></script> {% endblock %}
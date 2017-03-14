{% extends '../parent/layout.tpl' %} {% block title %}新增人员{%endblock%} {% block body %}class="hold-transition skin-blue sidebar-collapse
sidebar-mini"{%endblock%} {% block content %}

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper" style="height:1400px">
	<section class="content-header">
		<h3>
			新增人员
		</h3>
		<ol class="breadcrumb">
			<li><a href="#"><i class="fa fa-home"></i> 首页</a></li>
			<li><a href="app"> 人员列表</a></li>
			<li class="active"> 新增人员
			</li>
		</ol>
	</section>

	<div class="col-md-9">
		<div class="col-md-3">
			<div id="peopleImage"  style="margin-left:60px">
			
			</div>
			<div class="row" style="height: 500px">
				<!--<input type="file" name="image" class="projectfile" style="margin-left:90px" value="${deal.image}" />-->
			</div>
		</div>

        <div class="col-md-9">
			<form class="form-horizontal">
				<div class="box-body">
					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">所属网格</label>
						<div class="col-sm-6 col-md-10">
							<select name="GRID_NAME" id="select1" class="from-control .col-lg-4  input-sm"></select>
							<select name="GRID_NAME" id="select2" class="from-control .col-lg-3 input-sm"></select>
							<select name="GRID_NAME" id="select3" class="from-control .col-lg-3 input-sm" onChange="thirdChange()"></select>
							<select name="GRID_NAME" id="select4" class="from-control .col-lg-5 input-sm"></select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">姓名</label>
						<div class="col-sm-6 col-md-5 ">
							<input type="text" class="form-control" id="name">
							<!--<select id="nameSelect" class="selectpicker show-tick form-control" data-live-search="true" onChange="nameChange()">  
                            </select>-->
						</div>
						<div class="col-sm-6 col-md-4 ">
							<button type="button" onclick="nameSearch()">搜索</button>
							<!--<select id="nameSelect" class="selectpicker show-tick form-control" data-live-search="true" onChange="nameChange()">  
                            </select>-->
						</div>
					</div>
					<table class="col-sm-4" id="table" data-toggle="table" data-striped="true"></table>
					<!--下面为读取数据-->
					<div class="form-group" style="margin-top:15px">
						<label class="col-sm-3 col-md-2 control-label">身份证号</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="cardNum" id="cardNum">
						</div>
						<label class="col-sm-3 col-md-2 control-label">出生日期</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="birthDate" id="birthDate">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">性别</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="gender" id="gender">
						</div>
						<label class="col-sm-2 col-md-2 control-label">曾用名</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="userdName" id="userdName">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 col-md-2 control-label">电子邮箱</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="email" id="email">
						</div>
						<label class="col-sm-2 col-md-2 control-label">职业</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="occupation" id="occupation">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">身高</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="height" id="height">
						</div>
						<label class="col-sm-2 col-md-2 control-label">血型</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="bloodType" id="bloodType">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">宗教信仰</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="relBelief" id="relBelief">
						</div>
						<label class="col-sm-3 col-md-2 control-label">现住地</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="residence" id="residence">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">户籍</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="domicile" id="domicile">
						</div>
						<label class="col-sm-2 col-md-2 control-label">户籍派出所</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="policeStation" id="policeStation">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">户籍详细地</label>
						<div class="col-sm-6 col-md-10">
							<input type="text" class="form-control" name="dAddr" id="dAddr">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">现住地详细地址</label>
						<div class="col-sm-6 col-md-10">
							<input type="text" class="form-control" name="rAddr" id="rAddr">
						</div>
					</div>
					<!--下面为输入数据-->
					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">家庭经济情况</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="ecoSituatio" id="ecoSituatio">
						</div>
						<label class="col-sm-3 col-md-2 control-label">是否纳入低保</label>
						<div class="col-sm-3 col-md-4">
							<select name="isEfficiency" id="isEfficiency" class="form-control">
								<option>-请选择-</option>
							    <option value="0">是</option>
                                <option value="1">否</option>
                            </select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">监护人联系方式</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="guarderTel" id="guarderTel">
						</div>
						
						<label class="col-sm-2 col-md-2 control-label">监护人姓名</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="guarderName" id="guarderName">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">监护人身份证号</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="guarderCardNum" id="guarderCardNum">
						</div>
						<label class="col-sm-2 col-md-2 control-label">初次发病日期</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" value="2012-01-01 00:00" readonly class="form-control form_datetime"  name="attackDate" id="attackDate">

						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">目前诊断类型</label>
						<div class="col-sm-3 col-md-4">
							<select name="attackType" class="form-control" id="attackType">
								<option>-请选择-</option>
							    <option value="01">精神分裂症</option>
                                <option value="02">分裂情感性障碍</option>
							    <option value="03">持久的妄想性障碍(偏执性精神病）</option>
							    <option value="04">双相（情感）障碍</option>
							    <option value="05">癫痫所致精神障碍</option>
							    <option value="06">精神发育迟滞伴发精神障碍</option>
							    <option value="07">重度抑郁发作</option>
						     	<option value="08">精神活性物质所致精神障碍</option>
					    		<option value="99">其他</option>
                            </select>
						</div>
						<label class="col-sm-2 col-md-2 control-label">有无肇事肇祸史</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="isCTrouble" id="isCTrouble">
							
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">肇事次数</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="cTroubleCount" id="cTroubleCount">
						</div>
						<label class="col-sm-2 col-md-2 control-label">上次肇事肇祸日期</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" value="2012-01-01 00:00" readonly class="form-control form_datetime"  name="cTroubleDate" id="cTroubleDate">

							
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 col-md-2 control-label">患病名称</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="sicknessName" id="sicknessName">
						</div>
						<label class="col-sm-2 col-md-2 control-label">目前危险性评估等级</label>
						<div class="col-sm-3 col-md-4">
							<select id="dangerRank" name="dangerRank" class=" form-control">
								<option>-请选择-</option>
						    	<option value="01">0级</option>
                                <option value="02">1级</option>
                                <option value="03">2级</option>
                                <option value="04">3级</option>
							    <option value="05">4级</option>
						    	<option value="06">5级</option>
                            </select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">治疗情况</label>
						<div class="col-sm-3 col-md-4">
							<select id="treatS" name="treatS" class=" form-control" id="attackType">
								<option>-请选择-</option>
							    <option value="01">住院治疗</option>
                                <option value="02">居家服用抗精神病药物治疗</option>
                                <option value="03">其他治疗</option>
                               <option value="04">未接受过治疗</option>
                            </select>
						</div>
						<label class="col-sm-2 col-md-2 control-label">治疗医院名称</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="treatName" id="treatName">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">实施住院治疗原因</label>
						<div class="col-sm-3 col-md-4">
							<select id="hosTreatS" name="hosTreatS" class="form-control">
								<option>-请选择-</option>
							    <option value="01">已发生危害他人安全的行为</option>
                                <option value="02">存在危害他人安全的危险</option>
                                <option value="99">其他</option>
                            </select>
				 		</div>
						<label class="col-sm-2 col-md-2 control-label">接受康复训练机构名称</label>
						<div class="col-sm-3 col-md-4">
							<input type="text" class="form-control" name="recOrganName" id="recOrganName">
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">参与管理人员</label>
						<div class="col-sm-3 col-md-4">
							<select id="managePeople " name="managePeople " class=" form-control">
								<option>-请选择-</option>
						    	<option value="01">基层医务人员</option>
                                <option value="02">片区民警</option>
                                <option value="03">民政干事</option>
						    	<option value="04">助残员</option>
						    	<option value="05">村（居）委会干部</option>
						    	<option value="99">其他</option>
                            </select>
						</div>
						<label class="col-sm-2 col-md-2 control-label">帮扶情况</label>
						<div class="col-sm-3 col-md-4">
							<select id="assistSituation" name="assistSituation" class=" form-control">
							    <option>-请选择-</option>
							    <option value="01">民政</option>
                                <option value="02">卫生</option>
                                <option value="03">公安</option>
					     		<option value="04">残联</option>
					    		<option value="05">街道办事处或乡镇政府</option>
					    		<option value="05">非政府组织</option>
						    	<option value="99">其他</option>
                            </select>
						</div>
					</div>
					<div class="form-group">
						<label class="col-sm-3 col-md-2 control-label">备注</label>
						<div class="col-sm-6 col-md-10">
							<input type="text" class="form-control" name="remarks" id="remarks">
						</div>
					</div>
				</div>
				<center>
					<button id="resave" class="btn btn-primary" onclick="save()">&nbsp保&nbsp存&nbsp</button>&nbsp&nbsp&nbsp
					<button id="reback" class="btn btn-default" name="reback">&nbsp返&nbsp回&nbsp</button>&nbsp
				</center>
		    </div>
		</form>
	</div>
</div>
	{% endblock %}
	<!-- jQuery 2.2.0 -->
	<script src="/components/jquery-2.1.4/dist/jquery.min.js"></script>
	<!-- Bootstrap 3.3.6 -->
	<script src="/components/bootstrap-3.3.5-dist/dist/js/bootstrap.min.js"></script>
	<script src="/components/bootstrap-table/dist/bootstrap-table.min.js"></script>
	<script src="/components/bootstrap-editable/src/js/bootstrap-editable.js"></script>
	<script src="/components/bootstrap-table/src/extensions/editable/bootstrap-table-editable.js"></script>
	<script src="/components/bootstrap-select/dist/js/bootstrap-select.min.js"></script>
	<script src="/components/bootstrap-switch/dist/js/bootstrap-switch.min.js"></script>
	<script src="/components/bootstrap/docs/assets/js/bootstrap-dropdown.js"></script>
	<script src="/cig/svmobject/js/bootstrap-select.js"></script>
	<script src="http://cdn.bootcss.com/bootstrap-table/1.9.1/locale/bootstrap-table-zh-CN.min.js"></script> 
  {% block script%}
<script type="text/javascript" src="js/addlist.js"></script> {% endblock %}
{% extends '../parent/layoutvue.tpl' %} 
{% block title %}户籍人口{%endblock%} 
{% block style %} 
<link rel="stylesheet" href="./css/rkdetail.css">
{% endblock %} 
{% block body %}
	
{%endblock%} 
{% block content %}

<div class="content-wrapper">
    {% raw %}
<div class="content">
    <div id="detail" class="bg-white detail-stage" v-cloak>
        <!-- /.modal-content -->
        <div is="bs-tab" :tabs="tabs.rkTabs" @select="rkTabSelect">
            <div slot="main">
                <!--基本信息-->
                <div class="row">
                    <div class="col-md-2">
                        <div v-if="!main.photoPath" class="imgPosition">
                        </div>
                        <img v-else :src="main.photoPath" class="imgPosition">
                    </div>
                    <div class="col-md-10">
                        <div class="form-horizontal form-group-sm">
                            <cig-form :fields="fields.main" data-path="main"></cig-form>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="ldgj">
                <!--流动轨迹-->
                <ldgj :data="ldgj"></ldgj>
            </div>
            <div slot="hj">
                <!--户籍信息-->
                <div class="form-horizontal form-group-sm">
                    <cig-form :fields="fields.hj" data-path="hj"></cig-form>
                </div>
                <div class="bootstrap-table">
                    <bs-table 
                        :loading="hj.load === false"
                        :config="tableConfig.hjcy"
                        :columns="columns.hjcy"
                        :rows="hj.members">
                    </cig-table>
                </div>
            </div>
            <div slot="lr">
                <!--流入信息-->
                <div class="form-horizontal form-group-sm">
                    <cig-form :fields="fields.lr" data-path="lr"></cig-form>
                </div>
            </div>
            <div slot="jzfw" v-if="jzfw">
                <!--居住房屋-->
                <div class="form-horizontal form-group-sm">
                    <cig-form :fields="fields.jzfw" data-path="jzfw">
                        <span class="form-control" slot="fieldslot.pName">
                            <a :href="'rkDetail.html?id='+jzfw.pId+'&module='+moduleName">{{jzfw.pName}}</a>
                        </span>
                        <span class="form-control" slot="fieldslot.czName">
                            <a v-if="jzfw.czId" :href="'rkDetail.html?id='+jzfw.czId+'&module='+moduleName">{{jzfw.czName}}</a>
                            <template v-else>{{jzfw.czName}}</template>
                        </span>
                    </cig-form>
                </div>
            </div>
            <div slot="cy">
                <!--家庭成员（亲属关系）-->
                <div class="bootstrap-table">
                    <bs-table 
                        :loading="cy.load === false"
                        :config="tableConfig.cy"
                        :columns="columns.cy"
                        :rows="cy">
                    </cig-table>
                </div>
            </div>
            <div slot="zszhjsb">
                <!--肇事肇祸精神病-->
                <div class="form-horizontal form-group-sm">
                    <h4>基本信息</h4>
                    <cig-form :fields="fields.zszhjsbBase" data-path="zszhjsb">
                    </cig-form>
                    <h4>管理人信息</h4>
                    <div class="bootstrap-table">
                        <bs-table 
                            :loading="false"
                            :config="{checkbox:false}"
                            :columns="columns.zszhjsbJhr"
                            :rows="[
                                {
                                    type:'监护人',
                                    name:zszhjsb.guarderName,
                                    cardNum:zszhjsb.guarderCardNum,
                                    phone:zszhjsb.guarderTel,
                                    address:zszhjsb.guarderAddr,
                                    relation:zszhjsb.relationship,
                                    cyc:'--',
                                },
                                {
                                    type:'村委会干部',
                                    name:zszhjsb.villageName,
                                    cardNum:'--',
                                    phone:zszhjsb.villagePhone,
                                    address:'--',
                                    relation:'--',
                                    cyc:'--',
                                },
                                {
                                    type:'社区医生',
                                    name:zszhjsb.dockorName,
                                    cardNum:'--',
                                    phone:zszhjsb.dockorPhone,
                                    address:zszhjsb.dockorDepartmentName,
                                    relation:'--',
                                    cyc:zszhjsb.doctorCyc,
                                },
                                {
                                    type:'社区民警',
                                    name:zszhjsb.policeName,
                                    cardNum:'--',
                                    phone:zszhjsb.policePhone,
                                    address:zszhjsb.policeDepartmentName,
                                    relation:'--',
                                    cyc:zszhjsb.policeCyc,
                                }
                            ]">
                        </cig-table>
                    </div>
                    <h4>医疗信息</h4>
                    <cig-form :fields="fields.zszhjsbYl" data-path="zszhjsb">
                        <span slot="fieldslot.zlbs" class="form-control" @click="doThisYl">
                            <a href="javascipt:void(0);" >治疗病史</a>
                        </span>
                    </cig-form>
                    <h4>肇事肇祸史</h4>
                    <div class="bootstrap-table">
                        <bs-table 
                            :loading="false"
                            :config="{checkbox:false}"
                            :columns="columns.zszhjsZszhs"
                            :rows="zszhjsb.zszhList || []">
                        </cig-table>
                    </div>
                </div>
            </div>
        </div>
        <div is="bs-tab" :tabs="[{name:'cqfwMain',text:'房屋信息'}]">
            <div slot="cqfwMain">
                <div class="bootstrap-table">
                    <bs-table 
                        :loading="cqfwListLoad === false"
                        :config="{checkbox:false}"
                        :columns="columns.cqfw"
                        :rows="cqfwList">
                    </cig-table>
                </div>
            </div>
        </div>
        <div is="bs-tab" v-if="czfwList && czfwList.length" :tabs="[{name:'czfwMain',text:'承租信息'}]">
            <div slot="czfwMain">
                <div class="bootstrap-table">
                    <bs-table 
                        :loading="czfwListLoad === false"
                        :config="{checkbox:false}"
                        :columns="columns.czfw"
                        :rows="czfwList">
                    </cig-table>
                </div>
            </div>
        </div>
        <div is="bs-tab" :tabs="[{name:'clMain',text:'车辆信息'}]">
            <div slot="clMain">
                <div class="bootstrap-table">
                    <bs-table 
                        :loading="clListLoad === false"
                        :config="{checkbox:false}"
                        :columns="columns.cl"
                        :rows="clList">
                    </cig-table>
                </div>
            </div>
        </div>
        <div is="bs-tab" v-if="hasLq || hasTdsyq || hasTdCbq" :tabs="[{name:'wq',text:'五权信息'}]">
            <div slot="wq">
                <h5 v-if="hasLq">林权</h5>
                <div v-if="hasLq" class="bootstrap-table">
                    <bs-table 
                        :loading="lqListLoad === false"
                        :config="{checkbox:false}"
                        :columns="columns.lq"
                        :rows="lqList">
                    </cig-table>
                </div>
                <h5 v-if="hasTdsyq">土地使用权</h5>
                <div v-if="hasTdsyq" class="bootstrap-table">
                    <bs-table 
                        :loading="tdsyqListLoad === false"
                        :config="{checkbox:false}"
                        :columns="columns.tdsyq"
                        :rows="tdsyqList">
                    </cig-table>
                </div>
                <h5 v-if="hasTdcbq">土地承包经营权</h5>
                <div v-if="hasTdcbq" class="bootstrap-table">
                    <bs-table 
                        :loading="tdcbqListLoad === false"
                        :config="{checkbox:false}"
                        :columns="columns.tdcbq"
                        :rows="tdcbqList">
                    </cig-table>
                </div>
            </div>
        </div>
        <div is="bs-tab" :tabs="[{name:'sjMain',text:'事件信息'}]">
            <div slot="sjMain">
                <div class="bootstrap-table">
                    <bs-table 
                        :loading="sjListLoad === false"
                        :config="{checkbox:false}"
                        :columns="columns.sj"
                        :rows="sjList">
                    </cig-table>
                </div>
            </div>
        </div>
        
    </div>
</div>

    <div id="ylmodal" is="bs-pop" type="lg" title="治疗病史" ref="pop">
        <div ref="alert"></div>
        <!-- /.modal-content -->
        <div class="bootstrap-table">
            <bs-table ref="table" :columns="tableColumns" :rows="rows">
            </bs-table>
        </div>
    </div>
    {% endraw %}
</div>

{% endblock %}

{% block script%}
<script type="text/javascript">
    var curModule = "人口管理/实有人口/"+(zhzlconfig.getQueryParams().module || "户籍人口");
    requirejs([
        '{{static}}zhzl/syrk/rkDetail.js'], function () {
    });
</script>
{% endblock %}
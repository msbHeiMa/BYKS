{% extends '../parent/layoutvue.tpl' %} 
{% block title %}车辆详情{%endblock%} 
{% block style %} 

{% endblock %} 
{% block body %}
	
{%endblock%} 
{% block content %}

<div class="content-wrapper">
{% raw %}
<div class="content">
    <div id="detail" class="bg-white detail-stage" v-cloak>
        <div is="bs-tab" :tabs="[{name:'main',text:'基本信息'}]">
            <div slot="main">
                <div class="form-horizontal form-group-sm">
                    <cig-form :fields="fields.main" data-path="main">
                        <span slot="fieldslot.pName" class="form-control">
                            <a target='_blank' :href='main.pId?"../syrk/rkDetail.html?id="+main.pId:"javascript:;"'>{{main.pName}}</a>
                        </span>
                        <cig-files slot="fieldslot.carImage" 
                            wrap-class="form-control"
                            mode=""
                            :bus-id="id"
                            file-type="car">
                        </cig-files>
                    </cig-form>
                </div>
            </div>
        </div>
        <div is="bs-tab" :tabs="[{name:'wzxx',text:'违章信息'}]">
            <div slot="wzxx">
                <div class="bootstrap-table">
                    <cig-table 
                        :config="tableConfig.wzxx"
                        :columns="tableColumns.wzxx"
                        :ajax-options="wzxxAjaxOptions">
                    </cig-table>
                </div>
            </div>
        </div>
        <div is="bs-tab" :tabs="[{name:'njjl',text:'年检记录'}]">
            <div slot="njjl">
                <div class="bootstrap-table">
                    <cig-table 
                        :config="tableConfig.njjl"
                        :columns="tableColumns.njjl"
                        :ajax-options="njjlAjaxOptions">
                    </cig-table>
                    <!--<bs-table 
                        :loading="ldgj.load === false"
                        :config="tableConfig.ldgj"
                        :columns="columns.ldgj"
                        :rows="ldgj">
                    </cig-table>-->
                </div>
            </div>
        </div>
    </div>
</div>
{% endraw %}
</div>
{% endblock %}

{% block script%}
<script type="text/javascript">
    var curModule = "物的管理/车辆查询";
    requirejs([
        '{{static}}zhzl/wdgl/clDetail.js'], function () {
    });
</script>
{% endblock %}
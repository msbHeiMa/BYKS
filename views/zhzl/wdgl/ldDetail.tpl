{% extends '../parent/layoutvue.tpl' %} 
{% block title %}楼栋详情{%endblock%} 
{% block style %} 

{% endblock %} 
{% block body %}
	
{%endblock%} 
{% block content %}

<div class="content-wrapper">
{% raw %}
<div class="content">
    <div id="detail" class="bg-white detail-stage" v-cloak>
        <div is="bs-tab" :tabs="[{name:'main',text:'楼栋基本信息'},{name:'qsjcq',text:'权属及产权'},{name:'glxx',text:'管理信息'}]">
            <div slot="main">
                <div class="form-horizontal form-group-sm">
                    <cig-form :fields="fields.main" data-path="data">
                        <span slot="fieldslot.addressDetail" class="form-control">
                            {{data.place + data.addressDetail}}
                        </span>
                        <cig-files slot="fieldslot.buildingImage" 
                            wrap-class="form-control"
                            mode=""
                            :bus-id="id"
                            file-type="building">
                        </cig-files>
                    </cig-form>
                </div>
            </div>
            <div slot="qsjcq">
                <div class="form-horizontal form-group-sm">
                    <cig-form :fields="fields.qsjcq" data-path="data" :fields-render="qsjcqGroupRender">
                    </cig-form>
                </div>
            </div>
            <div slot="glxx">
                <div class="form-horizontal form-group-sm">
                    <cig-form :fields="fields.glxx" data-path="data" :fields-render="glxxGroupRender">
                    </cig-form>
                </div>
            </div>
        </div>
        <div is="bs-tab" :tabs="[{name:'fwxx',text:'房屋信息'},{name:'rcxc',text:'日常巡查'}]">
            <div slot="fwxx">
                <div class="bootstrap-table">
                    <cig-table 
                        :config="{checkbox:false}"
                        :columns="fwList.tableColumns"
                        :ajax-options="fwList.ajaxOptions">
                    </cig-table>
                </div>
            </div>
            <div slot="rcxc">
                <div class="bootstrap-table">
                    <cig-table 
                        :config="{checkbox:false}"
                        :columns="rcxcList.tableColumns"
                        :ajax-options="rcxcList.ajaxOptions">
                    </cig-table>
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
    var curModule = "物的管理/楼栋";
    requirejs([
        '{{static}}zhzl/wdgl/ldDetail.js'], function () {
    });
</script>
{% endblock %}
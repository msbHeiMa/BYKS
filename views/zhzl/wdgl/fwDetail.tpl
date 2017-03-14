{% extends '../parent/layoutvue.tpl' %} 
{% block title %}房屋详情{%endblock%} 
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
                        <cig-files slot="fieldslot.houseImage" 
                            wrap-class="form-control"
                            mode=""
                            :bus-id="id"
                            file-type="house">
                        </cig-files>
                        <span slot="fieldslot.addressDetail" class="form-control">
                            <a target='_blank' :href='main.bId?"ldDetail.html?id="+main.bId:"javascript:;"'>{{main.place + main.addressDetail + main.addressRemark}}</a>
                        </span>
                        <span slot="fieldslot.cqName" class="form-control">
                            <a target='_blank' :href='main.cqId?"../syrk/rkDetail.html?id="+main.cqId:"javascript:;"'>{{main.cqName}}</a>
                        </span>
                    </cig-form>
                </div>
            </div>
        </div>
        <div is="bs-tab" :tabs="[{name:'czxx',text:'出租信息'},{name:'jzxx',text:'居住信息'},{name:'rcxc',text:'日常巡查'}]" @select="tabSelect">
            <div slot="czxx">
                <div class="form-horizontal form-group-sm">
                    <cig-form :fields="fields.czxx" data-path="czxx">
                    </cig-form>
                </div>
            </div>
            <div slot="jzxx">
                <div class="bootstrap-table">
                    <bs-table 
                        :config="{checkbox:false}"
                        :columns="jzxxList.tableColumns"
                        :rows="jzxxList.rows"
                        :loading="jzxxList.loading">
                    </bs-table>
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
    var curModule = "物的管理/实有房屋";
    requirejs([
        '{{static}}zhzl/wdgl/fwDetail.js'], function () {
    });
</script>
{% endblock %}
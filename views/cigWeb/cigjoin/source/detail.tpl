{% extends '../../parent/layout.tpl' %} 
{% block title %}数据源查看{%endblock%} 
{% block style %} {% endblock %} 

{% block content %}
{% raw %}
    <div id="content" class="content-wrapper">
        <section class="content-header">
            <h1>查看数据源</h1>
        </section>
        <div class="content form-horizontal form-group-sm">
            <cig-form 
                form-class=""
                :fields="fields" 
                :fields-render="customRender"
                data-path="data" 
                ref="form">
                <span slot="fieldslot.lastRunInfo">
                    {{data.lastRunInfo ? data.lastRunInfo.text : "" }}
                    <a href="javascript:;" @click="viewLast">日志</a>
                </span>
                <span slot="fieldslot.lastCorrectRunInfo">
                    {{data.lastCorrectRunInfo ? data.lastCorrectRunInfo.text : ""}}
                    <a href="javascript:;" @click="viewCorrect">日志</a>
                </span>
            </cig-form>
            <div class="">
                <button class="btn btn-danger btn-sm" :disabled="startDisabled" @click="start">启动</button>
                <button class="btn btn-danger btn-sm" :disabled="stopDisabled" @click="stop">停止</button>
                <button class="btn btn-danger btn-sm" @click="list">详细记录</button>
            </div>
        </div>


        <div is="bs-pop" 
            type="lg" title="日志" ref="pop">
            <textarea v-text="popLog" style="width: 100%;height: 300px">
            </textarea>
            <template slot="footer">
                <button type="button" class="btn btn-default" @click="hide">关闭</button>
            </template>
        </div>
    </div>
{% endraw %}
{% endblock %} 
{% block script%} 
    <script>
        requirejs(["/cigWeb/cigjoin/source/detail.js"],function(mountFn){
            mountFn("#content")
        });
    </script>
{% endblock %}
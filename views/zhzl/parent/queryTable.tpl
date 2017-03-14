<!--因为tpl和vue模板冲突，所以加上raw，直接输出里面的内容-->
    <div id="{% if tableId %}{{tableId}}{% else %}mainTable{% endif %}">
{% raw %}
        <cig-table-filter v-if="filters && filters.length > 0" :filters="filters" :domain-ajax-options="domainAjaxOptions" v-model="filter" @input="doSearch()"></cig-table-filter>
        <div class="bootstrap-table">
            <div class="fixed-table-toolbar clearfix">
                <div class="bs-bars pull-left cig-bars">
                    <template v-for="btn in btns">
                        <button v-if="btn.visible !== false"
                            :class="['btn btn-sm',btn.baseClass, btn.disabled ? 'disabled' : btn.enableClass]" 
                            :disabled="btn.disabled" 
                            @click="executeCommand(btn.id)">{{btn.name}}</button>
                    </template>
                </div>
                <div class="columns columns-right btn-group pull-right">
                </div>
                <div class="pull-right search" style="width: 300px;">
                    <div class="input-group">
                        <input class="form-control" v-model="keyword" @keyup.enter="doSearch()" type="text" placeholder="搜索">
                        <span class="input-group-btn"> 
                            <button class="btn btn-default" type="button" @click="doSearch()">
                                <span class="glyphicon glyphicon-search"></span>
                            </button> 
                        </span> 
                    </div>
                </div>
            </div>
            <cig-table ref="table"
                :config="tableConfig"
                :columns="tableColumns"
                @selectchange="tableSelectChange?tableSelectChange():(1)"
                :ajax-options="tableAjaxOptions">
            </cig-table>
        </div>
{% endraw %}
    </div>
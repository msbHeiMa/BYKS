<!--因为tpl和vue模板冲突，所以加上raw，直接输出里面的内容-->
{% raw %}
    <div id="mainTable">
        <cig-table-filter :filters="filters" :domain-ajax-options="domainAjaxOptions" v-model="filter" @input="doSearch()"></cig-table-filter>
        <div class="bootstrap-table">
            <div class="fixed-table-toolbar">
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
                <div class="pull-right search">
                    <input class="form-control" v-model="keyword" @keyup.enter="doSearch()" type="text" placeholder="搜索">
                </div>
            </div>
            <cig-table ref="table"
                :config="tableConfig"
                :columns="tableColumns"
                :ajax-options="tableAjaxOptions">
            </cig-table>
        </div>
    </div>
{% endraw %}
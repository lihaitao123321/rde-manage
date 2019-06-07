<template>
    <div class="uf ufb">
        <div
            class="uf uf-f1 uf-ac uf-jc condition_item"
            v-for="(item,index) in options"
            :key="index"
            @click.stop="showPop(index)"
        >
            <label>{{item.value}}</label>
            <i class="fa fa-angle-down"></i>
        </div>
        <PopMask
                v-model="show_more"
                :mask="{top:'40px'}"
                :options="maskOptions"
                @onCheckListChange="onCheckListChange"
        >
            <div>我是slot插槽内容</div>
        </PopMask>
    </div>
</template>

<script>
    export default {
        name: "Condition",
        props:{

        },
        data() {
            return {
                active:'',
                show_more:false,
                maskOptions:{
                    type:1,
                    source:[]
                },
                options: [
                    {
                        key: 1,
                        value: '设备型号',
                        //弹框显示的内容和类型
                        type:1,
                        source: [{
                            key: 'value1',
                            value: '全部',
                            inlineDesc: ''
                        }, {
                            key: 'value2',
                            value: '故障',
                            inlineDesc: ''
                        }, {
                            key: 'value3',
                            value: '报警',
                            inlineDesc: ''
                        }, {
                            key: 'value4',
                            value: '警告',
                            inlineDesc: ''
                        }]
                    },{
                        key: 2,
                        value: '报警级别',
                        type:2,
                        source: [{
                            key: 'value1',
                            value: '全部',
                            inlineDesc: ''
                        }, {
                            key: 'value2',
                            value: '故障',
                            inlineDesc: ''
                        }, {
                            key: 'value3',
                            value: '报警',
                            inlineDesc: ''
                        }, {
                            key: 'value4',
                            value: '警告',
                            inlineDesc: ''
                        }]
                    },{
                        key: 3,
                        value: '报警状态',
                        type:3,
                        source: [{
                            key: 'value1',
                            value: '全部',
                            inlineDesc: ''
                        }, {
                            key: 'value2',
                            value: '故障',
                            inlineDesc: ''
                        }, {
                            key: 'value3',
                            value: '报警',
                            inlineDesc: ''
                        }, {
                            key: 'value4',
                            value: '警告',
                            inlineDesc: ''
                        }]
                    }
                ],
            }
        },
        methods:{
            showPop(index){
                this.show_more=true;
                this.maskOptions.type=this.options[index].type;
                this.maskOptions.source=this.options[index].source;
            },
            onCheckListChange(list){
                this.$emit('onCheckListChange',list);
            }
        }
    }
</script>

<style scoped>
    .condition_item {
        height: 40px;
    }

    .condition_item label {
        margin-right: 6px;
    }

    .ufb {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
</style>
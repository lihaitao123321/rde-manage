<template>
    <div>
        <Condition
                :options="options"
                @onCheckListChange="onCheckListChange"
        ></Condition>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                options: [
                    {
                        key: 1,
                        value: '设备型号',
                        //弹框显示的内容和类型
                        type:1,
                        checklist:[],
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
                        checklist:[],
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
                        checklist:[],
                        source: [{
                            key: 'value1',
                            value: '全部',
                            inlineDesc: '',
                            children:[{
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
                        }, {
                            key: 'value2',
                            value: '故障',
                            inlineDesc: '',
                            children:[{
                                key: 'value1',
                                value: '666',
                                inlineDesc: ''
                            }, {
                                key: 'value2',
                                value: '888',
                                inlineDesc: ''
                            }]
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
                ]
            }
        },
        methods:{
            onCheckListChange(list,index){
                console.log(list)
                this.options[index].checklist=list;
            }
        }
    }
</script>


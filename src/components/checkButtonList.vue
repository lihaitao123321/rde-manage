<template>
    <div class="outer">
        <div class="item" :style="getStyle(item.checked)" v-for="(item,index) in localData" @click="clickItem(index)">
            {{item.label}}
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "checkButtonList",
        props:['data','value'],
        data() {
            return {
                styleModel:{},
                localData: []
            }
        },
        created() {
            this.initData();
        },
        watch: {
            data() {
                this.initData();
            }
        },
        computed: {
            ...mapState({
                theme: state => {
                    return state.theme;
                }
            })
        },
        methods: {
            initData(){

                let localData=JSON.parse(JSON.stringify(this.data));
                for (let i = 0; i < localData.length; i++) {
                    if(!localData[i].checked){
                        localData[i].checked=false;
                    }
                }
                this.localData=localData;
            },
            clickItem(index) {
                this.localData[index].checked = !this.localData[index].checked;
                this.$emit('input',this.getCheckList());
            },
            getCheckList() {
                let list = [];
                for (let i = 0; i < this.localData.length; i++) {
                    if(this.localData[i].checked){
                        list.push(this.localData[i]);
                    }
                }
                return list;
            },
            getStyle(bool){
                if(bool){
                    return {
                        color:"white",
                        backgroundColor:"#2B7FF3"
                    }
                }else{
                    return {
                        color:"#333333",
                        backgroundColor:"#F2F2F5"
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .outer {
        display: flex;
        flex-wrap: wrap;
        padding: 10px;
        width: 100%;
        .item {
            height: 34px;
            line-height: 34px;
            text-align: center;
            padding: 0 33px;
            margin-right: 10px;
            margin-bottom: 10px;
            background: rgba(242, 242, 245, 1);
            color: #333333;
            border-radius: 3px;
            font-size:14px;
            font-family:PingFangSCMedium;
            font-weight:500;
            color:rgba(51,51,51,1);
        }
    }
</style>
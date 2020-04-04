<template>
    <div class="outer">
        <div class="item" :style="getStyle(item.value)" v-for="(item,index) in data" :key="index" @click="clickItem(item.value)">
            {{item.name}}
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
                defaultValues:this.value
            }
        },
        created() {
            this.initData();
        },
        watch: {
            value(){
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
                this.defaultValues = this.value
            },
            clickItem(value) {
                for (let i = 0; i < this.defaultValues.length; i++) {
                    if(this.defaultValues[i] === value){
                        this.defaultValues.splice(i,1)
                        this.$emit('input',this.defaultValues);
                        return
                    }
                }
                this.defaultValues.push(value)
                this.$emit('input',this.defaultValues);
            },
            getStyle(value){
                if(this.defaultValues.includes(value)){
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
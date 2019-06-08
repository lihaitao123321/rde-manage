<template>
    <div class="uf ufb">
        <div
            class="uf uf-f1 uf-ac uf-jc condition_item"
            v-for="(item,index) in options"
            :key="index"
            @click.stop="showPop(index)"
        >
            <label>{{item.value}}</label>
            <i class="fa" :class="active_menu===index?'fa-angle-up':'fa-angle-down'"></i>
        </div>
        <PopMask
                v-model="show_more"
                :mask="{top:'41px'}"
                :options="maskOptions"
                @onCheckListChange="onCheckListChange"
        >
            <div class="tree uf">
                <div class="tree_left">
                    <div
                            v-for="(item1,index1) in maskOptions.source"
                            :key="index1"
                            class="item"
                            :class="active_left===index1?'active':''"
                            @click="leftClick(item1,index1)"
                    >{{item1.value}}</div>
                </div>
                <div class="tree_right">
                    <div
                            v-show="maskOptions.childList && maskOptions.childList.length>0"
                            v-for="(item1,index1) in maskOptions.childList"
                            :key="index1"
                            class="item"
                            :class="active_right===index1?'active':''"
                            @click="rightClick(item1,index1)"
                    >{{item1.value}}</div>
                    <div class="uf uf-ac uf-jc maxHeight" v-show="!maskOptions.childList || !maskOptions.childList.length">
                        暂无数据
                    </div>
                </div>
            </div>
        </PopMask>
    </div>
</template>

<script>
    export default {
        name: "Condition",
        props:{
            options:{
                type:Array,
                default(){
                    return [];
                }
            }
        },
        data() {
            return {
                active_menu:'',
                active_left:'',
                active_right:'',
                show_more:false,
                maskOptions:{
                    type:1,
                    checklist:[],
                    source:[],
                    childList:[]
                },
            }
        },
        watch:{
            show_more(bool){
                if(!bool){
                    this.active_menu='';
                }
            }
        },
        methods:{
            leftClick(item1,index1){
                if(this.active_left===index1){
                    return false;
                }
                this.active_left=index1;
                this.active_right='';
                this.maskOptions.childList=item1.children;
                this.$emit('onCheckListChange',[],2);
            },
            rightClick(item1,index1){
                this.active_right=index1;
                this.$emit('onCheckListChange',[item1.key],2);
            },
            showPop(index){
                this.active_menu=index;
                this.show_more=true;
                if(this.options[index].type===3){
                    this.maskOptions.type=0;
                }else{
                    this.maskOptions.type=this.options[index].type;
                }
                this.maskOptions.checklist=this.options[index].checklist;
                this.maskOptions.source=this.options[index].source;
            },
            onCheckListChange(list){
                if(this.active_menu){
                    this.$emit('onCheckListChange',list,this.active_menu);
                }
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
    .tree_left{
        width: 40%;
        background-color: white;
        color: #666;
        border-right: 1px solid rgba(0,0,0,0.1);
    }
    .tree_left .item{
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        padding: 0 20px;
    }
    .tree_right{
        width: 60%;
        background-color: white;
        color: #666;
        border-right: 1px solid rgba(0,0,0,0.1);
    }
    .tree_right .item{
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        padding: 0 20px;
    }
    .maxHeight{
        height: 100%;
    }
    .active{
        background-color: violet;
    }

</style>
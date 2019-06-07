<template>
    <div class="t_page">
        <x-header :right-options="{showMore: true}">
            <span>{{getTitle}}</span>
            <x-icon
                    slot="overwrite-left"
                    type="navicon"
                    size="35"
                    style="fill:#fff;position:relative;top:-8px;left:-3px;"
                    @click.stop="showLeftMore"
            ></x-icon>
        </x-header>
        <div class="t_content">
            <keep-alive>
                <transition :name="transitionName">
                    <component :is="isActive"></component>
                </transition>
            </keep-alive>
        </div>
        <tabbar @on-index-change="tabPage">
            <tabbar-item  v-for="(item,index) in this.menus" :selected="index===0">
                <img class="image" slot="icon" src="../assets/images/logo.png">
                <span slot="label">{{item.title}}</span>
            </tabbar-item>
        </tabbar>

        <PopMask
                v-model="show_more"
                :mask="{top:'46px'}"
                :options="options"
                @onCheckListChange="onCheckListChange"
        >
            <div>我是slot插槽内容</div>
        </PopMask>
    </div>
</template>

<script>
    import {
        XHeader,
        Actionsheet,
        TransferDom,
        ButtonTab,
        ButtonTabItem,
        Tabbar,
        TabbarItem,
        Group,
        Cell,
        Popup,
        XButton,
        Checklist
    } from 'vux'
    import index1 from './index1/index1'
    import index2 from './index2/index2'
    import index3 from './index3/index3'
    import index4 from './index4/index4'
    import index5 from './index5/index5'

    export default {
        directives: {
            TransferDom
        },
        components: {
            XHeader,
            Actionsheet,
            ButtonTab,
            ButtonTabItem,
            Tabbar,
            TabbarItem,
            Group,
            Cell,
            index1,
            index2,
            index3,
            index4,
            index5,
            Popup,
            XButton,
            Checklist
        },
        data() {
            return {
                show_more: false,
                transitionName: 'slide-left',
                isActive: 'index1',
                menus: [
                    {
                        title: '主页',
                        value: 'index1',
                        icon:'../assets/images/logo.png'
                    }, {
                        title: '地图',
                        value: 'index2',
                        icon:'../assets/images/logo.png'
                    }, {
                        title: '任务',
                        value: 'index3',
                        icon:'../assets/images/logo.png'
                    }, {
                        title: '监控',
                        value: 'index4',
                        icon:'../assets/images/logo.png'
                    }, {
                        title: '我的',
                        value: 'index5',
                        icon:'../assets/images/logo.png'
                    }
                ],
                showMenus: false,
                options: {
                    type: 1,
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
                },
                searchModel: {
                    checklist: []
                }
            }
        },
        computed:{
            getTitle(){
                return this.menus.find(item=>item.value===this.isActive).title;
            }
        },
        methods: {
            onCheckListChange(list) {
                this.searchModel.checklist = list || [];
                console.log(list)
            },
            tabPage(index) {
                this.isActive = 'index' + (index + 1);
            },
            showLeftMore() {
                this.show_more = true;
                // this.PopMask({},res=>{
                //
                // });

                // this.PopMask.show({
                //     top:'46px'
                // });
            }
        }
    }
</script>

<style scoped>
    .overwrite-title-demo {
        margin-top: 5px;
    }

    .image {
        width: 20px;
        height: 20px;
    }
</style>
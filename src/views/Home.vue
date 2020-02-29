<template>
    <div class="t_page">
        <div class="t_content">
            <keep-alive>
                <transition :name="transitionName">
                    <component :is="'index'+(tabActive+1)"></component>
                </transition>
            </keep-alive>
        </div>
        <tabbar @on-index-change="tabPage">
            <tabbar-item  v-for="(item,index) in this.menus" :key="index" :selected="index===0">
                <img class="tabbar_image" slot="icon" :src="tabActive===index?item.activeIcon:item.icon" />
                <span class="tabbar_label" slot="label">{{item.title}}</span>
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
                tabActive:0,
                menus: [
                    {
                        title: '首页',
                        value: 'index1',
                        icon:require('../assets/images/index1/shouye_black@3x.png'),
                        activeIcon:require('../assets/images/index1/shouye_red@3x.png')
                    }, {
                        title: '地图',
                        value: 'index2',
                        icon:require('../assets/images/index1/ditu_black@3x.png'),
                        activeIcon:require('../assets/images/index1/ditu_red@3x.png')
                    }, {
                        title: '监控',
                        value: 'index3',
                        icon:require('../assets/images/index1/jiankong_black@3x.png'),
                        activeIcon:require('../assets/images/index1/jiankong_red@3x.png')
                    }, {
                        title: '业务',
                        value: 'index4',
                        icon:require('../assets/images/index1/yewu_black@3x.png'),
                        activeIcon:require('../assets/images/index1/yewu_red@3x.png')
                    }, {
                        title: '我的',
                        value: 'index5',
                        icon:require('../assets/images/index1/wode_black@3x.png'),
                        activeIcon:require('../assets/images/index1/wode_red@3x.png')
                    }
                ],
                showMenus: false,
                options: {
                    type: 1,
                    checklist: [],
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
        created(){
            console.log(666)
        },
        computed:{
            getTitle(){
                return this.menus.find(item=>item.value===this.isActive).title;
            }
        },
        methods: {
            onCheckListChange(list) {
                console.log(list)
                this.options.checklist = list;
            },
            tabPage(index) {
                if(index===2){
                    this.$router.push('index3');
                    return false;
                }else if(index === 1){
                    this.$router.push('index2');
                    return false;
                }
                else{
                    this.tabActive=index;
                }
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
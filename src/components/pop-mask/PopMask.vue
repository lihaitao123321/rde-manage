<style>
    .weui-cell__bd p {
        margin: 0.1em 0 !important;
    }
    .weui-cells{
        font-size: 14px !important;
    }
    .demo5-item {
        width: 82px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background-color: rgba(0,0,0,0.1);
        margin: 3px;
    }
    .demo5-item-selected {
        background-color: violet;
    }
</style>
<template>
    <transition name="bcAni">
        <div class="mask" :style="mask" v-show="value" @click="closePop">
            <transition :name="aniName">
                <div class="mask_move" v-show="value">
                    <div class="mask_content" :style="content" @click.stop>
                        <div v-if="options.type">
                            <div v-if="options.type===1">
                                <checklist
                                        v-model="checklist1"
                                        label-position="left"
                                        :options="options.source"
                                        @on-change="$emit('onCheckListChange',checklist1)"
                                ></checklist>
                            </div>
                            <div style="padding: 10px;" v-if="options.type===2">
                                <checker
                                        v-model="checklist2"
                                        type="checkbox"
                                        default-item-class="demo5-item"
                                        selected-item-class="demo5-item-selected"
                                        @on-change="$emit('onCheckListChange',checklist2)"
                                >
                                    <checker-item
                                            v-for="(item,index) in options.source"
                                            :key="index"
                                            :value="item.key"
                                    >
                                        {{item.value}}
                                    </checker-item>
                                </checker>
                            </div>

                        </div>
                        <slot v-if="!options.type"></slot>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
    import {Checklist, Checker, CheckerItem} from 'vux'

    export default {
        name: "PopList",
        components: {
            Checklist,
            Checker,
            CheckerItem
        },
        props: {
            direction: {
                type: Number,
                default: () => {
                    return 1;
                }
            },
            mask: {
                type: Object,
                default: () => {
                    return {};
                }
            },
            content: {
                type: Object,
                default: () => {
                    return {};
                }
            },
            value: {
                type: Boolean,
                default: () => {
                    return false;
                }
            },
            options: {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
        data() {
            return {
                aniName: '',
                checklist1: [],
                checklist2: []
            }
        },
        created() {
            if (this.direction === 1) {
                this.aniName = 'contentAni1';
            } else if (this.direction === 2) {
                this.aniName = 'contentAni2';
            } else if (this.direction === 3) {
                this.aniName = 'contentAni3';
            } else if (this.direction === 4) {
                this.aniName = 'contentAni4';
            }
            if(this.options.type===1){
                this.checklist1=this.options.checklist;
            }else if(this.options.type===2){
                this.checklist2=this.options.checklist;
            }
        },
        watch:{
            options(){
                if(this.options.type===1){
                    this.checklist1=this.options.checklist;
                }else if(this.options.type===2){
                    this.checklist2=this.options.checklist;
                }
            }
        },
        methods: {
            closePop() {
                this.$emit('input', false);
            },
            callback() {
            }
        }
    }
</script>

<style scoped>
    .mask {
        position: absolute;
        z-index: 600;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
        overflow: hidden;
    }

    .mask_move {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0);
    }

    .mask_content {
        position: absolute;
        width: 100%;
        max-height: 100%;
        overflow-y: auto;
        background-color: white;
    }

    /*背景动画*/
    .bcAni-enter-active {
        animation: bcAni_show 500ms;
    }

    .bcAni-leave-active {
        animation: bcAni_hide 500ms;
    }

    @keyframes bcAni_show {
        from {
            background-color: rgba(0, 0, 0, 0);
        }
        to {
            background-color: rgba(0, 0, 0, 0.3);
        }
    }

    @keyframes bcAni_hide {
        from {
            background-color: rgba(0, 0, 0, 0.3);
        }
        to {
            background-color: rgba(0, 0, 0, 0);
        }
    }

    /*内容动画1，从上到下推出*/
    .contentAni1-enter-active {
        animation: contentAni1_show 300ms;
    }

    .contentAni1-leave-active {
        animation: contentAni1_hide 300ms;
    }

    @keyframes contentAni1_show {
        from {
            bottom: calc(100%);
        }
        to {
            bottom: 0;
        }
    }

    @keyframes contentAni1_hide {
        from {
            bottom: 0;
        }
        to {
            bottom: calc(100%);

        }
    }

    /*内容动画3，从下到上推出*/
    .contentAni3-enter-active {
        animation: contentAni3_show 500ms;
    }

    .contentAni3-leave-active {
        animation: contentAni3_hide 500ms;
    }

    @keyframes contentAni3_show {
        from {
            top: calc(100%);
        }
        to {
            top: 0;
        }
    }

    @keyframes contentAni3_hide {
        from {
            top: 0;
        }
        to {
            top: calc(100%);
        }
    }

</style>

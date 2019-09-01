<template>
    <div class="uf dr fw" style="width: 100%;">
        <div style="width: 50%;" v-for="(item,index) in boxList" @click="BoxFun(index)">
        <div class="uf dc box_radio" :class="isActive?'style_box':'style_box1'">
            <div class="title_word">{{item.title_word}}</div>
            <div class="warn_status">{{item.warn_status}}</div>
            <div v-if="item.isActive" class="style_box_position">
            </div>
            <img v-if="item.isActive" class="icon_size" src="../../assets/images/public/good.png">
        </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            title_word:String,
            warn_status:String,
            isActive:Boolean,
        },
        name: "BoxRadio",
        data(){
            return{
                isActive:false,
                isOne:false,
                isTwo:false,
                isThree:false,
                isFore:false,
                boxList: [{
                    title_word: '你好',
                    warn_status: '100',
                    isActive: false,
                },
                    {
                        title_word: '测试',
                        warn_status: '100',
                        isActive: false,
                    }, {
                        title_word: '水表',
                        warn_status: '100',
                        isActive: false,
                    },
                    {
                        title_word: '开花',
                        warn_status: '100',
                        isActive: false,
                    }
                ],
            }
        },
        methods:{
            BoxFun(val) {
                console.log("val====>", val);
                if (val === 0) {
                    this.isOne = !this.isOne;
                    if (this.isOne) {
                        this.boxList[0].isActive = false;
                        this.counter = this.counter - 1;
                    } else {
                        this.boxList[0].isActive = true;
                        this.counter = this.counter + 1;
                    }
                }
                if (val === 1) {
                    this.isTwo = !this.isTwo;
                    if (this.isTwo) {
                        this.boxList[1].isActive = false;
                        this.counter = this.counter - 1;
                    } else {
                        this.boxList[1].isActive = true;
                        this.counter = this.counter + 1;
                    }
                }
                if (val === 2) {
                    this.isThree = !this.isThree;
                    if (this.isThree) {
                        this.boxList[2].isActive = false;
                        this.counter = this.counter - 1;
                    } else {
                        this.boxList[2].isActive = true;
                        this.counter = this.counter + 1;
                    }
                }
                if (val === 3) {
                    this.isFore = !this.isFore;
                    if (this.isFore) {
                        this.boxList[3].isActive = false;
                        this.counter = this.counter - 1;
                    } else {
                        this.boxList[3].isActive = true;
                        this.counter = this.counter + 1;
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .uf{
        display: flex;
    }
    .dc{
     flex-direction: column;
    }
    .box_radio {
        width: calc(100% - 10px);
        height: 71px
    }
        .style_box{
            width: 100%;
            height: 100%;
            background-color: white;
            border-radius:5px;
            padding: 10px 10px;
            position: relative;
            border:1px solid rgba(43,127,243,1);
            .style_box_position{
                position: absolute;
                top: 0px;
                right: 0px;
                height: 0px;
                width: 0px;
                border-top: 15px solid rgba(43,127,243,1);
                border-left: 15px solid transparent;
                border-right: 15px solid rgba(43,127,243,1);
                border-bottom: 15px solid transparent;
                border-top-right-radius: 5px;
            }.icon_size{
            position: absolute;
            top: 2px;
            right: 1px;
            width: 15px;
            height: 12px;
                         }
            .title_word{
                font-size:13px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(119,119,119,1);
            }
            .warn_status{
                font-size:24px;
                margin-top: 5px;
                font-family:DIN;
                font-weight:bold;
                color:rgba(33,33,33,1);
            }
        }
    .style_box1{
        width: 100%;
       height: 100%;
        background-color: white;
        border-radius:5px;
        padding: 10px 10px;
        .title_word{
            font-size:13px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(119,119,119,1);
        }
        .warn_status{
            font-size:24px;
            margin-top: 5px;
            font-family:DIN;
            font-weight:bold;
            color:rgba(33,33,33,1);
        }
    }

</style>
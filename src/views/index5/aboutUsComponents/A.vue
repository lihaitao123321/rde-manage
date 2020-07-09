<template>
    <div class="aboutUs">
        <div class="main-title">
            <div class="dot"></div>
            <div class="label">关于德孚</div>
        </div>
        <div class="content">
            <div
                    class="text"
            >
                德孚致力于利用物联网、大数据技术在设备运维服务领域发挥指引作用，帮助设备制造商、设备运维服务商、设备使用者、能源运营商、楼宇管理方等合作伙伴实现智慧运维云、远程监控云、能源管理云、智能楼宇云等，为设备运维行业提供完善的数据化解决方案。我们将帮助设备运维行业实现社会数据的共享，驱动设备运维服务向数字形态、云计算、智能运维的模式发展。
                我们为设备运维行业提供一站式物联网云服务的解决方案。
                我们利用云计算、物联网、大数据技术，研发了从设备出厂到运行到整机回收整个生命周期的云服务功能，涵盖“远程监管、节能管理、智能运维客服、3D可视化、专家系统、故障诊断和大数据分析”等平台。
                我们总部位于昆山城东科技广场，在苏南、苏北、山东分别设立办事处，同时与上海交通大学、南京工业大学、扬州大学等多家科研机构建立了深入的产学研合作。
            </div>
            <div class="content1">
                <span class="title">公司经营理念:</span>
                <span class="detail">创新求变，诚信经营</span>
            </div>
            <div class="content1" style="margin-top: 40px">
                <span class="title">经营范围:</span>
                <span class="detail">光伏太阳能设备及其配件的研发，生产，销售，自营和代理各类商品及技术的进出口业务</span>
            </div>
        </div>
        <div class="main-title">
            <div class="dot"></div>
            <div class="label">联系我们</div>
        </div>
        <div class="content content1">
            <span class="title">总部</span>
            <div class="space">
                <span class="label">公司地址：</span>
                <span class="detail">江苏省昆山市开发区前进东路科技广场大楼605室</span>
            </div>
            <div class="space">
                <span class="label">电话号码：</span>
                <span class="detail">+86 15051665680</span>
            </div>
            <div class="space">
                <span class="label">公司网址：</span>
                <span class="detail">www.de-vo.cn</span>
            </div>
            <!--                <span class="title" style="margon-top:30px;">分公司</span>-->
            <!--                <div class="label space">Radiant Japan 株式会社</div>-->
            <!--                <div class="space">-->
            <!--                    <span class="label">公司地址：</span>-->
            <!--                    <span class="detail">東京都渋谷区東三丁目１５−５ AYビ ル４階</span>-->
            <!--                </div>-->
            <!--                <div class="space">-->
            <!--                    <span class="label">电话号码：</span>-->
            <!--                    <span class="detail">+86 512-66572916</span>-->
            <!--                </div>-->
            <!--                <div class="space">-->
            <!--                    <span class="label">公司网址：</span>-->
            <!--                    <span class="detail">www.radiantpv.com</span>-->
            <!--                </div>-->
        </div>
    </div>
</template>

<script>
    import { XHeader, XButton } from "vux";

    export default {
        components: {
            XHeader,
            XButton
        },
        data() {
            return {};
        }
    };
</script>

<style lang="less" scoped>
    .aboutUs {
        padding-bottom: 80px;
        background-color: white;
        height: 100%;
        overflow-y: auto;
        margin-top: 15px;
        .main-title {
            display: flex;
            height: 55px;
            align-items: center;
            padding-left: 15px;
            .dot{
                width:7px;
                height:7px;
                background:rgba(43,127,243,1);
                border-radius:50%;
            }
            .label{
                font-size: 18px;
                font-weight: 500;
                color: #2b7ff3ff;
                margin-left: 5px;
            }
        }

        .content {
            margin: 0 15px;
            padding-top: 10px;
            padding-bottom: 20px;
            border-top: 1px solid #ebebeb;

            .text {
                font-size: 15px;
                line-height: 34px;
                color: #666666ff;
                margin-bottom: 40px;
            }
        }

        .content1 {
            .title {
                font-size: 17px;
                font-weight: 500;
                margin-bottom: 10px;
                display: block;
            }

            .label {
                color: #999999ff;
            }

            .detail {
                font-size: 15px;
                color: #666666ff;
            }

            .space {
                margin-bottom: 10px;
            }
        }
    }
</style>

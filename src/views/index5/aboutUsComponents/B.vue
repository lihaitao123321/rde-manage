<template>
    <div class="aboutUs">
        <div class="main-title">
            <div class="dot"></div>
            <div class="label">关于从容</div>
        </div>
        <div class="content">
            <div
                    class="text"
            >
                从容光能科技有限公司隶属于瑞得恩集团，成立于2009年；公司总部位于苏州，并在日本设有分公司。瑞得恩光能科技有限公司是一家全球领先的光伏支架、系统解决方案及服务供应商，并为全球客户提供安全，可靠，稳定，高效的太阳能支架以及整体解决方案服务。公司依托顶级资深的专业技术团队和管理团队，专注于光伏电站设备研发及销售；并以客户需求为中心，提供一系列的定制化解决方案和产品。公司坚持“创新求变，诚信经营”为经营理念，投身于传统能源改革，致力于优化光伏电站解决方案，为世界提供绿色，环保，平价的清洁能源。
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
            <span class="title" style="margon-top:30px;">分公司</span>
            <div class="label space">Radiant Japan 株式会社</div>
            <div class="space">
                <span class="label">公司地址：</span>
                <span class="detail">東京都渋谷区東三丁目１５−５ AYビ ル４階</span>
            </div>
            <div class="space">
                <span class="label">电话号码：</span>
                <span class="detail">+86 512-66572916</span>
            </div>
            <div class="space">
                <span class="label">公司网址：</span>
                <span class="detail">www.radiantpv.com</span>
            </div>
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

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
                国訾新能源科技（上海）有限公司是一家专注于新能源领域的开发、投资、建设、运维与管理于一体的综合能源服务商，公司总部设在上海，核心团队深耕新能源领域多年，平均行业经验6年以上，依托强大的产业优势，紧跟国际能源发展趋势和中国新能源行业的快速崛起大势，整合资源，致力于光伏发电、风力发电、储能、能源微网、综合能源服务等项目的开发、投资、建设、运维与管理。
                面对全国综合能源市场，深化与各级政府合作，为智慧工厂、绿色园区、智慧城市提供新能源全产业链的解决方案，是国内较早定位为专业高效的新能源综合运营服务商。目前，已成功落地上海、安徽、江苏和山东等多个合作项目，得到客户和合作伙伴的高度评价和肯定，成为业内及各地政府推广综合能源项目的优质合作单位。
            </div>
            <div class="content1">
                <span class="title">公司经营理念:</span>
                <span class="detail">为企业提供优质的综合能源服务，为政府提供高效的能源管理服务</span>
            </div>
            <div class="content1" style="margin-top: 40px">
                <span class="title">经营范围:</span>
                <span class="detail">光伏太阳能设备及其配件的研发，生产，销售，自营和代理各类商品及技术的进出口业务</span>
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

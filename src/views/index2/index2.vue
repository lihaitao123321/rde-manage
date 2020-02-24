<template>
    <div class="t_page">
        <div class="search-header">
            <div class="back-icon" @click='$router.goBack()'>
                <img style="height: 100%;width: 100%" src="../../assets/images/index2/返回图标@2x.png">
            </div>
            <div class="search">
                <div class="input_warp">
                    <div class="left_search_icon">
                        <i class="el-icon-search"></i>
                    </div>
                    <div class="search_content">
                        <input placeholder="搜索电站" readonly @click="openSearchPage"/>
                    </div>
                </div>
            </div>

        </div>
        <div class="left">
            <div class="blue">{{leftModel.projectCount || 0}}</div>
            <div class="text">项目数</div>

            <div class="blue">{{leftModel.deviceCount || 0}}</div>
            <div class="text">设备数</div>

            <div class="blue" style="color: #1ACC83FF;">{{leftModel.onlineRate*100}}%</div>
            <div class="text">在线率</div>

            <div class="blue">{{leftModel.runingRate*100}}%</div>
            <div class="text">运行率</div>

            <div class="blue" style="color:#D22642FF;">{{leftModel.alarmRate*100}}%</div>
            <div class="text">报警率</div>
        </div>
        <div class="goodsInfo" v-if="showProduct" @click="openSiteInfo">

        </div>
        <div class="content" id="index1_content_map"></div>
    </div>

</template>
<script>
    import startAppModel from '@/plugins/startAppModel';
    import locationModel from '@/plugins/locationModel';
    export default {
        data() {
            return {
                locationLoading: false,
                map: null,
                center: [116.406315, 39.908775],
                locationMark: [],
                markerList: [],
                checkedList: [],
                showProduct: true,
                leftModel:{
                    projectCount: 0,
                    deviceCount: 0,
                    onlineRate: 0,
                    runingRate: 0,
                    alarmRate: 0,
                    appProjectModels:[]
                },
                productModel: {},
                isCollection: false,

            }
        },
        async mounted() {
            // this.t_loading.show('加载地图中');
            await this.initMap();
            await this.startLocation();
            await this.initData();
            // this.t_loading.hide();
            // this.onSetZoomAndCenter();
        },
        methods: {
            openSearchPage() {
                this.$router.push('searchMap');
            },
            //开始定位
            startLocation() {
                return new Promise(resolve => {
                    this.locationLoading = true;
                    locationModel.getCurrentLocation(center => {
                        this.locationLoading = false;
                        if (center) {
                            this.center = center;
                            this.$store.commit('setLocation', center);
                            localStorage.setItem('location', center);
                            this.setLocationMark(center);
                            resolve(center);
                        } else {
                            this.setLocationMark(this.$store.state.location);
                            resolve(false);
                        }
                    });
                });
            },
            //设置定位点标记
            setLocationMark(position) {
                if (!position || position.length === 0) {
                    return false;
                }
                if (this.locationMark) {
                    this.map.remove(this.locationMark);
                }
                let markerContent = `<img style="position:relative;cursor:pointer;" width="23px" height="23px" src="https://webapi.amap.com/theme/v1.3/markers/b/loc.png" alt=""/>`;
                let marker = new AMap.Marker({
                    position: position,
                    zoom: 10,
                    content: markerContent,
                    // offset: new AMap.Pixel(-13, -30),
                    // extData: obj[i]
                });
                this.map.add(marker);
                this.locationMark = marker;
                this.map.setZoomAndCenter(13, position);
            },
            //打开站点详情
            openSiteInfo() {
                this.$router.push('/siteInfoLeft/' + this.productModel.siteId);
            },
            //收藏
            async collectionProduct() {
                await this.Tools.ajax({
                    method: '/app/masterdata/site/store/save',
                    data: {
                        "siteId": this.productModel.siteId,
                        "opType": this.productModel.isStore ? 0 : 1
                    }
                }).then(data => {
                    if (data.code === 200) {
                        this.$toast.success(this.productModel.isStore === 0 ? '收藏成功' : '取消收藏成功');
                        this.productModel.isStore = this.productModel.isStore === 0 ? 1 : 0;
                    } else {
                        this.$toast(this.productModel.isStore === 0 ? '收藏失败' : '取消收藏失败');
                    }
                });
            },
            initData() {
                return this.Tools.ajax({
                    method: '/cloud/api/app/map/getMapProject',
                    data: {}
                }).then(data => {
                    console.log(data)
                    if (data.code === 0) {
                        this.leftModel = data.data;
                        this.addMarker(data.data);
                    }
                });
            },
            async refreshData() {
                this.t_loading.show('加载地图中');
                await this.initData();
                this.t_loading.hide();
            },
            async initMap() {
                this.map = new AMap.Map("index1_content_map", {
                    zoom: 14
                });
                this.map.on('click', (ev) => {
                    this.showProduct = false;
                });
                this.map.on('mapmove', (ev) => {
                    this.showProduct = false;
                });
                this.map.on('resize', (ev) => {
                    this.showProduct = false;
                });
                //增加工具条
                let tools = new AMap.ToolBar({
                    position: 'RB'
                });
                this.map.addControl(tools);
                this.map.addControl(new AMap.Scale());
            },
            addMarker(obj) {
                if (this.markerList && this.markerList.length > 0) {
                    for (let i = 0; i < this.markerList.length; i++) {
                        this.map.remove(this.markerList[i]);
                    }
                    this.markerList = [];
                }
                if (obj instanceof Array) {

                } else {
                    obj = [obj];
                }
                let hasPop = false;
                for (let i = 0; i < obj.length; i++) {
                    let markerContent = '';
                    if (obj[i].siteType === 0) {
                        markerContent =
                            `<div class="custom-content-marker" style="background-image: url(${require('../../assets/images/index2/blueMarker.png')});background-size: 100% 100%;">
                                <div class="custom-content-marker-yuan-blue">${obj[i].totalQty}</div>
                            </div>`;
                    } else {
                        markerContent =
                            `<div class="custom-content-marker" style="background-image: url(${require('../../assets/images/index2/redMarker.png')});background-size: 100% 100%;">
                                <div class="custom-content-marker-yuan-red">${obj[i].totalQty}</div>
                            </div>`;
                    }
                    let marker = new AMap.Marker({
                        position: [obj[i].gdLongitude, obj[i].gdLatitude],
                        zoom: 10,
                        content: markerContent,
                        offset: new AMap.Pixel(-13, -30),
                        extData: obj[i]
                    });
                    AMap.event.addListener(marker, 'click', res => {
                        this.onClickMarker(res);
                    });
                    this.map.add(marker);
                    this.markerList.push(marker);
                    if (this.productModel && this.productModel.siteId === obj[i].siteId) {
                        hasPop = JSON.parse(JSON.stringify(obj[i]));
                    }
                }
                if (hasPop && this.showProduct) {
                    this.productModel = hasPop;
                } else {
                    this.productModel = {};
                    this.showProduct = false;
                }
            },
            onClickMarker(res) {
                this.productModel = res.target.B.extData;
                this.showProduct = true;
            },
            openAmap() {
                let location = this.$store.state.location;
                startAppModel.openAmap(location[1], location[0], '我', this.productModel.gdLatitude, this.productModel.gdLongitude, this.productModel.siteName);
            },
            onSetZoomAndCenter() {
                this.$bus.on('onSetZoomAndCenter', res => {
                    this.map.setZoomAndCenter(13, [res.gdLongitude, res.gdLatitude]);
                    this.productModel = res;

                    setTimeout(() => {
                        this.showProduct = true;
                    }, 500);
                });
            }
        },
    }
</script>
<style lang="less" scoped>
    .t_page {
        .search-header {
            display: flex;
            align-items: center;
            position: absolute;
            z-index: 1;
            top: 10px;
            left: 0;
            width: 100%;
            height: 50px;

            .back-icon {
                height: 40px;
                width: 40px;
                margin: 10px;
            }

            .search {
                display: flex;
                align-items: center;
                /* flex-grow: 1; */
                height: 50px;
                width: 80%;

                .input_warp {
                    display: flex;
                    width: 100%;
                    height: 38px;
                    background: #FFFFFF;
                    border-radius: 30px;

                    .left_search_icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 40px;
                        height: 100%;
                        border-radius: 30px;

                        i {
                            font-size: 18px;
                            color: #999999FF;
                        }
                    }

                    .search_content {
                        flex-grow: 1;

                        input {
                            width: 100%;
                            height: 100%;
                            background: none;
                            border: none;
                            outline: none;
                            color: white;
                        }

                        input::placeholder {
                            font-size: 14px;
                            color: #999999FF;
                        }
                    }
                }
            }
        }

        .left {
            position: absolute;
            z-index: 1;
            top: 90px;
            left: 10px;
            width: 80px;
            height: 326px;
            background-color: #FFFFFF;
            border-radius: 5px;
            text-align: center;

            .text {
                color: #888888FF;
                font-size: 12px;
                padding-bottom: 12px;
                margin: 0 14px;
                border-bottom: 1px solid #E8E8EBFF;
            }

            .blue {
                color: #2B7FF2FF;
                font-size: 19px;
                font-weight: 700;
                margin-top: 10px;
            }
        }

        .goodsInfo {
            position: absolute;
            z-index: 10000;
            bottom: 10px;
            left: 10px;
            right: 10px;
            width: calc(100% - 20px);
            height: 159px;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0px 6px 0px rgba(221, 221, 221, 1);
            border-radius: 4px;
            padding: 0 10px;

            .detail {
                display: flex;
                width: 100%;
                height: 114px;
                border-bottom: 0.3px solid rgba(0, 0, 0, 0.1);
                padding: 10px 0;

                .left {
                    width: 60px;

                    img {
                        width: 60px;
                        height: 60px;
                    }
                }

                .right {
                    padding-left: 10px;

                    .title {
                        max-width: 250px;
                        height: 22px;
                        font-size: 16px;
                        font-family: PingFangSC;
                        font-weight: 500;
                        color: rgba(51, 51, 51, 1);
                        line-height: 22px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }

                    .address {
                        display: flex;
                        align-items: center;
                        height: 24px;
                        font-size: 12px;
                        font-family: PingFangSC;
                        font-weight: 400;
                        color: rgba(102, 102, 102, 1);

                        .km {
                            height: 14px;
                            line-height: 14px;
                            padding-right: 7px;
                            border-right: 1px solid rgba(0, 0, 0, 0.5);
                        }

                        .addr {
                            max-width: 200px;
                            padding-left: 7px;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }

                    .type {
                        display: flex;
                        align-items: center;
                        height: 24px;
                        font-size: 12px;
                        font-family: PingFangSC;
                        font-weight: 400;
                        color: rgba(102, 102, 102, 1);

                        .one {
                            font-size: 16px;
                            font-family: DIN;
                            font-weight: 500;
                            color: rgba(255, 44, 38, 1);
                            padding: 0 2px;
                        }

                        .two {
                            font-size: 16px;
                            font-family: DIN;
                            font-weight: 500;
                            color: rgba(102, 102, 102, 1);
                            padding: 0 2px;
                        }

                        .three {
                            font-size: 16px;
                            font-family: DIN;
                            font-weight: 500;
                            color: rgba(62, 124, 247, 1);
                            padding: 0 2px;
                        }
                    }

                    .other {
                        display: flex;
                        align-items: center;
                        height: 24px;
                        font-size: 12px;
                        font-family: PingFangSC, serif;
                        font-weight: 400;
                        color: rgba(102, 102, 102, 1);

                        .label {
                            color: rgba(201, 151, 86, 1);
                            background: rgba(255, 255, 255, 1);
                            border-radius: 1px;
                            border: 1px solid rgba(201, 151, 86, 1);
                            padding: 1px 6px;
                            margin-right: 6px;
                        }

                        .time {
                            font-size: 11px;
                            font-family: PingFangSC;
                            font-weight: 400;
                            background: rgba(255, 255, 255, 1);
                            border-radius: 1px;
                            border: 1px solid rgba(204, 204, 204, 1);
                            color: rgba(102, 102, 102, 1);
                            padding: 1px 6px;
                        }
                    }

                }
            }

            .handle {
                display: flex;
                align-items: center;
                height: 45px;

                .item1 {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-grow: 1;
                    height: 20px;
                    text-align: center;
                    font-size: 14px;
                    font-family: PingFangSC;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);

                    img {
                        width: 18px;
                        height: 18px;
                        margin-right: 4px;
                    }
                }

                .item2 {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-grow: 1;
                    height: 20px;
                    text-align: center;
                    font-size: 14px;
                    font-family: PingFangSC;
                    font-weight: 400;
                    color: rgba(51, 51, 51, 1);

                    img {
                        width: 14px;
                        height: 16px;
                        margin-right: 4px;
                    }
                }

                div:nth-child(1) {
                    border-right: 0.5px solid rgba(0, 0, 0, 0.1);
                }
            }
        }

        #index1_content_map {
            width: 100%;
            height: 100%;
        }
    }
</style>
<template>
    <div class="t_page">
        <XHeader
                fixed
                :left-options="{preventGoBack:true}"
                @on-click-back="$router.goBack()"
                title="关于我们"
        ></XHeader>
            <component :is="config.projectId"></component>
    </div>
</template>
<script>
    import { XHeader, XButton } from "vux";
    import aboutUsComponents from "./aboutUsComponents";
    import config from "../../config";
    export default {
        components: {
            ...aboutUsComponents,
            XHeader
        },
        data() {
            return {
                config
            };
        }
    };
</script>

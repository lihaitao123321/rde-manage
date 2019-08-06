<template>
    <div class="select_warp">
        <select>
            <option>666</option>
            <option>777</option>
        </select>
    </div>
</template>

<script>
    export default {
        name: "x-select"
    }
</script>

<style lang="less" scoped>
    .custom-select {
        position: relative;

        select {
            width: 100%;
            height:68px;
            background-color:#eeeeee;
            border-radius:6px;

            margin: 0.31rem auto 0;
            padding-left: 3%;
            outline: none;
            // border: 1px solid transparent;               
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            appearance: none;
            -moz-appearance: none;
            -webkit-appearance: none;
            font-size: 0.5rem;

            &:focus {
                outline: none;
                box-shadow: 0 0 1px 3px rgba(217, 222, 250, 1);
                background-color: transparent;
                color: #222;
                border: 1px solid #aaa;
            }
        }
    }

    .custom-select::after {
        content: "";
        position: absolute;
        width: 0px;
        height: 0px;
        top: 50%;
        right: 22%;
        // margin-top:-0.7rem;           
        border: 8px solid #929497;
        border-width: 8px 5px 8px;
        border-color: #929497 transparent transparent transparent;
        z-index: 2;
        pointer-events: none;
    }

    .custom-select option {
        font-weight: normal;
    }

    x:-o-prefocus, .custom-select::after {
        display: none;
    }
</style>
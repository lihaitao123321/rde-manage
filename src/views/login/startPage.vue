<template>
    <div class="t_page bgColor">
        <div class="t_content_image1">
            <img style="height: 100px;width: 100px" src="../../assets/images/login/bluelogo@2x.png">
        </div>
        <div class="word_bottom">{{$t('startPage.wordTitle')}}</div>
        <div class="word_letter">{{$t('startPage.letter')}}</div>
        <div class="letter_botton">{{$t('startPage.wordLt')}}</div>
    </div>
</template>

<script>
    export default {
        name: "startPage"
    }
</script>

<style lang="less" scoped>
.bgColor{
    background-image: url("../../assets/images/login/bgColor@2x.png");
    background-size:100% 100%;
    background-repeat:no-repeat;
    padding-top: 83px;
}
    .t_content_image1{
        display: flex;
        justify-content: center;
    }
.word_bottom{
    margin-top: 30px;
    display: flex;
    justify-content: center;
    font-size: 22px;
   color:rgba(255, 255, 255, 1);
    font-family: FZZZHONGJW-GB1-0;
}
    .word_letter{
    display: flex;
        justify-content: center;
        align-items: center;
        font-size: 11px;
        color: rgba(255, 255, 255, 1);
        margin-top: 9px;
    }
    .letter_botton{
        position: absolute;
        bottom: 50px;
        color: rgba(255, 255, 255, 1);
        font-size: 10px;
       left: 25%;
    }
</style>
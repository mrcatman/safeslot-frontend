<script>
    import gameStates from '../gameStates.js';
    import { state } from '../stores.js';

    $: isWin = [gameStates.STATE_ROUND_WIN].indexOf($state) !== -1;
    $: isFail = [gameStates.STATE_ROUND_LOSE, gameStates.STATE_ROUND_LOSE_BOMB, gameStates.STATE_KICKED_FOR_INACTIVITY, gameStates.STATE_SHOWING_WON_SUM].indexOf($state) !== -1;
</script>
<style>
.colored-backgrounds__item {
   position: absolute;
   z-index: 0;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
}
.colored-backgrounds__item--overlay {
   z-index: 1;
   opacity: 0;
   transition: opacity .5s;
}
.colored-backgrounds__item--overlay.active {
    opacity: 1;
}
</style>
<div class="colored-backgrounds">
    <div class="colored-backgrounds__item" style="background: url('/assets/bg_main.jpg') no-repeat center center; background-size: cover;"></div>
    <div class="colored-backgrounds__item colored-backgrounds__item--overlay" class:active={isWin} style="background: url('/assets/bg_success.jpg') no-repeat center center; background-size: cover;"></div>
    <div class="colored-backgrounds__item colored-backgrounds__item--overlay" class:active={isFail} style="background: url('/assets/bg_fail.jpg') no-repeat center center; background-size: cover;"></div>
</div>
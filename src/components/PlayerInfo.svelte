<script>
    import gameStates from '../gameStates.js';
    import { player, state, currentSum } from '../stores.js';
    import { fade } from 'svelte/transition';
    $: showBig = [gameStates.STATE_WAITING_FOR_HINTS_LIST, gameStates.STATE_WAITING_FOR_SAFETY_NET, gameStates.STATE_SHOWING_RESULTS, gameStates.STATE_SHOWING_WON_SUM, gameStates.STATE_KICKED_FOR_INACTIVITY].indexOf($state) !== -1;
</script>
<style>
    .player {
        position: absolute;
        top: 1em;
        right: 1em;
        display: flex;
        align-items: center;
        text-align: right;
    }

    .player.big {
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        justify-content: center;
        z-index: 10;
        font-size: 1.5em;
    }

    .player-ava {
        width: 5em;
        border-radius: 50%;
    }

    .player-sum {
        display: block;
        font-size: 1.125em;
    }

    .player-now {
        display: block;
        font-size: 1.25em;
        color: #aaa;
    }

    .player-info {
        margin-right: 1em;
    }

    .player-name {
        font-size: 1.75em;
    }
</style>
<div class="player-container">
    {#if $player && ($player.alias || $player.name || $player.first_name)}
    <div class="player" class:big={showBig} transition:fade>
        <div class="player-info">
            {#if $state !== gameStates.STATE_SHOWING_WON_SUM} <span class="player-now">Сейчас играет:</span> {/if}
            <span class="player-name">{$player.alias ? $player.alias : ($player.name ? $player.name : `${$player.first_name} ${$player.last_name}`)}</span>
            <span class="player-sum">{#if $state === gameStates.STATE_SHOWING_WON_SUM}Выигрыш: {/if}{$currentSum ? $currentSum : 0} Р</span>
            {#if $state === gameStates.STATE_KICKED_FOR_INACTIVITY}
             <span class="player-sum">Игрок не отвечал несколько минут, поэтому был удален из игры</span>
            {/if}
        </div>
        {#if $player.photo_100}
            <!--<img class="player-ava" src={$player.photo_100}/>-->
        {/if}
    </div>
    {/if}
</div>
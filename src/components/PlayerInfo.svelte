<script>
    import gameStates from '../gameStates.js';
    import { player, state } from '../stores.js';
    import { fade } from 'svelte/transition';
    $: showBig = [gameStates.STATE_WAITING_FOR_HINTS_LIST, gameStates.STATE_WAITING_FOR_SAFETY_NET, gameStates.STATE_SHOWING_RESULTS].indexOf($state) !== -1;

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
    {#if $player}
    <div class="player" class:big={showBig} transition:fade>
        <div class="player-info">
            <span class="player-now">Сейчас играет:</span>
            <span class="player-name">{$player.alias ? $player.alias : ($player.name ? $player.name : `${$player.first_name} ${$player.last_name}`)}</span>
        </div>
        {#if $player.photo_100}
            <img class="player-ava" src={$player.photo_100}/>
        {/if}
    </div>
    {/if}
</div>
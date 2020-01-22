<script>
    import gameStates from '../gameStates.js';
    import { hintData, state } from '../stores.js';
    import { fade } from 'svelte/transition';
    $: hide = [ gameStates.STATE_SHOWING_WON_SUM, gameStates.STATE_NOT_STARTED, gameStates.STATE_STARTING, gameStates.STATE_KICKED_FOR_INACTIVITY].indexOf($state) !== -1;
</script>
<style>
    .hints-list {
        position: absolute;
        display: flex;
        flex-direction: row;
        width: 100%;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        bottom: 6em;
        height: auto;
    }

    .hint {
        margin: 0 .125em;
        font-size: 1.75em;
        background: rgba(0, 0, 0, 0.5);
        width: 4em;
        padding: .25em;
        text-align: center;
        border-radius: .125em;
    }

    .hint.used {
        color: #555;
    }

    .hint.active {
        background: #ffda00;
        color: #333;
        box-shadow: 0 0 .5em #ffda00;
    }

    .bomb{
        background: #b41c1c82;
    }

    .selected-hint {
        position: absolute;
        font-size: 1.75em;
        text-align: center;
        left: 0;
        width: 100%;
        top: 3.25em;
        background: linear-gradient(45deg, black, transparent);
        padding: .25em 0;
    }

    .number {
        color: #69fff3;
    }

</style>
<div class="hints">
    {#if $hintData.hints && !hide}
    {#if $hintData.selectedHint}
    <div class="selected-hint" transition:fade>
        Выбрана подсказка "{$hintData.hints[$hintData.selectedHint].fullName}"!<br>
        {#if $hintData.selectedHint === 'alternative'}
        <div>Сделайте выбор, <span class="number">{$hintData.hints.alternative.variants[0]}</span> или <span class="number">{$hintData.hints.alternative.variants[2]}</span>?</div>
        {/if}
        {#if $hintData.selectedHint === 'locator' && $hintData.hints.locator.counts}
        <div>Найдено <span class="number">{$hintData.hints.locator.counts.fatals}</span> фаталов и <span class="number">{$hintData.hints.locator.counts.free}</span> свободных слотов</div>
        {/if}
        {#if $hintData.selectedHint === 'gps'}
        <div>Свободный слот проще найти в <span class="number">{$hintData.hints.gps.index}</span> {$hintData.hints.gps.typeName}</div>
        {/if}
    </div>
    {/if}
    <div class="hints-list" transition:fade>
        {#each Object.keys($hintData.hints) as hintIndex}
            <div class="hint" class:used={$hintData.hints[hintIndex].usedAt} class:active={$hintData.selectedHint === hintIndex}>
                [{$hintData.hints[hintIndex].name}]
            </div>
         {/each}
        {#if $hintData.hasBomb}
        <div class="hint bomb">
            [BOMB]
        </div>
        {/if}
    </div>
    {/if}
</div>
<script>
    import gameStates from '../gameStates.js';
    import { hintData } from '../stores.js';
    import { fade } from 'svelte/transition';
</script>
<style>
    .hints-list {
        position: absolute;
        display: flex;
        flex-direction: row;
        width: 48em;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        bottom: 7.5em;
        height: auto;
    }

    .hint {
        margin: 0 .125em;
        font-size: 1.5em;
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

</style>
<div class="hints">
    {#if $hintData.hints}
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
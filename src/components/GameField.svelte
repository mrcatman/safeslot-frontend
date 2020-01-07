<script>
    import gameStates from '../gameStates.js';
    import { fieldObject } from '../stores.js';
    import { fade } from 'svelte/transition';
</script>
<style>
    .game-field {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .row {
        display: flex;
    }

    .slot {
        font-size: 3.5em;
        width: 2.5em;
        padding: .25em 0;
        text-align: center;
        color: #aaa;
        border-radius: .125em;
        background: rgba(0, 0, 0, 0.65);
        margin: 0 0 .25em .25em;
        transition: all .35s;
    }

    .slot.selected {
        background: #ffe000;
        color: #111;
        box-shadow: 0 0 0.5em #ffe000;
    }

    .slot.correct.selected {
        background: #1cff2d;
        box-shadow: 0 0 1em #1cff2d;
        color: #fff;
    }


    .slot.empty {
        color: #fff;
    }

    .slot.fatal {
        color: #f00;
    }

    .slot.fatal.selected {
        color: #fff;
        background: #f00;
        box-shadow: 0 0 1em #f00;
    }

    .slot.fatal.hidden {
        color: #333;
    }

    .slot.bomb {
        background: repeating-linear-gradient(-45deg, #000 0px, #000 10px, #555 11px, #555 20px);
        color: #fff;
    }

    .slot.bomb.selected {
        background: repeating-linear-gradient(-45deg, #f00 0px, #f00 10px, #000 11px, #000 20px);
        box-shadow: 0 0 .5em #f00;
    }


</style>
<div class="game-field">
    {#if $fieldObject}
        {#each $fieldObject as row}
            <div class="row" transition:fade>
                {#each row as slot}
                    <div class="slot" class:empty={slot.empty} class:hidden={slot.hidden} class:correct={slot.correct} class:selected={slot.selected} class:fatal={slot.fatal} class:bomb={slot.bomb}>
                        {slot.number}
                    </div>
                {/each}
            </div>

        {/each}
    {/if}
</div>
<script>
    import gameStates from '../gameStates.js';
    import { treeObject, state } from '../stores.js';
    import { fade } from 'svelte/transition';
      $: hide = [ gameStates.STATE_SHOWING_WON_SUM, gameStates.STATE_NOT_STARTED, gameStates.STATE_STARTING, gameStates.STATE_KICKED_FOR_INACTIVITY].indexOf($state) !== -1;
</script>
<style>
    .tree {
        position: absolute;
        right: 0;
        top: 4em;
        height: calc(100% - 4em);
        text-align: right;
        font-size: 1.75em;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }


    .sum {
        margin: .25em;
        border-radius: .125em;
        padding: .25em;
        background: #0000;
        transition: all .35s;
    }
    .sum.safetynet {
        color: #ffe502;
    }
    .sum.current {
        background: #ffe502;
        color: #111;
    }


</style>
<div class="tree-container">
    {#if $treeObject && !hide}
    <div class="tree" transition:fade>
        {#each $treeObject as sum}
        <div class="sum" class:current={sum.current} class:safetynet={sum.safetyNet}>
            {sum.sum}
        </div>
        {/each}
    </div>
    {/if}
</div>
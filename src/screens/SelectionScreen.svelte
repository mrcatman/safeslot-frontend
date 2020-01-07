<script>
    import gameStates from '../gameStates.js';
    import { onDestroy } from 'svelte';
    import { state, selectionData, intervals, selectionAnswers } from '../stores.js';
    import { fade } from 'svelte/transition';

    let selectionEnd = null;
    const unsubscribe = state.subscribe(newState => {
        if (newState === gameStates.STATE_WAITING_FOR_ANSWERS) {
            selectionEnd = new Date().getTime() + $intervals.selectionDuration * 1000;
        }
    });

    let now = new Date().getTime();
    const interval = setInterval(() => {
        now = new Date().getTime();
    }, 1000);

    $: selectionTimeLeft = selectionEnd ? (selectionEnd > now ?  Math.round((selectionEnd - now) / 1000) : 0) : null;
    $: selectionTimeLeftPercent = selectionTimeLeft !== null ? (selectionTimeLeft > 0 ? 100 - (100 / $intervals.selectionDuration) * ($intervals.selectionDuration - selectionTimeLeft) : 0) : 100;
    $: showResults = $state === gameStates.STATE_SHOWING_RESULTS;
    onDestroy(unsubscribe);
</script>
<style>
    .selection-screen-inner {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .range {
        width: 100%;
        background: rgba(0, 0, 0, .5);
        height: 2em;
        line-height: 2em;
        font-size: 4.5em;
        text-align: center;
    }
    .number {
        color: #69fff3;
    }
    h1 {
        font-size: 3em;
        margin: 0;
        padding: 0;
        font-weight: normal;
    }
    h2 {
        font-size: 2em;
        margin: -.25em 0 .25em;
        padding: 0;
        font-weight: normal;
    }
    .md5 {
        font-size: 1.75em;
        margin: .25em 0 0;
    }
    .time-left {
        font-size: 2em;
        background: #9696963d;
        width: 100%;
        text-align: center;
        margin: .5em 0 0;
        position: relative;
    }

    .time-left-bar {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: rgba(105, 255, 243, 0.5);
        z-index: 0;
        transition: all .5s;
    }
    .time-left-text {
        position: relative;
        z-index: 1;
    }
    .results-list {
        position: absolute;
        top: 0;
        left: 0;
        width: 60%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .result {
        display: flex;
        align-items: center;
        font-size: 1.5em;
        background: rgba(17, 17, 17, 0.75);
        padding: .5em 1em;
    }

    .result-best {
        background: #27ce24;
        box-shadow: 0 0 1em #27ce24;
        z-index: 1;
    }

    .result-name {
        width: 70%;
    }

    .result-number {
        font-size: 1.25em;
        width: 20%;
    }

    .result-seconds {
        width: 10%;
        text-align: right;
    }

    .correct-answer {
        position: absolute;
        top: 0;
        right: 0;
        width: 40%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .correct-answer-title {
        font-size: 2em;
    }

    .correct-answer-number {
        font-size: 5em;
        color: #69fff3;
        margin: -.125em 0;
        text-shadow: 0 0 .5em;
    }

    .correct-answer-string {
        margin: .5em 0 0;
        font-size: 1.25em;
    }
</style>
<div class="selection-screen">
{#if !showResults}
    <div class="selection-screen-inner" transition:fade>
        <h1>Отборочный раунд</h1>
        <h2>Введите число</h2>
        <div class="range">
            от
            <span class="number">{$selectionData.min}</span>
            до
            <span class="number">{$selectionData.max}</span>
        </div>
        <div class="md5">(md5: {$selectionData.md5})</div>
        {#if selectionTimeLeft !== null}
            <div class="time-left" transition:fade>
                <div class="time-left-bar" style="width: {selectionTimeLeftPercent}%;"></div>
                <div class="time-left-text">{selectionTimeLeft}</div>
            </div>
        {/if}
    </div>
{:else}
    <div class="results" transition:fade>
        {#if $selectionAnswers !== null && $selectionAnswers.length > 0}
            <div class="results-list">
                {#each $selectionAnswers as answer}
                    {#if answer}
                    <div class="{answer.best ? 'result result-best' : 'result'}">
                        <div class="result-name">{answer.name}</div>
                        <div class="result-number">{answer.number}</div>
                        <div class="result-seconds">{answer.seconds}</div>
                    </div>
                    {/if}
                {/each}
            </div>
        {/if}
        <div class="correct-answer">
            <div class="correct-answer-title">Число:</div>
            <div class="correct-answer-number">{$selectionData.number}</div>
            <div class="correct-answer-string">(строка: {$selectionData.string})</div>
        </div>
    </div>
{/if}
</div>
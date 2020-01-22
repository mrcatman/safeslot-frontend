<script>
	import gameStates from './gameStates.js';
	import SelectionScreen from './screens/SelectionScreen.svelte';
	import {states, loading, state, params, plannedDate, timeLeft, gameName} from './stores.js';
	import {fade} from 'svelte/transition';
	import MainScreen from "./screens/MainScreen.svelte";
	import AudioPlayer from './components/AudioPlayer.svelte';
    import ColoredBackgrounds from './components/ColoredBackgrounds.svelte';
	$: selectionActive = [gameStates.STATE_WAITING_FOR_ANSWERS, gameStates.STATE_SHOWING_RANGE, gameStates.STATE_SHOWING_RESULTS].indexOf($state) !== -1;

	params.subscribe(newParams => {
		console.log(newParams);
	})

</script>

<main>
    <AudioPlayer/>
	<div class="game-container">
	     <ColoredBackgrounds/>
		{#if $loading || $state === gameStates.STATE_NOT_STARTED}
		<div class="game-state" transition:fade>
		    {#if $timeLeft}
		    <div class="next-game">
                <div class="next-game__time">{$timeLeft}</div>
                <div class="next-game__till">до следующей игры</div>
                <div class="next-game__name">{$gameName}</div>
            </div>
            {/if}
		    <img class="logo-big" src="/assets/logo.png"/>
		</div>
		{:else if $state === gameStates.STATE_NO_SELECTION_ANSWERS}
		<div class="game-state" transition:fade>Ни одного ответа не поступило( <br>Ждите следующей игры через пару минут</div>
		{:else if selectionActive }
			<SelectionScreen/>
		{:else}
			<MainScreen/>
		{/if}
	{#if !$loading && $state !== gameStates.STATE_NOT_STARTED}
		<img transition:fade class="logo-small" src="/assets/logo.png"/>
	{/if}
	</div>
</main>

<style>
	:global(body) {
		padding: 0;
		margin: 0;
		background: #111;
	}
	@font-face {
		font-family: TTProstoSans;
		src: url("/assets/ttpsr.otf");
		font-weight: normal;
	}
	.game-container {
		position: relative;
		color: #fff;
		width: 1280px;
		height: 720px;
		font-family: TTProstoSans, sans-serif;
	}
	.game-state {
	    z-index: 10;
	    position: absolute;
	    top: 0;
	    left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2em;
	}

	.logo-big {
	    position: relative;
	    z-index: 10;
		width: 75%;
	}
	.logo-small {
	  z-index: 10;
		position: absolute;
		bottom: .5em;
		width: 30%;
		left: 35%;
	}

	.next-game {
        position: absolute;
        bottom: 1em;
        left: 0;
        width: 100%;
        text-align: center;
    }

    .next-game__till {
        font-size: .55em;
    }

    .next-game__name {
        color: #eee;
        font-size: .5em;
    }

    .next-game__time {
        font-size: 2em;
    }

</style>
<script>
	import gameStates from './gameStates.js';
	import SelectionScreen from './screens/SelectionScreen.svelte';
	import {states, loading, state, params} from './stores.js';
	import {fade} from 'svelte/transition';
	import MainScreen from "./screens/MainScreen.svelte";

	$: selectionActive = [gameStates.STATE_WAITING_FOR_ANSWERS, gameStates.STATE_SHOWING_RANGE, gameStates.STATE_SHOWING_RESULTS].indexOf($state) !== -1;

	params.subscribe(newParams => {
		console.log(newParams);
	})

</script>

<main>
	<div class="game-container">
		{#if $loading}
		<div class="game-state" transition:fade>
			<img class="logo-big" src="/assets/logo.png"/>
		</div>
		{:else if $state === gameStates.STATE_NOT_STARTED}
		<div class="game-state"  transition:fade>Нет активных игр</div>
		{:else if $state === gameStates.STATE_NO_SELECTION_ANSWERS}
		<div class="game-state" transition:fade>Ни одного ответа не поступило( <br>Ждите следующей игры через пару минут</div>
		{:else if selectionActive }
			<SelectionScreen/>
		{:else}
			<MainScreen/>
		{/if}
	{#if !$loading}
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
		background: url("/assets/bg_main.jpg") no-repeat center center;
		background-size: contain;
		width: 1280px;
		height: 720px;
		font-family: TTProstoSans, sans-serif;
	}
	.game-state {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 2em;
	}

	.logo-big {
		width: 75%;
	}
	.logo-small {
		position: absolute;
		bottom: .5em;
		width: 30%;
		left: 35%;
	}

</style>
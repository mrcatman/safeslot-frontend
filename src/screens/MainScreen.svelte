<script>
    import GameField from '../components/GameField.svelte';
    import Hints from '../components/Hints.svelte';
    import PlayerInfo from "../components/PlayerInfo.svelte";
    import GameTree from "../components/GameTree.svelte";
</script>
<style>
.main-screen {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
}
</style>
<div class="main-screen">
    <PlayerInfo/>
    <GameTree/>
    <GameField/>
    <Hints/>
</div>
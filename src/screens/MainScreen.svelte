<script>
    import GameField from '../components/GameField.svelte';
    import Hints from '../components/Hints.svelte';
    import PlayerInfo from "../components/PlayerInfo.svelte";
    import GameTree from "../components/GameTree.svelte";
</script>
<style>

</style>
<div class="main-screen">
    <PlayerInfo/>
    <GameTree/>
    <GameField/>
    <Hints/>

</div>
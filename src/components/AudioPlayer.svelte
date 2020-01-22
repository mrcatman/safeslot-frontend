<script>
    import gameStates from '../gameStates.js';
    import { track } from '../stores.js';
   	import { onMount } from 'svelte';

    let player;
    let oldSrc;

    onMount(() => {
        track.subscribe(newTrack => {
           console.log(newTrack);
           if (newTrack && newTrack !== oldSrc) {
               oldSrc = newTrack;
               player.src = `/assets/soundpack/${newTrack}`;
               player.currentTime = 0;
               player.play();
           } else {
               player.pause();
           }
       })
    })

</script>
<style>

</style>
<div class="audio-player">
    <audio bind:this={player}></audio>
</div>
<script>
    /**
   * @type {any[] | null | undefined}
   */
    let agenda = [];
    let newAgenda = '';
    let isExploding = false;
    let isNukeDisappearing = false;
    function addAgenda() {
        if (newAgenda) {
            agenda = [...agenda, newAgenda];
            newAgenda = '';
        }
    }
    function removeAgenda(index) {
        agenda.splice(index, 1);
        agenda = [...agenda]; // Update the agenda array to trigger reactivity
    }
    function nukeAll() {
        isExploding = true;
        isNukeDisappearing = true;
        setTimeout(() => {
            agenda = [];
            isExploding = false;
            isNukeDisappearing = false;
        }, 900);
    }
</script>
<main>
    <h1>LAA Pro Ultimate</h1>
    <div class="add-agenda">
        <input class="agenda-input" bind:value={newAgenda} placeholder="Add a new task" on:keydown={(e) => e.key === 'Enter' && addAgenda()} />
            <button class="add-button" on:click={addAgenda}>Add</button>
            {#if agenda.length > 0}
                <button class="nuke-button" class:disappearing={isNukeDisappearing} on:click={nukeAll}>☢️ NUKE ALL</button>
            {/if}
    </div>
    <ul class="agenda-list" class:exploding={isExploding}>
        {#each agenda as agenda, index (index)}
        <li class="agenda-item">
            {agenda}
            <button class="remove-button" on:click={() => removeAgenda(index)}>Remove</button>
        </li>
        {/each}
    </ul>
</main>
<style>
main {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
    margin: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    padding: 20px;
}
h1 {
    background: linear-gradient(135deg, #007bff, #0056b3, #ff6b00, #ff9500);
    background-size: 300% 300%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 20px;
    font-size: 3.5em;
    font-weight: 900;
    letter-spacing: 2px;
    text-transform: uppercase;
    animation: gradientShift 4s ease infinite, titlePulse 2s ease-in-out infinite;
    text-shadow: 0 0 30px rgba(0, 123, 255, 0.3);
    filter: drop-shadow(0 2px 10px rgba(255, 107, 0, 0.2));
}
.add-agenda {
margin-bottom: 20px;
}
.agenda-input {
padding: 10px;
border: 2px solid #ddd;
border-radius: 8px;
font-size: 16px;
transition: all 0.3s ease;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.agenda-input:focus {
outline: none;
border-color: #007bff;
box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
transform: translateY(-2px);
}
.add-button {
padding: 10px 20px;
background-color: #007bff;
color: white;
border: none;
border-radius: 8px;
cursor: pointer;
font-size: 16px;
font-weight: 600;
transition: all 0.3s ease;
box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
margin-left: 10px;
}
.add-button:hover {
background-color: #0056b3;
transform: translateY(-2px);
box-shadow: 0 6px 12px rgba(0, 123, 255, 0.4);
}
.add-button:active {
transform: translateY(0);
box-shadow: 0 2px 4px rgba(0, 123, 255, 0.3);
}
.agenda-list {
list-style-type: none;
padding: 0;
}
.agenda-item {
display: flex;
align-items: center;
justify-content: space-between;
padding: 15px;
border: 2px solid #e0e0e0;
border-radius: 8px;
margin-bottom: 12px;
background: white;
animation: slideIn 0.4s ease-out;
transition: all 0.3s ease;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.agenda-list.exploding .agenda-item {
animation: explode 0.6s ease-out forwards;
}
.agenda-item:hover {
border-color: #007bff;
box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
transform: translateX(5px);
}
.remove-button {
background-color: #dc3545;
color: white;
border: none;
border-radius: 6px;
cursor: pointer;
padding: 8px 16px;
font-weight: 600;
transition: all 0.3s ease;
box-shadow: 0 2px 4px rgba(220, 53, 69, 0.2);
}
.remove-button:hover {
background-color: #c82333;
transform: scale(1.05);
box-shadow: 0 4px 8px rgba(220, 53, 69, 0.3);
}
.remove-button:active {
transform: scale(0.98);
}
@keyframes gradientShift {
0% {
background-position: 0% 50%;
}
50% {
background-position: 100% 50%;
}
100% {
background-position: 0% 50%;
}
}
@keyframes titlePulse {
0%, 100% {
filter: drop-shadow(0 2px 10px rgba(255, 107, 0, 0.2));
}
50% {
filter: drop-shadow(0 4px 20px rgba(0, 123, 255, 0.4)) drop-shadow(0 0 15px rgba(255, 107, 0, 0.3));
}
}
from {
opacity: 0;
transform: translateY(-10px);
}
to {
opacity: 1;
transform: translateY(0);
}
.nuke-button {
padding: 12px 24px;
background: linear-gradient(135deg, #ff6b00, #ff9500);
color: white;
border: 2px solid #ff4500;
border-radius: 8px;
cursor: pointer;
font-size: 16px;
font-weight: 700;
margin-left: 10px;
transition: all 0.3s ease;
box-shadow: 0 0 15px rgba(255, 107, 0, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.2);
text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
animation: nukePulse 1.5s infinite;
}
.nuke-button.disappearing {
animation: nukeFadeOut 1.5s ease-out forwards;
}
.nuke-button:hover {
transform: scale(1.1);
box-shadow: 0 0 25px rgba(255, 107, 0, 0.8), inset 0 0 15px rgba(255, 255, 255, 0.3);
text-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
}
.nuke-button:active {
transform: scale(0.95);
box-shadow: 0 0 20px rgba(255, 107, 0, 0.6);
}
@keyframes nukePulse {
0%, 100% {
box-shadow: 0 0 15px rgba(255, 107, 0, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.2);
}
50% {
box-shadow: 0 0 30px rgba(255, 107, 0, 0.8), inset 0 0 15px rgba(255, 255, 255, 0.4);
}
}
@keyframes nukeFadeOut {
0% {
opacity: 1;
transform: scale(1);
}
100% {
opacity: 0;
transform: scale(0.8);
}
}
@keyframes explode {
0% {
opacity: 1;
transform: scale(1) rotate(0deg);
box-shadow: 0 0 10px rgba(255, 107, 0, 0.3);
}
50% {
opacity: 0.7;
transform: scale(1.1) rotate(5deg);
box-shadow: 0 0 40px rgba(255, 107, 0, 0.9), 0 0 60px rgba(255, 200, 0, 0.7), inset 0 0 20px rgba(255, 150, 0, 0.6);
}
100% {
opacity: 0;
transform: scale(0) rotate(180deg) translateY(-100px);
box-shadow: 0 0 0px rgba(255, 107, 0, 0);
}
}
</style>
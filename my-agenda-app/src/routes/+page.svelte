<script>
    /**
   * @type {any[] | null | undefined}
   */
    let agenda = [];
    let newAgenda = '';
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
</script>
<main>
    <h1>SvelteKit Agendas App</h1>
    <div class="add-agenda">
        <input class="agenda-input" bind:value={newAgenda} placeholder="Add a new task" on:keydown={(e) => e.key === 'Enter' && addAgenda()} />
            <button class="add-button" on:click={addAgenda}>Add</button>
    </div>
    <ul class="agenda-list">
        {#each agenda as agenda, index (agenda)}
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
    color: #343a40;
    margin-bottom: 20px;
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
@keyframes slideIn {
from {
opacity: 0;
transform: translateY(-10px);
}
to {
opacity: 1;
transform: translateY(0);
}
}
</style>
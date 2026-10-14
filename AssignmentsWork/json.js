
// Read the external JSON file
fetch("myjson.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Cannot load JSON file: " + response.status);
        }
        return response.json();
    })
.then(data => {

    // find table body in HTML
    const table = document.getElementById("game-data");

    // loop through each game in JSON file
    data.games.forEach(game => {

        // Create a new table row
        const row = document.createElement("tr");

        //Add the information
        row.innerHTML = `
            <td>${game.title} </td> 
            <td>${game.genre} </td>
            <td>${game.developer} </td>
            <td>${game.releaseYear} </td>
            <td>${game.platform} </td>
        `;

        // Add row to table
        table.appendChild(row);
    });

})
.catch(error => {
    console.error("Error loading JSON:",error);
    
    });

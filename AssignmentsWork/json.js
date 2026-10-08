fetch("myjson.json")
.then(response => response.json())
.then(data => {

    const table = document.getElementById("game-data");

    data.game.forEach(game => {

        const row = document.creatElement("tr");

        row.innerHTML =
        <td>$(game.title)</td>
        <td>$(game.genre)</td>
        <td>$(game.developer)</td>
        <td>$(game.releaseYear)</td>
        <td>$(game.platform)</td>

        ;

        table.appendChild(row);
    });

})
.catch(error => {
    console.error("Error loading JSON", error);
})

loadMyjson();

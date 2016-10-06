"use strict"

window.onload = function() {
    // your JavaScript here
    /// Product section
    document.getElementById("divAddPlayerError").innerText = "";

    document.getElementById("addPlayerButton").addEventListener("click", () => {
        var oReq = new XMLHttpRequest();
        var jsonData = {
            player: document.getElementById("txtPlayerName").value,
            totalPlayed: 0,
            totalWon: 0,
            ranking: 0
        }

        oReq.open("POST", "/players", true);
        oReq.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        oReq.addEventListener("loadend", (jsonResp) => {
            switch (jsonResp.target.status) {
                case 200:
                    window.location.reload();
                    break;
                default:
                    document.getElementById("divAddPlayerError").innerText = jsonResp.target.responseText;
                    break;
            }
        });
        oReq.send(JSON.stringify(jsonData));
    });

}

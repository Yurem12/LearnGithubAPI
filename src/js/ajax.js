$(
    // Base pour toutes fonctions utilisant JQuery
    function() {
        // écrivez vos fonctions ici

        function affichageFixe() {
            $.ajax({
                method: "GET",
                url: "https://api.github.com/users/Yurem12",
            })
            .done(function(data) {
                    console.log(`le nom d'utilisateur est: ${data.login}, ce développeur est localisé dans le pays: ${data.location}. Sa biographie est: ${data.bio}`);
                    var bio = $(`<p>${data.bio}</p>`);
                    if(data.login === data.name) {
                        var username = $(`<h1>${data.name}</h1>`);
                    } else {
                        var username = $(`<h1>${data.name} / ${data.login}</h1>`);
                    }
                    var location = $(`<li>${data.location}</li>`);
                    var avatar = $(`<img src="${data.avatar_url}"></img>`);
                    $(`#me`).append(username, avatar, location, bio);
                
            })
            $.ajax({
                method: "GET",
                url: `https://api.github.com/users/Yurem12/repos`,
            }).done(function(repos) {
                repos.forEach(element => {
                    console.log(element);
                    var repoName = $(`<h1>${element.name}</h1>`);
                    var langage = $(`<li>${element.language}</li>`);
                    var div = $(`<div id="${element.id}"></div>`);
                    $(div).append(repoName, langage);
                    $(`#me`).append(div);
                });
            })
        }
        function affichageDynamique() {
            var formField = $("#username").val()
            console.log(formField);
            $.ajax({
                method: "GET",
                url: `https://api.github.com/users/${formField}`,
            })
            .done(function(data) {
                    console.log(`le nom d'utilisateur est: ${data.login}, ce développeur est localisé dans le pays: ${data.location}. Sa biographie est: ${data.bio}`);
                    var bio = $(`<p>${data.bio}</p>`);
                    if(data.login === data.name) {
                        var username = $(`<h1>${data.name}</h1>`);
                    } else {
                        var username = $(`<h1>${data.name} / ${data.login}</h1>`);
                    }
                    if (data.location == null) {
                        var location = $(`<li>${data.location}</li>`);
                    }
                    var avatar = $(`<img src="${data.avatar_url}"></img>`);
                    $(`#userDisplay`).append(username, avatar, location, bio);
            })
            $.ajax({
                method: "GET",
                url: `https://api.github.com/users/${formField}/repos`,
            }).done(function(repos) {
                repos.forEach(element => {
                    console.log(element);
                    var repoName = $(`<h1>${element.name}</h1>`);
                    var langage = $(`<li>${element.language}</li>`);
                    var div = $(`<div id="${element.id}"></div>`);
                    $(div).append(repoName, langage);
                    $(`#userDisplay`).append(div);
                });
            })
        }

        affichageFixe();
        $("#submit").on('click', affichageDynamique)
    }
)
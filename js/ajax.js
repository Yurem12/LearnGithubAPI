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
                    var bio = $(`<p>Abonnés: ${data.followers} Abonnements: ${data.following}. ${data.bio}</p>`);
                    if(data.login === data.name) {
                        var username = $(`<h1>${data.name}</h1>`);
                    } else {
                        var username = $(`<h1>${data.name} / ${data.login}</h1>`);
                    }
                    var location = $(`<li>${data.location}</li>`);
                    var avatar = $(`<img src="${data.avatar_url}" class="avatar"></img>`);
                    $(`#me`).append(username, avatar, location, bio);
                
            })
            $.ajax({
                method: "GET",
                url: `https://api.github.com/users/Yurem12/repos`,
            }).done(function(repos) {
                repos.forEach(element => {
                    console.log(element);
                    var repoName = $(`<h1>${element.name}</h1>`);
                    var infos = $(`<li>${element.description}. Codé principalement en ${element.language}</li>`);
                    var div = $(`<div id="${element.id}" class="repos"></div>`);
                    $(div).append(repoName, infos);
                    $(`#me`).append(div);
                });
            })
        }

        function affichageDynamique() {
            $("#userDisplay").css("visibility", "visible");
            var formField = $("#username").val();
            console.log(formField);
            $.ajax({
                method: "GET",
                url: `https://api.github.com/users/${formField}`,
            })
            .done(function(data) {
                    console.log(`le nom d'utilisateur est: ${data.login}, ce développeur est localisé dans le pays: ${data.location}. Sa biographie est: ${data.bio}`);
                    var bio = $(`<p>Abonnés: ${data.followers} Abonnements: ${data.following}. ${data.bio}</p>`);
                    if(data.login === data.name) {
                        var username = $(`<h1>${data.name}</h1>`);
                    } else {
                        var username = $(`<h1>${data.name} / ${data.login}</h1>`);
                    }
                    if (data.location == null) {
                        var location = $(`<li>emplacement inconnu</li>`);
                    } else {
                        var location = $(`<li>${data.location}</li>`);
                    }
                    var avatar = $(`<img src="${data.avatar_url}" class="avatar"></img>`);
                    $(`#userDisplay`).append(username, avatar, location, bio);
            });
            $.ajax({
                method: "GET",
                url: `https://api.github.com/users/${formField}/repos`,
            }).done(function(repos) {
                repos.forEach(element => {
                    console.log(element);
                    var repoName = $(`<h1>${element.name}</h1>`);
                    if(element.description === null) {
                        var infos = $(`<li>Codé principalement en ${element.language}</li>`);
                    } else {
                        var infos = $(`<li>${element.description}. Codé principalement en ${element.language}</li>`);
                    }
                    var div = $(`<div id="${element.id}" class="repos"></div>`);
                    $(div).append(repoName, infos);
                    $(`#userDisplay`).append(div);
                });
            });
        }

        affichageFixe();
        $("#submit").on('click', affichageDynamique);
    }
);
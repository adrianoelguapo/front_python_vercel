$(function() {
    // Mostrar todos los usuarios por defecto
    $.ajax({
        url: "https://back-python-vercel.vercel.app/api/users",
        type: "GET",
        success: function(result){
            $(".content").empty();
            for(let eachCard of result){
                $(".content").append(`
                    <div class="card"> 
                        <p class="username">${eachCard.name}</p>
                        <p class="usersurname">${eachCard.apellido}</p>
                        <p class="userphone">${eachCard.tlf}</p> 
                    </div>
                `);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error:", status, error);
            $(".content").empty();
            $(".content").append("<p>Hubo un error al obtener los datos.</p>");
        },
    })

    // Mostrar todos los usuarios
    $("#showall").click(() => {
        $.ajax({
            url: "https://back-python-vercel.vercel.app/api/users",
            type: "GET",
            success: function(result){
                $(".content").empty();
                for(let eachCard of result){
                    $(".content").append(`
                        <div class="card"> 
                            <p class="userid">Usuario ${eachCard.name}</p> 
                            <p class="usernameandsurname">${eachCard.apellido}</p> 
                            <p class="userphone">${eachCard.tlf}</p> 
                        </div>
                    `);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", status, error);
                $(".content").empty();
                $(".content").append("<p>Hubo un error al obtener los datos.</p>");
            },
        })
    });

    // Buscar usuario por Nombre
    $("#searchuser").click(() => {
        let userName = $("#searchbar").val();
        let userFound;

        $.ajax({
            url: `https://back-python-vercel.vercel.app/api/users/${userName}`,
            type: "GET",
            success: function(result){
                userFound = result
                $(".content").empty();
                $(".content").append(`
                    <div class="card"> 
                        <p class="userid">Usuario ${userFound.name}</p> 
                        <p class="usernameandsurname">${userFound.apellido}</p> 
                        <p class="userphone">${userFound.tlf}</p> 
                    </div>
                `);
            },
            error: function (xhr, status, error) {
                console.error("Error:", status, error);
                $(".content").empty();
                $(".content").append("<p>Hubo un error al obtener los datos.</p>");
            },
        })
    });

    // Mostrar el modal
    $("#adduser").click(() => {
        $("#modal").removeClass("hidden");
    });

    // Cerrar el modal
    $("#closemodal").click(() => {
        $("#modal").addClass("hidden");
    });

    // Guardar un nuevo usuario
    $("#saveuser").click(() => {
        let name = $("#name").val();
        let surname = $("#surname").val();
        let phone = $("#phone").val();

        if (name && surname && phone) {
            $.ajax({
                url: "https://back-python-vercel.vercel.app/api/users",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify({ name: name, apellido: surname, tlf: phone }),
                success: function () {
                    alert("Usuario agregado exitosamente");
                    $("#modal").addClass("hidden");
                    $("#name").val("");
                    $("#surname").val("");
                    $("#phone").val("");
                    location.reload();
                },
                error: function (xhr, status, error) {
                    console.error("Error al agregar usuario:", status, error);
                    alert("Hubo un problema al agregar el usuario.");
                },
            });
        } else {
            alert("Por favor, completa todos los campos.");
        }
    });
})
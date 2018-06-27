


var cars = ["Honda","Porche","Acrua","Bmw","Ford","Jeep","Toyota","Volvo","lamborghini","RollsRoyce","Mazda","Landrover","buick","Benz","tesla"];
clickButtons();

$("#add-car").on("click", function (pass) {

    pass.preventDefault();

    var userInput = $("#input").val().trim();

    if(cars.indexOf(userInput) >= 0){
        userInput = "";
    }

    if(userInput != ""){
        cars.push(userInput);
    }

    clickButtons();
});

function makeMove(){
    var pos = $(this).attr("onOff");

    if(pos === "stop"){
        $(this).attr("src", $(this).attr("move"));
        $(this).attr("onOff", "go");
    }
    else{
        $(this).attr("src", $(this).attr("stopMove"));
        $(this).attr("onOff", "stop");
    }
};

function clickButtons() {

    $("#buttonsAct").empty();

    for (var i = 0; i < cars.length; i++) {
        var array = $("<button class='newCarB'>");
        array.attr("carPic", cars[i]);
        array.text(cars[i]);
        $("#buttonsAct").append(array);
    }
};

function showCars() {

    var cars = $(this).attr("carPic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cars + "&api_key=dc6zaTOxFJmzC&limit=10";

    $("#plcHolder").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        var carKind = response.data;


        for (var i = 0; i < carKind.length; i++) {

            var replace = $("<div class='col-md-3'>");
            var newpic = $("<img class='gif'>");
            var newP = $("<p>");
            newP.text("Rating: " + carKind[i].rating);
            replace.append(newP, newpic);

            newpic.attr("onOff", "stop");
            newpic.attr("src", carKind[i].images.fixed_width_still.url);
            newpic.attr("move", carKind[i].images.fixed_width.url);
            newpic.attr("stopMove", carKind[i].images.fixed_width_still.url);

            $("#plcHolder").append(replace);

        }
    });
};

$(document).on("click", ".newCarB", showCars);


$(document).on("click", ".gif", makeMove);










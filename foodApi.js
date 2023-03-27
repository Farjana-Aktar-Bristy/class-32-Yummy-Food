document.getElementById("searchFoodBtn").addEventListener("click", function () {
    var searchValue = document.getElementById("searchValue").value;
    if (searchValue === "") {
        document.getElementById("foodRow").innerHTML = "Input your food name first";
    } else {
        fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchValue)
            .then(foodResponse => foodResponse.json())
            .then(foodObject => {
                if (foodObject.meals) {
                    document.getElementById("foodRow").innerHTML = "";
                    document.getElementById("searchValue").value = "";
                    foodObject.meals.map(function (food) {
                        var foodCard = `<div class="card" onclick="showFoodDetails(${food.idMeal})" style="width: 18rem;cursor:pointer;">
                                    <img class="card-img-top" src="${food.strMealThumb}" alt="Card image cap">
                                        <div class="card-body">
                                            <h5 class="card-title">${food.strMeal}</h5>
                                            <p class="card-text">${food.strInstructions.slice(0, 100)}</p>
                                            <a href="${food.strYoutube}" target="_blank" class="btn btn-primary">Show video</a>
                                        </div>
                                </div>`;
                        var divElement = document.createElement("div");
                        divElement.className = "col mt-2";
                        divElement.innerHTML = foodCard;
                        document.getElementById("foodRow").appendChild(divElement);
                    });
                } else {
                    document.getElementById("foodRow").innerHTML = "No food-item found";
                }
            });
    }
});

function showFoodDetails(foodId) {
    document.getElementById("foodDetails").innerHTML = '';
    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + foodId)
        .then(foodResponse => foodResponse.json())
        .then(foodObject => {
            var food = foodObject.meals[0];
            var foodDetailsCard = `<div class="card" style="width:100%">
                                    <img class="card-img-top" src="${food.strMealThumb}" alt="Card image cap">
                                        <div class="card-body">
                                            <h5 class="card-title">${food.strMeal}</h5>
                                            <p class="card-text text-center"> <b>${food.strCategory} </b></p>
                                            <p class="card-text">${food.strInstructions}</p>
                                        </div>
                                        <div class="d-flex justify-content-center">
                                            <button type="button" class="btn btn-danger" data-dismiss="modal" style="width:30%">Close</button>
                                        </div>
                                </div>`;

            var divElement = document.createElement("div");
            divElement.className = "col mt-2";
            divElement.innerHTML = foodDetailsCard;
            document.getElementById("foodDetails").appendChild(divElement);

        });



    var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
        keyboard: false
    });
    myModal.show();
}
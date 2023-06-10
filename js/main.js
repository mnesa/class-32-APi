document.getElementById('error-message').style.display = 'none';

// // All meals
const searchFood = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  searchField.value = '';  //same group not show 2nd time

  //solve = if empty search
  if (searchText == '') {
    document.getElementById('error-message').style.display = 'block';
  } else {
    // searchField
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  // console.log(url);
  fetch(url)
  .then(res => res.json())
  .then(data => displaySearchResult(data.meals))
  }

  
}

const displaySearchResult = (meals) => {
  // console.log(meals);
  const searchResult = document.getElementById('search-result');
  searchResult.innerHTML = '';

  //solve : if product not here 
  if (meals == null || meals.length < 1) {
    document.getElementById('error-message').style.display = 'block';
  } else {
    meals.forEach(meal => {
      // console.log(meal);
      const div = document.createElement('div');
      div.classList.add('col');
      div.innerHTML = `
      <div onclick="loadMealDetail(${meal.idMeal})">
      <div class="card h-100">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
      </div>
    </div>
    </div>
      `
      searchResult.appendChild(div);
    })
  }
 
}


//particular meal discription
const loadMealDetail = (mealId) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = meal => {
  console.log(meal);
  const mealDetails = document.getElementById('meal-detail');
  mealDetails.textContent = '';
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
  <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${meal.strMeal}</h5>
    <p class="card-text">${meal.strInstructions}</p>
    <a href="strYoutube" target="_blank" class="btn btn-success">Go Youtube</a>
  </div>
  `
  mealDetails.appendChild(div);
}
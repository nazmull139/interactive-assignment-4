const inpButton = document.getElementById("search-btn");
const recipes = document.getElementById("recipes");

inpButton.addEventListener("click", () => {
  const inputVal = document.getElementById("search").value.trim();
  fetchMeals(inputVal);
});

async function fetchMeals(val = "") {
  const API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`;

  recipes.innerHTML = "";  
  loading.classList.remove("hidden");

  try {
    const res = await axios.get(API_URL);
    const data = res.data.meals;
    loading.classList.add("hidden");

    if (!data) {
      recipes.innerHTML = "<p>No data found</p>";
      return;
    }

    for(i=0; i<data.length; i++){
        const div = document.createElement("div");
        const div2 = document.createElement("div");
        const h2 = document.createElement("h2");
        const img = document.createElement("img");
        const p = document.createElement("p");
        const button = document.createElement("button");
      button.addEventListener("click", showCard.bind(null, data[i].idMeal));
        
  
        h2.textContent = data[i].strMeal;
        img.src = data[i].strMealThumb;
        p.textContent = data[i].strInstructions?.slice(0, 70) + "...";
        button.textContent = "View Details";
  
        img.classList.add("recipe-img");
        h2.classList.add("recipe-h");
        p.classList.add("recipe-p");
        button.classList.add("recipe-button");
        div2.classList.add("recipe-content");
        div.classList.add("recipe-div");
  
        div.appendChild(img);
        div2.appendChild(h2);
        div2.appendChild(p);
        div2.appendChild(button);
        div.appendChild(div2);
        recipes.appendChild(div);

    }


     

  } catch (error) {
    console.error(error);
  }
}

 
fetchMeals();



async function showCard(id){

  const API_URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;


    const res = await axios.get(API_URL);
    const data = res.data.meals;
   
    console.log(data)

  const card = document.getElementById("card");
    const div = document.createElement("div");
    const div2 = document.createElement("div");
   const h2 = document.createElement("h2");
    const img = document.createElement("img");
    const p = document.createElement("p");
    const button = document.createElement("button");


    h2.textContent = data[0].strMeal;
    img.src = data[0].strMealThumb;
    p.textContent = data[0].strInstructions;
    button.textContent = "Close";
    button.addEventListener("click", () => {
      card.innerHTML = "";
      card.classList.add("hide");
    });
    img.classList.add("recipe-img");
    h2.classList.add("recipe-h");
    p.classList.add("recipe-p");
    button.classList.add("recipe-button");
    div.classList.add("card-container");
    div2.classList.add("card-details");
    card.classList.remove("hide");


    div.appendChild(img);
    div.appendChild(h2);
    div2.appendChild(p);
    
    div.appendChild(div2);
    div.appendChild(button);
    card.appendChild(div);

}
 

const scrollTopBtn = document.getElementById("scrollTopBtn");

 
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.remove("hidden");
  } else {
    scrollTopBtn.classList.add("hidden");
  }
});
 
scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

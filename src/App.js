import React, {useEffect, useState} from "react";
import Recipe from "./Recipe";
import './App.css';

const App = () =>{
  //Tarifleri almak için EDAMAM denilen bir siteden Recide API kullanıyoruz. Key ve Id variableları oluşturuldu.
  const APP_ID = "9be3d81c";
  const APP_KEY = "60ce4ebdaa8009a500b7d115ffa26bd6";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("chicken");

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async() =>{
    //Api'ı fetch ediyoruz
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    //Anladığım kadarıyla, texti json yapısına dönüştürüyoruz
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input 
          className="search-bar" 
          type="text"
          value={search}
          onChange={updateSearch}
          />
        <button 
          className="search-button" 
          type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories}
          image={recipe.recipe.image} 
          ingredients={recipe.recipe.ingredients}
        />
      ))
      }
      </div>
    </div>
  );
};

export default App;

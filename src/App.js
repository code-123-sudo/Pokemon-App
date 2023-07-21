import React,{ useEffect, useState } from "react";
import PokemonThumbnail from "./Components/PokemonThumbnail";

function App() {
  const [allPokemons,setAllPokemons] = useState([]);
  const [filterValue,setFilterValue] = useState('all');
  const [filterMin,setFilterMin] = useState(45);
  const [filterMax,setFilterMax] = useState(60);
  const [allPokemonsFiltered,setAllPokemonsFiltered] = useState([]);
  const [loadPoke,setLoadPoke] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
  const getAllPokemons = async () =>{
    const res = await fetch(loadPoke)
    const data = await res.json()
    setLoadPoke(data.next)
   
    function createPokemonObject(result){
      result.forEach(async (pokemon) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await res.json();
        setAllPokemons(currentList => [...currentList,data])
      });
    }
    createPokemonObject(data.results)
    await console.log(allPokemons);
  }

  const applyFilter = (value) => {
    setFilterValue(value);
    filterValues(filterMin,filterMax,filterValue);
  }

  const handleMin = (e) => {
    setFilterMin(e.target.value);
    filterValues(filterMin,filterMax,filterValue);
  }

  const handleMax = (e) => {
    setFilterMax(e.target.value);
    filterValues(filterMin,filterMax,filterValue);
  }

  const filterValues = async (value1,value2,value) => {
    let temp = allPokemons.filter((pokemon) => {
      if ( value === "hp") {
        if ( pokemon.stats[0].base_stat >= value1  && pokemon.stats[0].base_stat <= value2){
          return true;
        }
      else {
        return false;
      }
    }

    if ( value === "attack") {
      if ( pokemon.stats[1].base_stat >= value1  && pokemon.stats[1].base_stat <= value2){
        return true;
      }
    else {
      return false;
    }
  }

  if ( value === "defense") {
    if ( pokemon.stats[2].base_stat >= value1  && pokemon.stats[2].base_stat <= value2){
      return true;
    }
  else {
    return false;
  }
}

if ( value === "special-attack") {
  if ( pokemon.stats[3].base_stat >= value1  && pokemon.stats[3].base_stat <= value2){
    return true;
  }
else {
  return false;
}
}

if ( value === "special-defense") {
  if ( pokemon.stats[4].base_stat >= value1  && pokemon.stats[4].base_stat <= value2){
    return true;
  }
else {
  return false;
}
}

if ( value === "speed") {
  if ( pokemon.stats[5].base_stat >= value1  && pokemon.stats[5].base_stat <= value2){
    return true;
  }
else {
  return false;
}
}
  
  
  
  })
    let tempList = [...temp];

    await setAllPokemonsFiltered(tempList);
  }


  useEffect(()=>{
    getAllPokemons()
  },[])

  return (
    <div>
    <div className="filterTypeHeading"> Filter Type Heading: {filterValue}</div>
    <div className="app-container">
      <div id="myBtnContainer">
      </div>
      <div class="parentDiv">
        <div class="dropdown">
          <button class="btn">Filter Type</button>
          <div class="dropdown-content">
            <button className="btn active" onClick={()=>applyFilter('hp')}>hp</button>
            <button className="btn" onClick={()=>applyFilter('attack')}>attack</button>
            <button className="btn" onClick={()=>applyFilter('defense')}> defense</button>
            <button className="btn" onClick={()=>applyFilter('special-attack')}>special attack</button>
            <button className="btn" onClick={()=>applyFilter('special-defense')}>special defense</button>
            <button className="btn" onClick={()=>applyFilter('speed')}>speed</button>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <p>From :</p>
          <input type="number"  value={filterMin} onChange={handleMin}></input>
          <p>To :</p>
          <input type="number"  value={filterMax} onChange={handleMax}></input>
        </div>
      </div>
      <h1>Pokemon Kingdom</h1>
    
     <div className="pokemon-container">
       <div className="all-container">
          {allPokemonsFiltered.map((pokemon,index)=> 
                 <PokemonThumbnail
                  id = {pokemon.id}
                  name = {pokemon.name}
                  image = {pokemon.sprites.other.dream_world.front_default}
                  type={pokemon.types[0].type.name}
                  key={index}
                  height = {pokemon.height}
                  weight = {pokemon.weight}
                  stat1 = {pokemon.stats[0].stat.name}
                  stat2 = {pokemon.stats[1].stat.name}
                  stat3 = {pokemon.stats[2].stat.name}
                  stat4 = {pokemon.stats[3].stat.name}
                  stat5 = {pokemon.stats[4].stat.name}
                  stat6 = {pokemon.stats[5].stat.name}
                  bs1 = {pokemon.stats[0].base_stat}
                  bs2 = {pokemon.stats[1].base_stat}
                  bs3 = {pokemon.stats[2].base_stat}
                  bs4 = {pokemon.stats[3].base_stat}
                  bs5 = {pokemon.stats[4].base_stat}
                  bs6 = {pokemon.stats[5].base_stat}
                  
                 />
            )}
       </div>
       <button className="load-more" onClick={()=>getAllPokemons()}>More Pokemons</button>
     </div>
     </div>
    </div>
  );
}

export default App;

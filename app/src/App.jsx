
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchResult from './components/SearchResult/SearchResult';
export const BASE_URL = "http://localhost:9000";


const App = () => {

  const [data , setData ] = useState(null);
  const [loading , setLoading] = useState(false);
  const [filteredData , setFilteredData ] = useState(null);
  const [error , setError ] = useState(null);

  const [selectedBtn , setSelectedBtn ] = useState("all"); 

  useEffect(() => {
  
    const fetchFoodData = async ()=>{
      setLoading(true);
      try {
        
        const response = await fetch(BASE_URL);
        const json = await response.json(response);
        setData(json);
        setFilteredData(json);
        setLoading(false);

      } 
      catch (error) {
        setError("Unable to fetch data");
        
      }
    }
    fetchFoodData(); 
  }, [])

  const searchFood = (e)=>{
    const searchValue = e.target.value;
    console.log(searchValue); 

    if(searchValue === ""){
      setFilteredData(null);
    }

    const filter = data?.filter((food)=> food.name.toLowerCase().includes(searchValue.toLowerCase()))
    setFilteredData(filter);
  }




  const filterFood = (type)=>{
    if(type === "all"){
      setFilteredData(data);
      setSelectedBtn("all");
      return
     
    }
    const filter = data?.filter((food)=> food.type.toLowerCase().includes(type.toLowerCase()))
    setFilteredData(filter);
    setSelectedBtn(type);
  }

  const FilterBtn = [
    {
      name : "all",
      type: "all", 
    },
    
    {
      name : "Breakfast",
      type: "breakfast", 
    },
    {
      name : "Lunch",
      type: "lunch", 
    },
    {
      name : "Dinner",
      type: "dinner", 
    },
  ]

      if(error) return <div>{error}</div>; 
      if(loading) return <div>loading...... </div>
  return (
  <>
  <Container>
    <TopContainer>
      <div className="logo">
        <img src="/logo.svg" alt="logo" />
      </div>
      <div className='search'>
        <input type="text" onChange={searchFood} placeholder='Search Food' />
      </div>
    </TopContainer>
    <FilterContainer>

      {FilterBtn.map((value)=>(
      <Button isSelected={selectedBtn === value.type} key={value.name} onClick={()=> { filterFood(value.type)}}>{value.name}</Button>

      ))}

    </FilterContainer>
  </Container> 
    <SearchResult data={filteredData}/>
    </>

  )
};


export const Container = styled.div`
max-width: 1200px;
margin: 0 auto;


`;

const TopContainer = styled.section`
height: 140px;
display: flex;
justify-content: space-between;
padding: 16px;
align-items: center;

.search {
  input {

    background-color: transparent;
    border: 1px solid red ;
    /* outline: none; */
    border-radius: 5px;
    height: 40px;
    font-size: 16px; 
    padding: 0 10px;
    color: white;
    &::placeholder {
      color: white;
    }

  }
}
@media (0 < width < 600px ) {
  display: flex;
  flex-direction: column;
  height: 120px;
  
}
`;
const FilterContainer = styled.section`
display: flex; 
justify-content: center;
gap: 12px;  
padding-bottom: 40px;
`;

export const Button = styled.button`
background-color: ${({isSelected})=> isSelected ? "#f22f2f" : "#ff4343"};
outline: 1px solid ${({isSelected})=> isSelected ? "white" : "#f22f2f"};
border-radius: 5px;
padding: 6px 12px;
border: none;
cursor: pointer;
color: white;

&:hover{
  background-color: #882222;
}
`;



export default App;

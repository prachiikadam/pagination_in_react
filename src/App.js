import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products,setProducts]=useState([])
  const [page,setPage]=useState(1)
  const [totalPages,setTotalPages]=useState(0)
  const fetchProducts=async()=>{
    const res= await fetch(`https://dummyjson.com/products?limit=10&&skip=${page*10-10}`)
    
    const data=await res.json()
    if(data&&data.products){
      setProducts(data.products)
      setTotalPages(data.total/10)
    }
    console.log(data)
  }
  useEffect(()=>{
    fetchProducts()
  },[page])
  const selectPageHandler=(p)=>{
    if(p>=1&&p<=(totalPages)){
      console.log('page',p)
      setPage(p)
    }
    
  }
  return (
    <div>
      {
        products.length > 0 && 
        <div className="products">
          {
            products.map((prod)=>{
              return(
                <span className='products__single' key={prod.id}>
                  <img src={prod.thumbnail} alt={prod.title}/>
                  <span>{prod.title}</span>
                </span>
              )
            })
          }
        </div>
      }
      {
        products.length > 0 && <div className='pagination'>
          <span
          className={page>1?'':'pagination__disable'}
           onClick={()=>selectPageHandler(page-1)}>⬅️ </span>
          {
            [...Array(products.length)].map((_,i)=>
            <span key={i} onClick={()=>selectPageHandler(i+1)}> {i+1}</span>)
          }
          <span 
          className={page<(products.length)?'':'pagination__disable'}
          onClick={()=>selectPageHandler(page+1)}> ➡️ </span>
          </div>  
      }
    </div>
    
   
   
  );
}

export default App;

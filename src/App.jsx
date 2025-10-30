import { useEffect, useState } from "react";
import RecipeReviewCard from "./components/Card";
import loadingIcon from "./assets/loading (2).png";

const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const limit = 12;

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://dummyjson.com/recipes?skip=${page * limit}&limit=${limit}`)
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.recipes);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, limit]);

  return (
    <>
      <h1>Recipes</h1>
      <div className="card-holder container">
        {isLoading ? (
          <div className="loading">
            <img src={loadingIcon} alt="" />
            <p>Loading...</p>
          </div>
        ) : (
          products.map((product) => {
            console.log(product.name);
            return <RecipeReviewCard key={product.id} {...product} />;
          })
        )}
      </div>
      <div className="buttons">
        <button disabled={page === 0} onClick={() => page && setPage(page - 1)}>
          Prev
        </button>
        <button
          disabled={page >= Math.ceil(100 / limit) - 1}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
// import mealsImage1 from "../../assets/butterChicken.jpg";
// import mealsImage2 from "../../assets/paneerTikka.jpg";
// import mealsImage3 from "../../assets/HyderabadiBiryani.jpg";
// import mealsImage4 from "../../assets/dosa.jpg";
// import mealsImage5 from "../../assets/misal.jpg";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading,setIsLoading] = useState('true')
  const [httpError,setHttpError] = useState(null)

  const fetchHandler = async () => {
    setIsLoading(true)
    try{
    const response = await fetch(
      "https://food-http-277b8-default-rtdb.firebaseio.com/meals.json"
      );
  if(!response.ok){
      throw new Error("something went wrong")
    }
    const responseData = await response.json();
    const loadedData = [];
    for (const key in responseData) {
      loadedData.push({
        id: key,
        name: responseData[key].name,
        price: responseData[key].price,
        description: responseData[key].description,
      });
    }
    setIsLoading(false)
    setMeals(loadedData);
    setHttpError(null)
  }
  catch(err){
    setHttpError(err.message)
  }
  setIsLoading(false)

};

  useEffect(() => {
    fetchHandler()
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));


  return (
    <section className={classes.meals}>
      <Card>
        {httpError && <p>{httpError}</p>}
        {isLoading && <p> Page is loading...</p>}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

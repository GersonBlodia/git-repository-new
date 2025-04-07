"use client"

import { ContactUsForm } from "../formulario/ContactUsForm"
import { RestaurantShowcase } from "../slider/Really"
import { CommentSlider } from "../slider/SliderCommentary"
import { CoffeeMenu } from "./CoffeeMenu"
import { FoodMenu } from "./MainProduct"

export const MainComponent = () => {
  return (
    <div>
         <RestaurantShowcase/>

{/*section new */}

<CoffeeMenu/>

{/*comidas */}


<FoodMenu/>

<CommentSlider/>

<ContactUsForm/>
    </div>
  )
}

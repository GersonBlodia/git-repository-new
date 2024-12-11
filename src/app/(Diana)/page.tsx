 
 
import { ContactUsForm } from '@/components/formulario/ContactUsForm'
import { CoffeeMenu } from '@/components/main/CoffeeMenu'
import { FoodMenu } from '@/components/main/MainProduct'
import { RestaurantShowcase } from '@/components/slider/Really'
import { CommentSlider } from '@/components/slider/SliderCommentary'
import React from 'react'

const DianaHomePage = () => {
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

export default DianaHomePage

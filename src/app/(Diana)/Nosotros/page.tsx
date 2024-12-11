import { StatsSection } from "@/components/about/CountNumber"
 
import Image from "next/image"
import { BsArrowRight } from "react-icons/bs"

 
const PageNosotros = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
  className="py-16"
  style={{
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(/slider/Restaurante-wallpaper.jpg)', // Cambia esta ruta a tu imagen de fondo
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }}
>
  <div className="container mx-auto px-4">
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Sobre Nosotros
      </h1>
      <p className="text-white mb-8">
        Ofreciendo Comida de Calidad 
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        {/* Team Images */}
        <div className="relative rounded-lg overflow-hidden">
          <Image 
           width={350}
           height={350} 
                layout='responsive'
            src="/Restaurant/restaurant.jpg"
            alt="Team member" 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="relative rounded-lg overflow-hidden">
          <Image 
           width={350}
              height={350} 
            src="/Restaurant/restaurant02.jpg"
            alt="Team member"
            layout='responsive'
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="relative rounded-lg overflow-hidden">
          <Image 
           width={350}
           height={350} 
                layout='responsive'
            src="/Restaurant/restaurant03.jpg"
            alt="Team member"
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="relative rounded-lg overflow-hidden">
          <Image 
            width={350}
            height={350} 
             src="/Restaurant/restaurant04.jpg"
            alt="Team member"
                 layout='responsive'
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Mission Section */}
      <section className="py-16">
  <div className="container mx-auto px-4">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Imagen destacada */}
      <div className="relative rounded-lg overflow-hidden">
        <Image
          width={350}
          height={350}
          src="/Restaurant/restaurant02.jpg" // Cambia la ruta de la imagen a una relacionada con comida o ambiente del restaurante
          alt="Nuestro Restaurante"
          className="w-full h-full object-cover"
          layout="responsive"
        />
      </div>
      {/* Contenido informativo */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Sabores que Inspiran
        </h2>
        <p className="text-gray-600 mb-6">
          En nuestro restaurante, celebramos la tradición y la innovación culinaria. Cada plato es una obra maestra diseñada para deleitar tus sentidos y crear momentos inolvidables.
        </p>
        <div className="flex items-center text-amber-600 hover:text-amber-700 transition-colors cursor-pointer">
          <span className="mr-2">Descubre nuestra historia</span>
          <BsArrowRight />
        </div>
      </div>
    </div>
  </div>
</section>


      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Por qué elegirnos
          </h2>


          
          {/*acá */}
          

        </div>
      </section>

      {/* Stats Section */}
       <StatsSection/>
    </div>
  )
}

export default PageNosotros

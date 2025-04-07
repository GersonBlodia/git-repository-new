 
import Image from 'next/image';

export const CoffeeMenu: React.FC = () => {
  return (
    <div className="bg-[#131212] text-white py-20">
      <div className="max-w-[1200px] mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Descubre Nuestro Menú</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Descripción y opciones */}
          <div className="order-2 md:order-1">
            <p className="text-lg mb-12">
              En el restaurante Diana, ubicado en Pisco, Perú, ofrecemos una experiencia única con los mejores cafés y bebidas. 
              Cada taza está preparada con amor, utilizando granos seleccionados para que disfrutes del mejor sabor.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <Image 
                  src="/coffe/coffe-bar-en-casa-scaled.webp" 
                  alt="Cappuccino" 
                  width={500} 
                  height={160} 
                  className="w-full h-40 object-cover rounded-md"
                  quality={90}
                  priority
                />
                <h3 className="text-2xl font-bold mt-2">Cappuccino</h3>
              </div>
              <div>
                <Image 
                  src="/coffe/coffe2.jpg" 
                  alt="Latte" 
                  width={300} 
                  height={160} 
                  className="w-full h-40 object-cover rounded-md"
                  quality={90}
                />
                <h3 className="text-2xl font-bold mt-2">Latte</h3>
              </div>
              <div>
                <Image 
                  src="/coffe/coffe3.jpg" 
                  alt="Iced Coffee" 
                  width={300} 
                  height={160} 
                  className="w-full h-40 object-cover rounded-md"
                  quality={90}
                />
                <h3 className="text-2xl font-bold mt-2">Café Helado</h3>
              </div>
              <div>
                <Image 
                  src="/coffe/coffe4.jpg" 
                  alt="Mocha" 
                  width={300} 
                  height={160} 
                  className="w-full h-40 object-cover rounded-md"
                  quality={90}
                />
                <h3 className="text-2xl font-bold mt-2">Mocha</h3>
              </div>
            </div>
          </div>
          {/* Imagen principal */}
          <div className="order-1 md:order-2">
            <Image 
              src="/coffe/cafe-1024x858.png" 
              alt="Bebidas de Café" 
              width={600} 
              height={400} 
              className="w-full h-full object-cover rounded-md"
              quality={90}
              priority
            />
          </div>
        </div>
        {/* Botón */}
        <div className="mt-12 text-center">
          <a
            href="#"
            className="border border-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md font-medium transition-all"
          >
            Ver el Menú
          </a>
        </div>
      </div>
    </div>
  );
};

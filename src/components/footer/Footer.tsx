import React from 'react';
import { 
  FaFacebookF, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube,
  FaPhone,
  FaEnvelope
} from "react-icons/fa";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg hover:text-orange-500 transition-colors duration-300">
            Restaurante Diana
          </h3>
          <p className="text-sm">
            Disfruta de una experiencia gastronómica única con los mejores platillos tradicionales y un toque moderno.
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 hover:text-orange-500 transition-colors duration-300 cursor-pointer">
              <FaPhone className="text-base" />
              <span className="text-sm">+52 987 654 3210</span>
            </div>
            <div className="flex items-center gap-2 hover:text-orange-500 transition-colors duration-300 cursor-pointer">
              <FaEnvelope className="text-base" />
              <span className="text-sm">contacto@restaurantediana.com</span>
            </div>
          </div>
        </div>

        {/* Information Links */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg">Información</h3>
          <ul className="space-y-2">
            {['Sobre Nosotros', 'Menú', 'Reservaciones', 'Política de Privacidad'].map((item) => (
              <li key={item}>
                <a 
                  href="#" 
                  className="text-sm hover:text-orange-500 transition-colors duration-300 block transform hover:translate-x-2 transition-transform duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Service */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg">Atención al Cliente</h3>
          <ul className="space-y-2">
            {['Mi Cuenta', 'Reservar Mesa', 'Eventos Especiales', 'Ayuda'].map((item) => (
              <li key={item}>
                <a 
                  href="#" 
                  className="text-sm hover:text-orange-500 transition-colors duration-300 block transform hover:translate-x-2 transition-transform duration-300"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-white font-bold text-lg">Newsletter</h3>
          <p className="text-sm">Suscríbete para recibir ofertas exclusivas y las últimas noticias de nuestro restaurante.</p>
          <div className="flex gap-2 flex-col ">
            <input
              type="email"
              placeholder="Tu email"
              className="bg-gray-600 rounded px-3 py-2 text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-orange-200 transition-all duration-300"
            />
            <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors duration-300">
              Enviar
            </button>
          </div>
        </div>
      </div>

      {/* Social Media & Copyright */}
      <div className="mt-12 pt-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-4">
            {[
              { Icon: FaFacebookF, href: '#' },
              { Icon: FaInstagram, href: '#' },
              { Icon: FaTwitter, href: '#' },
              { Icon: FaYoutube, href: '#' }
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="hover:text-orange-500  transform hover:scale-110 transition-transform duration-300"
              >
                <social.Icon size={20} />
              </a>
            ))}
          </div>
          <p className="text-sm">
            © {currentYear} Restaurante Diana. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

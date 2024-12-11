import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MenuItem } from "@/data/food";

 

interface ModalProps {
  product: MenuItem;
  closeModal: () => void;
  modalIsOpen: boolean;
}

export const ModalMneu: React.FC<ModalProps> = ({
  product,
  closeModal,
  modalIsOpen,
}) => {
  return (
    <div className="p-6">
      <AnimatePresence>
        {modalIsOpen && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            className="relative w-full max-w-lg p-0 bg-transparent"
          >
            {/* Framer Motion para animar el modal */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative"
            >
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={closeModal}
              >
                ✖
              </button>
              <h2 className="text-xl font-bold mb-4">{product.title}</h2>

              {/* Mostrar los detalles del producto */}
              <Image
              width={350}
              height={350}
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-sm text-gray-600 mb-4">{product.description}</p>
              <p className="text-red-500 font-semibold text-lg">
                {new Intl.NumberFormat("es-PE", {
                  style: "currency",
                  currency: "PEN",
                }).format(+product.price)}
              </p>
              <p className="text-sm text-gray-600 mt-4">
                Ingredientes: {product.ingredients.join(", ")}
              </p>

              <div className="flex justify-end mt-6">
                <button
                  onClick={closeModal}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

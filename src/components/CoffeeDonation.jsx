import { useState } from "react";
import QRPayment from "../assets/qr.png";

function CoffeeDonation() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="text-center ">
            {/* Botón para abrir el modal */}
            <button
                onClick={handleOpenModal}
                className="px-4 py-2 bg-yellow-400 text-green-800 font-semibold rounded-lg shadow-md hover:bg-yellow-500 transition-all flex items-center"
            >
                ☕ Regálame un café
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
                        <h2 className="text-2xl font-bold mb-4 text-gray-800">
                            ❤️ ¡Gracias por tu apoyo!
                        </h2>
                        <p className="text-gray-600 mb-4">
                            Aquí está mi información bancaria para transferencias:
                        </p>
                        <div className="bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
                            <p><strong>Banco:</strong> Banco Pichincha</p>
                            <p><strong>Cuenta:</strong> 2207173132</p>
                            <p><strong>Nombre:</strong> Robert Israel Mendoza Correa</p>
                            <p><strong>País:</strong> Ecuador (Ec)</p>
                        </div>
                        <p className="text-gray-600 mt-2 mb-2">
                            o si tienes la app DeUna 
                        </p>
                        <div className="flex justify-center items-center bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
                            <img className="w-24" src={QRPayment} alt="DeUna Qr para pago"/>
                        </div>
                        <button
                            onClick={handleCloseModal}
                            className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CoffeeDonation;

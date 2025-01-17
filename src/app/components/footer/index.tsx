"use client";

export default function Footer() {
  return (
    <footer className="bg-black text-white mx-auto w-full py-7">
      <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row items-center sm:justify-between sm:justify-center gap-8 px-7 lg:px-0">
        <div className="flex flex-col">
          <h3 className="font-bold text-[16px] leading-[19.2px] font-inter mb-2 w-[230px] sm:w-full">Serviços</h3>
          <ul className="space-y-3 text-left">
            <li className="font-normal text-[16px] leading-[19.2px] font-inter">Conta corrente</li>
            <li className="font-normal text-[16px] leading-[19.2px] font-inter">Conta PJ</li>
            <li className="font-normal text-[16px] leading-[19.2px] font-inter">Cartão de crédito</li>
          </ul>
        </div>

        <div className="flex flex-col">
          <h3 className="font-bold text-[16px] leading-[19.2px] font-inter mb-2 w-[230px] sm:w-full">Contato</h3>
          <ul className="space-y-3 text-left">
            <li className="font-normal text-[16px] leading-[19.2px] font-inter">0800 004 250 08</li>
            <li className="font-normal text-[16px] leading-[19.2px] font-inter">meajuda@bytebank.com.br</li>
            <li className="font-normal text-[16px] leading-[19.2px] font-inter">ouvidoria@bytebank.com.br</li>
          </ul>
        </div>

        <div className="flex flex-col items-start gap-2">
          <p className="font-bold text-[16px] leading-[19.2px] font-inter w-[230px] sm:w-full">
            Desenvolvido por Alura
          </p>
          <img src="/logo-bytebank.svg" alt="Bytebank" className="mb-3 mt-3" />
          <div className="flex space-x-4 items-center">
            <a href="#">
              <img src="/logo-insta.svg" alt="Instagram" />
            </a>
            <a href="#">
              <img src="/logo-whatsapp.svg" alt="WhatsApp" />
            </a>
            <a href="#">
              <img src="/logo-youtube.svg" alt="YouTube" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

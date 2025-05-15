import Link from 'next/link';

export default function HomeHero() {
  return (
    <div className="relative flex flex-col items-center justify-center pb-10 pt-10 sm:flex-row min-h-screen">
      <div className="absolute inset-0 bg-no-repeat bg-cover bg-[url('/home/bg-hero.png')] opacity-10" />
      <div className="max-w-[1400px] text-white flex gap-5 flex-col relative z-10 flex w-full items-center justify-center sm:h-full">
        <p className="max-w-[900px] font-bold text-6xl text-center bg-clip-text text-transparent bg-gradient-to-r from-[#69aa30] to-[#e17d28]">Pesquisando e Protegendo a Zona Costeira Brasileira</p>
        <h3 className="w-1/2 text-center font-normal">Pesquisas em geologia costeira e conservação marinha para um litoral realmente sustentável.</h3>
        
        <div className="flex flex-row font-bold gap-10 w-full justify-center items-center">
          {/** Card Dados */}
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="w-[180px] border-4 rounded-xl cursor-pointer bg-transparent backdrop-blur-sm backdrop-brightness-75 border-white gap-2 flex flex-col justify-center items-center p-5 transition-transform duration-300 hover:scale-105">
              <img src="/home/data.png" className="max-w-[100px]" />
              <p className="font-bold text-xl">Dados</p>
            </div>
          </div>

          {/** Card Mapas */}
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="w-[180px] border-4 rounded-xl cursor-pointer backdrop-blur-md backdrop-brightness-75 bg-transparent border-white gap-2 flex flex-col justify-center items-center p-5 transition-transform duration-300 hover:scale-105">
              <img src="/home/map.png" className="max-w-[100px]" />
              <p className="font-bold text-xl">Mapas</p>
            </div>
          </div>

          {/** Card Documentos */}
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="w-[180px] border-4 rounded-xl cursor-pointer bg-transparent backdrop-blur-md backdrop-brightness-75 border-white gap-2 flex flex-col justify-center items-center p-5 transition-transform duration-300 hover:scale-105">
              <img src="/home/docs.png" className="max-w-[100px]" />
              <p className="font-bold text-xl">Documentos</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-2 w-1/2">
          <div className="w-1/3 h-[2px] bg-gray-300 my-4" />
          <p className="font-bold text-2xl">ou</p>
          <div className="w-1/3 h-[2px] bg-gray-300 my-4" />
        </div>

        {/** Botão Vuscan */}
        <Link
          href="/map"
          className="cursor-pointer flex justify-center items-center px-5 bg-transparent backdrop-blur-md backdrop-brightness-75 text-white font-bold rounded-xl border-4 border-white transition-transform duration-300 hover:scale-105"
        >
          <img src="/logo-vuscan-white.png" className="max-w-[100px] -ml-5" />
          <p className="text-xl text-white">Acesse o Vuscan</p>
        </Link>
      </div>
    </div>
  );
}

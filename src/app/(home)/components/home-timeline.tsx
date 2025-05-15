import Image from 'next/image';

const HomeAbout = () => {
  return (
    <section className="bg-black py-16">
      <div className="max-w-[1400px] container mx-auto px-4">
        <div className="text-black py-8">
          <div className="container mx-auto flex flex-col items-start md:flex-row my-12 md:my-24">
            <div className="flex flex-col w-full sticky md:top-36 lg:w-1/3 mt-2 md:mt-12 px-8">
              <p className="ml-2 text-white font-bold uppercase tracking-loose">Linha do Tempo</p>
              <p className="font-bold text-3xl md:text-4xl text-white leading-normal md:leading-relaxed mb-2">
                História do LEC - UFBA
              </p>
              <p className="text-sm md:text-base text-gray-50 mb-4">
                Conheça os principais marcos do Laboratório de Estudos Costeiros, referência em pesquisas sobre a zona costeira brasileira.
              </p>
              <a
                href="#"
                className="bg-transparent mr-auto hover:bg-yellow-300 text-yellow-300 hover:text-white rounded shadow hover:shadow-lg py-2 px-4 border border-yellow-300 hover:border-transparent"
              >
                Saiba Mais
              </a>
            </div>
            <div className="ml-0 md:ml-12 lg:w-2/3 sticky">
              <div className="container mx-auto w-full h-full">
                <div className="relative wrap overflow-hidden p-10 h-full">
                  <div
                    className="border-2-2 border-yellow-555 absolute h-full border"
                    style={{ right: '50%', border: '2px solid #FFC100', borderRadius: '1%' }}
                  ></div>
                  <div
                    className="border-2-2 border-yellow-555 absolute h-full border"
                    style={{ left: '50%', border: '2px solid #FFC100', borderRadius: '1%' }}
                  ></div>

                  {/* Evento 1 */}
                  <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                    <div className="order-1 w-5/12"></div>
                    <div className="order-1 w-5/12 px-1 py-4 text-right">
                      <p className="mb-3 text-base text-yellow-300">2000</p>
                      <h4 className="mb-3 text-white font-bold text-lg md:text-2xl">Fundação do LEC</h4>
                      <p className="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
                        Início das atividades do Laboratório de Estudos Costeiros no Instituto de Geociências da UFBA, sob coordenação do Prof. José Maria Landim Dominguez.
                      </p>
                    </div>
                  </div>

                  {/* Evento 2 */}
                  <div className="mb-8 flex justify-between items-center w-full right-timeline">
                    <div className="order-1 w-5/12"></div>
                    <div className="order-1 w-5/12 px-1 py-4 text-left">
                      <p className="mb-3 text-base text-yellow-300">2009</p>
                      <h4 className="mb-3 text-white font-bold text-lg md:text-2xl">Publicação do Atlas</h4>
                      <p className="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
                        Contribuição significativa para o "Atlas de Erosão e Progradação do Litoral Brasileiro", com capítulos sobre Bahia, Sergipe e Paraíba.
                      </p>
                    </div>
                  </div>

                  {/* Evento 3 */}
                  <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                    <div className="order-1 w-5/12"></div>
                    <div className="order-1 w-5/12 px-1 py-4 text-right">
                      <p className="mb-3 text-base text-yellow-300">2015</p>
                      <h4 className="mb-3 text-white font-bold text-lg md:text-2xl">Parceria com INCT-AmbTropic</h4>
                      <p className="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
                        Integração ao Instituto Nacional de Ciência e Tecnologia para Ambientes Marinhos Tropicais, ampliando pesquisas sobre mudanças climáticas e ambientes costeiros.
                      </p>
                    </div>
                  </div>

                  {/* Evento 4 */}
                  <div className="mb-8 flex justify-between items-center w-full right-timeline">
                    <div className="order-1 w-5/12"></div>
                    <div className="order-1 w-5/12 px-1 py-4 text-left">
                      <p className="mb-3 text-base text-yellow-300">2023</p>
                      <h4 className="mb-3 font-bold text-lg md:text-2xl text-white">Pesquisas Recentes</h4>
                      <p className="text-sm md:text-base leading-snug text-gray-50 text-opacity-100">
                        Estudos sobre a vulnerabilidade do delta do rio Jequitinhonha às mudanças climáticas e sedimentação recente da clinoforma deltáica do rio São Francisco.
                      </p>
                    </div>
                  </div>
                </div>
                <img
                  className="mx-auto -mt-36 md:-mt-36"
                  src="https://user-images.githubusercontent.com/54521023/116968861-ef21a000-acd2-11eb-95ac-a34b5b490265.png"
                  alt="Linha do Tempo"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;

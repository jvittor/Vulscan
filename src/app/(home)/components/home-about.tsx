import Image from 'next/image'

const HomeAbout = () => {
    return (
        <section className="bg-white py-16">
            <div className="max-w-[1400px] container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="md:w-[800px]">
                        <h2 className="text-5xl font-bold mb-4">About Us</h2>
                        <p className="text-2xl text-black mb-4">
                            O Laboratório de Estudos Costeiros (LEC), vinculado ao Instituto de Geociências da Universidade Federal da Bahia (UFBA), é coordenado pelo professor José Maria Landim Dominguez, doutor em Geologia e Geofísica Marinha pela Universidade de Miami. Desde 2000, o LEC tem se dedicado ao estudo da dinâmica costeira, com foco na origem e evolução das zonas costeiras e plataformas continentais, variações do nível do mar, sedimentação marinha e erosão costeira.
                        </p>
                    </div>
                    <div className="md:w-1/2">
                        <div className="flex items-end relative h-[700px] w-[700px]">
                            <Image
                                src="/home/logo-lec.png"
                                alt="About us image"
                                fill
                                className="object-cover rounded-full"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeAbout;
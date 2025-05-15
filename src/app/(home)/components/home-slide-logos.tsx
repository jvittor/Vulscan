interface LogoData {
  id: string;
  src: string;
  height: string;
}

const logoIcons: LogoData[] = [
  {
    id: "logo-1",
    src: "/home/ufba.png",
    height: "100px",
  },
  {
    id: "logo-2",
    src: "/home/ufpe.png",
    height: "100px",
  },
  {
    id: "logo-3",
    src: "/home/ufrn.png",
    height: "200px",
  },
  {
    id: "logo-4",
    src: "/home/cnpq.png",
    height: "100px",
  },
  {
    id: "logo-5",
    src: "/home/rd.png",
    height: "100px",
  },
  {
    id: "logo-6",
    src: "/home/fapesb.png",
    height: "200px",
  },
];

export function LogoGrid() {
  return (
    <div className="flex flex-col w-full p-32 bg-white">
      <p className="w-full text-center text-4xl mb-20 font-bold text-black">Parceiros</p>  
      <div className="w-full grid grid-cols-3 flex items-center justify-center">
        {logoIcons.map(({ id, src, height }) => (
          <div key={id} className="flex items-center justify-center">
            <img src={src} alt={id} style={{ height }} />
          </div>
        ))}
      </div>
    </div>
  );
}

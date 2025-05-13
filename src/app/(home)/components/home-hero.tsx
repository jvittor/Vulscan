export default function HomeHero() {
  return (
    <div className="relative flex flex-col items-center justify-center pb-10 pt-10 sm:flex-row min-h-screen">
      <div className="absolute inset-0 bg-white opacity-0 lg:bg-[url('/home/image-background.png')] lg:opacity-75" />
      <div className="relative z-10 flex w-full items-center justify-center sm:h-full">
        teste
      </div>
    </div>
  );
}
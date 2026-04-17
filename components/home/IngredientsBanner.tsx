export default function IngredientsBanner() {
  return (
    <section className="w-full py-16 px-4 md:px-12 flex justify-center items-center overflow-hidden">
      <div className="flex flex-col font-extrabold uppercase text-white drop-shadow-sm leading-[0.85] tracking-tighter w-full max-w-[1600px] mx-auto" style={{ fontSize: 'clamp(4rem, 15vw, 15rem)' }}>

        {/* Line 1 */}
        <div className="flex whitespace-nowrap tracking-normal">
          INGREDIENTS
        </div>

        {/* Line 2 */}
        <div className="flex items-center gap-4 md:gap-8 ml-[1.5vw] lg:ml-12 mt-2 md:mt-4 lg:mt-6">
          <div className="flex flex-col text-sm md:text-xl lg:text-3xl font-bold tracking-normal leading-tight whitespace-nowrap">
            <span>AND YOU,</span>
            <span>OF COURSE.</span>
          </div>
          <div className="whitespace-nowrap pb-2 md:pb-4 lg:pb-6 tracking-normal">
            YOUR MOM
          </div>
        </div>

        {/* Line 3 */}
        <div className="flex whitespace-nowrap ml-[0.5vw] tracking-normal">
          WILL LOVE
        </div>

      </div>
    </section>
  );
}

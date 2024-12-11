import { Navigation } from "./Navigation"
export const HeaderComponents = () => {
  return (
    <header className="w-full relative">
      <div className="w-full md:w-[95%] xl:w-[85%] mx-auto p-4 flex gap-4 justify-between items-center">
        <div className="flex-1 w-full">
          <h1>
            Diana<span className="font-bold">Restaurant</span>
          </h1>
        </div>
        <Navigation />
      </div>
    </header>
  )
}

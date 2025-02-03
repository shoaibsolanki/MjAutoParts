import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import {  useNavigate } from 'react-router-dom';
import { useProduct } from '../Context/ProductContext';
// import { categories } from '../data/products';

export default function CategoryList() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    skipSnaps: false,
    slidesToScroll: 1,
  });
  const navigate = useNavigate();
  const {products} = useProduct()
  const categories = Array.from(new Set(products.map(product => product.category)));
  // console.log(categories)
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const handleCategoryClick = (category: string) => {
    navigate(`/category/${encodeURIComponent(category.toLowerCase())}`);
  };

  return (
    <div className="relative">
     <div className="overflow-hidden" ref={emblaRef}>
  <div className="flex gap-6">
    {categories.length > 0
      ? categories.map((category) => (
          <div key={category} className="flex-[0_0_280px] min-w-0">
            <button
              onClick={() => handleCategoryClick(category)}
              className="w-full bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center h-full"
            >
              <h3 className="text-xl text-gray-800 font-medium">{category}</h3>
            </button>
          </div>
        ))
      : Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="flex-[0_0_280px] min-w-0 h-[120px] bg-gray-300 rounded-lg animate-pulse"
          ></div>
        ))}
  </div>
</div>

      <button
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white p-2 rounded-full shadow-lg z-10 ${
          !prevBtnEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
        }`}
        onClick={scrollPrev}
        disabled={!prevBtnEnabled}
      >
        <ChevronLeft className="h-6 w-6 text-gray-600" />
      </button>

      <button
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white p-2 rounded-full shadow-lg z-10 ${
          !nextBtnEnabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
        }`}
        onClick={scrollNext}
        disabled={!nextBtnEnabled}
      >
        <ChevronRight className="h-6 w-6 text-gray-600" />
      </button>
    </div>
  );
}
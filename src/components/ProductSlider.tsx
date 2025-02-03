import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
// import { Product } from '../types';
import ProductCard from './ProductCard';
import { useProduct } from '../Context/ProductContext';

// interface ProductSliderProps {
//   products: Product[];
// }

export default function ProductSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', skipSnaps: false, loop: true });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const { products } = useProduct();

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const autoplay = () => emblaApi?.scrollNext();
    const autoplayInterval = setInterval(autoplay, 3000);

    emblaApi.on('pointerDown', () => clearInterval(autoplayInterval));
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      clearInterval(autoplayInterval);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="relative">
  <div className="overflow-hidden" ref={emblaRef}>
    <div className="flex gap-6">
      {products.length > 0
        ? products.slice(0, 5).map((product) => (
            <div key={product.id} className="flex-[0_0_300px] min-w-0">
              <ProductCard product={product} />
            </div>
          ))
        : Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex-[0_0_300px] min-w-0 animate-pulse bg-gray-300 rounded-lg h-[400px]"></div>
          ))}
    </div>
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
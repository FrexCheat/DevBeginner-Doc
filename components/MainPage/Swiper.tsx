'use client';
import Link from 'next/link';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { useRef, useState, useEffect } from 'react';

import TextAnimate from '../ui/TextAnimate';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { type CarouselApi, Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const slides = [
  {
    image: '/assets/ads/lab-ai.png',
    content: 'ZZULI 人工智能创新实验室 - 2025 级招新 👈',
    link: 'https://qm.qq.com/q/exT622RoqY',
  },
  {
    image: '/assets/ads/lab-software.png',
    content: 'ZZULI 软件创新实验室 - 2025 级招新 👈',
    link: 'https://qm.qq.com/q/sxQQr1oIaO',
  },
];

export default function Swiper() {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: false }));
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }
    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);
  return (
    <Card className='relative flex flex-col xl:w-[650px] 2xl:w-[700px]'>
      {/* <CardHeader>
        <CardTitle>Explore More</CardTitle>
      </CardHeader> */}
      <CardContent>
        <Carousel plugins={[plugin.current]} className='w-full' setApi={setApi}>
          <CarouselContent>
            {slides.map((slide, index) => (
              <CarouselItem key={index}>
                <div className='aspect-video w-full overflow-hidden rounded-xl'>
                  <Image
                    className='mt-0 h-full w-full object-cover'
                    src={slide.image}
                    alt={slide.content}
                    width={1600}
                    height={900}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* <CarouselPrevious className='left-0 -translate-x-0' />
          <CarouselNext className='right-0 translate-x-0' /> */}
        </Carousel>
      </CardContent>
      <CardFooter>
        <Link className='no-underline' href={slides[currentIndex].link} target='_blank' rel='noopener noreferrer'>
          <TextAnimate
            className='font-black sm:text-2xl md:text-xl lg:text-2xl'
            key={currentIndex}
            text={slides[currentIndex].content}
            type='whipInUp'
          />
        </Link>
      </CardFooter>
    </Card>
  );
}

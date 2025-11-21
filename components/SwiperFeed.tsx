import React, { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Pagination } from 'swiper/modules';
import Slide from '@/components/Slide';
import { SlideDTO } from '@/lib/dto';
import 'swiper/css';
import 'swiper/css/pagination';

interface SwiperFeedProps {
  slides: SlideDTO[];
  onSlideChange: (activeIndex: number) => void;
}

const SwiperFeed: React.FC<SwiperFeedProps> = ({ slides, onSlideChange }) => {
  const swiperRef = useRef<any>(null);

  const handleSlideChange = (swiper: any) => {
    onSlideChange(swiper.realIndex);

    // Pause all videos
    const videos = document.querySelectorAll('video');
    videos.forEach(video => video.pause());

    // Play video in active slide
    const activeSlide = swiper.slides[swiper.activeIndex];
    const video = activeSlide.querySelector('video');
    if (video) {
      video.play();
    }
  };

  return (
    <Swiper
      ref={swiperRef}
      direction={'vertical'}
      slidesPerView={1}
      spaceBetween={30}
      mousewheel={true}
      loop={true}
      pagination={{
        clickable: true,
      }}
      modules={[Mousewheel, Pagination]}
      className="mySwiper"
      style={{ height: '100vh' }}
      onSlideChange={handleSlideChange}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={slide.id}>
          <Slide slide={slide} priorityLoad={index < 2} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperFeed;

import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ScreenshotCarousel.css'; // <-- Наши переопределения


interface ScreenshotCarouselProps {
  images: string[];
  slidesToShow?: number; // Можно вынести в пропсы
}

const ScreenshotCarousel: React.FC<ScreenshotCarouselProps> = ({
  images,
  slidesToShow = 3,
}) => {
  // Ссылка на сам Slider, чтобы управлять им вручную (для «туда-сюда» эффекта)
  const sliderRef = useRef<Slider | null>(null);

  // Текущее направление прокрутки: 'forward' (вперёд) или 'backward' (назад)
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Настройки slick (без autoplay, т.к. будем крутить сами через setInterval)
  const settings = {
    dots: true,
    infinite: false,         // Нельзя «уехать» за пределы; будем сами разворачиваться
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    // после смены слайда сохраняем индекс
    afterChange: (index: number) => setCurrentSlide(index),
  };

  // Эффект, который каждые 2 секунды переключает на следующий/предыдущий слайд
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!sliderRef.current) return;

      if (direction === 'forward') {
        // Если НЕ дошли до последнего «стартового» слайда
        if (currentSlide < images.length - slidesToShow) {
          sliderRef.current.slickNext();
        } else {
          // Иначе — меняем направление на обратное
          setDirection('backward');
        }
      } else {
        // Двигаемся «назад»
        if (currentSlide > 0) {
          sliderRef.current.slickPrev();
        } else {
          // Дошли до начала — разворачиваемся вперёд
          setDirection('forward');
        }
      }
    }, 4000); // каждые 2 сек

    return () => clearInterval(intervalId);
  }, [direction, currentSlide, images.length, slidesToShow]);

  return (
    <div style={{ margin: '20px 0' }}>
      <h2>Скриншоты из фильма</h2>
      <Slider ref={sliderRef} {...settings}>
        {images.map((imgUrl, index) => (
          <div key={index}>
            <img
              src={imgUrl}
              alt={`Screenshot ${index + 1}`}
              style={{
                width: '100%',
                display: 'block',
                borderRadius: '10px',
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ScreenshotCarousel;

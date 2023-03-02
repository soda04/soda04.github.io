$(function () {
  $('.slider').slick({
    arrows: true,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: '<div class="slick-prev"></div>',
    nextArrow: '<div class="slick-next"></div>',
    dots: true,

    infinite: false,
  });
})

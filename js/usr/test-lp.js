
// 画面内に入った際に
// スライダーの１枚目を動かす実装
(() => {
  const $ = jQuery
  const SPEED = 3 * 800;

  // コンストラクター IntersectionObserver() の構文( callback [, options] ); 
  const makeObserver = () => {
    const myObserver = new IntersectionObserver(myIntersect, {
      // root: null,
      // rootMargin: '0px 0px',
      // threshold: '0'
    })

    // observe() で要素を監視
    document.querySelectorAll('.is-target').forEach((ele) => myObserver.observe(ele))
  }

  const myIntersect = (entries, myObserver) => {
    entries.forEach((entry) => {
      const nowElement = entry.target;

      // console.log(nowElement)　ターゲットのHTMLが入る
      const slideId = $(nowElement).attr('id')

      // console.log(slideId)　idの中身が入る　slider-lp
      if (entry.isIntersecting) {

        // idのテキストに#をつける処理
        startSlide(null, '#' + slideId)

        // 初回のみ　繰り返さない
        myObserver.unobserve(nowElement);
      }
    });
  }

  const startSlide = (timer, elementId) => {

    // console.log(elementId) #slider-lp

    // プログレスバーに関する処理
    let timerCount = 0;
    const $mvSlider = $(`${elementId} .slider-lp-items`);

    // プログレスバーの計算　ちょっとわかりにくいですが...
    const setTimerMove = (elementId) => {
      clearInterval(timer);
      timerCount = 0;
      timer = setInterval(function () {
        timerCount += 4;
        const per = Math.floor((timerCount / SPEED) * 10000) / 100;
        $(`${elementId} .slider-lp-ctrl-dots li.active span`).css('width', per > 100 ? 100 : per
          + '%')
      }, 4)
    }


    // .slider-lp .slider-lp-wrapper　スライド部分にappend ドットの処理
    $(`${elementId} .slider-lp-wrapper`).append('<div class="slider-lp-ctrl"><ul class="slider-lp-ctrl-dots"></ul></div>');
    for (let i = 0; i < $(`${elementId} .slider-lp-items .slider-lp-item`).length; i++) {
      $(`${elementId} .slider-lp-ctrl-dots`).append('<li data-slider-num="' + i + '"><span></span></li>');
    }

    $mvSlider.on('init', function (_, _) {
      $(`${elementId} .slider-lp-ctrl-dots`).on('click', 'li', function () {
        if (!$(this).hasClass('active')) {

          // もしactive付いてなかったら、クリックしたスライドまで戻る
          $mvSlider.slick('slickGoTo', $(this).attr('data-slider-num'))
          // console.log(this)
        }
      })
      $(`${elementId} .slider-lp-ctrl-dots li[data-slider-num="0"]`).addClass('active');
      setTimerMove(elementId);
    });

    $mvSlider.slick({
      swipe: false,
      pauseOnHover: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: false,
      speed: 800,
      autoplay: true,
      autoplaySpeed: SPEED,
      appendArrows: `${elementId} .slider-lp-ctrl`,
      appendDots: `${elementId} .slider-lp-ctrl`,
    })

    $mvSlider.on('beforeChange', function (_, _, _, nextSlide) {
      $(`${elementId} .slider-lp-ctrl-dots li`).removeClass('active').removeClass('past');
      $(`${elementId} .slider-lp-ctrl-dots li[data-slider-num=${nextSlide}]`).addClass('active');
      $(`${elementId} .slider-lp-ctrl-dots li.active`).prevAll('li').addClass('past');
      $(`${elementId} .slider-lp-ctrl-dots li.active span`).css('width', '0%')
      timerCount = 0;
      clearInterval(timer);
    });

    $mvSlider.on('afterChange', () => setTimerMove(elementId));
  }

  makeObserver();
})();



// ふわっとさせる処理
// IntersectionObserver
let myTarget = document.querySelectorAll('.fade-ele');
makeObserver();
function makeObserver() {
  let myObserver;
  let myOptions = {
    root: null,
    rootMargin: '0px 0px',
    threshold: '0'
  };
  myObserver = new IntersectionObserver(myIntersect, myOptions);
  for (let n = 0; n < myTarget.length; n++) {
    myObserver.observe(myTarget[n]);
  }
}
function myIntersect(entries, myObserver) {
  entries.forEach((entry, n) => {
    const nowElement = entry.target;
    if (entry.isIntersecting) {
      nowElement.classList.remove('fade-ele');
      nowElement.classList.add('is-up');
      // observer.unobserve(entry.target);
    }
  });
}
$(document).ready(function() {
    const owl = $('.owl-carousel');
    let savedIndex = sessionStorage.getItem('currentSlide') || 0;

    owl.owlCarousel({
        items: 1,
        nav: false,
        dots: false,
        autoplay: false,
        mouseDrag: false,
        touchDrag: false,
        startPosition: 0 // inicia no slide salvo
    });

    $(document).on('click', '.proximo', function() {
        owl.trigger('next.owl.carousel');
    });

    $(document).on('click', '.anterior', function() {
        owl.trigger('prev.owl.carousel');
    });

    owl.on('changed.owl.carousel', function(event) {
        const currentIndex = event.item.index;
        sessionStorage.setItem('currentSlide', currentIndex); // salva índice na sessão
    });
});


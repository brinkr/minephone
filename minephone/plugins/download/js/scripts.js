$(document).ready(function() {
    $('.center').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        responsive: [{
            breakpoint: 320,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '40px',
                slidesToShow: 1
            }
        }, {
            breakpoint: 200,
            settings: {
                arrows: false,
                centerMode: true,
                centerPadding: '10px',
                slidesToShow: 2
            }
        }]
    });
});
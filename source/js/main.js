import listToggle from './modules/listToggle'

$('.slider').slick({
    dots: true,
    infinite: true,
    adaptiveHeight: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    adaptiveHeight: true,
})

// list
const list = new listToggle({
    class: '.title',
    wrapper: '.list-wrapper',
    list: '.content',
    speed: 200
})
list.toggleOnClick()

// mobieMenu
const menu = new listToggle({
    class: '.name',
    wrapper: '#mobileMenu .wrapper',
    list: '.item-2',
    speed: 200
})
menu.toggleOnClick()
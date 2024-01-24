//
// /* --- Accordion slide down --- */
// $('.accordion-item--btn').click(function (){
//     $(this).parents('.accordion-item').find('.accordion-item--content').slideToggle();
//     $(this).parents('.accordion-item').toggleClass('active');
// });
//
//
// /* --- Responsive menu --- */
// $('.header-burger_menu--btn').click(function (){
//
//     $(this).toggleClass('menu_isOpen');
//     $('.header').toggleClass('menu_isOpen');
//
//     $('.responsive-menu_wrapper').toggle();
//
//     $('html').toggleClass('noScroll');
// });


//  ჰედერი გამჭირვალობა სქროლის დროს

const headerElement = document.querySelector(".header-wrapper");
document.addEventListener("scroll", (e) => {
    const scrolled = document.scrollingElement.scrollTop;
    (scrolled > 0 ) ? headerElement.classList.add('opacity') : headerElement.classList.remove('opacity');
});

//  რესპონსიული მენიუს აქტივაცია

const headerBurgerBtn = document.querySelector(".header-burger--btn");
const responsiveMenu = document.querySelector(".responsive-menu--container");
headerBurgerBtn.addEventListener("click", (e) => {
    headerBurgerBtn.classList.toggle('menu-isOpen');
    responsiveMenu.classList.toggle('active');
});


//  თუ მენიუ გახსნილი დატოვა და window ზომა გაზარდა 992+ , მენიუ დაუბრინდეს ძველ პარამეტრებს
window.addEventListener("resize", (e) => {
    if(window.innerWidth>992) {
        headerBurgerBtn.classList.remove('menu-isOpen');
        responsiveMenu.classList.remove('active');
    }
});


//
function accordion(elemntID){
    const parentElemnt = document.getElementById(elemntID);
    const accordionElemnts = parentElemnt.querySelectorAll(".accordion-item");
    accordionElemnts.forEach(element => {
        element.addEventListener('click',(e) => {
            if(parentElemnt.querySelector('.accordion-item.active') && !e.currentTarget.classList.contains('active')){
                parentElemnt.querySelector('.accordion-item.active').classList.remove("active");
            }
            e.currentTarget.classList.toggle('active')
        })
    })
}
accordion("FAQAccordion")




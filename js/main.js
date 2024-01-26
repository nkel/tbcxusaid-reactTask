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
accordion("FAQAccordion");



/*  carousel script  */

class Carousel {

    itemsQuantity;
    isActive = 0;

    constructor( elementId, responsiveDaTa ) {
        this.elementId = elementId;
        this.responsiveData = responsiveDaTa;
        this.carouselElement =  document.getElementById(this.elementId);
        this.carouselitems =  this.carouselElement.querySelectorAll('.carousel-item');

    }

    activeItem(){
        for(let i = 0; i< this.responsiveData.length; i++)
            if(window.innerWidth > this.responsiveData[i].breakpoint) {
                this.itemsQuantity =  this.responsiveData[i].items;
                break;
            }
    }

    start( isActive = 0 ) {
        this.activeItem();
        for(let i = 0; i < this.itemsQuantity; i++){
            this.carouselitems[i].classList.add('active');
            this.opacityUp(this.carouselitems[i]);
        }
        this.generateBullets();
    }

    slideMove( ) {
        const activeItems = this.carouselElement.querySelectorAll('.carousel-item.active');
        activeItems.forEach((e) => {
            this.opacityDown(e);
            e.classList.remove("active");
        })
        const forStart = this.isActive * this.itemsQuantity;
        let forEnd = ( (this.isActive * this.itemsQuantity)+this.itemsQuantity <= this.carouselitems.length) ? (this.isActive * this.itemsQuantity)+this.itemsQuantity : this.carouselitems.length;

        for(let i = forStart; i < forEnd; i++){
            this.carouselitems[i].classList.add('active');
            this.opacityUp(this.carouselitems[i]);
        }
    }

    opacityDown(item) {
        let intervalVar = 1;
        const interval = setInterval( () => {
            intervalVar-=0.06;
            item.style.opacity = intervalVar;
            if(intervalVar<=0) {
                clearInterval(interval);
            }
        }, 50)
    }

    opacityUp(item) {
        let intervalVar = 0;
        const interval = setInterval( () => {
            intervalVar+=0.04;
            item.style.opacity = intervalVar;
            if(intervalVar>=1) {
                clearInterval(interval);
            }
        }, 50)
    }

    generateBullets(){
        const dotElementContainer = this.carouselElement.querySelector(".carousel-dots");
        const bulletQuantity = Math.ceil(this.carouselitems.length/this.itemsQuantity);
        for(let i = 0; i < bulletQuantity; i++){
            const newDiv = document.createElement("div");
            newDiv.setAttribute("data-n",  i+1);
            newDiv.setAttribute("class",  "dot-item");
            if(i == 0){
                newDiv.classList.add("active");
            }
            newDiv.addEventListener("click",function(){
                partnerCarousel.isActive = this.getAttribute("data-n")-1;
                partnerCarousel.slideMove();

            });
            dotElementContainer.appendChild(newDiv);
           }
    }


    next() {
        (this.isActive < this.carouselElement.querySelectorAll('.dot-item').length-1) ? this.isActive +=1 : this.isActive = 0 ;
        this.slideMove();
    }
    prev() {
        (this.isActive > 0 ) ? this.isActive-- : this.isActive = this.carouselElement.querySelectorAll('.dot-item').length-1 ;
        this.slideMove();
    }
}

const partnerCarousel = new Carousel( "partnerCarousel",[ {
                                                                                                breakpoint: 992,
                                                                                                items: 3
                                                                                             },
                                                                                            {
                                                                                                breakpoint: 576,
                                                                                                items: 2
                                                                                            },
                                                                                            {
                                                                                                breakpoint: 0,
                                                                                                items: 1
                                                                                            }
                                                                                            ]);


addEventListener("load", detectItemQuantity);

function detectItemQuantity() {
    partnerCarousel.start();
}




const prevBtn = document.getElementById("partnerCarousel").querySelector(".prev");
prevBtn.addEventListener("click", function(){
    partnerCarousel.prev();
});

const nextBtn = document.getElementById("partnerCarousel").querySelector(".next");
nextBtn.addEventListener("click", function(){
    partnerCarousel.next();
});


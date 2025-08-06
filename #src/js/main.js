let margin = -80;
$(document).on('click', '.js-anchor', function () {
    let hrf = $(this).attr("href");
    hrf = hrf.replace('/', '');
    $("html, body").animate({
        scrollTop: $(hrf).offset().top + margin + "px"
    }, {
        duration: 1600,
        easing: "swing"
    });
    if ($(this).data('click')) {
        $($(this).data('click')).trigger('click');
    }
}); 
function checkWidthAndUnslick() {
    if (window.innerWidth >= 1200) {
        if ($('.advants__carousel').hasClass('slick-initialized')) {
            $('.advants__carousel').slick('unslick');
        }
    } else {
        if (!$('.advants__carousel').hasClass('slick-initialized')) {
            $('.advants__carousel').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                focusOnSelect: true,
                mobileFirst: true,
                responsive: [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                    {
                        breakpoint: 767,
                        settings: {
                            slidesToShow: 2,
                        }
                    }
                ]
            });
        }
    }
}
$(document).ready(function () {
    checkWidthAndUnslick();
});

$(window).on('resize', function () {
    checkWidthAndUnslick();
});

const modal = document.querySelectorAll(".modal")
let animSpd = 400
//enable scroll
function enableScroll() {
    if (!document.querySelector(".modal.open")) {
        if (document.querySelector(".nonfixed_header")) {
            document.querySelector(".nonfixed_header").style.paddingRight = '0px'
        }
        document.body.style.paddingRight = '0px'
        document.body.classList.remove("no-scroll")
        document.documentElement.classList.remove("no-scroll")
    }
}
//disable scroll
function disableScroll() {
    if (!document.querySelector(".modal.open")) {
        let paddingValue = window.innerWidth > 350 ? window.innerWidth - document.documentElement.clientWidth + 'px' : 0
        if (document.querySelector(".nonfixed_header")) {
            document.querySelector(".nonfixed_header").style.paddingRight = paddingValue
        }
        document.body.style.paddingRight = paddingValue
        document.body.classList.add("no-scroll");
        document.documentElement.classList.add("no-scroll")
    }
}
//open modal
function openModal(modal) {
    let activeModal = document.querySelector(".modal.open")
    disableScroll()
    if (activeModal) {
        activeModal.classList.remove("open")
    }
    modal.classList.add("open")
}
//close modal
function closeModal(modal) {
    modal.classList.remove("open")
    setTimeout(() => {
        enableScroll()
    }, animSpd);
}
// modal click outside
if (modal) {
    modal.forEach((mod) => {
        mod.addEventListener("click", (e) => {
            if (!mod.querySelector(".modal__content").contains(e.target)) {
                closeModal(mod);
            }
        });
        mod.querySelectorAll(".modal__close").forEach(btn => {
            btn.addEventListener("click", () => {
                closeModal(mod)
            })
        })
    });
}
const advants = document.querySelector(".advants")
const itemAdvant = document.querySelectorAll(".advants .item-advant")
const advantsModal = document.querySelector("#advants-modal")
if (itemAdvant.length > 0 && advantsModal) {
    gsap.matchMedia().add("(min-width: 1200px)", () => {
        let currentScrollTrigger = null
        let matchMediaActive = true
        let advantItemSizes = {
            small: 193,
            large: 482,
        }
        if (window.innerWidth >= 1792) {
            advantItemSizes = {
                small: 270,
                large: 482,
            }
        } else if (window.innerWidth >= 1200 && window.innerWidth < 1440) {
            advantItemSizes = {
                small: 193,
                large: 390,
            }
        }
        function setupAdvantAnimation() {
            if (!matchMediaActive) {
                return;
            }
            if (currentScrollTrigger) {
                currentScrollTrigger.kill();
            }
            let x = 0;
            let activeEl = false;
            let advantAnim = gsap.timeline({
                paused: true,
                reversed: true,
                defaults: { duration: 1, ease: 'power3.out' }
            });
            itemAdvant.forEach((el) => {
                if (activeEl) {
                    advantAnim.fromTo(activeEl, { width: advantItemSizes.large + 'px' }, { width: advantItemSizes.small + 'px' }, x);
                    advantAnim.fromTo(activeEl.querySelector(".item-advant__content"), { opacity: 1 }, { opacity: 0 }, x);
                    advantAnim.fromTo(activeEl.querySelector(".item-advant__top .link-btn"), { opacity: 1 }, { opacity: 0 }, x);
                    advantAnim.fromTo(activeEl.querySelector(".item-advant__bottom .media-cover"), { opacity: 1 }, { opacity: 0 }, x);
                    advantAnim.fromTo(activeEl.querySelector(".item-advant__bottom .item-advant__icon"), { opacity: 0 }, { opacity: 1 }, x);
                }
                advantAnim.fromTo(el, { width: advantItemSizes.small + 'px' }, { width: advantItemSizes.large + 'px' }, x);
                advantAnim.fromTo(el.querySelector(".item-advant__content"), { opacity: 0 }, { opacity: 1 }, x);
                advantAnim.fromTo(el.querySelector(".item-advant__top .link-btn"), { opacity: 0 }, { opacity: 1 }, x);
                advantAnim.fromTo(el.querySelector(".item-advant__bottom .media-cover"), { opacity: 0 }, { opacity: 1 }, x);
                advantAnim.fromTo(el.querySelector(".item-advant__bottom .item-advant__icon"), { opacity: 1 }, { opacity: 0 }, x);
                activeEl = el;
                x++;
            });
            currentScrollTrigger = ScrollTrigger.create({
                trigger: advants,
                pin: advants.querySelector(".advants__container"),
                start: 'center center',
                animation: advantAnim,
                end: '+=1000',
                scrub: true,
                snap: 1 / itemAdvant.length,
                anticipatePin: 1
            });
            ScrollTrigger.refresh()
        }
        setupAdvantAnimation()
        let resizeTimeout;
        let winW = window.innerWidth
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (!matchMediaActive) return;
                if (winW != window.innerWidth) {
                    advantItemSizes = {
                        small: 193,
                        large: 482,
                    }
                    if (window.innerWidth >= 1792) {
                        advantItemSizes = {
                            small: 270,
                            large: 482,
                        }
                    } else if (window.innerWidth >= 1200 && window.innerWidth < 1440) {
                        advantItemSizes = {
                            small: 193,
                            large: 390,
                        }
                    }
                    setupAdvantAnimation()
                    winW = window.innerWidth
                }
            }, 300);
        });
        return () => {
            matchMediaActive = false;
            if (currentScrollTrigger) {
                currentScrollTrigger.kill();
            }
        };
    });
    if (advantsModal) {
        itemAdvant.forEach(item => {
            const link = item.querySelector(".item-advant__link")
            const advantModTopContent = item.querySelector(".item-advant__mod-top")
            const advantModContent = item.querySelector(".item-advant__mod-content")
            let topContent = advantModTopContent ? advantModTopContent.innerHTML : ''
            let content = advantModContent ? advantModContent.innerHTML : ''
            if (link && topContent && content) {
                link.addEventListener("click", () => {
                    link.classList.add("loading")
                    advantsModal.querySelector(".modal__top").innerHTML = topContent
                    advantsModal.querySelector(".custom-scroll").innerHTML = content
                    setTimeout(() => {
                        openModal(advantsModal)
                        link.classList.remove("loading")
                    }, 200);
                })
            }
        })
    }
}
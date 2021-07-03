function animations(mediaValue){
    if (mediaValue.matches){
        ///////////////////////////////////////////////////////////////////////////////////////////////////////Desktop animations

        /*-------------------------------------------------------------------------
                                Homepage Observer
        --------------------------------------------------------------------------*/

        const header = document.querySelector('.navbar');
        const headerLogo = document.querySelector('.credits');
        const homepage = document.querySelector('.homepage');


        const homepageOptions = {
            rootMargin: "-200px 0px 0px 0px"
        };
        const homepageObserver = new IntersectionObserver(function(entries, homepageObserver){
            entries.forEach(entry => {
                if(!entry.isIntersecting){
                    header.classList.add('navbar-scrolled');
                    header.classList.remove('navbar');
                    headerLogo.innerHTML = '<h1 class="logo">Data Structures Simplified</h1>';
                    headerLogo.href = "#top";
                }
                else{
                    header.classList.remove('navbar-scrolled');
                    header.classList.add('navbar');
                    headerLogo.innerHTML = 'by Mireia Gasco';
                    headerLogo.href = "#";
                }
            })

        }, homepageOptions);

        homepageObserver.observe(homepage);


        /*-------------------------------------------------------------------------
                                EndPage Observer
        --------------------------------------------------------------------------*/
        const contactIcon = document.querySelector('.contact-icon-wrapper');
        const endPage = document.getElementById('endPage');

        const endPageOptions = {
            rootMargin: "100px 0px 0px 0px"
        };

        const endPageObserver = new IntersectionObserver(function(entries, endPageObserver){
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    contactIcon.classList.add('end-callToAction');
                }
                else{
                    contactIcon.classList.remove('end-callToAction');
                }
            })
        }, endPageOptions);

        endPageObserver.observe(endPage);


        /*-------------------------------------------------------------------------
                                On-Scroll Animations
        --------------------------------------------------------------------------*/
        var scroll = window.requestAnimationFrame || function(callback) {window.setTimeout(callback,1000/60)};
        var elementsToShow = document.querySelectorAll('.show-on-scroll');

        function loop(){
            elementsToShow.forEach((element)=>{
                if (isElementInViewPort(element)){
                    element.classList.add('visible')
                } else {
                    element.classList.remove('visible')
                }
            });
            scroll(loop);
        }

        loop();

        function isElementInViewPort(el){
            const rect = el.getBoundingClientRect();
            // DOMRect { x: 8, y: 8, width: 100, height: 100, top: 8, right: 108, bottom: 108, left: 8 }
            const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
            const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

            // http://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
            const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
            const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

            return (vertInView && horInView);
        }

    } else{ /////////////////////////////////////////////////////////////////////////////////////////////////////mobile animations

        const burgerbtn = document.querySelector('.burger-menu');
        const openMenubtn = document.querySelector('.fa-bars');
        const closeMenubtn = document.querySelector('.fa-times');
        const navContent = document.querySelector('.nav-content');

        var burgerMenuOpen = false;

        function closeMenu(){
            openMenubtn.style.display = 'block';
            closeMenubtn.style.display = 'none';
            navContent.style.transform = 'translateX(100%)';
            burgerMenuOpen = false;
        }

        burgerbtn.addEventListener('click', e =>{
            if (burgerMenuOpen){
                closeMenu();
            } else {
                openMenubtn.style.display = 'none';
                closeMenubtn.style.display = 'block';
                navContent.style.transform = 'translateX(0)';
                burgerMenuOpen = true;
            }
        })


        const navElements = document.querySelectorAll('.nav-element');

        navElements.forEach(onClickFunction);

        function onClickFunction(el){
            el.addEventListener('click', closeMenu);
        }
        

    }
}

var mediaValue = window.matchMedia("(min-width: 800px");
animations(mediaValue);
mediaValue.addListener(animations);

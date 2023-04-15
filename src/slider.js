const photosSlider = ['photos/images/banner.png','photos/images/banner 2.png','photos/images/banner 3.png'];
const sliderPhoto = document.getElementById('slider_photo');
const sliderDots = document.querySelectorAll('.slider_dot');
let currentDot = 0;

export  function slider(){
    for(let i = 0;i<sliderDots.length;i++){
        sliderDots[i].addEventListener(`click` , ()=>{
            sliderDots[i].classList.add(`active_dot`);
            for(let x = 0;x<sliderDots.length;x++){
                if(x!==i){
                    sliderDots[x].classList.remove(`active_dot`);
                }
            }
            sliderPhoto.src = photosSlider[i];
            currentDot = i;
        })
    }

    setInterval(function () {
        currentDot++;
        if (currentDot > sliderDots.length - 1) {
            currentDot = 0;
        }
        sliderDots[currentDot].classList.add(`active_dot`);
        for (let x = 0; x < sliderDots.length; x++) {
            if (x !== currentDot) {
                sliderDots[x].classList.remove(`active_dot`);

            }
            sliderPhoto.src = photosSlider[currentDot];
        }
    }, 5000);
}

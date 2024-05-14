if (document.startViewTransition) { 
    document.startViewTransition(function() {
        document.querySelector('.heart').innerHTML = responseHTML
    });
} else { 
    document.querySelector('.heart').innerHTML = responseHTML
}

let navigatie = document.querySelector(".navigatie");
let menu = document.querySelector(".home-menu");

if (navigatie) {
    navigatie.addEventListener("click", () => {
      
      navigatie.classList.toggle("active");
      menu.classList.toggle("home-menu-active");
    });
}

if (gsap) {
    gsap.to('.muis', {
        duration:2.5,
        ease: "bounce.in",
        y: -225,
        scale: 0.8,
    });
}

let form = this 
form.classList.add('isLoading')


let imageUpload = document.getElementById('image-upload');
if (imageUpload) {

    let previewImage = () => {
    let files = imageUpload.files;

        if (files && files.length > 0) {

            let fileReader = new FileReader();
            let preview = document.getElementById('addImg');
            let label = document.querySelector('label[for="image-upload"]'); 

            fileReader.onload = function (event) {
                preview.style.display = 'block';
                preview.setAttribute('src', event.target.result);
                label.style.display = 'none'; 
            }
            fileReader.readAsDataURL(files[0]);
        }
    }
    imageUpload.addEventListener("change", previewImage);
}

let newPlaylist = []
if (newPlaylist) {
newPlaylist.push()
console.log(newPlaylist)
}
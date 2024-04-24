let navigatie = document.querySelector(".navigatie");
let menu = document.querySelector(".home-menu");
if (navigatie) {
    navigatie.addEventListener("click", () => {
      
      navigatie.classList.toggle("active");
      menu.classList.toggle("home-menu-active");
    });
}

let input = document.getElementById('image-upload');
if (input) {
    let previewImage = () => {
        let files = input.files;
        if (files && files.length > 0) {
            let fileReader = new FileReader();
            let preview = document.getElementById('addImg'); 
            fileReader.onload = function (event) {
                preview.setAttribute('src', event.target.result);
            }
            fileReader.readAsDataURL(files[0]);
        }
    }
    input.addEventListener("change", previewImage);
}

// let newPlaylist = []
// newPlaylist.push()
// console.log(newPlaylist)

if (gsap) {
    gsap.to('.muis', {
        duration:2.5,
        ease: "bounce.in",
        y: -225,
        scale: 0.8,
    });
}
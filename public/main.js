let navigatie = document.querySelector(".navigatie");
let menu = document.querySelector(".home-menu");
if (navigatie) {
    navigatie.addEventListener("click", () => {
      
      navigatie.classList.toggle("active");
      menu.classList.toggle("home-menu-active");
    });
}

let imageUpload = document.getElementById('image-upload');
if (imageUpload) {
    let previewImage = () => {
        let files = imageUpload.files;
        if (files && files.length > 0) {
            let fileReader = new FileReader();
            let preview = document.getElementById('addImg');
            let label = document.querySelector('label[for="image-upload"]'); // Select the label element
            fileReader.onload = function (event) {
                preview.style.display = 'block';
                preview.setAttribute('src', event.target.result);
                label.style.display = 'none'; // Hide the label element
            }
            fileReader.readAsDataURL(files[0]);
        }
    }
    imageUpload.addEventListener("change", previewImage);
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
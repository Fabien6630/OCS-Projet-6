let token =localStorage.getItem("token")
if (token) {
    document.querySelector(".bandeau").classList.remove("hidden")
    document.getElementById("logout").classList.remove("hidden")
    document.getElementById("login").classList.add("hidden")
    document.getElementById("logout").addEventListener("click", (e)=>{
        e.preventDefault() /*Permet de désactiver le lien a pour annuler la redirection*/
        localStorage.removeItem("token")
        location.reload()
    })

    document.querySelector(".btn-modifier").classList.remove("hidden")
    document.getElementById("icone1").classList.remove("hidden")
    document.getElementById("modif1").classList.remove("hidden")

    document.querySelector(".bouton-modifier").classList.remove("hidden")
    document.getElementById("icone2").classList.remove("hidden")
    document.getElementById("modif2").classList.remove("hidden")


    document.querySelector(".bouton-modifier") .addEventListener ("click", (event)=>{
        event.preventDefault()
        console.log("open modalhome")
        document.querySelector(".container-modal").classList.remove("hidden")
        document.querySelector(".modalhome").classList.remove("hidden")
        document.querySelector(".overlay").classList.remove("hidden")
        document.querySelector(".addwork").classList.add("hidden")
    })
      
    document.querySelector(".overlay") .addEventListener ("click", (event)=>{
        console.log("close modal")
        document.querySelector(".container-modal").classList.add("hidden")
        document.querySelector(".overlay").classList.add("hidden")
        document.querySelector(".addwork").classList.add("hidden")
    })
    
}


let works; /*Déclaration variable works pour construire la galerie dynamiquement*/
let categories; /*Déclaration variable categories pour réaliser les filtres par catégorie*/

async function getworks() { /*fonction asynchrone pour récupérer les projets avec la méthode getworks*/
    const response= await fetch ("http://localhost:5678/api/works") /*Tant que l'appel à fetch n'est pas terminé, l'exécution du code est en pause*/
    if (response.ok) {
        return response.json()
    }
}
async function buildworks() { /*fonction asynchrone pour stocker les projets avec la méthode buildworks*/
    works= await getworks()
    console.log (works)
    displayworks(works)
    buildmodalgallery(works)
    bindmodalevents()
}

buildworks()

/*FILTRES*/


async function getcategories() {
    const response= await fetch ("http://localhost:5678/api/categories")
    if (response.ok) {
        return response.json()
    }
}

async function buildcategories() {
    categories= await getcategories()
    console.log (categories)
    const filters= document.querySelector(".filters")
    for (category of categories) {
        
        let li= document.createElement('li')
        li.classList.add('filter') 
        li.innerText= category.name
        filters.appendChild(li)
    }
}

function filterbycategory (category, works) {
    if (category==="Tous"){
        return works
    }
    return works.filter (work => work.category.name === category)
}

buildcategories().then(()=>{
    const categories=document.querySelectorAll (".filters li")
    categories.forEach(category => category.addEventListener("click", (event)=>{
        let categoryName=event.target.innerText
        let filteredWorks=filterbycategory(categoryName, works)
        removeActiveClass(document.querySelectorAll(".filters li"))
        console.log("ok"+event.target.value)
        event.target.classList.add("filter-active")
        console.log(filteredWorks)
        displayworks(filteredWorks)
    }))
})

/*Affichage de la galerie dynamqiue*/

 function displayworks(workstodisplay) { /* fonction pour afficher les works dans la gallerie*/
    const gallery= document.querySelector(".gallery")
    gallery.innerHTML=""
    
    for (work of workstodisplay) { /*L'instruct° for...of crée une boucle qui fonctionne avec les objets itérables et qui appelle un mécanisme d'itération propre à l'objet utilisé et elle parcourt l'objet et les valeurs de ses différentes propriétés.*/
        
        let figure= document.createElement('figure') /*création de la balise figure*/
        let img= document.createElement('img') /*création de la balise img*/
        img.src= work.imageUrl
        img.alt= work.title
        let figcaption= document.createElement('figcaption')
        figcaption.innerText= work.title

        figure.appendChild(img) /*ajout de la balise img dans la balise figure*/
        figure.appendChild(figcaption) /*ajout de la balise figcaption dans la balise figure*/
        gallery.appendChild(figure) /*ajout de la balise dans la balise figure*/
    }
    console.log(gallery)
 }


 async function deletework(id) {
    const response= await fetch ("http://localhost:5678/api/works/"+id,{
        headers:{
            'Authorization': 'Bearer '+token
        },
        method:"DELETE"

    })
    if (response.ok) {
        return response.json()
    }
}


async function addwork(data) {
    const response= await fetch ("http://localhost:5678/api/works/",{
        headers:{
            'Authorization': 'Bearer '+token
        },
        method:"POST",
        body: data,

    })
    if (response.ok) {
        return response.json()
    }
}

function buildmodalgallery(modifyworkstodisplay) {
    const modalgallery= document.querySelector(".gallery-modal")
    console.log(modalgallery)
    modalgallery.innerHTML=""
    
    for (work of modifyworkstodisplay) {
        
        let figure= document.createElement('figure') /*création de la balise figure*/
        let img= document.createElement('img') /*création de la balise img*/
        img.src= work.imageUrl
        img.alt= work.title
        let icone= document.createElement('i')
        icone.classList.add("fa-solid", "fa-trash-can")
        icone.id=work.id
        let icone3= document.createElement('i')
        icone3.classList.add("fa-solid", "fa-arrows-up-down-left-right")
        icone3.id=work.id
        let figcaption= document.createElement('figcaption')
        figcaption.innerText= "editer"

        figure.appendChild(img) /*ajout de la balise img dans la balise figure*/
        figure.appendChild(figcaption) /*ajout de la balise figcaption dans la balise figure*/
        figure.appendChild(icone)
        modalgallery.appendChild(figure) /*ajout de la balise dans la balise figure*/    
    }
    console.log(modalgallery)
    
}

function bindmodalevents (){
    console.log("trash"+document.querySelectorAll(".fa-trash-can").length)
    document.querySelectorAll(".fa-trash-can").forEach (item=>{
        item.addEventListener ("click", (event)=> {
            let id=event.target.id
            deletework(id)
        })
    })

    document.querySelector(".xmark") .addEventListener ("click", (event)=>{
        console.log("close modal1")
        document.querySelector(".container-modal").classList.add("hidden")
        document.querySelector(".overlay").classList.add("hidden")
    })

    document.querySelector(".left-arrow") .addEventListener ("click", (event)=>{
        event.preventDefault()
        console.log("back to modalhome")
        document.querySelector(".modalhome").classList.remove("hidden")
        document.querySelector(".overlay").classList.remove("hidden")
        document.querySelector(".addwork").classList.add("hidden")
        document.querySelector(".left-arrow").classList.add("hidden")
        document.querySelector(".bandeau-modal1").classList.add("flex-end")
    })


    document.querySelector(".add-pic") .addEventListener ("click", ()=> {
        document.querySelector(".modalhome").classList.add("hidden")
        document.querySelector(".addwork").classList.remove("hidden")
        document.querySelector(".bandeau-modal1").classList.remove("flex-end")
        document.querySelector(".left-arrow").classList.remove("hidden")
        document.getElementById("logo-img").classList.remove("hidden")
        document.querySelector(".select-img").classList.remove("hidden")

            /*Ajout des images au formulaire (preview)*/

            document.querySelector(".btn-add") .addEventListener ("click", ()=> {
            document.querySelector(".select-img").classList.add("hidden")
            })
    
        const chooseFile = document.getElementById("choose-file");
        const imgPreview = document.getElementById("img-preview");
        
        chooseFile.addEventListener("change", function () {
          getImgData();
        });
        
        function getImgData() {
          const files = chooseFile.files[0];
          if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.addEventListener("load", function () {
              imgPreview.style.display = "block";
              imgPreview.innerHTML = '<img src="' + this.result + '" />';
            });    
          }
        }
        
           /*Ajouter les catégories au formulaire*/

    let select=document.getElementById("select-category")
    console.log("categories"+categories)
        
        for (category of categories) {
            let option=document.createElement('option')
            option.innerText=category.name
            option.value=category.id
            select.appendChild(option)
        } 

    })


    document.querySelector(".valider") .addEventListener ("click", (event)=>{
        event.preventDefault()
        
        if (document.getElementById("img-preview").value!==""&&
        document.getElementById("select-title").value!==""&&
        document.getElementById("select-category").value!==""

        ){
            const myForm = document.getElementById("MyForm")
            const formData = new FormData(myForm);
            addwork(formData)
            
        }
        else {
            document.querySelector(".error").classList.remove("hidden")

        }
        

        
    })

    const myForm = document.getElementById("MyForm")
}

function removeActiveClass (links) {
    console.log("removeActiveClass "+links.length)
    links.forEach(filter =>{
        console.log(filter.classList)
        filter.classList.remove("filter-active")})
    console.log(links)
        
   
}
 

 















let works;

async function getworks() {
    const response= await fetch ("http://localhost:5678/api/works")
    if (response.ok) {
        return response.json()
    }
}
async function buildworks() {
    works= await getworks()
    console.log (works)
    displayworks(works)
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
    const categories= await getcategories()
    console.log (categories)
    const filters= document.querySelector(".filters")
    for (category of categories) {
        
        let li= document.createElement('li')
        li.classList.add('filter') 
        let a= document.createElement('a')
        a.classList.add('filter-link')
        a.innerText= category.name
        a.href="#"
        li.appendChild(a)
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
        event.preventDefault()
        let categoryName=event.target.innerText
        let filteredWorks=filterbycategory(categoryName, works)
        console.log(filteredWorks)
        displayworks(filteredWorks)
    }))

})
 function displayworks(workstodisplay) {
    const gallery= document.querySelector(".gallery")
    gallery.innerHTML=""
    for (work of workstodisplay) {
        
        let figure= document.createElement('figure')
        let img= document.createElement('img')
        img.src= work.imageUrl
        img.alt= work.title
        let figcaption= document.createElement('figcaption')
        figcaption.innerText= work.title

        figure.appendChild(img)
        figure.appendChild(figcaption)
        gallery.appendChild(figure)

    
    
    }
 }











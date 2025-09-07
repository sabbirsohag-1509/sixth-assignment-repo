const categoriesContainer = document.getElementById('categories-container');



const loadCategory = () => {
    fetch(`https://openapi.programming-hero.com/api/categories`)
    .then((res) => res.json())
    .then(data => { 
        const categories = data.categories
        showCategory(categories)
    })
    .catch((err) =>{
        console.log(err)
    })
}


const showCategory = (categories) => {
    categories.forEach(cat => {
        console.log(cat.category_name)
        categoriesContainer.innerHTML += `  
                 <li class="py-2 hover:bg-green-700 hover:text-white rounded pl-2 cursor-pointer"><a href="#">${cat.category_name}</a></li>
        
        `
    });
}


loadCategory();
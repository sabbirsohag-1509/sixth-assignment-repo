// console.log('JS file Connected')

const categoriesContainer = document.getElementById('categories-container');
const cardContainer = document.getElementById('card-container');
const allTreesContainer = document.getElementById('all-trees');
const spinner = document.getElementById('loading-spinner');
const modal = document.getElementById('my_modal_5');
const modalBoxContainer = modal.querySelector('.modal-box')
// const stringify = `${JSON.stringify(plant)}`



let cart = [];

const openModalBox = (plant) => {
    modalBoxContainer.innerHTML = `  
         <img class="w-full object-cover h-48 rounded-lg mb-2" src="${plant.image}" alt="">
        <h2 class="text-xl font-bold">${plant.name}</h2>
        <p class="text-sm text-gray-600 mt-2">${plant.description}</p>
        <p class="bg-green-200 px-2 py-1 text-green-800 rounded-full mt-2 inline-block">${plant.category}</p>
        <p class="mt-1"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</p>
    
        <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
    `;
    modal.showModal();
}

const loadCategory = () => {
    fetch(`https://openapi.programming-hero.com/api/categories`)
    .then((res) => res.json())
    .then(data => { 
        const categories = data.categories
        showCategory(categories)
        //
        allTreesContainer.classList.add('bg-green-600')

    })
    .catch((err) =>{
        console.log(err)
    })
}


const showCategory = (categories) => {
    categories.forEach(cat => {
        // console.log(cat.category_name)
        categoriesContainer.innerHTML += `  
                 <li id="${cat.id}"  class="py-2 hover:bg-green-700 hover:text-white rounded pl-2 cursor-pointer">${cat.category_name}</li>
        
        `
    });
    categoriesContainer.addEventListener('click', (e) => {
        const allLi = document.querySelectorAll('#categories-container li')
        // console.log(allLi)
        allLi.forEach(li => {
            li.classList.remove('bg-green-700', 'bg-green-600')
        })

       if(e.target.localName === 'li'){
        // console.log(e.target.id)
        e.target.classList.add('bg-green-600')
        // loadTreesByCategory(e.target.id)

        if(e.target.id === 'all-trees'){
            loadAllTrees();
        }
        else{
            loadTreesByCategory(e.target.id)
        }
       };
    });
};

const loadAllTrees = () =>{
     showSpinner();
    cardContainer.innerHTML = "";
    fetch(`https://openapi.programming-hero.com/api/plants`)
    .then(res => res.json())
    .then(data => {
        // console.log(data.plants)
        showTreesByCategory(data.plants)

        hideSpinner();
    })
.catch(err =>{
    console.log(err)
    hideSpinner();
})

}

const loadTreesByCategory = (categoryId) => {
    showSpinner();
    console.log(categoryId)
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)
    .then((res) => res.json())
    .then(data => {
        // console.log(data.plants)
        showTreesByCategory(data.plants)

        hideSpinner();
    })
    .catch((err) =>{
        console.log(err)
        hideSpinner();
    })
}

const showTreesByCategory = (plants) => {
    
    cardContainer.innerHTML = "";
    plants.forEach(plant => {
        // console.log(plant)
        cardContainer.innerHTML += `  
        <div onclick='openModalBox(${JSON.stringify(plant)})' class=" cursor-pointer shadow-2xl p-3 rounded-xl bg-white transform transition-transform hover:scale-105 duration-300 cursor-pointer"> 
        <img class="w-48 h-48 object-cover rounded-lg" src="${plant.image}" alt="">
        <h2 class="text-xl font-semibold mt-2">${plant.name}</h2>
        <p class="text-sm text-gray-600">${plant.description}</p>
        <div class="flex justify-between mt-3"> 
          <p class="bg-green-200 px-3 py-1 text-green-800 rounded-full shadow-xl">${plant.category}</p>
          <p><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</p>
        </div>
        <button onclick="addToCart(event,'${plant.name}')" class="btn bg-green-600 w-full rounded-full mt-8 text-white">Add To Cart</button>
      </div>
        
        `
        
    })
}






const addToCart = (event, name) => {
    event.stopPropagation();
    alert(`Added to Cart: ${name}` );
}

const showSpinner = () => {
    spinner.classList.remove('hidden');
    cardContainer.classList.add('hidden');
};

const hideSpinner = () => {
    spinner.classList.add('hidden');
    cardContainer.classList.remove('hidden');
}



loadCategory();
loadAllTrees();
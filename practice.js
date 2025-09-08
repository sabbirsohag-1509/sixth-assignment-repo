let cart = []; // cart array

const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

// Add to cart function
const addToCart = (event, plant) => {
    event.stopPropagation(); // avoid modal opening
    alert(`Added to Cart: ${plant.name}`);

    // push item to cart
    cart.push(plant);

    // update cart UI
    updateCartUI();
}

// Update cart UI
const updateCartUI = () => {
    cartItemsContainer.innerHTML = ''; // clear previous items

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;

        const itemDiv = document.createElement('div');
        itemDiv.className = "flex justify-between items-center bg-[#F0FDF4] p-3 rounded-lg";
        itemDiv.innerHTML = `
            <div>
                <h2>${item.name}</h2>
                <p>${item.price} Tk</p>
            </div>
            <div>
                <span class="cursor-pointer text-red-500 font-bold remove-item" data-index="${index}">X</span>
            </div>
        `;

        cartItemsContainer.appendChild(itemDiv);
    });

    cartTotalElement.innerText = total;

    // attach remove item event
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', removeCartItem);
    });
}

// Remove cart item
const removeCartItem = (event) => {
    const index = event.target.dataset.index;
    cart.splice(index, 1); // remove item from array
    updateCartUI(); // refresh UI
}

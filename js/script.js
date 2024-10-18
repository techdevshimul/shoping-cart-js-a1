// Get Elements From Document
let p1 = document.querySelector("#p1");
let p2 = document.querySelector("#p2");
let p3 = document.querySelector("#p3");
let p4 = document.querySelector("#p4");
let p5 = document.querySelector("#p5");
let p6 = document.querySelector("#p6");
let clrCart = document.querySelector("#clr-cart");
let cartList = document.querySelector("#cart-list");

// Add Event Listeners
p1.addEventListener("click", cartItem);
p2.addEventListener("click", cartItem);
p3.addEventListener("click", cartItem);
p4.addEventListener("click", cartItem);
p5.addEventListener("click", cartItem);
p6.addEventListener("click", cartItem);
cartList.addEventListener("click", removeItem);
clrCart.addEventListener("click", clearCart);


// Classes
class Items {
    constructor(title) {
        this.title = title;
    }
}

class Cart {
    static addToCart(item) {
        cartList.innerHTML += `
    <li class="list-group-item d-flex align-items-center justify-content-between">
    ${item.title}
    <a href="#">
    <img src="./assets/images/dustbin.png" alt="dustbin" class="dustbin">
    </a></li>`
    }

    static removeItemFromCart(target) {
        if (target.hasAttribute("src")) {
            target.parentElement.parentElement.remove();

            Store.removeItemFromLS(target.parentElement.parentElement.textContent.trim());
        }
    }
}

// Local Storage
class Store {
    static getItems() {
        let items;
        if (localStorage.getItem("items") === null) {
            items = []
        } else {
            items = JSON.parse(localStorage.getItem("items"));
        }
        return items;
    }

    static addItem(item) {
        let items = Store.getItems();
        items.push(item);
        localStorage.setItem("items", JSON.stringify(items));
    }

    static displayItems() {
        let items = Store.getItems();
        items.forEach(item => {
            Cart.addToCart(item);
        });
    }

    static removeItemFromLS(title) {
        let items = Store.getItems();
        items.forEach((item, index) => {
            if (item.title === title) {
                items.splice(index, 1);
            }            
        });
        localStorage.setItem("items", JSON.stringify(items));
    }
}

// Event Listener After Store Class
document.addEventListener("DOMContentLoaded", Store.displayItems());

// Function Declarations
function cartItem(e) {
    let title = e.target.parentElement.parentElement.children[1].children[0].textContent;

    let item = new Items(title);
    Cart.addToCart(item);
    Store.addItem(item);
}

function clearCart(e) {
    cartList.innerHTML = "";
    localStorage.clear();
}

function removeItem(e) {
    Cart.removeItemFromCart(e.target);
}

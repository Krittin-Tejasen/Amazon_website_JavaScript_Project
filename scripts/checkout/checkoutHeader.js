// import {cart, calculateCartQuantity, cartItemMeasure} from "../../data/cart.js"
import {cart} from "../../data/cart-class.js"


export function renderCheckoutHeader() {
    const cartQuantity = cart.calculateCartQuantity();
    const cartMeasure = cart.cartItemMeasure();
    const checkoutHeaderHTML = `
        <div class="header-content">
            <div class="checkout-header-left-section">
                <a href="index.html" class="header-link">
                    <img src="images/amazon-logo.png" class="amazon-logo">
                    <img src="images/amazon-mobile-logo.png" class="amazon-mobile-logo">
                </a>
            </div>
            <div class="checkout-header-middle-section">
                Checkout (<a class="return-to-home-link js-return-to-home-link"
                    href="index.html">${cartQuantity} ${cartMeasure}</a>)
            </div>
            <div class="checkout-header-right-section">
                <img src="images/icons/checkout-lock-icon.png">
            </div>
        </div>
    `;
    document.querySelector('.js-checkout-header').innerHTML = checkoutHeaderHTML;

}

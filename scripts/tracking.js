import { loadProductsFetch, getProduct } from "../data/products.js";
import { getOrder } from "../data/orders.js";
import { findDeliveryOption, calculateDeliveryDate } from "../data/deliveryOption.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

async function loadPage(){
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId')

  console.log(orderId);
  console.log(productId);
  
  const order = getOrder(orderId);
  console.log(order);
  const product = getProduct(productId);

  let productDetails;

  order.products.forEach((details) => {
    if (details.productId === product.id){
      productDetails = details;
    }
  });

  const matchedOption = findDeliveryOption(order.orderTime, productDetails.estimatedDeliveryTime);
  let deliveryDate = 'undefined';
  if(matchedOption){
        deliveryDate = calculateDeliveryDate(matchedOption);
  }
  console.log(deliveryDate);

  const percentProgress = calculateProgress(order.orderTime, productDetails.estimatedDeliveryTime);
  console.log(percentProgress);

  const trackingHTML = `
    <div class="main">
      <a href="orders.html" class="back-to-orders-link link-primary"> View all orders</a>
      <div class="delivery-date">Arriving on ${deliveryDate}</div>
      <div class="product-info"> ${product.name} </div>
      <div class="product-info">Quantity: ${productDetails.quantity}</div>
      <img src="${product.image}" class="product-image">
      <div class="progress-labels-container">
          <div class="progress-label ${
            percentProgress < 50 ? 'current-status' : ''
          }"> Preparing </div>

          <div class="progress-label ${
            (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
          }"> Shipped </div>

          <div class="progress-label ${
            percentProgress >= 100 ? 'current-status' : ''
          }"> Delivered </div>

      </div>
      <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${percentProgress}%;"></div>
      </div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

function calculateProgress(inOrderTime, estimatedDeliveryTime){
  const today = dayjs();
  const orderTime = dayjs(inOrderTime);
  const deliveryTime = dayjs(estimatedDeliveryTime);
  return (((today - orderTime) / (deliveryTime - orderTime)) * 100);
}

loadPage();
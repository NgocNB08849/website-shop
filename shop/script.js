class Vendor {
    constructor(name, address) {
        this.name = name;
        this.addadd = address;
    }
}

class ShopItem {
    constructor(name, price, stock, vendor) {
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.vendor = vendor;
    }
    calcTotalPrice() {
        return this.price * this.stock;

    }
}
class Shop {
    constructor(name, address) {
        this.name = name;
        this.address = address;
        this.items = [];
        this.vendors = [];
        this.cart = [];
    }
    registerVendor(name, address) {
        this.vendors.push(new Vendor(name, address));
    }
    registerItem(name, price, stock, vendorName) {
        let foundVendor = this.vendors.find((vendor) => vendor.name === vendorName);
        if (foundVendor === undefined) {
            throw new Error("Vendor not found");
        }
        this.items.push(new ShopItem(name, price, stock, foundVendor));
    }
    cartItems(name, price, vendorName){
        this.cart.push(new Cart(name, price, vendorName));
    }

    /**
       *
       * @returns {ShopItem[]}
    */
    getItems() {
        return this.items;
    }
    /**
       *
       * @returns {Vendors[]}
    */
    getVendors() {
        return this.vendors;
    }

    buyItem(itemName, qty) {
        let foundItem = this.items.find((item) => item.name === itemName);
        if (foundItem == undefined) {
            throw new Error(`Item ${itemName} is not found`);
        }
        if (qty > foundItem.stock) {
            throw new Error(`qty ${qty} is not qty`);
            /*throw new Error("object Object");*/
        }
        foundItem.stock -= qty;
        return new ShopItem(foundItem.name, foundItem.price, qty, foundItem.vendor);
    }
    cartItems(itemName){
        let foundItem = this.items.find((item) => item.name ===itemName);
        if (foundItem == undefined) {
            throw new Error(`Item ${itemName} is not found`);
        }

    }

}

let myShop = new Shop("Hasaki", "123 Main St");
myShop.registerVendor("Anessa", "123 Apple St");
myShop.registerVendor("Cetaphil", "123 Google St");
myShop.registerVendor("Garnier", "123 Dell St");
myShop.registerVendor("Bioderma", "123 Dell St");
myShop.registerVendor("L'oreal", "123 Dell St");
myShop.registerVendor("Eucerin", "123 Dell St");

myShop.registerItem("Kem chống nắng Anessa", 450, 198, "Anessa");
myShop.registerItem("Sữa rửa mặt Cetaphil", 250, 100, "Cetaphil");
myShop.registerItem("Garnier Vitamin C", 137, 100, "Garnier");
myShop.registerItem("Nước tẩy trang Bioderma", 396, 152, "Bioderma");
myShop.registerItem("Serum L'oreal", 299, 182, "L'oreal");
myShop.registerItem("Kem dưỡng Eucerin", 439, 0, "Eucerin");

console.log(myShop.getItems());

let my_Anessa = myShop.cartItems("Kem chống nắng Anessa", 1);
let my_Cetaphil = myShop.buyItem("Sữa rửa mặt Cetaphil", 10);
console.log(my_Anessa);

console.log(myShop.getItems());

function createNewItemHtml(shopItem) {
    return `
    <div class="card">
          <div class="content">
            <h2 class="title">${shopItem.name}</h2>
            <h2 class="title">${shopItem.price}</h2>
            <p class="copy">${shopItem.vendor}</p>
            <button class="btn">Mua</button>
          </div>
        </div>
`};
let listShopItem = document.getElementById("list-shop-item");
listShopItem.innerHTML = "";
for (let item of myShop.getItems()) {
    console.log(item);
    listShopItem.innerHTML += createNewItemHtml(item);
}

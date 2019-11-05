/**************************
    設計一個採購清單的網站應用程式，使用者可透過網站頁面：
    1. 新增採購項目
    2. 更新採購項目(以名稱為key)
    3. 刪除採購項目
    4. 採購項目可用bootstrap card形式顯示於col中
    5. 採購項目可依照商品類型給予不同的底色(參見bootstrap badge)
    6. 下次打開網頁時可以看到先前紀錄的採購項目(結合localstorage操作)
**************************/
// 預設採購清單是一個空物件
let shoppingList = {};
// 定義本地端儲存的key
const storageKey = 'shoppingList';

// 檢查localStorage裡面有沒有storageKey的存在
if (localStorage.getItem(storageKey)) {
    // 把localStorage的資料取出並還原成物件設定給採購清單
    shoppingList = JSON.parse(localStorage.getItem(storageKey));
}

// 定義類別色彩對照表
const categoryColorTable = {
    民生用品: 'primary',
    食品: 'danger',
    清潔用品: 'success'
};

renderShoppingList();


// 處理表單送出的function
function formSend(e) {
    // 取消重整的行為
    e.preventDefault();
    // 定義一個採購項目
    const item = {
        name: getValueById('productNameInput'),
        price: parseInt(getValueById('productPriceInput')),
        category: getValueById('productCategoryInput'),
        remarks: getValueById('productRemarksInput')
    }
    console.log('item:', item);
    // 把採購項目新增/更新到採購清單內
    shoppingList[item.name] = item;
    // 把最新狀態的清單存到localStorage
    updateShoppingListToLocalStorage();
    // 把資料渲染到畫面上
    renderShoppingList();
}

// 把資料更新到localStorage
function updateShoppingListToLocalStorage() {
    localStorage.setItem(storageKey, JSON.stringify(shoppingList));
}

// 渲染採購清單
function renderShoppingList() {
    // 要顯示採購清單的容器
    const row = document.getElementById('row');
    // 把畫面上的舊資料清空
    row.innerHTML = '';
    // 使用迴圈把shoppingList的屬性一個一個取出
    for (let itemName in shoppingList) {
        // 定義一個採購項目
        const item = shoppingList[itemName];
        // 定義badge的顏色
        // 如果這個分類名稱在對照表內有存在，就設定成對照表對應的值
        // 如果沒有存在設定預設顏色為secondary
        const badgeColor = item.category in categoryColorTable ? categoryColorTable[item.category] : 'secondary';
        // 定義一個col
        const col = `<div class="col-md-4">
            <div class="card mb-3">
                <div class="card-body">
                    <h4>${item.name}</h4>
                    <span class="badge badge-${badgeColor}">
                        ${item.category}
                    </span>
                    <p>$ ${item.price} NTD</p>
                    <p>${item.remarks}</p>
                    <button 
                        data-target="${item.name}"
                        data-something="xyz"
                        class="btn btn-danger"
                        onclick="deleteItem(event)">    刪除產品  </button>
                </div>
            </div>
        </div>`;
        // 把row裡面現有的HTML拿出來加上col再設定回row
        row.innerHTML += col;
    }
}

function deleteItem(e) {
    console.log('click event:', e);
    // const button = e.target;
    // console.log('click button:', button);
    // console.dir(button);
    // const target = button.dataset.target
    const target = e.target.dataset.target;
    // console.log('target', target);
    // 把資料從採購清單內刪除
    delete shoppingList[target];
    // 更新到localStorage
    updateShoppingListToLocalStorage();
    // 渲染畫面
    renderShoppingList();
}

function clearShoppingList(e) {
    console.log('event:', e);
    // 清空採購清單
    shoppingList = {};
    // 更新至localStorage
    updateShoppingListToLocalStorage();
    // 渲染畫面
    renderShoppingList();
}

// 透過輸入id取得值的function
function getValueById(id) {
    // 取得輸入元素
    const input = document.getElementById(id);
    // 取得輸入值
    const value = input.value;
    // 回傳輸入值
    return value;
}


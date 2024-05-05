window.onload = function() {
    fetchMenuItems();

    document.getElementById('orderForm').addEventListener('submit', function(event) {
        event.preventDefault();
        placeOrder();
    });
};

function fetchMenuItems() {
    fetch('https://6qjyi136f7.execute-api.us-west-1.amazonaws.com/prod/menu')
    .then(response => response.json())
    .then(data => {
        const menuDiv = document.getElementById('menu');
        const select = document.getElementById('itemSelect');
        data.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.innerHTML = `<strong>${item.ItemName}</strong> - $${item.Price}`;
            menuDiv.appendChild(menuItem);

            const option = document.createElement('option');
            option.value = item.ItemId;
            option.text = `${item.ItemName} - $${item.Price}`;
            select.appendChild(option);
        });
    })
    .catch(error => console.error('Error fetching menu:', error));
}

function placeOrder() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const itemId = document.getElementById('itemSelect').value;

    fetch('https://6qjyi136f7.execute-api.us-west-1.amazonaws.com/prod/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, email: email, orderDetails: itemId })
    })
    .then(response => response.json())
    .then(data => alert('Order placed successfully!'))
    .catch(error => console.error('Error placing order:', error));
}

// window.onload = function() {
//     fetchMenuItems();

//     document.getElementById('orderForm').addEventListener('submit', function(event) {
//         event.preventDefault();
//         placeOrder();
//     });
// };

// function fetchMenuItems() {
//     fetch('https://wo083lrv16.execute-api.us-east-2.amazonaws.com/prod/menu')
//     .then(response => response.json())
//     .then(data => {
//         const menuDiv = document.getElementById('menu');
//         const select = document.getElementById('itemSelect');
//         data.forEach(item => {
//             // Updated to include an image for each menu item
//             const menuItem = document.createElement('div');
//             menuItem.innerHTML = `<strong>${item.ItemName}</strong> - $${item.Price}
//                                   <br><img src="${item.ImageUrl}" alt="Image of ${item.ItemName}" style="width:100px; height:auto;"><br>`;
//             menuDiv.appendChild(menuItem);

//             const option = document.createElement('option');
//             option.value = item.ItemId;
//             option.text = `${item.ItemName} - $${item.Price}`;
//             select.appendChild(option);
//         });
//     })
//     .catch(error => console.error('Error fetching menu:', error));
// }

// function placeOrder() {
//     const username = document.getElementById('username').value;
//     const email = document.getElementById('email').value;
//     const itemId = document.getElementById('itemSelect').value;

//     fetch('https://wo083lrv16.execute-api.us-east-2.amazonaws.com/prod/order', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username: username, email: email, orderDetails: itemId })
//     })
//     .then(response => response.json())
//     .then(data => alert('Order placed successfully!'))
//     .catch(error => console.error('Error placing order:', error));
// }

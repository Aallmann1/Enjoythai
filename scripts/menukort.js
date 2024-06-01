const menufile = 'menu.csv';

async function loadMenuItems() {
    const response = await fetch(menufile);
    const data = await response.text();
    const parsedData = Papa.parse(data, { header: true }).data;

    const menuItemsContainer = document.getElementById('menu-items');
    const categorydropdown = document.getElementById("category-filter");
    const sortdropdown = document.getElementById("sort-order");

    function filterAndSortData() {
        const categoryFilter = categorydropdown.value;
        const sortFilter = sortdropdown.value;
        
        let filteredData = parsedData;
        if (categoryFilter != 'alle') {
            filteredData = filteredData.filter(item => item.Category == categoryFilter);
        }

        if (sortFilter == 'standard') {
            filteredData.sort((a, b) => a.Number - b.Number);
        } else if (sortFilter == 'pris-asc') {
            filteredData.sort((a, b) => a.Price - b.Price);
        } else if (sortFilter == 'pris-desc') {
            filteredData.sort((a, b) => b.Price - a.Price);
        } else if (sortFilter == 'popularity') {
            filteredData.sort((a, b) => a.Popularity - b.Popularity);
        }
        
        menuItemsContainer.innerHTML = '';
        
        filteredData.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.classList.add('col-md-4', 'menu-item');
            menuItem.dataset.category = item.Category;
            menuItem.dataset.price = item.Price;
            menuItem.dataset.popularity = item.Popularity;
            menuItem.innerHTML = `
                <div class="card mb-4">
                    <img src="${item.Image}" class="card-img-top" alt="${item.Name}">
                    <div class="card-body menu-cards">
                        <h5 class="card-title">${item.Name}</h5>
                        <p class="card-text">${item.Price} kr</p>
                        <button class="btn">Køb</button> <!-- Add the button here -->
                    </div>
                </div>
                `;
            menuItemsContainer.appendChild(menuItem);
        });
    }
    
    categorydropdown.addEventListener('change', filterAndSortData);
    sortdropdown.addEventListener('change', filterAndSortData);

    filterAndSortData();
}

document.addEventListener('DOMContentLoaded', loadMenuItems);
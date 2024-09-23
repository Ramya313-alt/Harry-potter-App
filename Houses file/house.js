const houseContainer = document.querySelector('.House-container'); // Make sure .House-container exists in the HTML
const searchBar = document.getElementById('searchBar');
let houseList = []; // Global variable to store 


window.onload = async () => {
    try {
        const getHouse = await fetch('https://potterapi-fedeperin.vercel.app/en/houses', {
            method: 'GET'
        });
        houseList = await getHouse.json(); // Store the fetched houses in houseList
        displayHouse(houseList); 
    } catch (error) {
        console.log(error);
    }
};



const displayHouse = (homes) => {
    houseContainer.innerHTML = ''; 

    homes.forEach((home) => { 
        const { house, founder, animal, colors, emoji } = home;

        const html = `
            <div class="border p-2 m-3 text-center rounded p-2 text-white bg-dark">
                <h1 class='text-warning'>House: <strong>${house}</strong></h1>
                <h3 class='text-secondary'><strong class='text-white'>Founder:</strong> ${founder}</h3>
                <h3 class='text-secondary'><strong class='text-white'>Animal:</strong> ${animal}</h3>
                <h4 class='text-secondary'><strong class='text-white'>Colors:</strong> ${colors.join(', ')}</h4>
                <h4 class='text-secondary'><strong class='text-white'>Emoji:</strong> ${emoji}</h4>
            </div>
        `;
        houseContainer.innerHTML += html; 
     });
}


searchBar.addEventListener('input', function () {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredHouses = houseList.filter(home => home.house.toLowerCase().includes(searchTerm));
    displayHouse(filteredHouses); 
});


   
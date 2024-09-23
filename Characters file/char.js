const charContainer = document.querySelector('.char-container');
const searchBar = document.getElementById('searchBar');
let charList = []; 

window.onload = async () => {
    try {
        const getChar = await fetch('https://potterapi-fedeperin.vercel.app/en/characters', {
            method: 'GET'
        });
        charList = await getChar.json(); 
        displayCharacters(charList); 
    } catch (error) {
        console.log(error);
    }
}

const displayCharacters = (chars) => {
    charContainer.innerHTML = ''; 

    chars.forEach((char) => {
        const { fullName, nickname, hogwartsHouse, interpretedBy, children, image, birthdate } = char;

        const html = `
            <div class="border p-2 m-3 text-center rounded p-2">
                <img height="150px" src=${image} alt="character">
                <h1>FullName: ${fullName}</h1>
                <h3 class='text-secondary'><strong class='text-dark'>NickName:</strong> ${nickname}</h3>
                <h3 class='text-secondary'><strong class='text-dark'>Hogwarts House:</strong> ${hogwartsHouse}</h3>
                <h4 class='text-secondary'><strong class='text-dark'>Interpreted By:</strong> ${interpretedBy}</h4>
                <h4 class='text-secondary'><strong class='text-dark'>Children:</strong> ${children}</h4>
                <h4 class='text-secondary'><strong class='text-dark'>Birthdate:</strong> ${birthdate}</h4>
            </div>  
        `;
        charContainer.innerHTML += html;
    });
}


searchBar.addEventListener('input', function () {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredCharacters = charList.filter(char => char.fullName.toLowerCase().includes(searchTerm));
    displayCharacters(filteredCharacters); // Display only filtered characters
});

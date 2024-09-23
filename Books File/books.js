// const bookContainer = document.querySelector('.books-container');
// const searchBar = document.getElementById('searchBar');
// const favoriteStars = document.querySelectorAll('.favorite');

// let booksList = [];

// const favorites = JSON.parse(localStorage.getItem('favorites')) || [];


// window.onload = async () => {
//     try {
//         const getBooks = await fetch('https://potterapi-fedeperin.vercel.app/en/books', {
//             method: 'GET'
//         });
//         booksList = await getBooks.json(); 
//         displayBooks(booksList); 
//         //takes the fetched books and displays them on the webpage.39.14
//     } catch (error) {
//         console.log(error);
//     }
// };


// const displayBooks = (books) => {
//     bookContainer.innerHTML = ''; 
//     books.forEach(book => {
//         const { title, originalTitle, releaseDate, description, pages, cover } = book;
//         const isFavorite=favorites.includes(title);
//         const html = `
//             <div class="border p-2 m-3 text-center rounded">
//                 <img height="150px" src="${cover}" alt="product">
//                 <h1>Title: ${title}</h1>
//                 <h3 class='text-secondary'><strong class='text-dark'>Original Title:</strong> ${originalTitle}</h3>
//                 <h3 class='text-secondary'><strong class='text-dark'>Release Date:</strong> ${releaseDate}</h3>
//                 <h4 class='text-secondary'><strong class='text-dark'>Description:</strong> ${description}</h4>
//                 <p class='text-secondary'><strong class='text-dark'>Pages:</strong> ${pages}</p>
//                 <button class='btn bg-warning'>Buy now</button>
                
//                 <button class='btn bg-danger'>Add to cart</button>
//                 <br>
//                 <span class='favorite ${isFavorite ? active : ''}' data-title="${title}">&#9733;</span>
//             </div>
//         `;
//         bookContainer.innerHTML += html;
//     });

//     favoriteStars.forEach(star =>{
//         star.addEventListener('click', toggleFav)
//      })
// };


// searchBar.addEventListener('input', function() {
//     const searchTerm = searchBar.value.toLowerCase();
//     const filteredBooks = booksList.filter(book => book.title.toLowerCase().includes(searchTerm));
//     displayBooks(filteredBooks); // Disp only filtered ones
// });

// //input is an event when user type somthng in search bar the function will run
// // It tracks user input in the search bar to filter the books.
// //44L   creates a new list (filtereBooks) of only the books that match the search term.


// //
// const toggleFav = (event)=>{
//     const star = event.target;
//     const bookTitle = star.getAttribute('data-title');

//     if(favorites.includes(bookTitle)){
//         favorites=favorites.filter(title => title !== bookTitle)
//         star.classList.remove('active');
//     }else{
//         favorites.push(bookTitle);
//         star.classList.add('active');
//     }
//     localStorage.setItem('favoriteBooks', JSON.stringify(favorites));
// }
 




const bookContainer = document.querySelector('.books-container');
const searchBar = document.getElementById('searchBar');

let booksList = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];


window.onload = async () => {
    try {
        const getBooks = await fetch('https://potterapi-fedeperin.vercel.app/en/books', {
            method: 'GET'
        });
        booksList = await getBooks.json(); 
        displayBooks(booksList); // Display fetched books
    } catch (error) {
        console.log(error);
    }
};

// Display the books on the page
const displayBooks = (books) => {
    bookContainer.innerHTML = ''; 
    books.forEach(book => {
        const { title, originalTitle, releaseDate, description, pages, cover } = book;
        const isFavorite = favorites.includes(title); // Check if book is favorite

        const html = `
            <div class="border p-2 m-3 text-center rounded">
                <img height="150px" src="${cover}" alt="product">
                <h1>Title: ${title}</h1>
                <h3 class='text-secondary'><strong class='text-dark'>Original Title:</strong> ${originalTitle}</h3>
                <h3 class='text-secondary'><strong class='text-dark'>Release Date:</strong> ${releaseDate}</h3>
                <h4 class='text-secondary'><strong class='text-dark'>Description:</strong> ${description}</h4>
                <p class='text-secondary'><strong class='text-dark'>Pages:</strong> ${pages}</p>
                <button class='btn bg-warning'>Buy now</button>
                <button class='btn bg-danger'>Add to cart</button>
                <br>
                <span class="favorite ${isFavorite ? 'active' : ''}" data-title="${title}">&#9733;</span>
            </div>
        `;
        bookContainer.innerHTML += html;
    });

      const favoriteStars = document.querySelectorAll('.favorite');
    favoriteStars.forEach(star => {
        star.addEventListener('click', toggleFav);
    });
};

// Handle search functionality
searchBar.addEventListener('input', function() {
    const searchTerm = searchBar.value.toLowerCase();
    const filteredBooks = booksList.filter(book => book.title.toLowerCase().includes(searchTerm));
    displayBooks(filteredBooks); // Display only filtered books
});
 //input is an event when user type somthng in search bar the function will run
//  It tracks user input in the search bar to filter the books.
// 44L   creates a new list (filtereBooks) of only the books that match the search term.


// Toggle favorite status when star is clicked
const toggleFav = (event) => {
    const star = event.target;
    const bookTitle = star.getAttribute('data-title');

    if (favorites.includes(bookTitle)) {
        // If already in favorites, remove 
        favorites = favorites.filter(title => title !== bookTitle);
        star.classList.remove('active');
    } else {
        // If not in favorites, add it
        favorites.push(bookTitle);
        star.classList.add('active');
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
};

        

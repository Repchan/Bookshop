import {slider} from "./slider";
import './style.css';
const loadMoreBtn = document.getElementById(`load_more`)
const bugCounter = document.querySelector('.bag_counter');
const category = document.querySelectorAll('.category');
const booksList = document.getElementById('books_list');
let localStorageBooks = [];
let myJSON = JSON.parse(localStorage.getItem(`myJSON`));
let bugCounterNum = 0;
let startIndex = 0;

slider();

if(myJSON){
    for(let i =0;i<myJSON.length;i++){
        localStorageBooks.push(myJSON[i]);
    }
    bugCounterLocal();
}

function bugCounterLocal(){
    bugCounterNum = localStorageBooks.length;
    if(bugCounterNum <= 0){
        bugCounter.style.display = `none`;
    }
    else{
        bugCounter.style.display = `block`;
    }
    bugCounter.innerHTML = `${bugCounterNum}`;
}

function addToStorage(img,author,bookName,rev,description,coast,rating, id){
    let localBook = [img,author,bookName,rev,description,coast,rating , id];
    localStorageBooks.push(localBook);
    localStorage.setItem(`myJSON` , JSON.stringify(localStorageBooks));
}

function display(img,author,bookName,rev,description,coast,rating , id){
    const bookCard = document.createElement('div');
    booksList.appendChild(bookCard);
    const bookImage = document.createElement('div');
    bookCard.appendChild(bookImage);
    const bookImageImg =  document.createElement('img');
    bookImage.appendChild(bookImageImg);
    const bookInfo = document.createElement('div');
    bookCard.appendChild(bookInfo);
    const bookAuthor = document.createElement(`p`);
    bookInfo.appendChild(bookAuthor);
    const bookTitle = document.createElement(`h2`);
    bookInfo.appendChild(bookTitle);

    const bookRating = document.createElement(`div`);
    bookInfo.appendChild(bookRating);
    const stars = document.createElement(`div`);
    bookRating.appendChild(stars);
    const bookReview = document.createElement(`p`);
    bookRating.appendChild(bookReview);

    const bookDescription = document.createElement(`p`);
    bookInfo.appendChild(bookDescription);
    const bookCoast = document.createElement(`p`);
    bookInfo.appendChild(bookCoast);
    const bookBuy = document.createElement(`button`);
    bookInfo.appendChild(bookBuy);

    bookCoast.innerHTML = coast;
    bookCoast.classList.add(`book_coast`);
    bookDescription.innerHTML = description;
    bookDescription.classList.add(`book_description`);
    bookReview.innerHTML = rev;
    bookReview.classList.add(`review`);
    stars.classList.add(`stars`);
    bookRating.classList.add(`book_rating`);
    bookBuy.setAttribute(`type`, `submit`) ;
    bookBuy.classList.add(`btn`);
    bookBuy.innerHTML = "buy now";
    bookTitle.classList.add(`book_name`)
    bookTitle.innerHTML = bookName;
    bookAuthor.classList.add(`book_author`);
    bookAuthor.innerHTML = author;
    bookInfo.classList.add(`book_info`)
    bookImageImg.classList.add(`book_image_img`);
    bookImageImg.src = `${img}`;
    bookCard.classList.add('book_card');
    bookImage.classList.add(`book_image`);

    for(let i = 0;i<localStorageBooks.length;i++){
        if(localStorageBooks[i][`7`] === id){
            bookBuy.classList.add(`at_bug`);
            bookBuy.innerHTML = "in the cart";
        }

    }

    bookBuy.addEventListener('click' , ()=>{
        if(bookBuy.classList.contains('at_bug')){
            bookBuy.classList.remove('at_bug');
            bookBuy.innerHTML = "buy now";
            for(let i = 0;i<localStorageBooks.length;i++){
                if(localStorageBooks[i][`7`] === id){
                    localStorageBooks.splice(i , 1);
                    localStorage.setItem(`myJSON` , JSON.stringify(localStorageBooks));
                }
            }
            bugCounterLocal();
        }
        else{
            bookBuy.classList.add('at_bug');
            bookBuy.innerHTML = "in the cart";
            addToStorage(img,author,bookName,rev,description,coast,rating , id);
            bugCounterLocal();
        }
    })
    for(let k = 0;k<5;k++){
        const star = document.createElement(`img`);
        const starSpan = document.createElement(`span`);
        star.classList.add(`star`);
        star.src = "photos/icons/Star.png";
        starSpan.appendChild(star)
        stars.appendChild(starSpan);
        if (rating >= 1) {
            rating--;
            star.style.clipPath = `inset(0 0 0 0)`;
        }
        else{
            star.style.clipPath = `inset(0 ${12 - (12 * rating)}px 0 0)`
        }
    }
}

function bookCardResponse(numberOfCategory,startIndex){
    let items =[];
    fetch(`https://www.googleapis.com/books/v1/volumes?q="subject:${category[numberOfCategory].id}"&key=AIzaSyB0joo0medZrTczAvcvMzutZh10Co7cFsQ&printType=books&startIndex=${startIndex}&maxResults=6`)
        .then(function (res) {
            return res.json();
        })
        .then(function (result) {
            items = result.items;
            for(let i = 0;i<6;i++){
                let img = items[i].volumeInfo.imageLinks.thumbnail;
                let author = ``;
                let idBook = items[i].id;
                if(items[i].volumeInfo.authors === undefined){
                    author = `No author yet`;
                }
                else{
                    author =items[i].volumeInfo.authors[0];
                }
                let bookName = items[i].volumeInfo.title;
                if(bookName.length > 18){
                    bookName = bookName.slice(0 , 15)+`...`
                }
                let rev = items[i].volumeInfo.ratingsCount;
                if(items[i].volumeInfo.ratingsCount === undefined){
                    rev = `No reviews`;
                }
                let description = items[i].volumeInfo.description;
                if(description === undefined){
                    description = `No description yet`;
                }
                if(description.length > 100){
                    description = description.slice(0 , 90) +`...`
                }
                let coast = ``
                if(items[i].saleInfo.listPrice !== undefined){
                    coast = `$`+(parseInt(items[i].saleInfo.listPrice.amount) / 36).toFixed(2);
                }
                else{
                    coast = `Free`
                }
                let rating = parseInt(items[i].volumeInfo.averageRating);
                display(img,author,bookName,rev,description,coast,rating,idBook);
            }
        })
        .catch(() => {
            console.log('error')
        });
}
document.addEventListener("DOMContentLoaded",function(){
    bookCardResponse(0,0);
});

for(let i = 0;i<category.length;i++){
    category[i].addEventListener(`click` , function (){
        startIndex = 0;
        booksList.innerHTML=``;
        category[i].classList.add(`active_category`);
        for(let x =0;x<category.length;x++){
            if(i!==x && category[x].classList.contains(`active_category`)){
                category[x].classList.remove(`active_category`);
            }
        }
        bookCardResponse(i,startIndex);
    })
}
loadMoreBtn.addEventListener(`click` , function (){
    startIndex += 6;
    let numberOfCategory;
    for(let i = 0;i<category.length;i++){
        if(category[i].classList.contains(`active_category`)){
            numberOfCategory = i;
        }
    }
    bookCardResponse(numberOfCategory,startIndex);
})
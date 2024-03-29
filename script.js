const addButton = document.querySelector('#addBook')
const addForm = document.querySelector('.bookform')
const closeButton = document.querySelector('#closeForm')
const submitBook = document.querySelector('#booksubmit')
const formElements = [...document.getElementById("addForm").elements]
const libraryDisplay = document.querySelector('.library');

let checkBox = false
let myLibrary = [];
let localStore = []

function Book(author, title, pagecount, isRead) {
	this.author = author
	this.title = title
	this.pagecount = pagecount
	this.isRead = isRead
}

function addBookToLibrary(author, title, pagecount, isRead) {
  myLibrary.push(new Book(author, title, pagecount, isRead))
}

function getFormValues(){
	return formElements.map(element => {
		return (element.type == 'checkbox') ? element.checked : element.value;
	})
}

function emptyFormInputs(){
	formElements.forEach(element => element.value = null)
}

function trimString(string){
    return string.toString().replace(/^\s*/, "").replace(/\s*$/, "");
}

function checkEmptyValues(arr){
	return arr.some(value => trimString(value) == "" );
}

function closeForm(){
	addForm.style.display = 'none'
}

function openForm(){
	addForm.style.display = 'flex'
}

function addButtons(bookDiv){
	let toggleBook = document.createElement('button')
		toggleBook.setAttribute("id", "toggleRead")
		if(myLibrary[bookDiv.dataset.attribute].isRead) toggleBook.innerText = 'UnRead';
		else toggleBook.innerText = 'Read';
		toggleBook.addEventListener('click', () => toggleBookStatus(toggleBook));
		bookDiv.appendChild(toggleBook);
	

	let deleteBook = document.createElement('button')
		deleteBook.setAttribute("id", "removeBook")
		deleteBook.innerText = 'Remove Book'
		deleteBook.addEventListener('click', () => removeCurrentBook(deleteBook));
		bookDiv.appendChild(deleteBook);
	
}

function removeCurrentBook(button){
	let index = button.parentElement.dataset.attribute
	myLibrary.splice(index, 1)
	render();
}

function toggleBookStatus(button){
	let index = button.parentElement.dataset.attribute
	let bookDiv = button.parentElement
	let readText = bookDiv.querySelector('#readText')
	if(myLibrary[index].isRead == true){
		myLibrary[index].isRead = false
		button.innerText = "Read"
		readText.innerText = 'Not read yet'
	}else{
		myLibrary[index].isRead = true;
		button.innerText = 'UnRead'
		readText.innerText = 'Read'
	}
}

function createElements(book, bookDiv){
		for(key in book){
			let bookContent = book[key].toString();
			let content;
			if(key == 'author'){
				content = document.createElement('h3')
				content.innerText = bookContent
				bookDiv.appendChild(content)
			}else if(key == "pagecount"){
				content = document.createElement('p')
				content.innerText = `${bookContent} pages`
				bookDiv.appendChild(content)

			}else if(key == "isRead"){
				content = document.createElement('p')
				 if(bookContent == 'true') content.innerText = "Read" 
				 else content.innerText = "Not read yet"
				 content.setAttribute('id', 'readText')
				bookDiv.appendChild(content);
			}else{
				content = document.createElement('p')
				content.innerText = bookContent;
				bookDiv.appendChild(content)
			}
		}
}

function clearDisplay(){
	while (libraryDisplay.firstChild) {
   	 libraryDisplay.removeChild(libraryDisplay.firstChild);
  	}
}

function render(){
	clearDisplay();
	myLibrary.forEach(book => {
		let bookDiv = document.createElement('div');
		bookDiv.setAttribute('data-attribute', myLibrary.indexOf(book));
		bookDiv.classList.add('book');
		createElements(book, bookDiv);
		addButtons(bookDiv);
		libraryDisplay.appendChild(bookDiv);
	})
	localStorage.setItem('localLibrary', JSON.stringify(myLibrary));
}

function defaultBooks(){
	addBookToLibrary('The Catcher in the Rye', "J.D Salinger", 277, true);
	addBookToLibrary('A Wild Sheep Chase', "Haruki Murakami", 358, true);
	addBookToLibrary('To Kill A Mockingbird', "Harper Lee", 230, true);
	addBookToLibrary('Lord of the Flies', "William Golding", 351, false);
	addBookToLibrary('Catch-22', "Joseph Heller", 451, false);
	render();
}

addButton.addEventListener('click', openForm)

closeButton.addEventListener('click', closeForm)

submitBook.addEventListener('click', () =>{
	let valueArr = getFormValues()
		if(checkEmptyValues(valueArr)){
			alert("ERROR! Please fill all of the inputs")
			emptyFormInputs()
			return

		}else{
			addBookToLibrary.apply(this, valueArr);
			closeForm()
			emptyFormInputs()
			render()
		}
})


if(localStorage.getItem('localLibrary')){
	myLibrary = JSON.parse(localStorage.getItem('localLibrary'));		//INIT with default if no local storage found.
	render()
}else{
	defaultBooks();
}

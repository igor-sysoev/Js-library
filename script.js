const addButton = document.querySelector('#addBook')
const addForm = document.querySelector('.bookform')
const closeButton = document.querySelector('#closeForm')
const submitBook = document.querySelector('#booksubmit')
const formElements = [...document.getElementById("addForm").elements]
const libraryDisplay = document.querySelector('.library');

let removeBookButtons
let toggleReadButtons
let checkBox = false
let myLibrary = [];

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

function addRemoveBookButton(bookDiv){
	let toggleBook = document.createElement('button')
		toggleBook.setAttribute("id", "toggleRead")
		toggleBook.innerText = 'Read';
		bookDiv.appendChild(toggleBook);
		
	let deleteBook = document.createElement('button')
		deleteBook.setAttribute("id", "removeBook")
		deleteBook.innerText = 'Remove Book'
		bookDiv.appendChild(deleteBook);

}

function addEventListeners(){
	removeBookButtons.forEach(button => {
		button.addEventListener('click', (e) => {
			let index = button.parentElement.dataset.attribute
			myLibrary.splice(index, 1);
			libraryDisplay.removeChild(button.parentElement)
		})
})
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
				bookDiv.appendChild(content);

			}else{
				content = document.createElement('p')
				content.innerText = bookContent;
				bookDiv.appendChild(content)
			}
		}
}

function render(){
	let book = myLibrary[myLibrary.length - 1]
	let bookDiv = document.createElement('div');
	bookDiv.classList.add('book');
	createElements(book, bookDiv)
	addRemoveBookButton(bookDiv);
	libraryDisplay.appendChild(bookDiv);

	bookDiv.setAttribute('data-attribute', myLibrary.length - 1);
	removeBookButtons = document.querySelectorAll('#removeBook');
	addEventListeners();
}


addButton.addEventListener('click', openForm)

closeButton.addEventListener('click', closeForm)



submitBook.addEventListener('click', () =>{
	let valueArr = getFormValues();
		if(checkEmptyValues(valueArr)){
			alert("ERROR! Please fill all of the inputs")
			emptyFormInputs();
			return

		}else{
			addBookToLibrary.apply(this, valueArr);
			render();
			closeForm()
			emptyFormInputs()
		}
})


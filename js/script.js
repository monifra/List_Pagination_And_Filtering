/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/***
List Filter and Pagination project uses pagination technique to show maximum ten students at the page.
It also creates a navigation to let the user see the rest of the student by clicking on links inside the navigation.

I'm trying for the "Exceeds Expectations" grade.
***/

const studentList = document.querySelectorAll('li'); //variable storing list of students
const perPage = 10; //variable storing the number of items to show on page at one time

/***
Crating the search bar
***/

const headerStudentSearch = document.getElementsByClassName('page-header')[0]; //selecting div with class page-header
const divStudentSearch = document.createElement('div'); //creating new div
divStudentSearch.className = 'student-search';
const inputStudentSearch = document.createElement('input'); //creating an input for search
inputStudentSearch.setAttribute('placeholder','Search for students...');
const buttonStudentSearch = document.createElement('button'); //creting a button for search
buttonStudentSearch.textContent = 'Search';
divStudentSearch.appendChild(inputStudentSearch);
divStudentSearch.appendChild(buttonStudentSearch);
headerStudentSearch.appendChild(divStudentSearch); //appending our new search bar to the existing div

/***
Creating the information that no matches were find by search and append it to the page
***/


const pNoResult = document.createElement('p');
pNoResult.textContent = 'No students were found';
pNoResult.style.color = 'red';
pNoResult.style.display = 'none';
divStudentSearch.appendChild(pNoResult);

/***
Creating the no result information
***/



const searchIt = (searchInput, list) =>{
  const searchResult = [];
  for(let i =0; i< list.length; i++){

    if(searchInput.value.length !== 0 && list[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())){
      list[i].style.display="";
      searchResult.push(list[i]);

    }else{
      list[i].style.display="none";
    }
  }

  showPage(searchResult,1);
  removePageLinks();
  for(let i = 0; i<searchResult.length; i++){
  appendPageLinks(searchResult,i);
  }
};

/***
showPage function hides all of the list items exept for those that you want to show on the page.
***/
const showPage = (list,page) => { //list will be a list of student, page will be a number of page
  let startIndex = ( page*perPage) - perPage; //the index number of first item that will be shown
  let endIndex = page*perPage -1;// the index number of last item that will be shown on a page

  if(list.length === 0){
    pNoResult.style.display = '';
  }
  for(let i=0; i < list.length; i++){
    if( i >= startIndex && i <= endIndex){ //if an index is between startIndex and endIndex
      list[i].style.display = ""; // list items with a matching index will be shown
    }else{
      list[i].style.display="none"; //the rest of a list items will be hidden
    }
  }
};

const appendPageLinks = list =>{

  const numberOfPages = Math.ceil(list.length/perPage); // dividing length of list by number of list items per page gives us a number of pages we need
  const divPage = document.querySelector('div.page'); // selecting the div with class name = page

  const divPagination = document.createElement('div'); //creating new div element
  divPagination.className = "pagination"; // giving new div a class name = pagination
  divPage.appendChild(divPagination); // appending new divPagination to divPage as a child

  const ul = document.createElement('ul'); //creating new ul element
  divPagination.appendChild(ul); //appending new ul as a child to divPagination element

  for(let i=0; i < numberOfPages; i++){
    const li = document.createElement('li'); // creating new li
    const a = document.createElement('a'); // creating new a
    a.setAttribute('href','#'); // givin a an href attribute = #
    a.textContent = i+1; //setting textContent of a
    li.appendChild(a); // appending a as a child to li
    ul.appendChild(li); // appending li as a child to ul
  }

    const firstLi = ul.firstElementChild; // selecting a first li element as a first child of ul
    const a = document.querySelectorAll('a'); // sellecting all 'a' tags
    firstLi.firstElementChild.className = 'active'; // setting the class of first 'a' tag to 'active'

    for(let i=0; i< numberOfPages; i++){
      a[i].addEventListener('click', (e)=>{ // adding a listener for click on a tags
        showPage(list,i+1); // when an 'a' tag is clicked showPage will choose a page with the right 'a' tag
        for(let k=0; k< numberOfPages; k++){
          a[k].className = ""; // leaving class name empty for all 'a' tags
          e.target.className = 'active'; // adding an 'active' class to an 'a' tag that was clicked
        }
      });
    }
};

/***
Remove pagination function
***/

const removePageLinks = () =>{
  const divPage = document.querySelector('div.page'); //selecting parent
  const divPagination = document.querySelector('div.pagination'); //selecting child
  divPage.removeChild(divPagination);//removing child from parent
};

/***
Event listener for search button
***/

buttonStudentSearch.addEventListener('click', (e) => {
  e.preventDefault();
  searchIt(inputStudentSearch,studentList);
  // console.log('Submit button is functional!'); //REMOVE
});


inputStudentSearch.addEventListener('keyup', () => {
  searchIt(inputStudentSearch,studentList);
  // console.log('Keyup event on the Search input is functional!'); //REMOVE
});


showPage(studentList,1); //running this function to show the first page of student list
appendPageLinks(studentList);

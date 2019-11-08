/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/***
List Filter and Pagination project uses pagination technique to show maximum ten students at the page.
It creates a navigation to let the user see the rest of the student by clicking on links inside the navigation.
It has a search bar that allows to search the list of student,
shows ones that match,
adds pagination if there are more than ten results,
ajust in real time when you change the words you search,
and throws an error message when no match were found.

I'm trying for the "Exceeds Expectations" grade and I want to get "Needs Work" when something doesn't work.
Extra credit solution:
-search bar,
-pagination in search results,
-error message when there is no match,
-keyup event to show changes in search in real time

***/

/***
Global variables
***/

const studentList = document.querySelectorAll('li'); //variable storing list of students
const perPage = 10; //variable storing the number of items to show on page at one time

/***
Search bar. Creating elements of the search bar and append them to the page.
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
Error message. When no matches were found by search, it appears on the page.
***/

const pNoResult = document.createElement('p');
const divNoResult = document.createElement('div');
const h2 = document.querySelector('h2');
pNoResult.textContent = 'No students were found'; // setting text for errror message
pNoResult.style.color = 'red'; //setting error message color  to red
pNoResult.style.display = 'none'; // setting display to none so we can see error only when we want
h2.appendChild(pNoResult); //appending error message to h2

/***
searchIt function. It looks for matches between content of search input and our list of students. Then it stores the results
in array, handles when there is no match by throwing error messsage and adds new pagination for our search results.
***/

const searchIt = (searchInput, list) =>{ //function accepts two parameters inpu field and list
  const searchResult = []; //array to store search result

  for(let i =0; i< list.length; i++){
    // if(searchInput.value.length !== 0 && list[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())){
    if(list[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())){ //if the search phrase is included in our list of students
      list[i].style.display=""; // we are displaying this students
      searchResult.push(list[i]); // and stores them in our array
    }else{
      list[i].style.display="none"; // when there is no match, this students we're hidding
    }
  }
  if(searchResult.length === 0 && searchInput.value.length > 0){  // if we haven't find match and the value of input field is longer than 0
    pNoResult.style.display = ''; //displays error message
  } else{
    pNoResult.style.display = 'none'; // else hides error message
  }
  showPage(searchResult,1); //shows the first page of the search results
  removePageLinks(); // removes old pagination for list of students
  appendPageLinks(searchResult); //adds new pagination for search result list
};

/***
showPage function hides all of the list items exept for those that you want to show on the page.
***/

const showPage = (list,page) => { //list will be a list of student, page will be a number of page
  let startIndex = ( page*perPage) - perPage; //the index number of first item that will be shown
  let endIndex = page*perPage -1;// the index number of last item that will be shown on a page
  for(let i=0; i < list.length; i++){
    if( i >= startIndex && i <= endIndex){ //if an index is between startIndex and endIndex
      list[i].style.display = ""; // list items with a matching index will be shown
    }else{
      list[i].style.display="none"; //the rest of a list items will be hidden
    }
  }
};

/***
appendPageLinks function appends the pagination to the page. It accepts one argument the list it will be used on.
It seets how many student per page we want to have, divides student list into parts, creates list for each page, creates working pagination links.
***/

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
Remove pagination function.
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
});

/***
Keyup for search input. It adds real time search experience
***/

inputStudentSearch.addEventListener('keyup', () => {
  searchIt(inputStudentSearch,studentList);
});

showPage(studentList,1); //running this function to show the first page of student list
appendPageLinks(studentList); // appends the pagination links

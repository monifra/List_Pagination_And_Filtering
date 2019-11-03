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

    for(let i=0; i<= numberOfPages; i++){
      a[i].addEventListener('click', (e)=>{ // adding a listener for click on a tags
        showPage(studentList,i+1); // when an 'a' tag is clicked showPage will choose a page with the right 'a' tag
        for(let k=0; k<= numberOfPages; k++){
          a[k].className = ""; // leaving class name empty for all 'a' tags
          e.target.className = 'active'; // adding an 'active' class to an 'a' tag that was clicked
        }
      });
    }
};

showPage(studentList,1); //running this function to show the first page of student list
appendPageLinks(studentList);

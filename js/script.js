/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing


/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.

   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/
const studentList = document.querySelectorAll('li');
const perPage = 10;
/***
   Create the `showPage` function to hide all of the items in the
   list except for the ten you want to show.

   Pro Tips:
     - Keep in mind that with a list of 54 students, the last page
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when
       you initially define the function, and it acts as a variable
       or a placeholder to represent the actual function `argument`
       that will be passed into the parens later when you call or
       "invoke" the function
***/
const showPage = (list,page) => { // list will be a list of student, page will be a number of page
  let startIndex = ( page*perPage) - perPage;
  let endIndex = page*perPage -1;

  for(let i=0; i < list.length; i++){
    if( i >= startIndex && i <= endIndex){
      list[i].style.display = "";
    }else{
      list[i].style.display="none";
    }
  }
};
/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/
const appendPageLinks = list =>{

  const numberOfPages = Math.ceil(list.length/perPage);
  const divPage = document.querySelector('div.page');

  const divPagination = document.createElement('div');
  divPagination.className = "pagination";
  divPage.appendChild(divPagination);

  const ul = document.createElement('ul');
  divPagination.appendChild(ul);

  for(let i=0; i < numberOfPages; i++){
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.setAttribute('href','#');
    a.textContent = i+1;
    li.appendChild(a);
    ul.appendChild(li);
    }

    const firstLi = ul.firstElementChild;
    const a = document.querySelectorAll('a');
    firstLi.firstElementChild.className = 'active';

    for(let i=0; i<= numberOfPages; i++){
      a[i].addEventListener('click', (e)=>{
        showPage(studentList,i+1);
        for(let k=0; k<= numberOfPages; k++){
          a[k].className = "";
          e.target.className = 'active';
        }
      });
    }
};

showPage(studentList,1);
appendPageLinks(studentList);

// Remember to delete the comments that came with this file, and replace them with your own code comments.

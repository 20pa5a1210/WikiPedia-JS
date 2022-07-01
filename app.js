
const url =
  'https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';

  const form = document.querySelector('#form')
  const input = document.querySelector('#input')
  const button = document.querySelector('#button')
  const results = document.querySelector('#results')
  const err = document.querySelector('.err')
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value;
  if (!value) {
    err.innerHTML = `<div id="error" class="error text-center w-full">please enter valid search term</div>`;
    return;
  }
  fetchPages(value);
});

const fetchPages = async (searchValue) => {
  err.innerHTML = `<div class="loading "></div>`;

  try {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const results = data.query.search;
    if (results.length < 1) {
      err.innerHTML = `<div class="error  w-full">
      no matching results. Please try again.
     </div>

      `;
      return;
    }
    renderResults(results);
  } catch (error) {
    console.log(error);
    err.innerHTML = `<div class="error">there was an error...</div>`;
    return;
  }
};

const renderResults = (list) => {
  const cardsList = list
    .map((item) => {
      const { title, snippet, pageid } = item;
      return `
      
      <div class=" m-2 hover:bg-black hover:opacity-80 rounded-sm 
      bg-gray-300 shadow-md hover:text-white">
         <a href="http://en.wikipedia.org/?curid=${pageid}" target="_blank">
  
                 <h1 class="text-indigo-700 text-4xl p-2">${title}</h1>
                 <p class="p-4">${snippet}</p>
  
         </a>
     </div>  

      `;
    })
    .join('');

  results.innerHTML = cardsList;
};

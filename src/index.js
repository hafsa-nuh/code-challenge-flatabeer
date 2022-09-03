// fetching request by making it global
const baseURL = "http://localhost:3000";

// fetching request by using GET and async method
async function getRequest(beer) {
  const responseFromDB = await fetch(baseURL + beer, { method: "GET" })
  .then(async (response) => { // to have a defaul if the date isnt found
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return "Did not get data";
    }
  })
  .catch((error) => {console.log(error);});return responseFromDB;
};


// geting all the beers data 
async function handleRequest() {
  const beers = await getRequest("/beers");
  return beers;
};

// the header navbar [ ul - id = beer-list]
handleRequest().then((beers) => {
  const navUl = document.querySelector('#beer-list')
  beers.forEach(beer =>{
    const beerNameList = document.createElement('li')
    beerNameList.textContent = beer.name
    beerNameList.setAttribute("id", beer.id);
    // add event listen to the beernamelist
    beerNameList.addEventListener("click", () => handleMain(beer))
    navUl.appendChild(beerNameList)
  })
});

//Getting the 1ST beer by ID and displaying it
/** /** 1 contains image ,name & discription  - [id = beer-detail ] */ 
function handleMain(beerInfo) {
  // console.log({ id, beerInfo });

  // targeting the elements by ID
  const name = document.querySelector('#beer-name')
  const image = document.querySelector('#beer-image')
  const descrip = document.querySelector('#beer-description')

  // assigning their respectful values
  name.innerText = beerInfo.name
  image.setAttribute("src", beerInfo.image_url);
  image.setAttribute("alt", beerInfo.name);
  descrip.innerText = beerInfo.description

  /** 3 contains reviews h3,ul,li */
  const reviewList = document.querySelector('#review-list')
  reviewList.innerHTML = ""
  beerInfo.reviews.forEach(review => {
    //create a list for each review
    const newList = document.createElement('li')
    newList.textContent = review
    reviewList.appendChild(newList)
  })
}

// /** 4  contains review submit form   and updating the review */ 
document.addEventListener('DOMContentLoaded', () =>{
  document.getElementById('review-form').addEventListener('submit', event=>{
    event.preventDefault();
    const form = event.target;
    document.getElementById('review-list').innerHTML += `<li>${form.review.value}</li>`;
    form.reset();
  })
})


// /** 2 contains update form {description-form} */
const updatePatch=()=> {
  fetch(`http://localhost:3000/beers/${id_element}`,{
    method : "PATCH",
    headers : {
      "content-type" : "application/json; charset =utf-8"
    },
    body : JSON.stringify({
      "description" : description.value
    })
  }).then(response=> response.json())
  .then(beerdata => console.log(beerdata))
}

const updateFormDescription = ()=> {
  const descriptionForm = document.querySelector("#description-form");
  descriptionForm.addEventListener("submit",(event)=>{
    event.preventDefault();
    const updatedDescription = document.querySelector("#description");
    const descriptionToUpdate = document.querySelector("#beer-description");
    descriptionToUpdate.textContent = updatedDescription.value;
    descriptionForm.reset(); // reseting the previous description to the updated one
  })
  updatePatch()
}
updateFormDescription()





  

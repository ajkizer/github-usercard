/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 
*/

let cards = document.querySelector(".cards");
axios.get("https://api.github.com/users/ajkizer").then(response => {
  let cardData = response.data;
  let newCard = createCard(cardData);
  cards.appendChild(newCard);
});

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:
<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function createCard(data) {
  //create elements
  const card = document.createElement("div");
  const cardShown = document.createElement("div");
  card.appendChild(cardShown);
  const img = document.createElement("img");
  cardShown.appendChild(img);
  const cardInfo = document.createElement("div");
  cardShown.appendChild(cardInfo);
  const heading = document.createElement("h3");
  const userName = document.createElement("p");
  const location = document.createElement("p");
  const profile = document.createElement("p");
  const profileLink = document.createElement("a");
  const followers = document.createElement("p");
  const following = document.createElement("p");
  let bio = document.createElement("p");
  const calendarDiv = document.createElement("div");
  const calendar = document.createElement("img");
  card.appendChild(calendarDiv);
  calendarDiv.appendChild(calendar);
  // const btnDiv = document.createElement("div");
  // const button = document.createElement("span");
  // btnDiv.appendChild(button);
  // card.appendChild(btnDiv);

  const list = [
    heading,
    userName,
    location,
    profile,
    followers,
    following,
    bio
  ];

  list.forEach(item => cardInfo.appendChild(item));
  profile.appendChild(profileLink);

  //add classes
  card.classList.add("card");
  cardShown.classList.add("card-shown");
  cardInfo.classList.add("card-info");
  heading.classList.add("name");
  userName.classList.add("username");
  calendar.classList.add("calendar");
  calendarDiv.classList.add("card-hidden");
  // btnDiv.classList.add("button");
  // button.classList.add("buttonTxt");

  //add content
  img.src = data["avatar_url"];
  heading.textContent = data["name"];
  userName.textContent = data["login"];
  location.textContent = data["location"];
  profileLink.href = data["html_url"];
  profileLink.textContent = data["html_url"];
  profileLink.target = "_blank";
  followers.textContent = `Followers: ${data["followers"]}`;
  following.textContent = `Following: ${data["following"]}`;
  bio.textContent = data["bio"];
  calendar.src = `http://ghchart.rshah.org/${data["login"]}`;
  // button.textContent = "\u2193";

  return card;
}

//get cards from all followers
axios.get("https://api.github.com/users/ajkizer/followers").then(response => {
  response.data.forEach(item =>
    axios.get(`https://api.github.com/users/${item.login}`).then(response => {
      let cardData = response.data;
      let newCard = createCard(cardData);
      cards.appendChild(newCard);
    })
  );
});

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

const API_KEY = "1ff891b6113246788e1d2a1cc1fe6460";
// const API_KEY = "9e9b7d1c2042476586e5d3584b6e7cab";
const URL = "https://newsapi.org/v2/everything?q=";

let spinner = document.querySelector(".spinner");
let mainBox = document.querySelector(".main-container");

window.addEventListener("load", () => fetchNews("India"));

// ----------------------FetchNews Function

async function fetchNews(query) {
  spinner.classList.remove("display");
  mainBox.style.display = "none";
  const res = await fetch(`${URL}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}

// -----------------------Data Bind Function

function bindData(newsdata) {
  spinner.classList.add("display");
  mainBox.style.display = "flex";
  const cardsContainer = document.getElementById("c-container");
  const templateCard = document.getElementById("template-card");

  cardsContainer.innerHTML = " ";

  newsdata.forEach((element) => {
    if (!element.urlToImage) return;

    const cardClone = templateCard.content.cloneNode(true);

    fillDataInCard(cardClone, element);
    cardsContainer.appendChild(cardClone);
  });
}

// ------------------Data Fill in Card Function

function fillDataInCard(cardClone, element) {
  const newsImg = cardClone.querySelector("#nimage");
  const newstitle = cardClone.querySelector("#ctitle");
  const newsSource = cardClone.querySelector("#nsource");
  const cardText = cardClone.querySelector("#ndescription");

  newsImg.src = element.urlToImage;

  newstitle.innerText = element.title;

  // 20 Word Description Code

  let newwords = element.description;

  let words = newwords.split(/\s+/);

  let twentywords = words.slice(0, 19);

  let result = twentywords.join(" ");

  cardText.innerText = result;


  // Code that covert Time into Local Time Zone

  const date = new Date(element.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
  });

  newsSource.innerText = `${element.source.name}. ${date}`;


  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(element.url, "_blank");
  });

}


// Code For navigation

let element = document.getElementById("India");
element.classList.add("active");


function search(navVal) 
{

  // Code For Active Class


  if (navVal === "ser")
   { 
    if(element === null)
     {
       element = null;
     }
     else
     {

       element.classList.remove("active");
       element = null;
     }
    
  } 
  else 
  {
     EmptyInputBox();
    let newelement = document.getElementById(navVal);
    console.log(newelement);

    if (element === null) 
    {
      newelement.classList.add("active");
      element = newelement;
    } 
    else 
    {
      element.classList.remove("active");
      newelement.classList.add("active");
      element = newelement;
    }

  }

  // Code For Today News

  if (navVal === "Today") 
  {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 1);
    const Tdate = currentDate.toLocaleDateString();
    TodayNews(Tdate);
  } 
  else if (navVal === "ser") 
  {
    const int = document.querySelector(".news-input").value;
    int.toLowerCase();
    fetchNews(int);
    // count = 1;
  } 
  else
   {
       fetchNews(navVal);
   }

}


// Today News Function

async function TodayNews(TDate) 
{
  spinner.classList.remove("display");
  mainBox.style.display = "none";
  const res = await fetch(`${URL}World&from=${TDate}&apiKey=${API_KEY}`);
  const data = await res.json();
  spinner.classList.add("display");

  if (data.articles.length === 0) 
  {
    mainBox.innerHTML =
      "<h2> Looks like there's no news available right now.</h2>";
    mainBox.classList.add("no-news");
    return;
  }

  bindData(data.articles);
}

function EmptyInputBox()
{
  const int = document.querySelector(".news-input");
  int.value = "";
}

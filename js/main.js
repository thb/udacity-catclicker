var allCats = [
  {
    name: "Minette",
    img: "./img/cat1.jpg"
  },
  {
    name: "Pépette",
    img: "./img/cat2.jpg"
  },

  {
    name: "Nounouille",
    img: "./img/cat3.jpg"
  },

  {
    name: "Nounouille",
    img: "./img/cat3.jpg"
  },

  {
    name: "Nounouille",
    img: "./img/cat3.jpg"
  }
];

function htmlToElement(html) {
  var template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

const template = Handlebars.compile(
  document.getElementById("cat-template").innerHTML
);

const catListEl = document.querySelector(".cat-list");

allCats.forEach(function(cat) {
  const catEl = htmlToElement(template(cat));
  catListEl.appendChild(catEl);
});

catListEl.addEventListener("click", respondToCatClick, false);

function respondToCatClick(event) {
  if (event.target.nodeName == "IMG") {
    const catPictureEl = event.target;
    const clickCounterEl = catPictureEl.parentNode.querySelector(".clicks");
    const counts = parseInt(clickCounterEl.innerText);
    clickCounterEl.innerText = counts + 1;
  }
}

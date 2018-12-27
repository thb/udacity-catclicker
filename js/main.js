(function() {
  function htmlToElement(html) {
    const template = document.createElement("template");
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
  }

  function siblingPosition(child) {
    let index = 0;
    while ((child = child.previousSibling) != null) index++;
    return index;
  }

  const model = {
    init() {
      this.catList = [
        {
          name: "Minette",
          img: "./img/cat1.jpg",
          clickCount: 0
        },
        {
          name: "Pépette",
          img: "./img/cat2.jpg",
          clickCount: 0
        },
        {
          name: "Nounouille",
          img: "./img/cat3.jpg",
          clickCount: 0
        },
        {
          name: "Pupuce",
          img: "./img/cat4.jpg",
          clickCount: 0
        }
      ];
      this.currentCat = 0;
    },

    getAllCats() {
      return this.catList;
    },

    setCurrentCat(id) {
      this.currentCat = id;
    },

    getCurrentCat() {
      return this.catList[this.currentCat];
    },

    clickCurrentCat() {
      this.catList[this.currentCat].clickCount++;
    }
  };

  const octopus = {
    getCats() {
      return model.getAllCats();
    },

    getCurrentCat() {
      return model.getCurrentCat();
    },

    selectCat(id) {
      model.setCurrentCat(id);
      view.renderCurrentCat();
    },

    clickCat() {
      model.clickCurrentCat();
      view.renderCurrentCat();
    },

    init() {
      model.init();
      view.init();
    }
  };

  const view = {
    init() {
      this.catListItemTemplate = Handlebars.compile(
        document.getElementById("cat-list-item-template").innerHTML
      );
      this.catDetailsTemplate = Handlebars.compile(
        document.getElementById("cat-details-template").innerHTML
      );
      this.catListEl = document.querySelector(".cat__list");
      this.catDetailsEl = document.querySelector(".cat__details");
      this.renderList();
      this.renderCurrentCat();
      this.catListEl.addEventListener("click", this.respondToSelectCat);
      this.catDetailsEl.addEventListener("click", this.respondToClickCat);
    },

    renderList() {
      octopus.getCats().forEach(cat => {
        const catEl = htmlToElement(this.catListItemTemplate(cat));
        this.catListEl.appendChild(catEl);
      });
    },

    respondToSelectCat(event) {
      if (event.target.nodeName == "LI") {
        const catItemEl = event.target;
        octopus.selectCat(siblingPosition(catItemEl));
      }
    },

    renderCurrentCat() {
      const cat = octopus.getCurrentCat();
      const catDetailsEl = htmlToElement(this.catDetailsTemplate(cat));
      if (this.catDetailsEl.firstChild) {
        this.catDetailsEl.firstChild.remove();
      }
      this.catDetailsEl.appendChild(catDetailsEl);
    },

    respondToClickCat() {
      if (event.target.nodeName == "IMG") {
        console.log("click");
        octopus.clickCat();
      }
    }
  };

  octopus.init();
})();

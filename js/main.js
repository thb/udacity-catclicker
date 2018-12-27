(function() {
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

    incrementCounter() {
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
      catDetailsView.render();
    },

    clickCat() {
      model.incrementCounter();
      catDetailsView.render();
    },

    init() {
      model.init();
      catDetailsView.init();
      catListView.init();
    }
  };

  const catDetailsView = {
    init() {
      this.catDetailsEl = document.querySelector(".cat__details");
      this.render();
      this.catDetailsEl.addEventListener("click", this.respondToClickCat);
    },

    render() {
      const cat = octopus.getCurrentCat();
      this.catDetailsEl.querySelector("h1").innerText = cat.name;
      this.catDetailsEl.querySelector(".clicks").innerText = cat.clickCount;
      this.catDetailsEl.querySelector("img").src = cat.img;
    },

    respondToClickCat() {
      if (event.target.nodeName == "IMG") {
        octopus.clickCat();
      }
    }
  };

  const catListView = {
    init() {
      this.catListEl = document.querySelector(".cat__list");
      this.render();
      this.catListEl.addEventListener("click", this.respondToSelectCat);
    },

    render() {
      octopus.getCats().forEach(cat => {
        const itemEl = document.createElement("li");
        itemEl.innerText = cat.name;
        this.catListEl.appendChild(itemEl);
      });
    },

    respondToSelectCat(event) {
      if (event.target.nodeName == "LI") {
        const catItemEl = event.target;
        octopus.selectCat(siblingPosition(catItemEl));
      }
    }
  };

  octopus.init();
})();

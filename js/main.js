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
    },

    updateCurrentCat(catObj) {
      this.catList[this.currentCat] = catObj;
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

    updateCurrentCat(catObj) {
      model.updateCurrentCat(catObj);
      catDetailsView.render();
    },

    init() {
      this.showAdmin = false;
      model.init();
      catDetailsView.init();
      catListView.init();
      catAdminView.init();
    }
  };

  const catDetailsView = {
    init() {
      this.catDetailsEl = document.querySelector(".cat__details");
      this.render();
      this.catDetailsEl.addEventListener("click", event => {
        if (event.target.nodeName == "IMG") {
          octopus.clickCat();
        }
      });
    },

    render() {
      const cat = octopus.getCurrentCat();
      this.catDetailsEl.querySelector("h1").innerText = cat.name;
      this.catDetailsEl.querySelector(".clicks").innerText = cat.clickCount;
      this.catDetailsEl.querySelector("img").src = cat.img;
    }
  };

  const catListView = {
    init() {
      this.catListEl = document.querySelector(".cat__list");
      this.render();
      this.catListEl.addEventListener("click", event => {
        if (event.target.nodeName == "LI") {
          const catItemEl = event.target;
          octopus.selectCat(siblingPosition(catItemEl));
        }
      });
    },

    render() {
      octopus.getCats().forEach(cat => {
        const itemEl = document.createElement("li");
        itemEl.innerText = cat.name;
        this.catListEl.appendChild(itemEl);
      });
    }
  };

  const catAdminView = {
    init() {
      this.catAdminEl = document.querySelector(".cat__admin");
      this.catAdminOpenEl = document.querySelector(".cat__admin-open");
      this.catAdminCloseEl = document.querySelector(".cat__admin-close");
      this.catForm = document.querySelector(".cat__admin form");
      this.catAdminOpenEl.addEventListener("click", () => {
        octopus.showAdmin = true;
        this.render();
      });
      this.catAdminCloseEl.addEventListener("click", () => {
        octopus.showAdmin = false;
        this.render();
      });
      this.catForm.addEventListener("submit", event => {
        event.preventDefault();
        const formData = new FormData(this.catForm);
        let jsonObject = {};
        for (const [key, value] of formData.entries()) {
          jsonObject[key] = value;
        }
        octopus.updateCurrentCat(jsonObject);
        this.render();
      });
      this.render();
    },

    render() {
      const cat = octopus.getCurrentCat();
      this.catAdminEl.querySelector("input[name='name']").value = cat.name;
      this.catAdminEl.querySelector("input[name='img']").value = cat.img;
      this.catAdminEl.querySelector("input[name='clickCount']").value =
        cat.clickCount;
      if (octopus.showAdmin) {
        this.catAdminEl.hidden = false;
      } else {
        this.catAdminEl.hidden = true;
      }
    }
  };

  octopus.init();
})();

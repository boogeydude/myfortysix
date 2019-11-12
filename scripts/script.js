const sortSelect = document.querySelector("select#sort-by-select");
const highPeaksTable = document.querySelector('table#list-of-high-peaks');

class HighPeak {
  constructor(name, elevation) {
    this._name = name;
    this._nameFormatted = name.replace(/\s+/g, '-').toLowerCase();
    this._elevation = elevation;
    this._status = {
      isCompleted: false,
      dateCompleted: 'incomplete'
    }
  }
}

const highPeaksList = {
  highPeaks: [],
  createHighPeak: function(name, elevation) {
    this.highPeaks[this.highPeaks.length] = new HighPeak( name, elevation );
  },
  addHighPeaks: function() {
    this.createHighPeak('Mount Marcy', 5344);
    this.createHighPeak('Algonquin Peak', 5114);
    this.createHighPeak('Mount Haystack', 4960);
    this.createHighPeak('Mount Skylight', 4926);
    this.createHighPeak('Whiteface Mountain', 4867);
    this.createHighPeak('Dix Mountain', 4857);
    this.createHighPeak('Gray Peak', 4840);
    this.createHighPeak('Iroquois Peak', 4840);
    this.createHighPeak('Basin Mountain', 4827);
    this.createHighPeak('Gothics Mountain', 4736);
    this.createHighPeak('Mount Colden', 4714);
    this.createHighPeak('Giant Mountain', 4627);
    this.createHighPeak('Nippletop Mountain', 4620);
    this.createHighPeak('Santanoni Peak', 4607);
    this.createHighPeak('Mount Redfield', 4606);
    this.createHighPeak('Wright Peak', 4580);
    this.createHighPeak('Saddleback Mountain', 4515);
    this.createHighPeak('Panther Peak', 4442);
    this.createHighPeak('Tabletop Mountain', 4427);
    this.createHighPeak('Rocky Peak Ridge', 4420);
    this.createHighPeak('Macomb Mountan', 4405);
    this.createHighPeak('Armstrong Mountan', 4400);
    this.createHighPeak('Hough Peak Mountan', 4400);
    this.createHighPeak('Seward Mountan', 4361);
    this.createHighPeak('Mount Marshall', 4360);
    this.createHighPeak('Allen Mountain', 4340);
    this.createHighPeak('Big Slide Mountain', 4240);
    this.createHighPeak('Esther Mountain', 4340);
    this.createHighPeak('Upper Wolfjaw Mountain', 4185);
    this.createHighPeak('Lower Wolfjaw Mountain', 4175);
    this.createHighPeak('Street Mountain', 4166);
    this.createHighPeak('Phelps Mountain', 4161);
    this.createHighPeak('Mount Donaldson', 4140);
    this.createHighPeak('Seymour Mountain', 4120);
    this.createHighPeak('Sawteeth Mountain', 4100);
    this.createHighPeak('Cascade Mountain', 4098);
    this.createHighPeak('South Dix Mountain', 4060);
    this.createHighPeak('Porter Mountain', 4059);
    this.createHighPeak('Mount Colvin', 4057);
    this.createHighPeak('Mount Emmons', 4040);
    this.createHighPeak('Dial Mountain', 4020);
    this.createHighPeak('Grace Peak Mountain', 4012);
    this.createHighPeak('Blake Mountain', 3960);
    this.createHighPeak('Cliff Mountain', 3960);
    this.createHighPeak('Nye Mountain', 3895);
    this.createHighPeak('Couchsachraga Peak Mountain', 3820);
  },

  sort: {
    byName: function(a, b) {
      if ( a._name < b._name ) {
        return -1;
      }
      if ( a._name > b._name ) {
        return 1;
      }
      return 0;
    },
    byHigh: function(a, b) {
      return b._elevation - a._elevation;
    },
    byLow: function(a, b) {
      return a._elevation - b._elevation;
    },
    byCompleted: function(a, b) {
      return b._status.isCompleted - a._status.isCompleted;
    }
  }
}

const handlers = {
  toggleCompleted: function(highPeakName) {
    highPeaksList.highPeaks.forEach(highPeak => {
      if (highPeak._name === highPeakName) {
        let dateInput = document.querySelector(`tr[id=${highPeak._nameFormatted}] td[class=completed-form] input`);
        if (highPeak._status.isCompleted === false && dateInput.value === '') {
          return alert('Please fill in date completed before marking complete');
        } else {
          highPeak._status.isCompleted = !highPeak._status.isCompleted
          this.addDateCompleted(highPeak, dateInput);
          view.displayHighPeaks();
        }
      };
    })
  },

  addDateCompleted: function(highPeak, dateInput) {
    if (highPeak._status.isCompleted === true) {
      return highPeak._status.dateCompleted = dateInput.value;
    } else {
      return highPeak._status.dateCompleted = "incomplete";
    };
  }
}

const view = {
  displayHighPeaks: function(sortOption) {
    highPeaksTable.innerHTML = '';
    if (sortOption === "byCompleted") {
      highPeaksList.highPeaks.sort(highPeaksList.sort.byName);
    }
    highPeaksList.highPeaks.sort(highPeaksList.sort[sortOption]).forEach((highPeak, i) => {
      this.createHighPeakTr(highPeak, i);
    });
    this.updateCompletedCounters();
  },

  createHighPeakTr: function(highPeak, i) {
    let highPeakTr = document.createElement("tr");
    highPeakTr.id = highPeak._nameFormatted;
    highPeakTr.innerHTML = `<td class='number'>${i + 1}</td><td class='name'>${highPeak._name}</td><td class='elevation'>${highPeak._elevation}'</td><td class='date-completed'>Date: ${highPeak._status.dateCompleted}</td><td class='is-completed'></td><td class='completed-form'></td>`;
    highPeaksTable.appendChild(highPeakTr);

    let completedFormTd = document.querySelector(`tr[id=${highPeak._nameFormatted}] td[class=completed-form]`);
    completedFormTd.appendChild(this.createCompletedForm(highPeak)[0]); 
    completedFormTd.appendChild(this.createCompletedForm(highPeak)[1]); 
    completedFormTd.style.display = "none";

    let completedIconTd = document.querySelector(`tr[id=${highPeak._nameFormatted}] td[class=is-completed]`);
    completedIconTd.appendChild(this.createCompletedIcon(highPeak, completedFormTd));
  },

  createCompletedIcon: function(highPeak, completedFormTd) {
    let completedIcon = document.createElement("button");
    completedIcon.textContent = `${highPeak._status.isCompleted}`

    completedIcon.addEventListener("click", () => {
      if (highPeak._status.isCompleted === false) {
        completedFormTd.style.display = ''
      } else if (highPeak._status.isCompleted === true) {
        highPeak._status.isCompleted = false;
        highPeak._status.dateCompleted = "incomplete";
        this.displayHighPeaks();
      }
    })

    return completedIcon;
  },

  createCompletedForm: function(highPeak) {
    let dateCompletedInput = document.createElement("input");
    dateCompletedInput.type = "date";
    if (highPeak._status.isCompleted === true) {
      dateCompletedInput.disabled = true;
      dateCompletedInput.style.display = 'none';
    }

    let completeButton = document.createElement("button");
    completeButton.textContent = "Complete";
    completeButton.addEventListener("click", function() {
      handlers.toggleCompleted(highPeak._name);
    });

    return [dateCompletedInput, completeButton]
  },

  updateCompletedCounters: function() {
    let completedCount = 0;
    let notCompletedCount = 0;
    highPeaksList.highPeaks.forEach(highPeak => {
      if (highPeak._status.isCompleted === true) {
        completedCount ++
      } else {
        notCompletedCount ++
      }
    })
    document.querySelector("span.complete-count").innerHTML = completedCount;
    document.querySelector("span.incomplete-count").innerHTML = notCompletedCount;
  },

  setupEventListeners: function() {
    sortSelect.addEventListener("change", () => {
      this.displayHighPeaks(sortSelect.value);
    })
  }
}

highPeaksList.addHighPeaks();
view.displayHighPeaks();
view.setupEventListeners();
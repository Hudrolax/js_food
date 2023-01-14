function calculator() {
  const activityLevel = {
    low: 1.2,
    small: 1.375,
    medium: 1.55,
    high: 1.725,
  };

  const calculator = {
    male: false,
    weight: 0,
    height: 0,
    age: 0,
    activity: activityLevel.small,

    calculate() {
      if (!this.weight || !this.height || !this.age) {
        return 0;
      }
      let bmr = 0;
      if (this.male) {
        bmr = 88.36 + 13.4 * this.weight + 4.8 * this.height + 5.7 * this.age;
      } else {
        bmr = 447.6 + 9.2 * this.weight + 3.1 * this.height + 4.3 * this.age;
      }
      return Math.round(bmr * this.activity);
    },

    setResult() {
      document.querySelector(".calculating__result>span").textContent =
        this.calculate();
    },

    setConstitution(label, val) {
      this[label] = val;
    },
  };

  function setActivityAndCalc(elements, element, param, val) {
    elements.forEach((item) =>
      item.classList.remove("calculating__choose-item_active")
    );
    element.classList.add("calculating__choose-item_active");
    calculator[param] = val;
    calculator.setResult();
  }

  // *** gender ***
  const genders = [
    document.querySelector("#female"),
    document.querySelector("#male"),
  ];
  const storageGender = localStorage.getItem("male")
    ? localStorage.getItem("male")
    : false;
  setActivityAndCalc(
    genders,
    storageGender ? genders[1] : genders[0],
    "male",
    storageGender
  );
  genders.forEach((item, i) => {
    item.addEventListener("click", () => {
      localStorage.setItem("male", i == 1);
      setActivityAndCalc(genders, item, "male", i == 1);
    });
  });

  // *** constitution ***
  const constitutions = [
    document.querySelector("#height"),
    document.querySelector("#weight"),
    document.querySelector("#age"),
  ];

  constitutions.forEach((item) => {
    const storageItem = localStorage.getItem(item.id);
    item.value = storageItem ? storageItem : null;
    calculator.setConstitution(item.id, +item.value);
    item.type = "number";
    item.addEventListener("input", (e) => {
      localStorage.setItem(e.target.id, e.target.value);
      calculator.setConstitution(e.target.id, +e.target.value);
      calculator.setResult();
    });
  });

  // *** activity ***
  const activity = [
    document.querySelector("#low"),
    document.querySelector("#small"),
    document.querySelector("#medium"),
    document.querySelector("#high"),
  ];

  const storageActivity = localStorage.getItem("activity");
  if (storageActivity) {
    const element = activity.filter(
      (element) => element.id == storageActivity
    )[0];
    setActivityAndCalc(
      activity,
      element,
      "activity",
      activityLevel[element.id]
    );
  }

  activity.forEach((item) => {
    item.addEventListener("click", () => {
      setActivityAndCalc(activity, item, "activity", activityLevel[item.id]);
      localStorage.setItem("activity", item.id);
    });
  });

  calculator.setResult();
}

export default calculator;

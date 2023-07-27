const screen = document.querySelector(".screen");

const multiplicativeActions = {
  // prettier-ignore
  "×": (value1, value2) => value1 * value2,
  "÷": (value1, value2) => value1 / value2,
};

const actions = {
  "+": (value1, value2) => value1 + value2,
  "-": (value1, value2) => value1 - value2,
  ...multiplicativeActions,
};

let insertedValues = [];

const isLastValueOperation = () =>
  !!actions[insertedValues[insertedValues.length - 1]];

const calculateAndDisplayResult = () => {
  if (isLastValueOperation()) {
    insertedValues.pop();
  }

  while (insertedValues.length !== 1) {
    const indexOfMultiplicative = insertedValues.findIndex(
      (value) => !!multiplicativeActions[value]
    );

    if (indexOfMultiplicative !== -1) {
      const operator = insertedValues[indexOfMultiplicative];
      const value1 = Number(insertedValues[indexOfMultiplicative - 1]);
      const value2 = Number(insertedValues[indexOfMultiplicative + 1]);

      const result = actions[operator](value1, value2);
      insertedValues.splice(indexOfMultiplicative - 1, 3, result);
      continue;
    }

    const result = actions[insertedValues[1]](
      Number(insertedValues[0]),
      Number(insertedValues[2])
    );
    insertedValues.splice(0, 3, result);
  }

  screen.textContent = insertedValues[0];
};

const displayInsertedValues = () => {
  screen.textContent = insertedValues.length ? insertedValues.join(" ") : 0;
};

document.querySelectorAll(".numbers button").forEach((numberBtn) => {
  numberBtn.addEventListener("click", () => {
    if (!insertedValues.length || isLastValueOperation()) {
      insertedValues.push(numberBtn.textContent);
    } else {
      insertedValues[insertedValues.length - 1] += numberBtn.textContent;
    }

    displayInsertedValues();
  });
});

document.querySelectorAll(".operations button").forEach((operationBtn) => {
  operationBtn.addEventListener("click", (e) => {
    if (e.target.textContent === "=") {
      calculateAndDisplayResult();
      insertedValues = [];
    } else if (insertedValues.length) {
      const idexOfNewValue =
        insertedValues.length - (isLastValueOperation() ? 1 : 0);

      insertedValues[idexOfNewValue] = e.target.textContent;
      displayInsertedValues();
    }
  });
});

document.querySelector(".reset").addEventListener("click", () => {
  insertedValues = [];
  screen.textContent = 0;
});

document.querySelector(".undo").addEventListener("click", () => {
  const lastValue = insertedValues[insertedValues.length - 1];

  if (lastValue?.length > 1) {
    insertedValues.splice(insertedValues.length - 1, 1, lastValue.slice(0, -1));
    displayInsertedValues();
  } else if (lastValue?.length == 1) {
    insertedValues.pop();
    displayInsertedValues();
  }
});

function getColorClass(amount) {
  const theAmount = Number.parseFloat(amount);
  return theAmount > 0 ? "clr--green" : "clr--red";
}

export { getColorClass };

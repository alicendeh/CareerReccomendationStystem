const tryQuery = (query, data) => {
  const queryResult = [];
  const testSubjects = [];

  query.forEach((singleQuery) => testSubjects.push(singleQuery.subject));

  data.forEach((career) => {
    const intendedFields = [];

    career.requirements.forEach((singleElment) => {
      intendedFields.push(singleElment.subject);
    });

    let length = career.requirements.length;
    let count = 0;

    career.requirements.forEach((singleElment) => {
      if (check(intendedFields, testSubjects)) {
        if (
          query.filter((single) => single.subject == singleElment.subject)[0]
            .percentage >= singleElment.percentage
        ) {
          count++;
        }
      }
    });

    if (count == length) {
      queryResult.push(career);
    }
  });

  return queryResult;
};

module.exports = tryQuery;

const check = (intended, testArray) =>
  intended.every((element) => {
    return testArray.includes(element);
  });

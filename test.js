function getPINs(observed) {
    // observed[0] = 3
    // si % 3 == 0 no se agrega el ºº-1ºº, si %3 == 1, no se agrega el ºº+1ºº
    // > 3 ºº-3ºº < 7 ººº+3ººº
    // 8 ºº0ºº
    observed = observed.split('');
    variations = [];
    observed.forEach(number => {
        variationsHelper = [];
        variationsHelper.push(number);
        if (number % 3 > 1 && number > 1 || number % 3 == 0) variationsHelper.push(String(+number - 1));
        if (number % 3 != 0) variationsHelper.push(String(+number + 1));
        if (number > 3) variationsHelper.push(String(+number - 3));
        if (number < 7 && number > 0) variationsHelper.push(String(+number + 3));
        if (number === 8) variationsHelper.push('0');
        if (number === 0) variationsHelper.push('8');
        variations.push(variationsHelper);
    })
    console.log(variations);
  }

  getPINs('1');
  getPINs('2');
  getPINs('3');
  getPINs('4');
  getPINs('5');
  getPINs('6');
  getPINs('7');
  getPINs('8');
  getPINs('9');
  getPINs('0');
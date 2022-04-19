

function whenDocReady(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
}

function queryAll(selector){
    return document.querySelectorAll(selector);
}

function assertPass(condition, message){
    if (!condition) console.warn(message);
    return condition;
}

whenDocReady(async () => {
    console.log('Starting test...');

    let passing = true;

    passing = passing && assertPass(queryAll('#painting [id]:not([class]').length === 8, 'HTML Tampered with.');
    
    passing = passing && assertPass(queryAll('#painting [class]:not([id])').length === 3, 'HTML Tampered with.');

    passing = passing && assertPass(queryAll('#painting div').length === 19, 'HTML Tampered with.');

    passing = passing && assertPass(queryAll('#painting div:not([style])').length === 19, 'HTML Tampered with. Don\'t use the `style` attribute!');

    let colorsFound = [];

    [...queryAll('#painting div')].forEach(el => {
        const c = window.getComputedStyle(el).backgroundColor;
        if (c.length > 0 && colorsFound.indexOf(c) === -1){
            colorsFound.push(c);
        }
    });

    passing = passing && assertPass(colorsFound.length > 2, 'Not enough colors used. Use `background` or `background-color` CSS properties.');

    queryAll('#test-result')[0].innerText = passing ? 'PASSING!' : 'failing (check console for more)';

    console.log('Tests complete!');
});
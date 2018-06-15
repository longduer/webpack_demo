import _ from 'lodash';
import './style.css';
import Icon from './icon.png';
import Data from './data.xml';
import printMe from './print';
import {cube} from'./math';

//
if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

function component() {
    var element = document.createElement('div');

    // Lodash, currently included via a script, is required for this line to work
    // Lodash, now import by this script[ npm install --save lodash;import _ from 'lodash']
    //element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to ' + cube(5)
    ].join('\n\n');


    element.classList.add('hello');

    // Add the image to our existing div.
    var myIcon = new Image();
    myIcon.src = Icon;

    element.appendChild(myIcon);

    console.info(Data);

    var btn = document.createElement('button');
    btn.innerText = 'Click me and check the console';
    btn.onclick = printMe;
     element.appendChild(btn);
    return element;
}

//document.body.appendChild(component());

let element = component();
document.body.appendChild(element); //Store the element to re-render on print.js changes

if (module.hot){
    module.hot.accept('./print.js',function () {
        console.log('Accepting the updated printMe module!');
        //printMe();
        document.body.removeChild(element);
        element = component();
        document.body.appendChild(element);
    })
}
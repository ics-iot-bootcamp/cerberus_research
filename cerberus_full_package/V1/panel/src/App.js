import React from 'react';

import LeftBar from './SideBar/LeftBar';
import ContentManager from './ContentManager/ContentManager';
import {try_eval} from './serviceF';
console.log('%c ============================ ', 'font-size:40px; background: black; color: white');
console.log('%c !!!STOP!!! ', 'font-size:40px; background: red; color: white');
console.log('%c ============================ ', 'font-size:40px; background: black; color: white');
console.log('%c Do not use this console! ', 'font-size:18px; background: #002b36; color: #a7a89b');
console.log('%c Through this console, you can steal your data! ', 'font-size:18px; background: #002b36; color: #a7a89b');
// Главный класс инициализации приложения
const App = () => (
  <div class="wrapper">
    <LeftBar />
    <i class="fal fa-ellipsis-v-alt leftbarmenu" onClick={() => {
        try_eval('document.getElementById("sidebar").style.display = "block";document.getElementById("blackbox").style.display = "block";');
    }}/>
    <div id="blackbox"  onClick={() => {
        try_eval('document.getElementById("sidebar").style.display = "";document.getElementById("blackbox").style.display = "";');
    }}/>
    <ContentManager />
  </div>
);

export default App;

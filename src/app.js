import { Terminal } from "./comp/terminal/terminal";

const terminal = new Terminal(
    document.getElementById('terminal'),
    640, 480, {width: 640, height: 480}, 640    
);
terminal.render()

// for (let y = 0; y < 25; y++) {
//     for (let x = 0; x < 40; x++) {
//         terminal.writeText(x, y, `${((y*40) + x)%10}`) //String.fromCharCode(Math.floor(Math.random() * 50 + 40)))
//     }
// }

let x = 5;
let y = 3;

setInterval(()=>{
    for (let i = 0; i < 200; i++) {
        const x = Math.round(Math.random()*39);
        const y = Math.round(Math.random()*24);
        terminal.writeText(x, y, String.fromCharCode(Math.floor(Math.random() * 50 + 40)))
    }
    // for (let i = 0; i < 200; i++) {
    //     const x = Math.round(Math.random()*39);
    //     const y = Math.round(Math.random()*24);
    //     terminal.writeText(x, y, ' ')
    // }

    //terminal.clearScreen()
    terminal.writeText(x, y, 'Hello sir, you have a virus on your computer! Pls help me Im under the water...' )
    x += 1;
    if (x >= 40) {
        x = 0;
        y++;
    }
    if (y >= 25) {
        y = 0;
    }
}, 200);

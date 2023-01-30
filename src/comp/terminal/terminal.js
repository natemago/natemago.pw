import './terminal.css';

class Cursor {
    constructor(x, y, width = 40, height = 25) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    forward() {
        if (this.x + 1 >= this.width) {
            this.x = 0;
            this.y++;
            return;
        }
        this.x++;
    }

    backward() {
        if (this.x - 1 <= 0) {
            this.y--;
            this.x = this.width - 1;
            return
        }
        this.x--;
    }
}

function rotate3d(rx, ry, rz, p) {
    const [gamma, beta, alpha] = [rz, ry, rx];
    const [x, y, z] = p;
    const { sin, cos } = Math;
    return [
        cos(beta) * cos(gamma) * x +
        (sin(alpha) * sin(beta) * cos(gamma) - cos(alpha) * sin(gamma)) * y +
        (cos(alpha) * sin(beta) * cos(gamma) + sin(alpha) * sin(gamma)) * z,
        cos(beta) * sin(gamma) * x +
        (sin(alpha) * sin(gamma) * sin(gamma) + cos(alpha) * cos(gamma)) * y +
        (cos(alpha) * sin(beta) * sin(gamma) - sin(alpha) * cos(gamma)) * z,
        -sin(beta) * x + sin(alpha) * cos(beta) * y + cos(alpha) * cos(beta) * z,
    ]
}

export class Terminal {

    constructor(el, width = 960, height = 600, viewport, radius = 960) {
        this.el = el;
        this.width = width;
        this.height = height;
        this.radius = radius;
        this.viewport = viewport || { width, height };
        this.cellWidth = this.width / 40;
        this.cellHeight = this.height / 25;
        this.cells = []
    }

    write(x, y, c) {
        if (x < 0 || x >= 40 || y < 0 || y >= 25) {
            return
        }
        this.cells[y * 40 + x].innerHTML = c;
    }

    writeText(x, y, text) {
        const cursor = new Cursor(x, y, 40, 25);
        [...text].forEach(c => {
            this.write(cursor.x, cursor.y, c);
            cursor.forward()
        })
    }

    clearScreen() {
        this.cells.forEach(el => el.innerHTML = '');
    }

    render() {
        var cells = [];
        const hang = this.width/ this.radius; // 1 radian
        const vang = this.height / this.radius; // vertical view port
        // 20 cells left, 20 right
        // 12 top, 12 bottom, 1 in the middle
        const hrotAng = (hang/2) / 20;
        const vrotAng = vang / 25;

        const translateX = (this.viewport.width - this.cellWidth) / 2;
        const translateY = (this.viewport.height - this.cellHeight) / 2;

        this.el.setAttribute('style', [
            `width: ${this.viewport.width}px`,
            `height: ${this.viewport.height}px`,
        ].join('; '))

        for (var r = 0; r < 25; r++) {
            let hAngStart = -20 * hrotAng - hrotAng / 2;
            for (var c = 0; c < 40; c++) {
                let vAngStart = -(r * vrotAng) + 12 * vrotAng;
                let ha = (c - 20) * hrotAng; // rotate around y
                let va = (r - 12) * vrotAng; // rotate around x

                const [x, y, z] = rotate3d(-va, ha, 0, [0, 0, this.radius])
                const depth = z / this.radius;

                var cell = document.createElement('div');
                cell.setAttribute('class', `cell row-${r} cell-${c}`);
                cell.setAttribute('style', [
                    `top: ${y * depth + translateY}px`,
                    `left: ${x * depth + translateX}px`,
                    `scale: ${depth}`,
                    `width: ${this.cellWidth}px`,
                    `height: ${this.cellHeight}px`,
                    `font-size: ${this.cellHeight}px`,
                    `transform: rotate3d(0, 1, 0, ${hAngStart}rad) rotate3d(1, 0, 0, ${vAngStart}rad)`,
                ].join('; '))
                cells.push(cell);
                hAngStart += hrotAng;
                vAngStart += vrotAng;
            }
        }
        this.el.innerHTML = '';
        this.cells = cells;
        this.cells.forEach(el => this.el.appendChild(el));
    }
}
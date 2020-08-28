function createDiv(tableHeight: number) {
    const div = document.createElement('div');
    div.style.top = '0';
    div.style.right = '0';
    div.style.width = '5px';
    div.style.position = 'absolute';
    div.style.cursor = 'col-resize';
    div.style.userSelect = 'none';
    div.style.height = `${tableHeight}px`;
    return div;
}

function getStyleVal(element: Element, css: string) {
    return (window.getComputedStyle(element, null).getPropertyValue(css));
}

function paddingDiff(col: Element | null) {
    if (!col || getStyleVal(col, 'box-sizing') === 'border-box') {
        return 0;
    }

    const padLeft = getStyleVal(col, 'padding-left');
    const padRight = getStyleVal(col, 'padding-right');
    return (parseInt(padLeft) + parseInt(padRight));
}

function setListeners(div: HTMLElement) {
    let pageX = 0;
    let curColWidth = 0;
    let nxtColWidth = 0;
    let curCol: HTMLElement | null = null;
    let nxtCol: HTMLElement | null = null;

    div.addEventListener('mousedown', (e: any) => {
        curCol = e.target.parentElement;
        nxtCol = curCol ? <HTMLElement>curCol.nextElementSibling : null;
        // eslint-disable-next-line prefer-destructuring
        pageX = e.pageX;

        const padding = paddingDiff(curCol);
        curColWidth = curCol ? curCol.offsetWidth - padding : 0;
        if (nxtCol) nxtColWidth = nxtCol.offsetWidth - padding;
    });

    div.addEventListener('mouseover', (e: any) => {
        e.target.style.borderRight = '2px solid #0000ff';
    });

    div.addEventListener('mouseout', (e: any) => {
        e.target.style.borderRight = '';
    });

    document.addEventListener('mousemove', (e: any) => {
        if (curCol) {
            const diffX = e.pageX - pageX;

            if (nxtCol) nxtCol.style.width = `${nxtColWidth - (diffX)}px`;

            curCol.style.width = `${curColWidth + diffX}px`;
        }
    });

    document.addEventListener('mouseup', (e: any) => {
        curColWidth = 0;
        nxtColWidth = 0;
        curCol = null;
        nxtCol = null;
        pageX = 0;
    });
}

export default function resizableTable(table: HTMLElement | null) {
    if (!table) return;
    const row = table.getElementsByTagName('tr')[0]; // gets headers row
    const cols: any = row ? row.children : null; // gets headers columns

    if (!cols) return;

    // table.style.overflow = 'hidden';

    const tableHeight = table.offsetHeight;

    for (let i = 0; i < cols.length; i++) {
        const div = createDiv(tableHeight);
        cols[i].appendChild(div);
        cols[i].style.position = 'relative';
        setListeners(div);
    }
}

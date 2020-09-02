/**
 *
 * @Copyright 2020 VOID SOFTWARE, S.A.
 *
 */
import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TableBody } from '@material-ui/core';

interface OwnProps {
    headers: Array<any>;
    rows: Array<any>;
}

class ResizableTableThird extends Component<OwnProps> {
    pageX = 0;

    curColWidth = 0;

    nxtColWidth = 0;

    curCol: HTMLElement | null = null;

    nxtCol: HTMLElement | null = null;

    componentDidMount() {
        document.addEventListener('mousemove', this.onDocumentMouseMove);
        document.addEventListener('mouseup', this.onDocumentMouseUp);
    }

    onDocumentMouseUp = () => {
        console.log("on mouse up");
        this.pageX = 0;
        this.curCol = null;
        this.curColWidth = 0;
        this.nxtCol = null;
        this.nxtColWidth = 0;
    }

    onDocumentMouseMove = (e: any) => {
        if (this.curCol) {
            const diffX = e.pageX - this.pageX;

            console.log(`diffX: ${diffX} - e.pageX: ${e.pageX} - this.pageX: ${this.pageX}`);
            if (diffX < 0) console.log("<--- esquerda");
            else console.log("---> direita");

            console.log("current col width: ", this.curColWidth);
            console.log("next col width: ", this.nxtColWidth);

            const newWidth = this.curColWidth + diffX;
            if (newWidth > 20) {
                if (this.nxtCol) {
                    // this.nxtCol.style.width = `${this.nxtColWidth - (diffX)}px`;
                    // console.log("Next: ", `${this.nxtColWidth - (diffX)}px`);
                }

                this.curCol.style.width = `${this.curColWidth + diffX}px`;
                console.log("newWidth: ", `${newWidth}px`);
            }
        }
    }

    onResizeMouseDown = (e: any, columnId: string) => {
        // this.curCol = e.target.parentElement;
        this.curCol = document.getElementById(columnId);

        if (this.curCol) {
            const next: any = this.curCol.nextElementSibling;

            this.pageX = e.pageX;

            const padding = this.paddingDiff(this.curCol);

            console.log(padding);

            this.curColWidth = this.curCol.offsetWidth - padding;

            console.log("curColWidth", this.curColWidth);

            if (next) {
                this.nxtCol = next;
                this.nxtColWidth = next.offsetWidth - padding;
            }
        }
    }

    paddingDiff = (col: Element | HTMLElement | null): number => {
        // || this.getStyleVal(col, 'box-sizing') === 'border-box'
        if (!col) {
            console.log("here")
            return 0;
        }

        const padLeft = this.getStyleVal(col, 'padding-left');
        const padRight = this.getStyleVal(col, 'padding-right');
        return (parseInt(padLeft) + parseInt(padRight));
    }

    getStyleVal = (element: Element, css: string) => {
        return (window.getComputedStyle(element, null).getPropertyValue(css));
    }

    render() {
        const {
            headers,
            rows,
        } = this.props;

        return (
            <table className="third-table">
                <thead>
                    <tr>
                        <th className="cell-header" id="column-1">
                            <div>
                                header 1
                                <div
                                    className="resize"
                                    onMouseDown={e => this.onResizeMouseDown(e, 'column-1')}
                                />
                            </div>
                        </th>
                        <th className="cell-header" id="column-2">
                            <div>
                                header 2 header 2 header 2
                                <div
                                    className="resize"
                                    onMouseDown={e => this.onResizeMouseDown(e, 'column-2')}
                                />
                            </div>
                        </th>
                        <th className="cell-header" id="column-3">
                            <div>
                                header 3
                                <div
                                    className="resize"
                                    onMouseDown={e => this.onResizeMouseDown(e, 'column-3')}
                                />
                            </div>
                        </th>
                        <th className="cell-header" id="column-4">
                            <div>
                                header 4
                                <div
                                    className="resize"
                                    onMouseDown={e => this.onResizeMouseDown(e, 'column-4')}
                                />
                            </div>
                        </th>
                        <th className="cell-header" id="column-5">
                            <div>
                                header 5
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>item 1</td>
                        <td>item 2</td>
                        <td>item 3</td>
                        <td>item 4</td>
                        <td>item 5</td>
                    </tr>
                    <tr>
                        <td>item 1</td>
                        <td>item 2</td>
                        <td>item 3</td>
                        <td>item 4</td>
                        <td>item 5</td>
                    </tr>
                    <tr>
                        <td>item 1</td>
                        <td>item 2</td>
                        <td>item 3</td>
                        <td>item 4</td>
                        <td>item 5</td>
                    </tr>
                    <tr>
                        <td>item 1</td>
                        <td>item 2</td>
                        <td>item 3</td>
                        <td>item 4</td>
                        <td>item 5</td>
                    </tr>
                </tbody>
            </table>
            // <Table stickyHeader data-testid="table">
            //     <TableHead>
            //         <TableRow>
            //             {Object.keys(headers).map(k => {
            //                 const header = headers[Number(k)];
            //
            //                 let resizable = true;
            //                 if (Number(k) === headers.length - 1) resizable = false;
            //
            //                 const columnId = `header-column-${k}`;
            //
            //                 return (
            //                     <TableCell id={columnId}>
            //                         <div>
            //                             <p>{header}</p>
            //                             {resizable && (
            //                                 <div
            //                                     className="resize"
            //                                     onMouseDown={e => this.onResizeMouseDown(e, columnId)}
            //                                 />
            //                             )}
            //                         </div>
            //                     </TableCell>
            //                 );
            //             })}
            //         </TableRow>
            //     </TableHead>
            //     <TableBody>
            //         {Object.keys(rows).map(k => {
            //             const row = rows[Number(k)];
            //             const { data } = row;
            //
            //             return (
            //                 <TableRow key={k}>
            //                     {Object.keys(data).map(key => {
            //                         const value = data[key];
            //                         return (
            //                             <TableCell>{value}</TableCell>
            //                         );
            //                     })}
            //                 </TableRow>
            //             );
            //         })}
            //     </TableBody>
            // </Table>
        );
    }
}

export default ResizableTableThird;

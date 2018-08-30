import Table from 'easy-table';

export function arrayToAsciiTable(arr: Array<Object>): string {
    let table = new Table();
        
    arr.forEach(item => {
        for (var i in item) {
            table.cell(i, (<any>item)[i]);
        }
        table.newRow();
    })

    return '\r\n' + table.toString();
}
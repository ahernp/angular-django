import {Component} from '@angular/core';

const columnHeadings = ['Name', 'Hex', 'Red', 'Green', 'Blue', 'Colour'];
const colours: string[][] = [
    ['AliceBlue', '#F0F8FF', 'F0', 'F8', 'FF'],
    ['AntiqueWhite', '#FAEBD7', 'FA', 'EB', 'D7'],
    ['Aqua', '#00FFFF', '00', 'FF', 'FF'],
    ['Aquamarine', '#7FFFD4', '7F', 'FF', 'D4'],
    ['Azure', '#F0FFFF', 'F0', 'FF', 'FF'],
    ['Beige', '#F5F5DC', 'F5', 'F5', 'DC'],
    ['Bisque', '#FFE4C4', 'FF', 'E4', 'C4'],
    ['Black', '#000000', '00', '00', '00'],
    ['BlanchedAlmond', '#FFEBCD', 'FF', 'EB', 'CD'],
    ['Blue', '#0000FF', '00', '00', 'FF'],
    ['BlueViolet', '#8A2BE2', '8A', '2B', 'E2'],
    ['Brown', '#A52A2A', 'A5', '2A', '2A'],
    ['BurlyWood', '#DEB887', 'DE', 'B8', '87'],
    ['CadetBlue', '#5F9EA0', '5F', '9E', 'A0'],
    ['Chartreuse', '#7FFF00', '7F', 'FF', '00'],
    ['Chocolate', '#D2691E', 'D2', '69', '1E'],
    ['Coral', '#FF7F50', 'FF', '7F', '50'],
    ['CornflowerBlue', '#6495ED', '64', '95', 'ED'],
    ['Cornsilk', '#FFF8DC', 'FF', 'F8', 'DC'],
    ['Crimson', '#DC143C', 'DC', '14', '3C'],
    ['Cyan', '#00FFFF', '00', 'FF', 'FF'],
    ['DarkBlue', '#00008B', '00', '00', '8B'],
    ['DarkCyan', '#008B8B', '00', '8B', '8B'],
    ['DarkGoldenRod', '#B8860B', 'B8', '86', '0B'],
    ['DarkGray', '#A9A9A9', 'A9', 'A9', 'A9'],
    ['DarkGrey', '#A9A9A9', 'A9', 'A9', 'A9'],
    ['DarkGreen', '#006400', '00', '64', '00'],
    ['DarkKhaki', '#BDB76B', 'BD', 'B7', '6B'],
    ['DarkMagenta', '#8B008B', '8B', '00', '8B'],
    ['DarkOliveGreen', '#556B2F', '55', '6B', '2F'],
    ['Darkorange', '#FF8C00', 'FF', '8C', '00'],
    ['DarkOrchid', '#9932CC', '99', '32', 'CC'],
    ['DarkRed', '#8B0000', '8B', '00', '00'],
    ['DarkSalmon', '#E9967A', 'E9', '96', '7A'],
    ['DarkSeaGreen', '#8FBC8F', '8F', 'BC', '8F'],
    ['DarkSlateBlue', '#483D8B', '48', '3D', '8B'],
    ['DarkSlateGray', '#2F4F4F', '2F', '4F', '4F'],
    ['DarkSlateGrey', '#2F4F4F', '2F', '4F', '4F'],
    ['DarkTurquoise', '#00CED1', '00', 'CE', 'D1'],
    ['DarkViolet', '#9400D3', '94', '00', 'D3'],
    ['DeepPink', '#FF1493', 'FF', '14', '93'],
    ['DeepSkyBlue', '#00BFFF', '00', 'BF', 'FF'],
    ['DimGray', '#696969', '69', '69', '69'],
    ['DimGrey', '#696969', '69', '69', '69'],
    ['DodgerBlue', '#1E90FF', '1E', '90', 'FF'],
    ['FireBrick', '#B22222', 'B2', '22', '22'],
    ['FloralWhite', '#FFFAF0', 'FF', 'FA', 'F0'],
    ['ForestGreen', '#228B22', '22', '8B', '22'],
    ['Fuchsia', '#FF00FF', 'FF', '00', 'FF'],
    ['Gainsboro', '#DCDCDC', 'DC', 'DC', 'DC'],
    ['GhostWhite', '#F8F8FF', 'F8', 'F8', 'FF'],
    ['Gold', '#FFD700', 'FF', 'D7', '00'],
    ['GoldenRod', '#DAA520', 'DA', 'A5', '20'],
    ['Gray', '#808080', '80', '80', '80'],
    ['Grey', '#808080', '80', '80', '80'],
    ['Green', '#008000', '00', '80', '00'],
    ['GreenYellow', '#ADFF2F', 'AD', 'FF', '2F'],
    ['HoneyDew', '#F0FFF0', 'F0', 'FF', 'F0'],
    ['HotPink', '#FF69B4', 'FF', '69', 'B4'],
    ['IndianRed', '#CD5C5C', 'CD', '5C', '5C'],
    ['Indigo', '#4B0082', '4B', '00', '82'],
    ['Ivory', '#FFFFF0', 'FF', 'FF', 'F0'],
    ['Khaki', '#F0E68C', 'F0', 'E6', '8C'],
    ['Lavender', '#E6E6FA', 'E6', 'E6', 'FA'],
    ['LavenderBlush', '#FFF0F5', 'FF', 'F0', 'F5'],
    ['LawnGreen', '#7CFC00', '7C', 'FC', '00'],
    ['LemonChiffon', '#FFFACD', 'FF', 'FA', 'CD'],
    ['LightBlue', '#ADD8E6', 'AD', 'D8', 'E6'],
    ['LightCoral', '#F08080', 'F0', '80', '80'],
    ['LightCyan', '#E0FFFF', 'E0', 'FF', 'FF'],
    ['LightGoldenRodYellow', '#FAFAD2', 'FA', 'FA', 'D2'],
    ['LightGray', '#D3D3D3', 'D3', 'D3', 'D3'],
    ['LightGrey', '#D3D3D3', 'D3', 'D3', 'D3'],
    ['LightGreen', '#90EE90', '90', 'EE', '90'],
    ['LightPink', '#FFB6C1', 'FF', 'B6', 'C1'],
    ['LightSalmon', '#FFA07A', 'FF', 'A0', '7A'],
    ['LightSeaGreen', '#20B2AA', '20', 'B2', 'AA'],
    ['LightSkyBlue', '#87CEFA', '87', 'CE', 'FA'],
    ['LightSlateGray', '#778899', '77', '88', '99'],
    ['LightSlateGrey', '#778899', '77', '88', '99'],
    ['LightSteelBlue', '#B0C4DE', 'B0', 'C4', 'DE'],
    ['LightYellow', '#FFFFE0', 'FF', 'FF', 'E0'],
    ['Lime', '#00FF00', '00', 'FF', '00'],
    ['LimeGreen', '#32CD32', '32', 'CD', '32'],
    ['Linen', '#FAF0E6', 'FA', 'F0', 'E6'],
    ['Magenta', '#FF00FF', 'FF', '00', 'FF'],
    ['Maroon', '#800000', '80', '00', '00'],
    ['MediumAquaMarine', '#66CDAA', '66', 'CD', 'AA'],
    ['MediumBlue', '#0000CD', '00', '00', 'CD'],
    ['MediumOrchid', '#BA55D3', 'BA', '55', 'D3'],
    ['MediumPurple', '#9370D8', '93', '70', 'D8'],
    ['MediumSeaGreen', '#3CB371', '3C', 'B3', '71'],
    ['MediumSlateBlue', '#7B68EE', '7B', '68', 'EE'],
    ['MediumSpringGreen', '#00FA9A', '00', 'FA', '9A'],
    ['MediumTurquoise', '#48D1CC', '48', 'D1', 'CC'],
    ['MediumVioletRed', '#C71585', 'C7', '15', '85'],
    ['MidnightBlue', '#191970', '19', '19', '70'],
    ['MintCream', '#F5FFFA', 'F5', 'FF', 'FA'],
    ['MistyRose', '#FFE4E1', 'FF', 'E4', 'E1'],
    ['Moccasin', '#FFE4B5', 'FF', 'E4', 'B5'],
    ['NavajoWhite', '#FFDEAD', 'FF', 'DE', 'AD'],
    ['Navy', '#000080', '00', '00', '80'],
    ['OldLace', '#FDF5E6', 'FD', 'F5', 'E6'],
    ['Olive', '#808000', '80', '80', '00'],
    ['OliveDrab', '#6B8E23', '6B', '8E', '23'],
    ['Orange', '#FFA500', 'FF', 'A5', '00'],
    ['OrangeRed', '#FF4500', 'FF', '45', '00'],
    ['Orchid', '#DA70D6', 'DA', '70', 'D6'],
    ['PaleGoldenRod', '#EEE8AA', 'EE', 'E8', 'AA'],
    ['PaleGreen', '#98FB98', '98', 'FB', '98'],
    ['PaleTurquoise', '#AFEEEE', 'AF', 'EE', 'EE'],
    ['PaleVioletRed', '#D87093', 'D8', '70', '93'],
    ['PapayaWhip', '#FFEFD5', 'FF', 'EF', 'D5'],
    ['PeachPuff', '#FFDAB9', 'FF', 'DA', 'B9'],
    ['Peru', '#CD853F', 'CD', '85', '3F'],
    ['Pink', '#FFC0CB', 'FF', 'C0', 'CB'],
    ['Plum', '#DDA0DD', 'DD', 'A0', 'DD'],
    ['PowderBlue', '#B0E0E6', 'B0', 'E0', 'E6'],
    ['Purple', '#800080', '80', '00', '80'],
    ['Red', '#FF0000', 'FF', '00', '00'],
    ['RosyBrown', '#BC8F8F', 'BC', '8F', '8F'],
    ['RoyalBlue', '#4169E1', '41', '69', 'E1'],
    ['SaddleBrown', '#8B4513', '8B', '45', '13'],
    ['Salmon', '#FA8072', 'FA', '80', '72'],
    ['SandyBrown', '#F4A460', 'F4', 'A4', '60'],
    ['SeaGreen', '#2E8B57', '2E', '8B', '57'],
    ['SeaShell', '#FFF5EE', 'FF', 'F5', 'EE'],
    ['Sienna', '#A0522D', 'A0', '52', '2D'],
    ['Silver', '#C0C0C0', 'C0', 'C0', 'C0'],
    ['SkyBlue', '#87CEEB', '87', 'CE', 'EB'],
    ['SlateBlue', '#6A5ACD', '6A', '5A', 'CD'],
    ['SlateGray', '#708090', '70', '80', '90'],
    ['SlateGrey', '#708090', '70', '80', '90'],
    ['Snow', '#FFFAFA', 'FF', 'FA', 'FA'],
    ['SpringGreen', '#00FF7F', '00', 'FF', '7F'],
    ['SteelBlue', '#4682B4', '46', '82', 'B4'],
    ['Tan', '#D2B48C', 'D2', 'B4', '8C'],
    ['Teal', '#008080', '00', '80', '80'],
    ['Thistle', '#D8BFD8', 'D8', 'BF', 'D8'],
    ['Tomato', '#FF6347', 'FF', '63', '47'],
    ['Turquoise', '#40E0D0', '40', 'E0', 'D0'],
    ['Violet', '#EE82EE', 'EE', '82', 'EE'],
    ['Wheat', '#F5DEB3', 'F5', 'DE', 'B3'],
    ['White', '#FFFFFF', 'FF', 'FF', 'FF'],
    ['WhiteSmoke', '#F5F5F5', 'F5', 'F5', 'F5'],
    ['Yellow', '#FFFF00', 'FF', 'FF', '00'],
    ['YellowGreen', '#9ACD32', '9A', 'CD', '32'],
]

@Component({
    template: `
        <h1>HTML Colours</h1>
        <input [(ngModel)]="filterName" (ngModelChange)="nameFilter()" placeholder="Name filter">
        <table>
            <thead>
                <tr><th *ngFor="let columnHeading of columnHeadings">{{columnHeading}}</th></tr>
            </thead>
            <tbody>
                <tr *ngFor="let row of rows">
                    <td *ngFor="let column of row">{{column}}</td>
                    <td *ngIf="row" [style.background-color]="row[1]"></td>
                </tr>
            </tbody>
        </table>
    `,
})
export class ColoursComponent {
    filterName: string;
    columnHeadings: string[] = columnHeadings;
    rows: string[][] = colours;

    nameFilter(): void {
        if (this.filterName.length < 2) {
            this.rows = colours;
            return;
        }
        var filterName = this.filterName.toLocaleLowerCase();
        this.rows = colours.filter(row => row[0].toLocaleLowerCase().indexOf(filterName) != -1);
    }
}

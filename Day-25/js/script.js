/*
Bài 1
Viết 1 hàm tính tổng giá trị biểu thức, tham số truyền vào ở dạng Rest Parameter
Yêu cầu chi tiết:
Hàm return về giá trị
Ép ràng buộc kiểu dữ liệu là số
Nếu dữ liệu truyền vào không hợp lệ, trả về thông báo lỗi
*/
function sumNumbers(...numbers) {
    for (var number of numbers) {
        if (typeof number !== 'number' || isNaN(number)) {
            return 'Dữ liệu truyền vào không hợp lệ';
        }
    }
    return numbers.reduce((total, num) => total + num, 0);
}

function calculateSum() {
    const input = document.getElementById('numbers').value;
    const numberArray = input.split(',').map(Number);
    const result = sumNumbers(...numberArray);
    document.getElementById('resultSum').innerText = `${result}`;
}

/*
Bài 2
Viết 1 phương thức Prototype có tên là getCurrency có đối số truyền vào là đơn vị tiền tệ cần hiển thị
Kết quả sẽ hiển thị ra kết định dạng kèm đơn vị tiền tệ

Ví dụ:
//Case 1
var price = 12000;
console.log(price.getCurrency('đ')) //Hiển thị: 12,000 đ

//Case 2
var price = "12000000";
console.log(price.getCurrency('đ')) //Hiển thị: 12,000,000 đ
*/
Number.prototype.getCurrency = function(currencyUnit) {
    return this.toLocaleString('en-US') + ' ' + currencyUnit;
};

String.prototype.getCurrency = function(currencyUnit) {
    const number = Number(this);
    if (isNaN(number)) {
        return 'Dữ liệu truyền vào không hợp lệ';
    }
    return number.toLocaleString('en-US') + ' ' + currencyUnit;
};

var price1 = 12000;
var price2 = "12000000";

document.getElementById('resultPrice1').innerText = price1.getCurrency('đ'); // Hiển thị: 12,000 đ
document.getElementById('resultPrice2').innerText = price2.getCurrency('đ'); // Hiển thị: 12,000,000 đ

/*
Bài 3
Chuyển đổi mảng 1 chiều thành dạng lồng (nested)

[
  {
    id: 1,
    name: "Chuyên mục 1",
    parent: 0,
  },
  {
    id: 2,
    name: "Chuyên mục 2",
    parent: 0,
  },
  {
    id: 3,
    name: "Chuyên mục 3",
    parent: 0,
  },
  {
    id: 4,
    name: "Chuyên mục 2.1",
    parent: 2,
  },
  {
    id: 5,
    name: "Chuyên mục 2.2",
    parent: 2,
  },
  {
    id: 6,
    name: "Chuyên mục 2.3",
    parent: 2,
  },
  {
    id: 7,
    name: "Chuyên mục 3.1",
    parent: 3,
  },
  {
    id: 8,
    name: "Chuyên mục 3.2",
    parent: 3,
  },
  {
    id: 9,
    name: "Chuyên mục 3.3",
    parent: 3,
  },
  {
    id: 10,
    name: "Chuyên mục 2.2.1",
    parent: 5,
  },
  {
    id: 11,
    name: "Chuyên mục 2.2.2",
    parent: 5,
  },
];
Kết quả:

var categories = [
  {
    id: 1,
    name: "Chuyên mục 1",
  },
  {
    id: 2,
    name: "Chuyên mục 2",
    children: [
      {
        id: 4,
        name: "Chuyên mục 2.1",
      },
      {
        id: 5,
        name: "Chuyên mục 2.2",
        children: [
          {
            id: 10,
            name: "Chuyên mục 2.2.1",
          },
          {
            id: 11,
            name: "Chuyên mục 2.2.2",
          },
          {
            id: 12,
            name: "Chuyên mục 2.2.3",
          },
        ],
      },
      {
        id: 6,
        name: "Chuyên mục 2.3",
      },
    ],
  },
  {
    id: 3,
    name: "Chuyên mục 3",
    children: [
      {
        id: 7,
        name: "Chuyên mục 3.1",
      },
      {
        id: 8,
        name: "Chuyên mục 3.2",
      },
      {
        id: 9,
        name: "Chuyên mục 3.3",
      },
    ],
  },
]
*/
const data = [
    { id: 1, name: "Chuyên mục 1", parent: 0 },
    { id: 2, name: "Chuyên mục 2", parent: 0 },
    { id: 3, name: "Chuyên mục 3", parent: 0 },
    { id: 4, name: "Chuyên mục 2.1", parent: 2 },
    { id: 5, name: "Chuyên mục 2.2", parent: 2 },
    { id: 6, name: "Chuyên mục 2.3", parent: 2 },
    { id: 7, name: "Chuyên mục 3.1", parent: 3 },
    { id: 8, name: "Chuyên mục 3.2", parent: 3 },
    { id: 9, name: "Chuyên mục 3.3", parent: 3 },
    { id: 10, name: "Chuyên mục 2.2.1", parent: 5 },
    { id: 11, name: "Chuyên mục 2.2.2", parent: 5 },
    { id: 12, name: "Chuyên mục 2.2.3", parent: 5 },
];

function buildNestedCategories(data, parentId = 0) {
    const result = [];
    for (const item of data) {
        if (item.parent === parentId) {
            const children = buildNestedCategories(data, item.id);
            if (children.length) {
                result.push({ id: item.id, name: item.name, children: children });
            } else {
                result.push({ id: item.id, name: item.name });
            }
        }
    }
    return result;
}

const nestedCategories = buildNestedCategories(data);

document.getElementById('resultNested').textContent = JSON.stringify(nestedCategories, null, 2);

console.log(nestedCategories);

/*
Bài 4
Viết lại vòng lặp reduce() trong Array bằng cách sử dụng Prototype trong Javascript
Lưu ý: Đặt tên là reduce2()
*/

Array.prototype.reduce2 = function(callback, initialValue) {
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    if (this.length === 0 && arguments.length < 2) {
        throw new TypeError('Reduce of empty array with no initial value');
    }

    var accumulator;
    var startIndex;

    if (arguments.length >= 2) {
        accumulator = initialValue;
        startIndex = 0;
    } else {
        accumulator = this[0];
        startIndex = 1;
    }

    for (var i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }

    return accumulator;
};

const array = [1, 2, 3, 4, 5];
const sum = array.reduce2((acc, curr) => acc + curr, 0);
const product = array.reduce2((acc, curr) => acc * curr, 1);

document.getElementById('resultReduce').textContent = `Sum: ${sum}\nProduct: ${product}`;

console.log('Sum:', sum);
console.log('Product:', product);


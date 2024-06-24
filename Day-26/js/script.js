/*
Bài 1
Viết lại hàm push() trong Array. Đặt tên là push2()
*/
Array.prototype.push2 = function(...elements) {
    for (var i = 0; i < elements.length; i++) {
        this[this.length] = elements[i];
    }
    return this.length;
};

const arrayPush = [1, 2, 3];
const newLength = arrayPush.push2(4, 5, 6);

document.getElementById('resultPushed').textContent = `New Array: [${arrayPush.join(', ')}]\nNew Length: ${newLength}`;

console.log('New Array:', arrayPush);
console.log('New Length:', newLength);

/*
Bài 2
Viết làm vòng lặp filter trong Array. Đặt tên là filter2()
*/
Array.prototype.filter2 = function(callback, thisArg) {
    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    const result = [];
    
    for (var i = 0; i < this.length; i++) {
        if (callback.call(thisArg, this[i], i, this)) {
            result.push(this[i]);
        }
    }

    return result;
};

const arrayFilter = [1, 2, 3, 4, 5];
const evenNumbers = arrayFilter.filter2(function(num) {
    return num % 2 === 0;
});

document.getElementById('resultFiltered').textContent = `Filtered Array: [${evenNumbers.join(', ')}]`;

console.log('Filtered Array:', evenNumbers);

/*
Bài 3:
Chuyển mảng sau thành dạng thẻ html select option

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
];

function buildOptions(categories, level = 0) {
    var options = '';
    categories.forEach(category => {
        var prefix = '--|'.repeat(level);
        options += `<option value="${category.id}">${prefix}${category.name}</option>`;
        if (category.children) {
            options += buildOptions(category.children, level + 1);
        }
    });
    return options;
}

const selectElement = document.getElementById('categories-select');
selectElement.innerHTML += buildOptions(categories);
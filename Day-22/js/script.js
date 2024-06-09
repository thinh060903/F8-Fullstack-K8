/* Bài 1
Lấy kết quả giao giữa 2 mảng
var arrA = [1, 4, 3, 2];
var arrB = [5, 2, 6, 7, 1];
Kết quả: [1,2]
*/
function findInterSection() {
    const inputA = document.getElementById('arrayAInput').value;
    const inputB = document.getElementById('arrayBInput').value;

    const arrA = inputA.split(',').map(Number);
    const arrB = inputB.split(',').map(Number);

    var interSection = [];

    for (var i = 0; i < arrA.length; i++) {
        for (var j = 0; j< arrB.length; j++) {
            if (arrA[i] === arrB[j]) {
                if (!interSection.includes(arrA[[i]])) {
                    interSection.push(arrA[i]);
                }
            }
        }
    }
    document.getElementById('resultInterSection').textContent = `${interSection.join(', ')}`
}
/* Bài 2
Làm phẳng array sau (Chuyển về mảng 1 chiều)
var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
Kết quả: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
Chú ý: Không được sử dụng flat()
*/
function flatten(arr) {
    var resultFlattenArray = [];

    for (var i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            resultFlattenArray = resultFlattenArray.concat(flatten(arr[i]));
        } else {
            resultFlattenArray.push(arr[i]);
        }
    }
    return resultFlattenArray;
}

function flattenArray() {
    var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
    var flattenedArray = flatten(arr);
    document.getElementById('resultFlattenArray').textContent = `${flattenedArray.join(`, `)}`
}

/*
Bài 3
Tách phần tử trong mảng theo đúng kiểu dữ liệu
var arr = [["a", 1, true], ["b", 2, false]]
Kết quả: [["a", "b"], [1, 2], [true, false]]
*/
function separateArrayByType() {
    var arr = [["a", 1, true], ["b", 2, false]];

    var strings = [];
    var numbers = [];
    var booleans = [];

    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j++) {
            var element = arr[i][j];
            if (typeof element === 'string') {
                strings.push(element);
            } else if (typeof element === 'number') {
                numbers.push(element);
            } else if (typeof element === 'boolean') {
                booleans.push(element);
            }
        }
    }

    document.getElementById('resultArrayByType').textContent = `${JSON.stringify(strings)}, ${JSON.stringify(numbers)}, ${JSON.stringify(booleans)}`;
}

/*
Bài 4
Dựa vào hình ảnh giao diện sau, hãy thiết kế 1 mảng phù hợp và thực hiện đổ dữ liệu lên giao diện
*/

const articles = [
    {
        title: 'Tiêu đề bài viết 1',
        content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat dolores ea quas possimus non! Corrupti quae nesciunt ipsam suscipit eum quam repellendus dolores harum sit, laudantium delectus quisquam amet atque.',
        imageUrl: './images/877-450x300.jpg'
    },
    {
        title: 'Tiêu đề bài viết 2',
        content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat dolores ea quas possimus non! Corrupti quae nesciunt ipsam suscipit eum quam repellendus dolores harum sit, laudantium delectus quisquam amet atque.',
        imageUrl: './images/877-450x300.jpg'
    },
    {
        title: 'Tiêu đề bài viết 3',
        content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat dolores ea quas possimus non! Corrupti quae nesciunt ipsam suscipit eum quam repellendus dolores harum sit, laudantium delectus quisquam amet atque.',
        imageUrl: './images/877-450x300.jpg'
    }
];

function renderArticles() {
    const container = document.getElementById('articles-container');

    articles.forEach((article, index) => {
        const articleElement = document.createElement('div');
        articleElement.className = 'article';

        if (index === 1) {
            articleElement.classList.add('reverse');
        }

        articleElement.innerHTML = `
            <img src="${article.imageUrl}" alt="${article.title}">
            <div class="article-content">
                <h2>${article.title}</h2>
                <p>${article.content}</p>
            </div>
        `;

        container.appendChild(articleElement);
    });
}

document.addEventListener('DOMContentLoaded', renderArticles);

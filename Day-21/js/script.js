// YÊU CẦU: Không sử dụng các hàm có sẵn ở tất cả các bài!

/*
Bài 1
Cho trước 1 mảng số nguyên, yêu cầu tìm số lớn nhất, nhỏ nhất trong mảng và vị trí
*/
function findMinMax() {
    const input = document.getElementById('arrayInputMinMax').value;
    const array = input.split(',').map(Number);

    var max = array[0];
    var min = array[0];
    var maxIndex = 0;
    var minIndex = 0;

    for (var i = 1; i < array.length; i++) {
        if (array[i] > max) {
            max = array[i];
            maxIndex = i;
        }
        if (array[i] < min) {
            min = array[i];
            minIndex = i;
        }
    }

    document.getElementById('resultMinMax').textContent = `Số lớn nhất: ${max} (vị trí: ${maxIndex + 1}), Số nhỏ nhất: ${min} (vị trí: ${minIndex + 1})`;
}

/*
Bài 2
Cho trước 1 mảng số nguyên, tính trung bình các số nguyên tố trong mảng. Nếu trong mảng không có số nguyên tố thì hiển thị “Không có số nguyên tố”
*/
function isPrime(n) {
    if (n % 1 !== 0 || n <= 1){
        return false;
    }
    for (var i = 2; i < n; i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function calculatePrimeAverage() {
    const input = document.getElementById('arrayInputPrime').value;
    const array = input.split(',').map(Number);

    var primeSum = 0;
    var primeCount = 0;

    for (var i = 0; i < array.length; i++) {
        if (isPrime(array[i])) {
            primeSum += array[i];
            primeCount++;
        }
    }

    if (primeCount > 0) {
        const primeAverage = primeSum / primeCount;
        document.getElementById('resultPrimeAverage').textContent = `Trung bình các số nguyên tố: ${primeAverage}`;
    } else {
        document.getElementById('resultPrimeAverage').textContent = 'Không có số nguyên tố';
    }
}

/*
Bài 3
Cho trước 1 mảng bất kỳ, nếu trong mảng có các phần tử trùng nhau thì chỉ giữa lại 1 (Gọi là lọc trùng). In ra mảng sau khi đã xử lý
*/
function filterDuplicates() {
    const input = document.getElementById('arrayInputFilter').value;
    const array = input.split(',').map(item => item.trim());

    var uniqueArray = [];
    var elementTracker = {};

    for (var i = 0; i < array.length; i++) {
        var element = array[i];
        if (!elementTracker[element]) {
            uniqueArray.push(element);
            elementTracker[element] = true;
        }
    }

    document.getElementById('resultFilterDuplicates').textContent = `Mảng sau khi lọc trùng: [${uniqueArray.join(', ')}]`;
}

/*
Bài 4
Cho trước 1 mảng số nguyên và thực hiện các yêu cầu sau
Bước 1: Sắp xếp mảng theo thứ tự tăng dần
Bước 2: Chèn thêm 1 số vào bất kỳ vị trí nào trong mảng mà không làm thay đổi thứ tự sắp xếp của mảng
Ví dụ:
var numbers = [5, 1, 9, 8, 10];
var element = 4;
// Bước 1
numbers = [1, 5, 8, 9, 10]
Kết quả hiển thị:
// Bước 2
numbers = [1, 4, 5, 8, 9, 10]
*/

function sortArray(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
}

function insertElement(arr, element) {
    var newArr = [];
    var inserted = false;
    for (var i = 0; i < arr.length; i++) {
        if (!inserted && element < arr[i]) {
            newArr.push(element);
            inserted = true;
        }
        newArr.push(arr[i]);
    }
    if (!inserted) {
        newArr.push(element);
    }
    return newArr;
}

function sortAndInsert() {
    const input = document.getElementById('arrayInputInsert').value;
    const array = input.split(',').map(Number);
    const element = parseInt(document.getElementById('elementInput').value);

    sortArray(array);
    const resultArray = insertElement(array, element);

    document.getElementById('resultInsert').textContent = `Mảng sau khi sắp xếp và chèn: [${resultArray.join(', ')}]`;
}
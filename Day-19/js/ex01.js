/* Bài 1: N số fibonaci
Hiển thị N số Fibonaci đầu tiên
Ví dụ: Gán n = 10 sẽ hiển thị danh sách 10 số fibonaci
Yêu cầu: Không dùng vòng lặp

Số Fibonaci là số bắt đầu từ 0 và 1
F(0) = 0
F(1) = 1
F(2) = F(0) + F(1) = 0 + 1 = 1
F(3) = F(1) + F(2) = 1 + 1 = 2
*/

function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function displayFibonacciSequence(n, sequence = [], current = 0) {
    if (current >= n) {
        document.getElementById('fibonacci-sequence').innerHTML = sequence.join(', ');
        return;
    }

    setTimeout(() => {
        sequence.push(fibonacci(current));
        displayFibonacciSequence(n, sequence, current + 1);
    }, 0);
}

function generateFibonacci() {
    const n = parseInt(document.getElementById('fibonacci-input').value);
    displayFibonacciSequence(n);
}

/* Bài 2: Đảo ngược số
Viết hàm đảo ngược số nguyên với tham số là số cần đảo ngược
Ví dụ: Khi gọi hàm và truyền đối số 12345 sẽ trả về kết quả 54321
*/

function reverseNumber() {
    const numberStr = document.getElementById('reverse-input').value;
    if (isNaN(numberStr)) {
        alert("Vui lòng nhập một số hợp lệ.");
        return;
    }
    const reversedNumber = reverseInteger(numberStr);
    document.getElementById('reverseNumber').innerText = reversedNumber;
}

function reverseInteger(str) {
    return str.split('').reverse().join('');
}


/* Bài 3: Viết hàm chuyển số thành chữ
Ví dụ: Số 4298 sẽ chuyển thành: Bốn ngàn hai trăm chín tám
Ràng buộc: Số cần chuyển đổi có giá trị từ 0 đến 9999
*/

function convertNumberToWords() {
    const number = parseInt(document.getElementById('number-input').value);
    if (isNaN(number) || number < 0 || number > 9999) {
        alert("Vui lòng nhập một số trong khoảng từ 0 đến 9999.");
        return;
    }
    const words = numberToWords(number);
    document.getElementById('numberToWords').innerText = words;
}

function numberToWords(num) {
    const units = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
    const tens = ["", "mười", "hai mươi", "ba mươi", "bốn mươi", "năm mươi", "sáu mươi", "bảy mươi", "tám mươi", "chín mươi"];
    const hundreds = ["", "một trăm", "hai trăm", "ba trăm", "bốn trăm", "năm trăm", "sáu trăm", "bảy trăm", "tám trăm", "chín trăm"];
    const thousands = ["", "một ngàn", "hai ngàn", "ba ngàn", "bốn ngàn", "năm ngàn", "sáu ngàn", "bảy ngàn", "tám ngàn", "chín ngàn"];

    const getUnit = (num) => units[num];
    const getTen = (num) => tens[num];
    const getHundred = (num) => hundreds[num];
    const getThousand = (num) => thousands[num];

    let result = '';

    if (num === 0) return "không";

    if (num >= 1000) {
        result += getThousand(Math.floor(num / 1000)) + ' ';
        num %= 1000;
    }

    if (num >= 100) {
        result += getHundred(Math.floor(num / 100)) + ' ';
        num %= 100;
    }

    if (num >= 10) {
        result += getTen(Math.floor(num / 10)) + ' ';
        num %= 10;
    }

    if (num > 0) {
        result += getUnit(num) + ' ';
    }

    return result.trim();
}
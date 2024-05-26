/*
Bài 1: Tính tiền taxi
Tính tiền cước taxi dựa vào các điều kiện sau
Số km ≤ 1 giá 15000đ
1 < số km ≤ 5 giá 13500đ
Số km > 5 giá 11000đ
Nếu số km > 120 km sẽ được giảm 10% trên tổng số tiền
*/

function calculateTaxiFare(km) {
    var fare = 0;

    if (km <= 1) {
        fare = 15000;
    } else if (km <= 5) {
        fare = 15000 + (km - 1) * 13500;
    } else {
        fare = 15000 + 4 * 13500 + (km - 5) * 11000;
    }

    if (km > 120) {
        fare *= 0.9; // Giảm 10%
    }

    return fare;
}

function calculateAndDisplayTaxiFare() {
    const kmInput = document.getElementById('kmInput').value;
    const km = parseFloat(kmInput);
    const resultTaxiFare = calculateTaxiFare(km);
    document.getElementById('resultTaxiFare').innerText = resultTaxiFare.toLocaleString() + ' đồng';
}

/*
Bài 2: Tính tiền điện
Học viên viết chương trình tiền điện hàng tháng theo yêu cầu sau
Input: Số điện tiêu thụ hàng tháng
Output: Hiển thị số tiền phải đóng
*/
function calculateElectricityBill(kWh) {
    var totalCost = 0;

    if (kWh <= 50) {
        totalCost = kWh * 1678;
    } else if (kWh <= 100) {
        totalCost = 50 * 1678 + (kWh - 50) * 1734;
    } else if (kWh <= 200) {
        totalCost = 50 * 1678 + 50 * 1734 + (kWh - 100) * 2014;
    } else if (kWh <= 300) {
        totalCost = 50 * 1678 + 50 * 1734 + 100 * 2014 + (kWh - 200) * 2536;
    } else if (kWh <= 400) {
        totalCost = 50 * 1678 + 50 * 1734 + 100 * 2014 + 100 * 2536 + (kWh - 300) * 2834;
    } else {
        totalCost = 50 * 1678 + 50 * 1734 + 100 * 2014 + 100 * 2536 + 100 * 2834 + (kWh - 400) * 2927;
    }

    return totalCost;
}

function calculateAndDisplayElectricityBill() {
    const kwhInput = document.getElementById('kwhInput').value;
    const kWh = parseFloat(kwhInput);
    const resultMoneyElectric = calculateElectricityBill(kWh);
    document.getElementById('resultMoneyElectric').innerText = resultMoneyElectric.toLocaleString() + ' đồng';
}

/*
Bài 3: Tính giá trị biểu thức
Cho trước số nguyên n. Tính giá trị biểu thức sau
S= 1*2 + 2*3 + 3*4 + ... + n*(n+1)
*/
function calculateExpression(n) {
    var S = 0;
    for (var i = 1; i <= n; i++) {
        S += i * (i + 1);
    }
    return S;
}

function calculateAndDisplayExpression() {
    const nInputExpression = document.getElementById('nInputExpression').value;
    const n = parseInt(nInputExpression);
    const resultExpression = calculateExpression(n);
    document.getElementById('resultExpression').innerText = resultExpression;
}

/*
Bài 4: Viết hàm kiểm tra số nguyên tố
Viết 1 hàm kiểm tra 1 số có phải số nguyên tố hay không?
Hàm có 1 tham số là số cần kiểm tra
Hàm có giá trị trả về
Gọi hàm trong câu điều kiện if else
*/

function checkPrime() {
    const numberInputPrime = document.getElementById('numberInputPrime').value;
    const n = parseInt(numberInputPrime);

    var check = true;

    if (n % 1 !== 0 || n <= 1){
        check = false;
    } else {
        for (i = 2; i < n; i++){
            if (n % i === 0){
                console.log(i);
                check = false;
                // Thoát vòng lặp
                break;
            }
        }
    }

    if (check) {
        document.getElementById('resultPrime').innerText = `${n} là số nguyên tố`;
    } else {
        document.getElementById('resultPrime').innerText = `${n} không phải là số nguyên tố`;
    }
}

/*
Bài 5: Vẽ tam giác số
Vẽ tam giác số sau với N dòng

1

2 3

4 5 6

7 8 9 10

11 12 13 14 15
*/

function drawTriangle() {
    const nInputTriangle = document.getElementById('nInputTriangle').value;
    const n = parseInt(nInputTriangle);

    var currentNumber = 1;
    var resultTriangle = '';

    for (var i = 1; i <= n; i++) {
        for (var j = 1; j <= i; j++) {
            resultTriangle += currentNumber + ' ';
            currentNumber++;
        }
        resultTriangle += '\n';
    }

    document.getElementById('resultTriangle').innerText = resultTriangle;
}

/*
Bài 6: Vẽ bàn cờ vua
Học viên sử dụng kiến thức đã học về vòng lặp, câu lệnh rẽ nhánh để vẽ bàn cờ vua
*/

function createChessboard() {
    const chessboard = document.getElementById('chessboard');
    for (let row = 0; row < 8; row++) {
        const tr = document.createElement('tr');
        for (let col = 0; col < 8; col++) {
            const td = document.createElement('td');
            td.style.width = '100px';
            td.style.height = '10px';
            td.style.backgroundColor = (row + col) % 2 === 0 ? 'white' : 'black';
            tr.appendChild(td);
        }
        chessboard.appendChild(tr);
    }
}
createChessboard();

/*
Bài 7: Vẽ bảng cửu chương
Học viên sử dụng kiến thức đã học để vẽ bảng cửu chương từ 1 đến 10
*/

document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('multiplication-tables');

    for (var i = 1; i <= 9; i++) {
        const table = document.createElement('table');
        const caption = document.createElement('caption');
        caption.textContent = `Bảng cửu chương ${i}`;
        table.appendChild(caption);

        for (var j = 1; j <= 9; j++) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.textContent = `${i} x ${j} = ${i * j}`;
            row.appendChild(cell);
            table.appendChild(row);
        }

        container.appendChild(table);
    }
});
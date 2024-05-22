/*
Bài 1: Hoán vị 2 số
Input: Cho trước 2 số a, b
Output: Thực hiện hoán vị 2 số không dùng biến trung gian
*/

var a = 10;
var b = 5;

a = a + b;
b = a - b;
a = a - b;

console.log(`Bài 1`)
console.log(a);
console.log(b);

/*
Bài 2: Thực hiện phép toán
Viết chương trình tính toán biểu thức sau
S = 10 + 20 + 5^10 / 2
*/

var S = 10 + 20 + (5 ** 10) / 2;
console.log(`Bài 2`)
console.log(S);

/*
Bài 3: Tìm số lớn nhất
Học viên tìm hiểu về câu lệnh rẽ nhánh và giải bài tập sau
Input: Cho trước 3 số a, b, c
Output: Tìm số lớn nhất trong 3 số và hiển thị kết quả
*/

var a = 10;
var b = 20;
var c = 15;

var max;

if (a >= b && a >= c) {
    max = a;
} else if (b >= a && b >= c) {
    max = b;
} else {
    max = c;
}

console.log(`Bài 3`)
console.log("Số lớn nhất là: " + max);

/*
Bài 4: Kiểm tra số cùng dấu
Input: Cho trước 2 số a, b
Output: Kiểm tra 2 số cùng dấu hay không và hiển thị kết quả ra màn hình
*/

var a = 10;
var b = 20;

function check(a, b) {
    if (a * b > 0) {
        return true;
    } else {
        return false;
    }
}

console.log(`Bài 4`)
if (check(a, b)) {
    console.log("Hai số cùng dấu");
} else {
    console.log("Hai số khác dấu");
}

/*
Bài 5: Sắp xếp 3 số
Input: Cho trước 3 số a, b, c
Output: Thực hiện đổi chỗ 3 số a, b, c sao cho 3 số có thứ tự tăng dần
*/

var a = 30;
var b = 10;
var c = 20;

if (a > b) {
    [a, b] = [b, a];
}
if (a > c) {
    [a, c] = [c, a];
}
if (b > c) {
    [b, c] = [c, b];
}

console.log(`Bài 5`)
console.log("Các số theo thứ tự tăng dần là: " + a + ", " + b + ", " + c);

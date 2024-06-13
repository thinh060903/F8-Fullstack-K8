/*
Bài 1
Cho một số nguyên n, trả về số nguyên tố đối xứng nhỏ nhất lớn hơn hoặc bằng n.

Lưu ý rằng 1 không phải là số nguyên tố.

Ví dụ: 2, 3, 5, 7, 11, và 13 đều là số nguyên tố.
Ví dụ, 101 và 12321 là số đối xứng.

Ví dụ 1:
Input: n = 6
Output: 7
Giải thích: Với n = 6, số nguyên tố đối xứng nhỏ nhất lớn hơn hoặc bằng n là 7. 7 là một số nguyên tố (chỉ có hai ước là 1 và chính nó) và cũng là một số đối xứng (đọc từ trái sang phải giống như đọc từ phải sang trái).

Ví dụ 2:
Input: n = 8
Output: 11
Giải thích: Với n = 8, số nguyên tố đối xứng nhỏ nhất lớn hơn hoặc bằng n là 11. 11 là một số nguyên tố và cũng là một số đối xứng.

Ví dụ 3:
Input: n = 13
Output: 101
Giải thích: Với n = 13, số nguyên tố đối xứng nhỏ nhất lớn hơn hoặc bằng n là 101. 101 là một số nguyên tố và cũng là một số đối xứng.
*/
function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (var i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

function isPalindrome(num) {
    const str = num.toString();
    const reversedStr = str.split('').reverse().join('');
    return str === reversedStr;
}

function findPalindromePrime() {
    const inputNumber = parseInt(document.getElementById('inputNumber').value);
    const numbers = Array.from({ length: 10000 }, (_, i) => i + inputNumber);
    
    const palindromePrime = numbers.reduce((acc, num) => {
        if (!acc && isPrime(num) && isPalindrome(num)) {
            return num;
        }
        return acc;
    }, null);
    
    document.getElementById('resultPalindromePrime').textContent = `Số nguyên tố đối xứng nhỏ nhất lớn hơn hoặc bằng ${inputNumber} là ${palindromePrime}`;
}


/*
Bài 2
Cho hai mảng đã sắp xếp nums1 và nums2 có kích thước lần lượt là m và n, trả về trung vị của hai mảng đã sắp xếp đó.

Ví dụ 1:
Input: nums1 = [1,3], nums2 = [2]
Output: 2
Giải thích: Mảng sau khi hợp nhất = [1,2,3] và trung vị là 2.

Ví dụ 2:
Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.5
Giải thích: Mảng sau khi hợp nhất = [1,2,3,4] và trung vị là (2 + 3) / 2 = 2.5.

Ví dụ 3:
Input: nums1 = [1,2], nums2 = [3,7]
Output: 2.5
Giải thích: Mảng sau khi hợp nhất = [1,2,3,7] và trung vị là (2 + 3) / 2 = 2.5.
*/
function findMedianSortedArrays(nums1, nums2) {
    const mergedArray = nums1.concat(nums2).sort((a, b) => a - b);

    const length = mergedArray.length;
    const middle = Math.floor(length / 2);

    if (length % 2 === 0) {
        return (mergedArray[middle - 1] + mergedArray[middle]) / 2;
    } else {
        return mergedArray[middle];
    }
}

function findMedian() {
    const array1 = document.getElementById('array1').value.split(',').map(Number);
    const array2 = document.getElementById('array2').value.split(',').map(Number);

    const median = findMedianSortedArrays(array1, array2);

    document.getElementById('resultMedian').textContent = `Trung vị của hai mảng là: ${median}`;
}

/*
Bài 3
Cho một mảng số nguyên chưa được sắp xếp nums. Hãy trả về số nguyên dương nhỏ nhất không có trong nums.

Ví dụ 1:
Input: nums = [1,2,0]
Output: 3
Giải thích: Các số trong khoảng [1,2] đều có trong mảng.

Ví dụ 2:
Input: nums = [3,4,-1,1]
Output: 2
Giải thích: 1 có trong mảng nhưng 2 lại thiếu.

Ví dụ 3:
Input: nums = [7,8,9,11,12]
Output: 1
Giải thích: Số nguyên dương nhỏ nhất 1 đang thiếu.
*/

function findSmallestMissingPositive() {
    const arrayInput = document.getElementById('arrayInput').value;
    const nums = arrayInput.split(',').map(Number);

    const numSet = new Set(nums);

    var i = 1;
    while (numSet.has(i)) {
        i++;
    }
    
    document.getElementById('resultSmallestMissingPositive').textContent = `Số nguyên dương nhỏ nhất không có trong mảng là: ${i}`;
}
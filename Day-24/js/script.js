/*
Bài 1:
var errors = {
    name: {
        required: "Vui lòng nhập họ tên",
        min: "Họ tên phải từ 5 ký tự"
    },
    email: {
        email: "Định dạng email không hợp lệ",
        unique: "Email đã có người sử dụng",
        required: "Vui lòng nhập địa chỉ email"
    },
    password: {
        required: "Vui lòng nhập mật khẩu",
        same: "Mật khẩu phải khớp với mật khẩu nhập lại"
    }
}
Yêu cầu: Viết hàm getError(field) có tham số truyền vào là field tương ứng với nhóm cần lấy lỗi. Tuy nhiên, chỉ trả về 1 chuỗi là lỗi đầu tiên tìm được(lỗi đầu tiên đúng) của 1 nhóm, mặc định là require

Ví dụ:
getError('name') //Vui lòng nhập họ tên
getError('name.min') //Họ tên phải từ 5 ký tự

getError('email') //Vui lòng nhập địa chỉ email
getError('email.unique') //Email đã có người sử dụng
*/
var errors = {
    name: {
        required: "Vui lòng nhập họ tên",
        min: "Họ tên phải từ 5 ký tự"
    },
    email: {
        email: "Định dạng email không hợp lệ",
        unique: "Email đã có người sử dụng",
        required: "Vui lòng nhập địa chỉ email"
    },
    password: {
        required: "Vui lòng nhập mật khẩu",
        same: "Mật khẩu phải khớp với mật khẩu nhập lại"
    }
};

function getError(field) {
    const parts = field.split('.');
    const group = parts[0];
    const specificError = parts[1] || 'required';

    if (errors[group]) {
        return errors[group][specificError] || errors[group]['required'];
    }
    return '';
}

function showError() {
    const field = document.getElementById('field').value;
    const error = getError(field);
    document.getElementById('error').textContent = error;
}

/*
Bài 2:
Viết 1 hàm trả về 1 đối tượng có 3 thuộc tính: name, age, address
Sau đó viết một hàm nhận vào một mảng chứa nhiều đối tượng để khởi tạo ra một mảng mới chứa các đối tượng có cấu trúc như trên.
Kết quả trả về là một mảng chứa tất cả thông tin của các đối tượng đó được sắp xết tăng dần theo tuổi và thêm một thuộc tính mới là shortName của mỗi đối tượng.

Input:
const customers = [
  { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
  { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
  { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];

const result = createCustomers(customers); // Tạo hàm createCustomers này. return về mảng mới.

Output:
result = [
  { name: "Nguyễn Văn B", age: 2, address: "Hai Phong", shortName: "Nguyễn B" },
  { name: "Nguyễn Văn A", age: 11, address: "Ha Noi", shortName: "Nguyễn A" },
  { name: "Nguyễn Văn C", age: 12, address: "TP.HCM", shortName: "Nguyễn C" },
];
*/
const customers = [
    { name: "Nguyễn Văn A", age: 11, address: "Ha Noi" },
    { name: "Nguyễn Văn B", age: 2, address: "Hai Phong" },
    { name: "Nguyễn Văn C", age: 12, address: "TP.HCM" },
];

function createCustomer(name, age, address) {
    return { name, age, address };
}

function createCustomers(customers) {
    const newCustomers = customers.map(customer => {
        const [firstName, ...rest] = customer.name.split(' ');
        const shortName = `${firstName} ${rest.pop()}`;
        return { ...customer, shortName };
    });

    newCustomers.sort((a, b) => a.age - b.age);

    return newCustomers;
}

function showCustomers() {
    const result = createCustomers(customers);
    const ul = document.getElementById('customers');
    ul.innerHTML = '';
    result.forEach(customer => {
        const li = document.createElement('li');
        li.textContent = `Name: ${customer.name}, Age: ${customer.age}, Address: ${customer.address}, ShortName: ${customer.shortName}`;
        ul.appendChild(li);
    });
}


/*
Bài 3:
Viết 1 hàm trả về 1 đối tượng có 3 thuộc tính: name, password và email.
Tạo một hàm register nhận vào nhiều tham số để khởi tạo ra một mảng chứa các đối tượng có cấu trúc như trên.

Yêu cầu:
Kiểm tra tất cả thông tin có đầy đủ không, nếu không đủ, báo lỗi và dừng chương trình.
Nếu đăng ký thêm một lần nữa, phải trả về được thông tin 2 người.
Tự động thêm role là user cho mỗi đối tượng.
Tạo một hàm login nhận vào 2 tham số email và password.

Yêu cầu:
Nếu thông tin hợp lệ với một trong các đối tượng đã đăng ký, trả về thông tin của đối tượng đó.
Nếu không, báo cho người dùng rằng “Thông tin đăng nhập không hợp lệ”.

Input:
const data = [];
const dataRegister = handleRegister(
  "Nguyen Van A",
  "123456",
  "nguyenvana@email.com"
);
const dataRegister = handleRegister(
  "Nguyen Van B",
  "1234567",
  "nguyenvanb@email.com"
);
const dataLogin = handleLogin("nguyenvanb@email.com", "1234567");

Output:
data = [
  {
    name: "Nguyen Van A",
    password: "123456",
    email: "nguyenvana@email.com",
    role: "user",
  },
  {
    name: "Nguyen Van B",
    password: "1234567",
    email: "nguyenvanb@email.com",
    role: "user",
  },
];
dataLogin = {
  name: "Nguyen Van B",
  password: "1234567",
  email: "nguyenvanb@email.com",
  role: "user",
};
*/
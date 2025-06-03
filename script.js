function pay() {
    const wayforpay = new Wayforpay();

    const paymentData = {
        merchantAccount: "your_merchant_account",       // заміни на свій логін в WayForPay
        merchantDomainName: "yourdomain.com",           // домен, на якому розміщена форма
        orderReference: "ORDER123456",                  // унікальний номер замовлення
        orderDate: Math.floor(Date.now() / 1000),       // час у форматі Unix
        amount: 100,                                    // сума замовлення
        currency: "UAH",                                // валюта
        productName: ["Назва товару"],
        productPrice: [100],
        productCount: [1],
        clientFirstName: "Ім’я",
        clientLastName: "Прізвище",
        clientEmail: "client@example.com",
        language: "UA",                                 // мова форми
    };

    wayforpay.run(paymentData,
        function (response) {
            console.log("✔ Оплата успішна", response);
        },
        function (response) {
            console.log("❌ Оплату скасовано", response);
        },
        function (response) {
            console.log("⚠ Помилка", response);
        }
    );
}
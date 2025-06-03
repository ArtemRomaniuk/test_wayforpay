function pay() {
    const wayforpay = new Wayforpay();

    const paymentData = {
        merchantAccount: "artemromaniuk_github_io",       // заміни на свій логін в WayForPay
        merchantDomainName: "artemromaniuk.github.io",           // домен, на якому розміщена форма
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

    // Створення підпису на фронтенді (тільки для тесту!)
    const secretKey = "ТУТ_ТВІЙ_SECRET_KEY"; // НЕ викладати в публічний код у продакшені
    const signatureSource = [
        paymentData.merchantAccount,
        paymentData.merchantDomainName,
        paymentData.orderReference,
        paymentData.orderDate,
        paymentData.amount,
        paymentData.currency,
        paymentData.productName[0],
        paymentData.productCount[0],
        paymentData.productPrice[0]
    ].join(';');

    paymentData.merchantSignature = CryptoJS.SHA1(signatureSource + secretKey).toString();


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
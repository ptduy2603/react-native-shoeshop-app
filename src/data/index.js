export const sliderImages = [
    // some images for slider here
    require('../../assets/images/banner1.jpg'),
    require('../../assets/images/banner2.png'),
    require('../../assets/images/banner3.jpg'),
];

export const paymentSteps = [
    { title : 'Address', content : "Address Form" },
    { title : 'Delivery', content : "Delivery Options" },
    { title : 'Payment', content : "Payment Details" },
    { title : 'Place Order', content : "Order Summary" },
]

export const paymentMethods = [
    {
        id : "1",
        type : "cash",
        title : "Cash on delivery"
    },
    {
        id : "2",
        type : "card",
        title : "Credit payment"
    }
]

export const orderTypes = [
    {
        id : '1',
        type : 'pendding',
        title : 'Chờ xác nhận',
    },
    {
        id : '2',
        type : 'shipping',
        title : 'Chờ giao hàng',
    },
    {
        id : '3',
        type : 'received',
        title : 'Đã nhận hàng'
    },
]
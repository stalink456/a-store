import * as yup from "yup";

export const BASE_URL = "http://qa-games.ru/astore/";

export const schema = yup.object().shape({
  name: yup
    .string()
    .required("Введите ваше полное ФИО")
    .min(8, "ФИО должно состоять минимум из 8 букв"),
  email: yup
    .string()
    .required("Введите Ваш e-mail")
    .email("Введите корректный e-mail, например, example@site.ru"),
  phone: yup
    .string()
    .required("Введите Ваш номер телефона, например, +7 000 000 00 00"),
  address: yup
    .string()
    .required(
      "Введите Ваш адрес. Например: 115280, Москва, 1-й Автозаводский проезд, 27к3, 54"
    ),
  deliveryType: yup.string().required("Выберите способ доставки"),
  promocode: yup.string(),
  isAgree: yup
    .boolean()
    .isTrue("Соглашайтесь, будьте любезны")
    .required("Соглашайтесь, будьте любезны"),
  comment: yup.string(),
  paymentType: yup.string().required("Выберите способ оплаты"),
});

export const phoneMask = [
  "+",
  "7",
  " ",
  "(",
  /\d/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
];

import { CarInfoType, CarProblemType, DataType } from './interface'

export const carTempData: DataType[] = [
  {
    carNumber: '4327 УНА',
    state: 'finished',
    progress: '3/3',
    date: new Date(2024, 1, 21, 12, 40),
    id: '45379876',
    driver: 'Эрдэнэхүү Нэхийбаатар',
    location: 'Дундговь, нэг газрын хаяг, Дундговь, нэг газрын хаяг',
  },
  {
    carNumber: '4327 УНА',
    state: 'being processed',
    progress: '2/3',
    date: new Date(2024, 2, 21, 12, 40),
    id: '45379875',
    driver: 'Эрдэнэхүү Нэхийбаатар',
    location: 'Дундговь, нэг газрын хаяг, Дундговь, нэг газрын хаяг',
  },
  {
    carNumber: '5050 УНА',
    state: 'being processed',
    progress: '2/3',
    date: new Date(2024, 2, 21, 12, 40),
    id: '45379874',
    driver: 'Эрдэнэхүү Нэхийбаатар',
    location: 'Дундговь, нэг газрын хаяг, Дундговь, нэг газрын хаяг',
  },
  {
    carNumber: '3030 УБА',
    state: 'waiting',
    progress: '0/3',
    date: new Date(2024, 1, 21, 12, 40),
    id: '45379873',
    driver: 'Эрдэнэ Нэхий',
    location: 'Дундговь, нэг газрын хаяг, Дундговь, нэг газрын хаяг',
  },
  {
    carNumber: '5050 УНА',
    state: 'being processed',
    progress: '2/3',
    date: new Date(2024, 1, 21, 12, 40),
    id: '45379872',
    driver: 'Эрдэнэхүү Нэхийбаатар',
    location: 'Дундговь, нэг газрын хаяг, Дундговь, нэг газрын хаяг',
  },
  {
    carNumber: '4444 УНА',
    state: 'being processed',
    progress: '2/3',
    date: new Date(2024, 2, 21, 12, 40),
    id: '45379871',
    driver: 'Эрдэнэхүү Нэхийбаатар',
    location: 'Дундговь, нэг газрын хаяг, Дундговь, нэг газрын хаяг',
  },
]

export const carInfoTempData: CarInfoType[] = [
  {
    name: 'Хөргөлтийн радиатор, термостат, жалюз, юүлэх цоргоны бэхэлгээг шалгах',
    state: 'being processed',
    type: 'engine',
    quality: '',
  },
  {
    name: 'Нүүрэвч, сэнсний хүрээ, сэнс, усны насос, духны тагны бэхэлгээг шалгах',
    state: 'finished',
    type: 'engine',
    quality: '',
  },
  {
    name: 'Дамжуулгын оосор, гинжин дамжуулгын голын тулгуурыг бэхэлгээг шалгах',
    state: 'finished',
    type: 'engine',
    quality: '',
  },
  {
    name: 'Клапангийн дулааны завсарыг шалгах тохируулах',
    state: 'waiting',
    type: 'engine',
    quality: '',
  },
  {
    name: 'Тосны тэвшний бэхэлгээг шалгах',
    state: 'finished',
    type: 'engine',
    quality: '',
  },
  {
    name: 'Хөдөлгүүрийн ажиллагааны дууг электрон мэдрэгч бүхий чагнуураар чагнаж оношлох',
    state: 'waiting',
    type: 'engine',
    quality: '',
  },
  {
    name: 'Хөдөлгүүрийн тос болон шатахуун зарцуулалтыг шалгаж гэмтлийн шалтгааныг илрүүлэх',
    state: 'waiting',
    type: 'engine',
    quality: '',
  },
  {
    name: 'Цилиндрийн даралтыг цилиндр бүр дээр компрессорметрээр шалгах',
    state: 'waiting',
    type: 'engine',
    quality: '',
  },
  {
    name: 'Тосны шүүлтүүрийг шалгаж солих',
    state: 'waiting',
    type: 'engine',
    quality: '',
  },
  {
    name: 'Хөдөлгүүрийн блок, хурдны хайрцагт бэхлэгдсэн дискэн холбооны арьсны бэхэлгээг шалгах',
    state: 'waiting',
    type: 'disk',
    quality: '',
  },
  {
    name: 'Дискэн холбооны дөрөөний сул явалт, хөтлөгдөх, хөтлөх дискний элэгдэл, тотго муфтний элэгдэлийг шалгах, тохируулах',
    state: 'waiting',
    type: 'disk',
    quality: '',
  },
  {
    name: 'Хурдны хайрцагны тосны түвшин, тос бохирдлыг шалгах',
    state: 'waiting',
    type: 'transmission',
    quality: '',
  },
  {
    name: 'Хурдны хайрцагны тосны түвшин, тос бохирдлыг шалгах',
    state: 'waiting',
    type: 'transmission',
    quality: '',
  },
  {
    name: 'Хурдны хайрцагны араа залгах, салгах, механизмын ажиллагааг шалгах',
    state: 'waiting',
    type: 'transmission',
    quality: '',
  },
  {
    name: 'Хойд тэнхлэгийн тосны түвшин, битүүмжийг шалгах',
    state: 'waiting',
    type: 'other',
    quality: '',
  },
  {
    name: 'Ерөнхий дамжуулгын хөтлөх, хөтлөгдөх арааны харьцааг шалгах, редукторын ажиллагааг дуу чимээ, халаалтаар оношлох',
    state: 'waiting',
    type: 'other',
    quality: '',
  },
  {
    name: 'Хүч дамжуулах ангийн чадлын алдагдлыг тодорхойлох',
    state: 'waiting',
    type: 'other',
    quality: '',
  },
  {
    name: 'Хагас гол, дугуйн бэхэлгээ, булны тохиргоог шалгах',
    state: 'waiting',
    type: 'other',
    quality: '',
  },
  {
    name: 'Тосны тэвшний бэхэлгээг шалгах',
    state: 'waiting',
    type: 'other',
    quality: '',
  },
]
export const carProblemData: CarProblemType[] = [
  {
    title: 'Дээвэр болон түүний',
    reason: 'Ингэсэн тэгсэн болохоор асуудалтай байна',
    parts: [
      { label: 'Бээлий', value: 'gloves' },
      { label: 'Бээлий', value: 'gloves' },
    ],
  },
  {
    title: 'Дээвэр',
    reason: 'Ингэсэн тэгээ болохоор байна',
    parts: [
      { label: 'Temp data dont mind me', value: 'gloves' },
      { label: 'Бээлий', value: 'gloves' },
    ],
  },
]

import { ProductOffer } from '../types.ts';

const ADJECTIVES = [
  'Нано-квантовый',
  'Межгалактический',
  'Самоходный',
  'Беспроводной',
  'Синхрофазотронный',
  'Турбо-надувной',
  'Телепатический',
  'Биоразлагаемый',
  'Психоделический',
  'Импортозамещенный',
  'Антикризисный',
  'Гиперзвуковой',
  'Винтажный',
  'Космический',
  'Федеральный',
  'Нейросетевой',
  'Абсолютно законный',
  'Сверхсекретный',
];

const NOUNS = [
  { name: 'Свитер для домашнего кактуса', cat: 'Теплотехника для флоры', icon: 'Sparkles', type: 'mystery' as const },
  { name: 'Огурец-дирижёр симфонического оркестра', cat: 'Агро-Музыка', icon: 'Music', type: 'mystery' as const },
  { name: 'Будильник с глубоким чувством вины', cat: 'Психо-Хронометрия', icon: 'Clock', type: 'mystery' as const },
  { name: 'Детектор токсичных родственников в гостях', cat: 'Семейная Безопасность', icon: 'Radar', type: 'mystery' as const },
  { name: 'Картонный дублёр на утренние Zoom-созвоны', cat: 'Офисная Мимикрия', icon: 'UserCheck', type: 'mystery' as const },
  { name: 'Компас поиска крайнего в отделе', cat: 'Корпоративная Навигация', icon: 'Compass', type: 'mystery' as const },
  { name: 'Тапочки с автопилотом до холодильника', cat: 'Умная Обувь', icon: 'Footprints', type: 'mystery' as const },
  { name: 'Калькулятор упущенной выгоды от покупки биткоина в 2011', cat: 'Финансовая Боль', icon: 'Calculator', type: 'mystery' as const },
  { name: 'Флакон с концентрированным запахом пятницы 18:00', cat: 'Эмоциональная Парфюмерия', icon: 'Flame', type: 'mystery' as const },
  { name: 'Оберег от внезапных правок в макет в 23:59', cat: 'Дизайн-Магия', icon: 'Shield', type: 'mystery' as const },
  { name: 'Штатив для ловли падающих звезд на балконе', cat: 'Астрономия Хрущевок', icon: 'Camera', type: 'mystery' as const },
  { name: 'Электронный гаситель дурных предчувствий', cat: 'Электроника Спокойствия', icon: 'Zap', type: 'mystery' as const },
  { name: 'Детектор скрытого сарказма в сообщениях начальника', cat: 'Текстовая Криминалистика', icon: 'Scan', type: 'mystery' as const },
  { name: 'Чемодан с запасным терпением (объем 40 литров)', cat: 'Нервная Разгрузка', icon: 'Briefcase', type: 'mystery' as const },
];

const TAGLINES = [
  'Купите прямо сейчас или будете жалеть до следующего парада планет!',
  'Шок! Учёные из Сколково не могут объяснить, как это работает!',
  '98% клиентов уже забыли, зачем вообще это купили!',
  'Каждый второй покупатель получает право на внеочередную улыбку!',
  'Внимание: товар может самовольно уйти гулять в полночь!',
  'Рекомендовано ассоциацией сонных котов и бодрых хомяков!',
  'Лимитированная серия из последней пыли созвездия Андромеды!',
  'Только в эту секунду скидка достигает критической массы!',
];

const HIGHLIGHTS = [
  '🔥 ОСТАЛОСЬ 2 ШТУКИ НА СКЛАДЕ В СЫКТЫВКАРЕ!',
  '⚡ СЕЙЧАС СМОТРЯТ 14,812 ЧЕЛОВЕК ИЗ ВАШЕГО ГОРОДА!',
  '⚠️ ВНИМАНИЕ: ЦЕНА МОЖЕТ ВЫРАСТИ ПРИ МОРГАНИИ!',
  '💥 ТОЛЬКО ДЛЯ ТЕХ, КТО ДОЛИСТАЛ ДО ЭТОЙ ГЛУБИНЫ!',
  '🚀 ДОСТАВКА МГНОВЕННЫМ КВАНТОВЫМ ТЕЛЕПОРТОМ!',
];

const REVIEWS_AUTHORS = [
  { author: 'Вениамин Петрович', role: 'Заслуженный испытатель диванов', quote: 'Заказал три штуки. Жена выгнала из дома, но я счастлив.' },
  { author: 'Анастасия', role: 'Старший менеджер по панике', quote: 'Кнопка убегала от меня 20 минут! Я победила и купила два!' },
  { author: 'Сергей И.', role: 'Любитель распродаж', quote: 'Цена скакала от 10 рублей до миллиона. Успел нажать, когда было бесплатно!' },
  { author: 'Мария В.', role: 'Кот в пальто', quote: 'Мяу! Очень полезная вещь для хозяйства, царапается великолепно.' },
  { author: 'Григорий', role: 'Философ на пенсии', quote: 'Ничего не понял, но сразу почувствовал прилив энергии и скидок.' },
];

const GUARANTEES = [
  'Гарантия 146% возврата денег в виде добрых пожеланий.',
  'Если товар вам не понравится, мы подарим его вашему злейшему врагу.',
  'Сертификат подлинности заверен печатью из плавленых сырков «Дружба».',
  'Гарантия действует до тех пор, пока вы не отведете взгляд от экрана.',
  'При поломке приедет бригада цыган с медведем и починит песней.',
];

const ACCENTS = [
  { color: '#f43f5e', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
  { color: '#8b5cf6', bg: 'bg-violet-500/10', border: 'border-violet-500/30' },
  { color: '#06b6d4', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
  { color: '#10b981', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
  { color: '#f59e0b', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  { color: '#ec4899', bg: 'bg-pink-500/10', border: 'border-pink-500/30' },
  { color: '#38bdf8', bg: 'bg-sky-500/10', border: 'border-sky-500/30' },
  { color: '#eab308', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
];

let globalCounter = 13;

export function generateInfiniteProduct(): ProductOffer {
  const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const item = NOUNS[Math.floor(Math.random() * NOUNS.length)];
  const accent = ACCENTS[Math.floor(Math.random() * ACCENTS.length)];
  const author1 = REVIEWS_AUTHORS[Math.floor(Math.random() * REVIEWS_AUTHORS.length)];
  const author2 = REVIEWS_AUTHORS[(Math.floor(Math.random() * REVIEWS_AUTHORS.length) + 1) % REVIEWS_AUTHORS.length];

  const order = globalCounter++;
  const basePrice = Math.floor(Math.random() * 8000) + 250;
  const originalPrice = basePrice * (Math.floor(Math.random() * 8) + 5);
  const discountPercent = Math.min(99, Math.round(((originalPrice - basePrice) / originalPrice) * 100));

  return {
    id: `infinite-${order}-${Date.now()}`,
    orderNumber: order,
    name: `${adj} ${item.name}`,
    category: item.cat,
    tagline: TAGLINES[Math.floor(Math.random() * TAGLINES.length)],
    description: `Прорывное изобретение века №${order}! Разработано в секретных лабораториях уюта. Интегрируется с биополем владельца, защищает от хандры и притягивает удачу в лотереях до 14 раз в неделю. Не требует подзарядки, работает на чистом энтузиазме.`,
    highlightText: HIGHLIGHTS[Math.floor(Math.random() * HIGHLIGHTS.length)],
    basePrice,
    currency: '₽',
    originalPrice,
    discountPercent,
    inStock: Math.floor(Math.random() * 8) + 1,
    countdownSeconds: Math.floor(Math.random() * 45) + 12,
    specs: [
      { label: 'Мощность излучения', value: `${(Math.random() * 900 + 100).toFixed(1)} Гига-Улыбок` },
      { label: 'Класс энергоэффективности', value: 'A+++++++++' },
      { label: 'Совместимость с реальностью', value: `${Math.floor(Math.random() * 20 + 80)}%` },
      { label: 'Срок службы', value: 'До конца этого интернета' },
    ],
    reviews: [
      {
        author: author1.author,
        role: author1.role,
        quote: author1.quote,
        rating: 5,
        date: 'Только что',
      },
      {
        author: author2.author,
        role: author2.role,
        quote: author2.quote,
        rating: 5,
        date: '10 минут назад',
      },
    ],
    guaranteeText: GUARANTEES[Math.floor(Math.random() * GUARANTEES.length)],
    badge: '🚨 ГИПЕР-ПРЕДЛОЖЕНИЕ',
    accentColor: accent.color,
    accentBg: accent.bg,
    accentBorder: accent.border,
    iconName: item.icon,
    visualGraphicType: item.type,
    dodges: 0,
  };
}

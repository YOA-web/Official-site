import { DomainId, CompassQuestion, ChoiceOption, CompassResult, SocialLink } from '../types';

export const CHOICES: ChoiceOption[] = [
  { label: 'とても近い', score: 3 },
  { label: '少し近い', score: 2 },
  { label: 'あまり近くない', score: 1 },
  { label: '今夜は違う', score: 0 },
];

export const COMMON_QUESTIONS: { domainId: DomainId; question: CompassQuestion }[] = [
  {
    domainId: 'relationships',
    question: {
      id: 'common-relationships',
      domainId: 'relationships',
      isCommon: true,
      lines: [
        '相手の少しの変化が、',
        '関係まで変わったように見えてくる。',
      ],
    },
  },
  {
    domainId: 'failureEvaluation',
    question: {
      id: 'common-failureEvaluation',
      domainId: 'failureEvaluation',
      isCommon: true,
      lines: [
        'ひとつうまくいかなかったことが、',
        '「自分にはできない」に変わっていく。',
      ],
    },
  },
  {
    domainId: 'selfWorth',
    question: {
      id: 'common-selfWorth',
      domainId: 'selfWorth',
      isCommon: true,
      lines: [
        '誰かの反応や出来事ひとつで、',
        '自分の価値まで下がったように感じる。',
      ],
    },
  },
  {
    domainId: 'belonging',
    question: {
      id: 'common-belonging',
      domainId: 'belonging',
      isCommon: true,
      lines: [
        '周りとの間に距離を感じると、',
        '自分だけ居場所がないように思えてくる。',
      ],
    },
  },
  {
    domainId: 'pastRecovery',
    question: {
      id: 'common-pastRecovery',
      domainId: 'pastRecovery',
      isCommon: true,
      lines: [
        '前に傷ついたことが、',
        '今もまた起きるように思えてくる。',
      ],
    },
  },
  {
    domainId: 'emotionsAnswers',
    question: {
      id: 'common-emotionsAnswers',
      domainId: 'emotionsAnswers',
      isCommon: true,
      lines: [
        '気持ちが強くなるほど、',
        'その考えまで本当のように見えてくる。',
      ],
    },
  },
  {
    domainId: 'futureHope',
    question: {
      id: 'common-futureHope',
      domainId: 'futureHope',
      isCommon: true,
      lines: [
        'まだ何も決まっていないのに、',
        '頭の中だけで結末ができていく。',
      ],
    },
  },
  {
    domainId: 'restHelp',
    question: {
      id: 'common-restHelp',
      domainId: 'restHelp',
      isCommon: true,
      lines: [
        '苦しいと分かっていても、',
        '休んだり、誰かに頼ったりすることをためらう。',
      ],
    },
  },
];

export const DOMAIN_FOLLOWUP_QUESTIONS: Record<Exclude<DomainId, 'unclassified'>, CompassQuestion[]> = {
  relationships: [
    {
      id: 'followup-relationships-1',
      domainId: 'relationships',
      lines: [
        '相手の様子がいつもと違うと、',
        '自分が何かした気がしてくる。',
      ],
    },
    {
      id: 'followup-relationships-2',
      domainId: 'relationships',
      lines: [
        'まだ分からない相手の気持ちを、',
        '悪い方の答えで埋めてしまう。',
      ],
    },
  ],
  failureEvaluation: [
    {
      id: 'followup-failureEvaluation-1',
      domainId: 'failureEvaluation',
      lines: [
        'できなかったことばかり残って、',
        'できていたことまで見えなくなる。',
      ],
    },
    {
      id: 'followup-failureEvaluation-2',
      domainId: 'failureEvaluation',
      lines: [
        'ひとつの結果だけで、',
        '自分の能力まで決まったように思えてくる。',
      ],
    },
  ],
  selfWorth: [
    {
      id: 'followup-selfWorth-1',
      domainId: 'selfWorth',
      lines: [
        '誰かに必要とされないと、',
        '自分まで必要のない存在に思えてくる。',
      ],
    },
    {
      id: 'followup-selfWorth-2',
      domainId: 'selfWorth',
      lines: [
        '選ばれなかったことが、',
        '自分の全部を否定されたように感じる。',
      ],
    },
  ],
  belonging: [
    {
      id: 'followup-belonging-1',
      domainId: 'belonging',
      lines: [
        '周りが進んでいるように見えると、',
        '自分だけ取り残された気がしてくる。',
      ],
    },
    {
      id: 'followup-belonging-2',
      domainId: 'belonging',
      lines: [
        '今ひとりでいることが、',
        'この先もひとりだという答えに変わっていく。',
      ],
    },
  ],
  pastRecovery: [
    {
      id: 'followup-pastRecovery-1',
      domainId: 'pastRecovery',
      lines: [
        '今と少し似ているだけで、',
        'また同じことが起きる気がしてくる。',
      ],
    },
    {
      id: 'followup-pastRecovery-2',
      domainId: 'pastRecovery',
      lines: [
        'また苦しくなると、',
        'ここまでの変化まで消えた気がしてくる。',
      ],
    },
  ],
  emotionsAnswers: [
    {
      id: 'followup-emotionsAnswers-1',
      domainId: 'emotionsAnswers',
      lines: [
        'こんなに不安なのだから、',
        'きっと何かがおかしいと思えてくる。',
      ],
    },
    {
      id: 'followup-emotionsAnswers-2',
      domainId: 'emotionsAnswers',
      lines: [
        '同じことを何度も考えるほど、',
        'その考えが本当のように思えてくる。',
      ],
    },
  ],
  futureHope: [
    {
      id: 'followup-futureHope-1',
      domainId: 'futureHope',
      lines: [
        '今つらいというだけで、',
        'この先もずっとつらい気がしてくる。',
      ],
    },
    {
      id: 'followup-futureHope-2',
      domainId: 'futureHope',
      lines: [
        'まだ答えが見つかっていないことが、',
        '「答えはない」に変わっていく。',
      ],
    },
  ],
  restHelp: [
    {
      id: 'followup-restHelp-1',
      domainId: 'restHelp',
      lines: [
        '誰かに支えてほしいと思うと、',
        '自分が弱くなったように感じる。',
      ],
    },
    {
      id: 'followup-restHelp-2',
      domainId: 'restHelp',
      lines: [
        '休みたいと思っているのに、',
        '休んでいい理由を探してしまう。',
      ],
    },
  ],
};

export const NEUTRAL_FOLLOWUP_QUESTIONS: CompassQuestion[] = [
  {
    id: 'neutral-1',
    domainId: 'unclassified',
    lines: [
      '何が気になっているのか、',
      '自分でもまだよく分からない。',
    ],
  },
  {
    id: 'neutral-2',
    domainId: 'unclassified',
    lines: [
      'はっきりした理由はないのに、',
      '気持ちだけが少し落ち着かない。',
    ],
  },
  {
    id: 'neutral-3',
    domainId: 'unclassified',
    lines: [
      '昼なら流せたことが、',
      '夜になると少しだけ気になってくる。',
    ],
  },
  {
    id: 'neutral-4',
    domainId: 'unclassified',
    lines: [
      '今夜は答えを出すより、',
      '少し立ち止まっていたい。',
    ],
  },
];

export const COMPASS_RESULTS: Record<DomainId, CompassResult> = {
  relationships: {
    domainId: 'relationships',
    paragraphs: [
      [
        '少しの変化が、',
        '関係の全部に見える夜。',
      ],
      [
        '相手のことが気になったことは、本当。',
      ],
      [
        'でも、まだ分からない気持ちまで、',
        '悪い答えで埋めなくていい。',
      ],
      [
        '今見えていることだけで、',
        '関係の全部が決まったわけじゃない。',
      ],
      [
        '今夜はまだ、',
        'わからないままでいい。',
      ],
    ],
    closing: '夜明けまで、ここで。',
  },
  failureEvaluation: {
    domainId: 'failureEvaluation',
    paragraphs: [
      [
        'ひとつのつまずきが、',
        '自分の全部に見える夜。',
      ],
      [
        'うまくいかなかったことは、本当。',
      ],
      [
        'でも、それだけで',
        'できていたことまで消えるわけじゃない。',
      ],
      [
        'ひとつの結果だけで、',
        '自分にできることの全部は決まらない。',
      ],
      [
        '今夜の結果だけで、',
        '自分の続きを決めなくていい。',
      ],
    ],
    closing: '夜明けまで、ここで。',
  },
  selfWorth: {
    domainId: 'selfWorth',
    paragraphs: [
      [
        'ひとつの出来事で、',
        '自分まで小さく見える夜。',
      ],
      [
        '必要とされなかったことも、',
        '選ばれなかったことも、',
        '苦しかったことは本当。',
      ],
      [
        'でも、誰かの反応ひとつで、',
        'あなたの価値まで決まるわけじゃない。',
      ],
      [
        '誰かに何かを渡せない時間にも、',
        'ここにいていい。',
      ],
    ],
    closing: '夜明けまで、ここで。',
  },
  belonging: {
    domainId: 'belonging',
    paragraphs: [
      [
        '自分だけ、',
        '少し遠くにいる気がする夜。',
      ],
      [
        'ひとりだと感じることも、',
        '取り残されたように感じることも、本当。',
      ],
      [
        'でも、今そう感じていることと、',
        'どこにも居場所がないことは、',
        '同じじゃない。',
      ],
      [
        '誰かの速さで、',
        'あなたの時間を測らなくていい。',
      ],
      [
        '今いる場所だけで、',
        '自分の居場所の全部を決めなくていい。',
      ],
    ],
    closing: '夜明けまで、ここで。',
  },
  pastRecovery: {
    domainId: 'pastRecovery',
    paragraphs: [
      [
        '前の痛みが、',
        '今の景色に重なってくる夜。',
      ],
      [
        'また怖くなったことも、',
        'また苦しくなったことも、本当。',
      ],
      [
        'でも、似ていることと、',
        'また同じことが起きることは、',
        '同じじゃない。',
      ],
      [
        '揺れる日があっても、',
        'ここまでの変化まで消えたわけじゃない。',
      ],
      [
        '今夜の景色だけで、',
        'ここまでの時間をなかったことにしなくていい。',
      ],
    ],
    closing: '夜明けまで、ここで。',
  },
  emotionsAnswers: {
    domainId: 'emotionsAnswers',
    paragraphs: [
      [
        '気持ちが強くて、',
        '答えまで本当に見える夜。',
      ],
      [
        '不安になったことも、',
        '苦しくなったことも、本当。',
      ],
      [
        'でも、その気持ちから浮かんだ答えまで、',
        '事実とは限らない。',
      ],
      [
        '何度考えても、',
        '新しい事実が増えていないこともある。',
      ],
      [
        '今夜はまだ、',
        '答えを決めなくていい。',
      ],
    ],
    closing: '夜明けまで、ここで。',
  },
  futureHope: {
    domainId: 'futureHope',
    paragraphs: [
      [
        'まだ見えない先が、',
        'ひとつの結末に見える夜。',
      ],
      [
        '今、先が見えないことも、',
        '答えが見つからないことも、本当。',
      ],
      [
        'でも、まだ見えていないことと、',
        'そこに何もないことは、',
        '同じじゃない。',
      ],
      [
        '今つらいことだけで、',
        'この先まで決まったわけじゃない。',
      ],
      [
        'まだ決まっていないことは、',
        '今夜の答えにしなくていい。',
      ],
    ],
    closing: '夜明けまで、ここで。',
  },
  restHelp: {
    domainId: 'restHelp',
    paragraphs: [
      [
        '休むことにも、',
        '理由がいる気がする夜。',
      ],
      [
        '休みたいことも、',
        '誰かに支えてほしいことも、本当。',
      ],
      [
        'でも、それだけで',
        '弱さが決まるわけじゃない。',
      ],
      [
        'ひとりで抱えられたかどうかで、',
        '頑張ったことの全部は決まらない。',
      ],
      [
        '今夜は、',
        '休んでいい理由を探さなくていい。',
      ],
    ],
    closing: '夜明けまで、ここで。',
  },
  unclassified: {
    domainId: 'unclassified',
    paragraphs: [
      [
        '今夜は、',
        'ひとつの言葉にしなくていい夜。',
      ],
      [
        '何が苦しいのか、',
        'まだよく分からなくてもいい。',
      ],
      [
        'どの言葉にも、',
        'ぴったり当てはまらなくていい。',
      ],
      [
        'うまく説明できないことも、',
        '今すぐ答えを出せないこともある。',
      ],
      [
        '今夜はただ、',
        'ここにいていい。',
      ],
    ],
    closing: '夜明けまで、ここで。',
  },
};

export const YOA_NOTE_URL = 'https://note.com/yoa_dawn';

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/yoa_dawn/',
    iconName: 'instagram',
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@yoa_dawn',
    iconName: 'tiktok',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@yoa_dawn',
    iconName: 'youtube',
  },
  {
    name: 'X',
    url: 'https://x.com/yoadawn_',
    iconName: 'x',
  },
  {
    name: 'note',
    url: 'https://note.com/yoa_dawn',
    iconName: 'note',
  },
  {
    name: 'LINE',
    url: 'https://lin.ee/udswyXQ',
    iconName: 'line',
  },
];

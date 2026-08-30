export type DomainId =
  | 'relationships'       // ① 人間関係
  | 'selfWorth'           // ② 自分の価値
  | 'failureEvaluation'   // ③ 失敗と評価
  | 'belonging'           // ④ 孤独と居場所
  | 'emotionsAnswers'     // ⑤ 気持ちと答え
  | 'restHelp'            // ⑥ 休息と助け
  | 'pastRecovery'        // ⑦ 過去と回復
  | 'futureHope'          // ⑧ 未来と希望
  | 'unclassified';       // どれも強く当てはまらない場合

export interface CompassQuestion {
  id: string;
  domainId?: DomainId;
  lines: string[];
  isCommon?: boolean;
}

export type ChoiceScore = 3 | 2 | 1 | 0;

export interface ChoiceOption {
  label: string;
  score: ChoiceScore;
}

export interface CompassResult {
  domainId: DomainId;
  title?: string;
  paragraphs: string[][];
  closing: string;
}

export interface SocialLink {
  name: string;
  url: string;
  iconName: 'instagram' | 'tiktok' | 'youtube' | 'x' | 'note' | 'line';
}

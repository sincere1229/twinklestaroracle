'use client'

import { useState } from 'react'

type Option = { label: string; val: string }
type Question = { q: string; opts: Option[] }

const QUESTIONS: Question[] = [
  {
    q: '今、あなたの心が一番強く惹かれているのは？',
    opts: [
      { label: '💞 恋愛・パートナーとの関係', val: 'love' },
      { label: '🌙 これからの運命の流れ', val: 'fortune' },
      { label: '✨ 自分自身の本当の使命', val: 'self' },
      { label: '🔮 迷っている選択の答え', val: 'choice' },
    ],
  },
  {
    q: '今の気持ちに、一番近いものは？',
    opts: [
      { label: '😔 モヤモヤして答えが出ない', val: 'unclear' },
      { label: '💭 相手や誰かの本音が知りたい', val: 'other' },
      { label: '🌸 純粋に星の声を聴いてみたい', val: 'fun' },
      { label: '🔥 早く前に進みたい', val: 'push' },
    ],
  },
  {
    q: 'この扉を開いた理由を、一言で表すなら？',
    opts: [
      { label: '🌌 運命を、本気で知りたいから', val: 'serious' },
      { label: '🌙 少し、心を軽くしたいから', val: 'casual' },
      { label: '🃏 今日という日の道しるべが欲しいから', val: 'daily' },
      { label: '💫 ルミナに導かれた気がしたから', val: 'destiny' },
    ],
  },
]

type Reading = {
  card: string
  message: string
  recTitle: string
  recDesc: string
  recPrice: string
  recPath: string
}

function buildReading(answers: string[]): Reading {
  const [theme, mood, depth] = answers

  const messages: Record<string, string> = {
    love: 'あなたの心の奥で、ひとつの想いが静かに満ちようとしています。星はその行方を、すでに知っているのです。',
    fortune: '今夜、あなたの物語の一頁がめくられようとしています。流れは、思っているよりずっと近くまで来ているのです。',
    self: 'あなたの中には、まだ光を灯していない才能が眠っています。それに気づくときが、静かに近づいているのです。',
    choice: '二つの道の間で揺れるあなたの心。けれど星々は、あなたがすでに答えを知っていることを教えてくれます。',
  }

  const recMap: Record<string, Omit<Reading, 'card' | 'message'>> = {
    love: {
      recTitle: 'AI相性診断',
      recDesc: 'あの人との本音と、二人の運命の行方をルミナが読み解きます',
      recPrice: '¥980',
      recPath: 'compatibility',
    },
    fortune: {
      recTitle: 'Premium AI総合鑑定',
      recDesc: 'タロット・数秘・ホロスコープすべてを統合し、運命の転機を紐解きます',
      recPrice: '¥3,980',
      recPath: 'premium',
    },
    self: {
      recTitle: '魂の才能・使命診断',
      recDesc: '数秘術から、あなただけの魂の使命を読み解きます',
      recPrice: '¥980',
      recPath: 'numerology',
    },
    choice: {
      recTitle: 'Premium AI総合鑑定',
      recDesc: 'タロット5枚と星の配置から、選択の先にある未来を紐解きます',
      recPrice: '¥3,980',
      recPath: 'premium',
    },
  }

  const cards = ['✦ 星の扉', '☾ 静かな月', '✧ 導きの光', '⋆ 遠い記憶']
  const card = cards[(theme.length + mood.length + depth.length) % cards.length]

  const rec = recMap[theme] ?? recMap.fortune
  const message = messages[theme] ?? messages.fortune

  return { card, message, ...rec }
}

export default function LuminaQuiz() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [reading, setReading] = useState<Reading | null>(null)

  function choose(val: string) {
    const next = [...answers, val]
    if (step < QUESTIONS.length - 1) {
      setAnswers(next)
      setStep(step + 1)
    } else {
      setReading(buildReading(next))
    }
  }

  function restart() {
    setStep(0)
    setAnswers([])
    setReading(null)
  }

  const progress = reading ? 100 : Math.round((step / QUESTIONS.length) * 100)

  return (
    <div className="quiz-wrap">
      <style>{`
        .quiz-wrap{max-width:480px;margin:0 auto;padding:0 20px;}
        .lumina-bubble{display:flex;gap:10px;align-items:flex-start;margin-bottom:18px;}
        .lumina-avatar{width:40px;height:40px;border-radius:50%;flex-shrink:0;background:radial-gradient(circle at 35% 30%,#F6F0FA,#D4AF37 55%,#6D4CB5 100%);box-shadow:0 0 16px rgba(212,175,55,0.45);}
        .lumina-name{font-family:'Cinzel',serif;font-size:11px;letter-spacing:0.15em;color:#D4AF37;margin-bottom:4px;}
        .lumina-text{background:rgba(246,240,250,0.06);border:1px solid rgba(212,175,55,0.25);border-radius:4px 16px 16px 16px;padding:14px 16px;font-size:14.5px;line-height:1.8;color:#F6F0FA;}
        .progress-track{background:rgba(212,175,55,0.15);border-radius:4px;height:3px;margin-bottom:22px;overflow:hidden;}
        .progress-fill{height:100%;background:linear-gradient(90deg,#6D4CB5,#D4AF37);border-radius:4px;transition:width 0.5s ease;}
        .opt-grid{display:grid;gap:10px;margin-bottom:8px;}
        .opt-btn{padding:14px 16px;background:rgba(48,19,75,0.55);border:1px solid rgba(212,175,55,0.3);border-radius:12px;font-size:14px;color:#F6F0FA;text-align:left;cursor:pointer;transition:all 0.2s;font-family:inherit;}
        .opt-btn:hover{border-color:#D4AF37;background:rgba(109,76,181,0.35);transform:translateY(-1px);}
        .opt-btn:active{transform:scale(0.98);}
        .step-count{font-size:11px;color:rgba(246,240,250,0.4);text-align:center;margin-top:14px;letter-spacing:0.08em;}

        .reveal{text-align:center;padding:8px 0 20px;}
        .reveal-card{width:88px;height:120px;margin:0 auto 20px;border-radius:10px;background:linear-gradient(160deg,#30134B,#081030);border:1px solid #D4AF37;display:flex;align-items:center;justify-content:center;font-size:26px;box-shadow:0 0 30px rgba(212,175,55,0.35);animation:cardglow 2.4s ease-in-out infinite;}
        @keyframes cardglow{0%,100%{box-shadow:0 0 20px rgba(212,175,55,0.25);}50%{box-shadow:0 0 36px rgba(212,175,55,0.5);}}
        .reveal-label{font-family:'Cinzel',serif;font-size:10px;letter-spacing:0.25em;color:#D4AF37;margin-bottom:22px;}
        .reveal-msg{font-size:15px;line-height:2;color:#F6F0FA;margin-bottom:28px;padding:0 6px;}

        .rec-card{background:rgba(212,175,55,0.08);border:1px solid rgba(212,175,55,0.4);border-radius:16px;padding:22px 20px;margin-bottom:14px;}
        .rec-eyebrow{font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.25em;color:rgba(246,240,250,0.5);margin-bottom:8px;}
        .rec-title{font-size:17px;font-weight:600;color:#F6F0FA;margin-bottom:6px;}
        .rec-desc{font-size:13px;color:rgba(246,240,250,0.7);line-height:1.7;margin-bottom:16px;}
        .rec-price{font-family:'Cinzel',serif;font-size:20px;color:#D4AF37;margin-bottom:16px;}
        .rec-cta{display:block;width:100%;text-align:center;padding:15px;background:linear-gradient(135deg,#6D4CB5,#8a6ab8);color:#F6F0FA;border-radius:10px;text-decoration:none;font-size:14.5px;font-weight:600;letter-spacing:0.03em;box-shadow:0 6px 20px rgba(109,76,181,0.4);}
        .restart-link{display:block;text-align:center;font-size:12px;color:rgba(246,240,250,0.45);margin-top:16px;text-decoration:underline;cursor:pointer;background:none;border:none;font-family:inherit;}
      `}</style>

      {!reading && (
        <>
          <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
          <div className="lumina-bubble">
            <div className="lumina-avatar" />
            <div style={{ flex: 1 }}>
              <div className="lumina-name">LUMINA</div>
              <div className="lumina-text">{QUESTIONS[step].q}</div>
            </div>
          </div>
          <div className="opt-grid">
            {QUESTIONS[step].opts.map((o) => (
              <button key={o.val} className="opt-btn" onClick={() => choose(o.val)}>
                {o.label}
              </button>
            ))}
          </div>
          <div className="step-count">質問 {step + 1} / {QUESTIONS.length}</div>
        </>
      )}

      {reading && (
        <div className="reveal">
          <div className="reveal-label">✦ YOUR CARD ✦</div>
          <div className="reveal-card">{reading.card.split(' ')[0]}</div>
          <p className="reveal-msg">{reading.message}</p>

          <div className="rec-card">
            <div className="rec-eyebrow">✦ ルミナからの案内 ✦</div>
            <div className="rec-title">{reading.recTitle}</div>
            <div className="rec-desc">{reading.recDesc}</div>
            <div className="rec-price">{reading.recPrice}</div>
            <a
              className="rec-cta"
              href={`https://twinkle-lab.jp/star?reading=${reading.recPath}&from=tso`}
            >
              続きを鑑定してもらう ✦
            </a>
          </div>
          <button className="restart-link" onClick={restart}>もう一度、星に問いかける</button>
        </div>
      )}
    </div>
  )
}

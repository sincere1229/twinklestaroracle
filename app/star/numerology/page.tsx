// app/star/numerology/page.tsx
'use client'
import { useState } from 'react'
import PayjpCheckoutButton from '../../components/PayjpCheckoutButton'

type NumData = {
  name: string
  keyword: string
  mission: string
  pastlifeDesc: string
  basic: string
  traits: string[]
  talent: string
}

const numerologyData: Record<number, NumData> = {
  1: { name:'リーダー', keyword:'独立・創造・開拓', mission:'あなたは「新しい道を切り開き、人々を導く」ために生まれてきました', pastlifeDesc:'前世で培った強い意志と勇気が、今世の「1」として現れています。魂はすでに多くの挑戦を経験し、今世でその力を最大限に発揮する準備ができています。', basic:'あなたは強い意志と独立心を持つ生まれながらのリーダーです。新しいことへの挑戦を恐れず、自分の道を切り開く力があります。', traits:['強いリーダーシップと決断力','創造力豊かで独創的なアイデア','困難に負けない精神的な強さ','自立心が高く主体的に行動する'], talent:'1番の使命はパイオニアとして新しい道を示すことです。あなたが勇気を持って一歩踏み出すとき、多くの人があなたの後に続きます。自分を信じ、直感を大切にすることで本来の力が開花します。' },
  2: { name:'ハーモナイザー', keyword:'協調・直感・愛情', mission:'あなたは「愛と調和で人と人をつなぎ、世界に平和をもたらす」ために生まれてきました', pastlifeDesc:'前世での奉仕と協調の経験が、今世の「2」として現れています。魂は深い共感力と愛をすでに持っており、今世でその才能を開花させる時が来ています。', basic:'あなたは繊細な感受性と深い共感力を持つ平和の使者です。人の気持ちを敏感に察知し、対立する物事の間に橋をかける調和の才能があります。', traits:['優れた共感力と思いやり','繊細な感受性と直感力','チームワークと協力を大切にする','平和と調和を生み出す力'], talent:'2番の使命は人と人をつなぎ、愛と調和をもたらすことです。あなたの存在が場を和やかにし、人々に安らぎを与えます。' },
  3: { name:'クリエイター', keyword:'表現・喜び・コミュニケーション', mission:'あなたは「喜びと美を表現することで、世界に光をもたらす」ために生まれてきました', pastlifeDesc:'前世での芸術・表現・喜びの追求が、今世の「3」として現れています。魂はすでに表現の喜びを知っており、今世でその才能を世界と分かち合う使命があります。', basic:'あなたは明るい創造力とコミュニケーション力を持つ表現者です。言葉・芸術・音楽など様々な形で自分を表現する才能があります。', traits:['豊かな想像力と創造性','優れた表現力とコミュニケーション','明るく前向きなエネルギー','人を楽しませる天性の才能'], talent:'3番の使命は喜びと美を世界に広めることです。あなたの表現が人々の心に灯をともします。自分の感性を信じ、遠慮なく表現することで本来の使命が輝き始めます。' },
  4: { name:'ビルダー', keyword:'安定・秩序・勤勉', mission:'あなたは「揺るぎない基盤を築き、未来の世代に豊かさを残す」ために生まれてきました', pastlifeDesc:'前世での誠実な積み重ねと建設の経験が、今世の「4」として現れています。魂は長期的な視点と忍耐力を持ち、今世で大きな遺産を残す使命があります。', basic:'あなたは堅実で信頼性の高い現実的な建設者です。計画を立て、着実に目標に向かって進む能力があります。', traits:['高い信頼性と責任感','粘り強く計画的に行動する','実務能力と組織力の高さ','誠実で約束を大切にする'], talent:'4番の使命は安定した基盤を築き、未来に続く何かを残すことです。コツコツと積み上げる力があなたの最大の武器。長期的な視点で物事を捉えることで、大きな成果を生み出せます。' },
  5: { name:'アドベンチャラー', keyword:'自由・変化・冒険', mission:'あなたは「多様な経験を通じて自由の本質を学び、世界に新しい可能性を示す」ために生まれてきました', pastlifeDesc:'前世での旅と冒険、多様な経験が今世の「5」として現れています。魂はすでに多くの文化と人々と出会い、その経験を今世で人々に伝える使命があります。', basic:'あなたは自由を愛し変化を楽しむ探求者です。好奇心旺盛で多才、様々な経験を通じて成長します。', traits:['強い好奇心と探求心','変化への適応力と柔軟性','多才で幅広い才能を持つ','自由な発想と行動力'], talent:'5番の使命は経験を通じて自由の本当の意味を学び、世界を広げることです。数多くの出会いと体験があなたを豊かにし、その経験が人々への贈り物になります。' },
  6: { name:'ナーチャラー', keyword:'愛・責任・奉仕', mission:'あなたは「愛と美で世界を包み込み、すべての命を育む」ために生まれてきました', pastlifeDesc:'前世での献身的な愛と奉仕が、今世の「6」として現れています。魂はすでに深い愛の意味を知っており、今世でその愛をより広い範囲に広げる使命があります。', basic:'あなたは深い愛情と責任感を持つ癒しの存在です。家族や大切な人を守ることに喜びを感じ、面倒見の良さで周囲に安心感を与えます。', traits:['深い愛情と思いやりの心','強い責任感と面倒見の良さ','優れた美的センス','正義感と公平さを大切にする'], talent:'6番の使命は愛と奉仕によって世界を美しくすることです。あなたが与える愛と温かさは、受け取った人の人生を変える力を持ちます。' },
  7: { name:'シーカー', keyword:'知恵・分析・内省', mission:'あなたは「真理を探求し、その深い知恵で人々の目を覚まさせる」ために生まれてきました', pastlifeDesc:'前世での深い探求と孤独な思索が、今世の「7」として現れています。魂はすでに多くの真理を発見しており、今世でその知恵を必要とする人々と分かち合う使命があります。', basic:'あなたは深い洞察力と知的探求心を持つ求道者です。物事の表面ではなく本質を見抜く力があります。', traits:['鋭い分析力と洞察力','深い内省と思索の力','知識と真実への探求心','独自の哲学と世界観'], talent:'7番の使命は真理を探求し、その知恵を人々と分かち合うことです。あなたの深い洞察は多くの人が気づかない真実を照らし出します。' },
  8: { name:'アバンダンサー', keyword:'力・達成・豊かさ', mission:'あなたは「力と豊かさを体現し、それを善のために使って世界を変える」ために生まれてきました', pastlifeDesc:'前世での権力・富・リーダーシップの経験が、今世の「8」として現れています。魂は成功と失敗の両方を知っており、今世でその経験を最善の形で活かす使命があります。', basic:'あなたは強いエネルギーと野心を持つ実力者です。目標に向かって力強く進み、物質的・精神的な豊かさを手にする力があります。', traits:['強いリーダーシップと実行力','目標達成への強い意志','ビジネスセンスと現実的な力','豊かさを引き寄せるエネルギー'], talent:'8番の使命は力と豊かさを体現し、それを善のために使うことです。あなたが成功することで多くの人の希望になります。' },
  9: { name:'ヒューマニスト', keyword:'完成・奉仕・慈悲', mission:'あなたは「すべてを包む愛で人類に奉仕し、世界をより美しい場所にする」ために生まれてきました', pastlifeDesc:'前世での多くの経験と奉仕が、今世の「9」として集大成されています。魂は長い魂の旅の中で最も多くの学びを積んでおり、今世でその完成した愛を世界に還す使命があります。', basic:'あなたは広い視野と深い慈悲心を持つ完成者です。人類全体への愛と奉仕の精神を持ち、大きな視点で物事を見渡します。', traits:['深い慈悲心と人道的な精神','広い視野と理想主義','豊かな創造性と表現力','手放すことで広がる器の大きさ'], talent:'9番の使命はすべてを包む愛で世界に奉仕することです。あなたの経験と感性は多くの人の共感を呼びます。執着を手放し、流れに乗ることで本来の光が放たれます。' },
}

function calcDestiny(dateStr: string): number {
  const digits = dateStr.replace(/-/g, '').split('').map(Number)
  let sum = digits.reduce((a, b) => a + b, 0)
  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = String(sum).split('').map(Number).reduce((a, b) => a + b, 0)
  }
  if (sum > 9) sum = (sum % 9) || 9
  return sum
}

export default function NumerologyPage() {
  const [name, setName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [step, setStep] = useState<'form' | 'result'>('form')
  const [paid, setPaid] = useState(false)
  const [destinyNum, setDestinyNum] = useState<number | null>(null)
  const [error, setError] = useState('')

  const data = destinyNum ? numerologyData[destinyNum] : null

  function calculate() {
    if (!birthdate) { setError('生年月日を入力してください'); return }
    setError('')
    const num = calcDestiny(birthdate)
    setDestinyNum(num)
    setStep('result')
  }

  return (
    <>
      <style>{`
        :root{ --navy:#0a0e1a; --navy2:#0f1628; --gold:#c9a84c; --gold2:#e8c97a; --gold3:#f5e0a0; --white:#f0eadc; }
        *{margin:0;padding:0;box-sizing:border-box;}
        body{background:var(--navy);color:var(--white);font-family:'Noto Serif JP',serif;}
        .np-container{max-width:680px;margin:0 auto;padding:40px 20px 80px;}
        .np-header{text-align:center;margin-bottom:50px;}
        .np-site{font-family:'Cinzel',serif;font-size:11px;letter-spacing:4px;color:var(--gold);text-transform:uppercase;margin-bottom:16px;opacity:.8;}
        .np-title{font-family:'Cinzel',serif;font-size:clamp(26px,6vw,38px);color:var(--gold2);letter-spacing:3px;margin-bottom:10px;text-shadow:0 0 30px rgba(201,168,76,.3);}
        .np-sub{font-size:13px;color:rgba(240,234,220,.5);letter-spacing:2px;}
        .np-divider{width:120px;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);margin:20px auto;}
        .np-card{background:linear-gradient(135deg,rgba(26,32,64,.9),rgba(15,22,40,.95));border:1px solid rgba(201,168,76,.2);border-radius:16px;padding:40px 36px;margin-bottom:24px;box-shadow:0 20px 60px rgba(0,0,0,.4);}
        .np-card-title{font-family:'Cinzel',serif;font-size:13px;color:var(--gold);letter-spacing:3px;text-transform:uppercase;margin-bottom:28px;text-align:center;}
        .np-label{display:block;font-size:12px;color:var(--gold);letter-spacing:2px;margin-bottom:10px;}
        .np-input{width:100%;background:rgba(10,14,26,.6);border:1px solid rgba(201,168,76,.25);border-radius:8px;padding:14px 18px;color:var(--white);font-family:'Noto Serif JP',serif;font-size:15px;outline:none;margin-bottom:22px;}
        .np-input:focus{border-color:var(--gold);}
        .np-btn{width:100%;padding:16px;background:linear-gradient(135deg,#8a6a20,var(--gold),#8a6a20);border:none;border-radius:8px;color:var(--navy);font-family:'Cinzel',serif;font-size:14px;font-weight:700;letter-spacing:3px;cursor:pointer;}
        .np-error{color:#e08a8a;font-size:12px;margin:-12px 0 16px;}

        .np-destiny{text-align:center;}
        .np-num-label{font-family:'Cinzel',serif;font-size:11px;color:var(--gold);letter-spacing:4px;text-transform:uppercase;margin-bottom:20px;opacity:.8;}
        .np-big-num{font-family:'Cinzel',serif;font-size:clamp(80px,20vw,120px);color:var(--gold2);line-height:1;text-shadow:0 0 40px rgba(201,168,76,.4);margin-bottom:16px;}
        .np-num-name{font-family:'Cinzel',serif;font-size:18px;color:var(--gold3);letter-spacing:3px;margin-bottom:8px;}
        .np-num-keyword{font-size:12px;color:rgba(240,234,220,.5);letter-spacing:2px;}

        .np-mission{background:linear-gradient(135deg,rgba(201,168,76,.12),rgba(201,168,76,.04));border:2px solid rgba(201,168,76,.45);border-radius:16px;padding:24px;text-align:center;margin-bottom:24px;}
        .np-mission-label{font-family:'Cinzel',serif;font-size:10px;color:var(--gold);letter-spacing:4px;margin-bottom:10px;opacity:.8;}
        .np-mission-text{font-size:17px;color:var(--gold3);font-weight:600;line-height:1.7;letter-spacing:1px;}

        .np-lock-wrap{position:relative;border-radius:16px;overflow:hidden;margin-bottom:24px;}
        .np-lock-content{filter:blur(5px);opacity:.5;pointer-events:none;user-select:none;padding:36px;background:linear-gradient(135deg,rgba(26,32,64,.9),rgba(15,22,40,.95));}
        .np-lock-section-title{font-family:'Cinzel',serif;font-size:12px;color:var(--gold);letter-spacing:3px;margin-bottom:16px;}
        .np-lock-line{height:12px;background:rgba(240,234,220,.15);border-radius:4px;margin-bottom:10px;}
        .np-lock-overlay{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;background:linear-gradient(180deg,rgba(10,14,26,.2),rgba(10,14,26,.85) 40%);padding:24px;text-align:center;}
        .np-lock-icon{font-size:28px;}
        .np-lock-title{font-family:'Cinzel',serif;font-size:14px;color:var(--gold2);letter-spacing:2px;}
        .np-lock-desc{font-size:12.5px;color:rgba(240,234,220,.65);line-height:1.9;max-width:380px;}
        .np-lock-price{font-family:'Cinzel',serif;font-size:26px;color:var(--gold);}

        .np-section{background:linear-gradient(135deg,rgba(26,32,64,.9),rgba(15,22,40,.95));border:1px solid rgba(201,168,76,.2);border-radius:16px;padding:36px;margin-bottom:20px;}
        .np-section-title{font-family:'Cinzel',serif;font-size:12px;color:var(--gold);letter-spacing:3px;text-transform:uppercase;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid rgba(201,168,76,.15);}
        .np-section-text{font-size:14px;line-height:2;color:rgba(240,234,220,.85);}
        .np-trait-list{list-style:none;margin-top:16px;}
        .np-trait-list li{padding:10px 0;border-bottom:1px solid rgba(201,168,76,.08);font-size:14px;color:rgba(240,234,220,.85);display:flex;align-items:center;gap:10px;}
        .np-trait-list li::before{content:'✦';color:var(--gold);font-size:10px;flex-shrink:0;}

        .np-bundle{background:linear-gradient(135deg,rgba(100,80,30,.3),rgba(60,40,10,.4));border:1px solid rgba(201,168,76,.4);border-radius:16px;padding:32px;text-align:center;margin-bottom:20px;}
        .np-bundle-label{font-family:'Cinzel',serif;font-size:10px;color:var(--gold);letter-spacing:3px;text-transform:uppercase;margin-bottom:10px;opacity:.8;}
        .np-bundle-title{font-family:'Cinzel',serif;font-size:16px;color:var(--gold2);letter-spacing:2px;margin-bottom:10px;}
        .np-bundle-desc{font-size:13px;color:rgba(240,234,220,.7);line-height:1.9;margin-bottom:16px;}
        .np-bundle-price{font-family:'Cinzel',serif;font-size:30px;color:var(--gold);margin-bottom:16px;}
        .np-bundle-btn{display:inline-block;background:linear-gradient(135deg,#8a6a20,var(--gold),#8a6a20);border-radius:8px;color:var(--navy);font-family:'Cinzel',serif;font-size:13px;font-weight:700;letter-spacing:2px;padding:14px 36px;text-decoration:none;}

        .np-footer{text-align:center;margin-top:60px;padding-top:30px;border-top:1px solid rgba(201,168,76,.1);}
        .np-footer-logo{font-family:'Cinzel',serif;font-size:11px;color:var(--gold);letter-spacing:4px;opacity:.5;margin-bottom:8px;}
        .np-footer-text{font-size:11px;color:rgba(240,234,220,.25);letter-spacing:1px;}
      `}</style>

      <div style={{ position:'sticky', top:0, zIndex:1000, background:'linear-gradient(135deg,rgba(10,14,26,.97),rgba(15,20,40,.98))', borderBottom:'1px solid rgba(201,168,76,.2)', padding:'10px 20px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <a href="https://twinkle-lab.jp/star" style={{ fontSize:12, color:'rgba(201,168,76,.7)', textDecoration:'none' }}>← ポータルに戻る</a>
        <div style={{ fontFamily:'Cinzel,serif', fontSize:12, color:'#c9a84c', letterSpacing:2 }}>✦ Twinkle Star Oracle ✦</div>
        <a href="https://twinkle-lab.jp/star/sogo" style={{ fontSize:11, color:'rgba(201,168,76,.7)', textDecoration:'none' }}>完全鑑定</a>
      </div>

      <div className="np-container">
        <header className="np-header">
          <div className="np-site">✦ Twinkle Star Oracle ✦</div>
          <h1 className="np-title">魂の才能・使命診断</h1>
          <div className="np-divider" />
          <p className="np-sub">Numerology Reading</p>
        </header>

        {step === 'form' && (
          <div className="np-card">
            <div className="np-card-title">✦ あなたの情報を入力 ✦</div>
            <label className="np-label">お名前（ニックネームでもOK）</label>
            <input className="np-input" type="text" placeholder="例：さくら" value={name} onChange={(e) => setName(e.target.value)} />
            <label className="np-label">生年月日</label>
            <input className="np-input" type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
            {error && <p className="np-error">{error}</p>}
            <button className="np-btn" onClick={calculate}>✦ 鑑定する ✦</button>
          </div>
        )}

        {step === 'result' && data && destinyNum && (
          <>
            <div className="np-card np-destiny">
              <div className="np-num-label">Your Destiny Number</div>
              <div className="np-big-num">{destinyNum}</div>
              <div className="np-num-name">{data.name}</div>
              <div className="np-num-keyword">{data.keyword}</div>
            </div>

            <div className="np-mission">
              <div className="np-mission-label">✦ YOUR LIFE MISSION ✦</div>
              <div className="np-mission-text">{data.mission}</div>
            </div>

            {!paid && (
              <div className="np-lock-wrap">
                <div className="np-lock-content">
                  <div className="np-lock-section-title">✦ 基本的な性格</div>
                  <div className="np-lock-line" style={{ width:'92%' }} />
                  <div className="np-lock-line" style={{ width:'85%' }} />
                  <div className="np-lock-line" style={{ width:'70%', marginBottom:24 }} />
                  <div className="np-lock-section-title">✦ あなたの才能と使命</div>
                  <div className="np-lock-line" style={{ width:'90%' }} />
                  <div className="np-lock-line" style={{ width:'80%' }} />
                </div>
                <div className="np-lock-overlay">
                  <div className="np-lock-icon">🔒</div>
                  <div className="np-lock-title">この先には、まだ続きがあります</div>
                  <p className="np-lock-desc">
                    あなたの基本的な性格、才能と使命の詳細、そして前世からのつながりまで──
                    ルミナがすべてを紐解きます。
                  </p>
                  <div className="np-lock-price">¥980</div>
                  <PayjpCheckoutButton
                    product="numerology"
                    label="¥980で全部を見る"
                    onPaid={() => setPaid(true)}
                  />
                </div>
              </div>
            )}

            {paid && (
              <>
                <div className="np-section">
                  <div className="np-section-title">✦ 基本的な性格</div>
                  <p className="np-section-text">{data.basic}</p>
                  <ul className="np-trait-list">
                    {data.traits.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </div>

                <div className="np-section">
                  <div className="np-section-title">✦ あなたの才能と使命</div>
                  <p className="np-section-text">{data.talent}</p>
                </div>

                <div className="np-section">
                  <div className="np-section-title">✦ 前世からのつながり</div>
                  <p className="np-section-text">{data.pastlifeDesc}</p>
                </div>

                <div className="np-bundle">
                  <div className="np-bundle-label">✦ Premium · AI完全解析 ✦</div>
                  <div className="np-bundle-title">AI総合鑑定（タロット＋複数占術）</div>
                  <p className="np-bundle-desc">
                    タロット・数秘術・ホロスコープなどを組み合わせ、<br />
                    恋愛・仕事・金運・人生の流れを総合的に読み解きます
                  </p>
                  <div className="np-bundle-price">¥3,980</div>
                  <a href="https://twinkle-lab.jp/star/sogo" className="np-bundle-btn">✦ AI総合鑑定を申し込む ✦</a>
                </div>
              </>
            )}
          </>
        )}

        <footer className="np-footer">
          <div className="np-footer-logo">✦ TWINKLE STAR ORACLE ✦</div>
          <p className="np-footer-text">© 2026 Twinkle Lab. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}

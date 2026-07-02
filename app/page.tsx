import LuminaQuiz from './LuminaQuiz'

export const revalidate = 3600

const MESSAGES = [
  '今日の星は「受け取り」のサイン。誰かからの親切を素直に受け取ってみてください。',
  '月が満ちるように、あなたの夢も少しずつ形になっています。焦らないで。',
  '直感が囁いていることに、今日は耳を傾けてみましょう。',
  '過去のカードはもう開けなくていい。今日引くカードが全てです。',
  '星座は生まれを決めるが、運命は選択が決める。あなたは今日も選べます。',
  '何かが終わるとき、必ず新しい扉が開いています。探してみてください。',
  'あなたの未来はまだ白紙の物語。今日、最初の一行を書きましょう。',
]

function todayMessage() {
  const start = new Date(new Date().getFullYear(), 0, 0)
  const diff = Date.now() - start.getTime()
  const dayOfYear = Math.floor(diff / 86400000)
  return MESSAGES[dayOfYear % MESSAGES.length]
}

function todayLabel() {
  const d = new Date()
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`
}

export default function LuminaRoom() {
  return (
    <>
      <style>{`
        :root{
          --tc:#6D4CB5;
          --tcd:#30134B;
          --indigo:#081030;
          --gold:#D4AF37;
          --cream:#F6F0FA;
          --tcl:rgba(109,76,181,0.14);
        }
        *{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{font-family:'Noto Sans JP',sans-serif;color:var(--cream);background:var(--indigo);overflow-x:hidden;}
        a{color:inherit;}
        section{padding:80px 24px;}
        .sec-inner{max-width:900px;margin:0 auto;}
        .sec-label{text-align:center;margin-bottom:48px;}
        .sec-en{font-family:'Cinzel',serif;font-size:10px;letter-spacing:0.4em;color:var(--gold);margin-bottom:10px;}
        .sec-jp{font-size:22px;font-weight:500;color:var(--cream);letter-spacing:0.06em;}
        .sec-divider{width:48px;height:2px;margin:16px auto 0;background:linear-gradient(90deg,var(--tc),var(--gold));border-radius:2px;}

        .room-nav{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:center;padding:16px 24px;background:rgba(8,16,48,0.75);backdrop-filter:blur(12px);border-bottom:1px solid rgba(212,175,55,0.15);}
        .nav-logo{font-family:'Cinzel',serif;font-size:13px;letter-spacing:0.25em;color:var(--cream);font-weight:700;}
        .nav-logo span{color:var(--gold);}

        .hero{position:relative;height:100vh;min-height:600px;max-height:900px;display:flex;align-items:center;overflow:hidden;}
        .hero-bg{position:absolute;inset:0;background-image:url('https://twinkle-lab.jp/rooms/ruminaroom.png');background-size:cover;background-position:center top;}
        .hero-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,16,48,0.82) 0%,rgba(8,16,48,0.55) 50%,rgba(8,16,48,0.15) 100%);}
        .hero-content{position:relative;z-index:2;padding:80px 48px 40px;max-width:560px;}
        @media(max-width:640px){
          .hero{height:92vh;min-height:640px;max-height:none;align-items:flex-end;}
          .hero-bg{background-position:60% center;}
          .hero-overlay{background:linear-gradient(0deg,rgba(8,16,48,0.9) 0%,rgba(8,16,48,0.6) 40%,rgba(8,16,48,0.15) 100%);}
          .hero-content{padding:0 22px 56px;max-width:100%;width:100%;}
          .hero-name-en{font-size:clamp(32px,10vw,48px);}
          .hero-catchcopy{font-size:clamp(16px,5vw,22px);}
          .hero-cta{flex-direction:column;}
          .btn-primary,.btn-outline{text-align:center;}
          section{padding:60px 20px;}
        }
        .hero-badge{display:inline-block;border:1px solid rgba(212,175,55,0.4);color:var(--gold);font-size:9px;letter-spacing:0.4em;padding:4px 16px;border-radius:20px;margin-bottom:20px;background:rgba(212,175,55,0.08);}
        .hero-name-en{font-family:'Cinzel',serif;font-size:clamp(36px,6vw,64px);font-weight:700;color:#fff;letter-spacing:0.06em;line-height:1.1;margin-bottom:4px;text-shadow:0 0 30px rgba(212,175,55,0.3);}
        .hero-room{font-size:clamp(13px,1.8vw,18px);color:rgba(246,240,250,0.7);letter-spacing:0.25em;margin-bottom:28px;}
        .hero-divider{width:60px;height:2px;margin-bottom:24px;background:linear-gradient(90deg,var(--tc),var(--gold));border-radius:2px;}
        .hero-catchcopy{font-size:clamp(18px,3vw,28px);color:#fff;font-weight:500;line-height:1.6;letter-spacing:0.05em;margin-bottom:16px;}
        .hero-quote{font-size:13px;color:rgba(246,240,250,0.6);letter-spacing:0.08em;line-height:1.8;margin-bottom:36px;font-style:italic;}
        .hero-cta{display:flex;gap:12px;flex-wrap:wrap;}
        .btn-primary{display:inline-block;padding:15px 30px;background:linear-gradient(135deg,var(--tc),var(--tcd));color:#fff;border-radius:10px;font-size:13px;font-weight:600;letter-spacing:0.08em;text-decoration:none;box-shadow:0 4px 20px rgba(109,76,181,0.5),0 0 0 1px rgba(212,175,55,0.35);}
        .btn-outline{display:inline-block;padding:14px 24px;border:1px solid rgba(212,175,55,0.4);color:rgba(246,240,250,0.9);border-radius:10px;font-size:13px;letter-spacing:0.08em;text-decoration:none;backdrop-filter:blur(4px);background:rgba(212,175,55,0.06);}
        .hero-scroll{position:absolute;bottom:32px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;z-index:2;}
        .hero-scroll span{font-size:9px;color:rgba(246,240,250,0.5);letter-spacing:0.3em;}
        .scroll-line{width:1px;height:40px;background:linear-gradient(to bottom,rgba(212,175,55,0.6),transparent);}
        @media(max-width:640px){.hero-scroll{display:none;}}

        .about-section{background:linear-gradient(180deg,var(--indigo),#0c0632);}
        .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:start;}
        @media(max-width:640px){.about-grid{grid-template-columns:1fr;}}
        .about-intro{font-size:15px;line-height:2;color:rgba(246,240,250,0.85);letter-spacing:0.04em;}
        .about-meta{display:flex;flex-direction:column;gap:16px;}
        .meta-row{display:flex;gap:12px;align-items:flex-start;}
        .meta-label{font-size:10px;letter-spacing:0.2em;color:var(--gold);min-width:80px;padding-top:2px;font-weight:500;}
        .meta-val{font-size:14px;color:rgba(246,240,250,0.85);line-height:1.8;}
        .likes-list{display:flex;flex-wrap:wrap;gap:6px;}
        .like-tag{font-size:11px;padding:4px 12px;border-radius:20px;background:var(--tcl);color:var(--cream);border:1px solid rgba(212,175,55,0.3);}
        .fav-word{font-size:16px;color:var(--cream);font-weight:500;font-style:italic;letter-spacing:0.08em;padding:16px 20px;border-left:3px solid var(--gold);background:var(--tcl);border-radius:0 8px 8px 0;margin-top:8px;}

        .menu-section{background:#0a0f1e;}
        .menu-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
        @media(max-width:720px){.menu-grid{grid-template-columns:1fr;}}
        .menu-card{display:block;text-decoration:none;color:inherit;border-radius:16px;overflow:hidden;border:1px solid rgba(212,175,55,0.25);background:#111827;padding:22px 20px;transition:transform 0.25s,border-color 0.25s;}
        .menu-card:hover{transform:translateY(-4px);border-color:var(--gold);}
        .menu-icon{font-size:26px;margin-bottom:10px;display:block;}
        .menu-title{font-size:14.5px;font-weight:700;color:var(--cream);margin-bottom:6px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;}
        .menu-desc{font-size:11.5px;color:rgba(246,240,250,0.55);line-height:1.6;margin-bottom:14px;}
        .menu-price{font-family:'Cinzel',serif;font-size:15px;color:var(--gold);margin-bottom:6px;}
        .menu-arrow{display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:600;letter-spacing:0.08em;color:var(--tc);}
        .cs-badge{display:inline-block;font-size:9px;padding:2px 7px;background:linear-gradient(135deg,var(--tc),var(--tcd));color:#fff;border-radius:8px;letter-spacing:0.05em;font-weight:600;}

        .msg-section{background:linear-gradient(135deg,var(--tcd) 0%,var(--tc) 100%);text-align:center;}
        .msg-en{font-family:'Cinzel',serif;font-size:10px;letter-spacing:0.4em;color:rgba(255,255,255,0.6);margin-bottom:24px;}
        .msg-box{max-width:640px;margin:0 auto;background:rgba(255,255,255,0.1);border:1px solid rgba(212,175,55,0.3);border-radius:20px;padding:48px 40px;backdrop-filter:blur(8px);}
        .msg-char-name{font-size:12px;color:rgba(255,255,255,0.7);letter-spacing:0.2em;margin-bottom:24px;}
        .msg-text{font-size:clamp(18px,3vw,24px);color:#fff;font-weight:300;line-height:1.9;letter-spacing:0.06em;}
        .msg-date{font-size:10px;color:rgba(255,255,255,0.45);margin-top:24px;letter-spacing:0.2em;}

        .quiz-section{background:linear-gradient(180deg,#0c0632,var(--indigo));}

        .related-section{background:var(--indigo);}
        .related-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;}
        .related-card{border:1px solid rgba(212,175,55,0.2);border-radius:14px;padding:24px 18px;text-decoration:none;color:inherit;transition:all 0.25s;display:block;background:rgba(255,255,255,0.03);opacity:0.75;}
        .related-card:hover{border-color:var(--gold);opacity:1;}
        .related-icon{font-size:28px;margin-bottom:10px;display:block;}
        .related-label{font-size:10px;color:var(--gold);letter-spacing:0.2em;margin-bottom:4px;display:flex;align-items:center;gap:6px;}
        .related-title{font-size:14px;color:var(--cream);font-weight:500;}

        .room-footer{text-align:center;padding:36px 24px 44px;border-top:1px solid rgba(212,175,55,0.12);background:var(--indigo);}
        .footer-links{display:flex;justify-content:center;gap:18px;flex-wrap:wrap;margin-bottom:14px;}
        .footer-links a{font-size:10.5px;color:rgba(246,240,250,0.4);text-decoration:none;}
        .footer-links a:hover{color:var(--gold);}
        .copyright{font-size:10.5px;color:rgba(246,240,250,0.25);letter-spacing:0.15em;}
      `}</style>

      <nav className="room-nav">
        <div className="nav-logo">TWINKLE <span>STAR ORACLE</span></div>
      </nav>

      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">✦ Lumina Room ✦</div>
          <h1 className="hero-name-en">LUMINA</h1>
          <p className="hero-room">― ルミナの部屋 ―</p>
          <div className="hero-divider" />
          <p className="hero-catchcopy">星があなたに伝える、運命のメッセージ</p>
          <p className="hero-quote">「未来はまだ白紙の物語です。」</p>
          <div className="hero-cta">
            <a href="#quiz" className="btn-primary">無料でルミナに占ってもらう ✦</a>
            <a href="#about" className="btn-outline">Luminaについて</a>
          </div>
        </div>
        <div className="hero-scroll"><div className="scroll-line" /><span>SCROLL</span></div>
      </section>

      <section id="about" className="about-section">
        <div className="sec-inner">
          <div className="sec-label">
            <p className="sec-en">ABOUT LUMINA</p>
            <h2 className="sec-jp">Luminaについて</h2>
            <div className="sec-divider" />
          </div>
          <div className="about-grid">
            <p className="about-intro">
              Luminaは、星の図書館に宿る星詠みの案内人です。タロットカードと星の導きを通じて、あなたの魂が持つ可能性と使命を照らし出します。答えを押し付けるのではなく、あなた自身が気づくための光を灯します。
            </p>
            <div className="about-meta">
              <div className="meta-row">
                <span className="meta-label">性　格</span>
                <span className="meta-val">神秘的で落ち着いている。直感と知性を兼ね備え、物事の本質を見抜く力がある。</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">好きなもの</span>
                <div className="likes-list">
                  <span className="like-tag">タロットカード</span>
                  <span className="like-tag">星を眺めること</span>
                  <span className="like-tag">天球儀</span>
                  <span className="like-tag">古い本</span>
                  <span className="like-tag">紫水晶</span>
                </div>
              </div>
              <div className="meta-row">
                <span className="meta-label">好きな場所</span>
                <span className="meta-val">深夜の天文台</span>
              </div>
              <p className="fav-word">「星は嘘をつかない。あなたの魂が知っていることを、星が教えてくれる。」</p>
            </div>
          </div>
        </div>
      </section>

      <section className="menu-section">
        <div className="sec-inner">
          <div className="sec-label">
            <p className="sec-en">READING PLAN</p>
            <h2 className="sec-jp">鑑定メニュー</h2>
            <div className="sec-divider" />
          </div>
          <div className="menu-grid">
            <a href="#quiz" className="menu-card">
              <span className="menu-icon">🃏</span>
              <div className="menu-title">無料タロット占い</div>
              <p className="menu-desc">タップするだけ、2秒で始まる無料鑑定</p>
              <div className="menu-price">無料</div>
              <span className="menu-arrow">今すぐ占う →</span>
            </a>
            <a href="https://twinkle-lab.jp/star?reading=compatibility&from=tso" className="menu-card">
              <span className="menu-icon">💞</span>
              <div className="menu-title">AI相性診断</div>
              <p className="menu-desc">あの人の本音と二人の運命の行方を鑑定</p>
              <div className="menu-price">¥980</div>
              <span className="menu-arrow">鑑定してもらう →</span>
            </a>
            <a href="https://twinkle-lab.jp/star?reading=premium&from=tso" className="menu-card">
              <span className="menu-icon">💫</span>
              <div className="menu-title">Premium AI総合鑑定</div>
              <p className="menu-desc">タロット・数秘・ホロスコープの完全解析</p>
              <div className="menu-price">¥3,980</div>
              <span className="menu-arrow">鑑定してもらう →</span>
            </a>
          </div>
        </div>
      </section>

      <div className="msg-section">
        <p className="msg-en">TODAY&apos;S MESSAGE FROM LUMINA</p>
        <div className="msg-box">
          <p className="msg-char-name">✦ Lumina より ✦</p>
          <p className="msg-text">{todayMessage()}</p>
          <p className="msg-date">{todayLabel()} のメッセージ</p>
        </div>
      </div>

      <section className="quiz-section" id="quiz">
        <div className="sec-label">
          <p className="sec-en">FREE READING</p>
          <h2 className="sec-jp">ルミナに、3つだけ問いかけられてください</h2>
        </div>
        <LuminaQuiz />
      </section>

      <section className="related-section">
        <div className="sec-inner">
          <div className="sec-label">
            <p className="sec-en">RELATED CONTENTS</p>
            <h2 className="sec-jp">関連コンテンツ</h2>
            <div className="sec-divider" />
          </div>
          <div className="related-grid">
            <a href="https://twinkle-lab.jp/coming-soon" className="related-card">
              <span className="related-icon">📝</span>
              <div className="related-label">NOTE<span className="cs-badge">近日公開</span></div>
              <div className="related-title">Luminaのnote記事</div>
            </a>
            <a href="https://twinkle-lab.jp/coming-soon" className="related-card">
              <span className="related-icon">📚</span>
              <div className="related-label">KINDLE<span className="cs-badge">近日公開</span></div>
              <div className="related-title">Kindle本を見る</div>
            </a>
            <a href="https://twinkle-lab.jp/coming-soon" className="related-card">
              <span className="related-icon">📄</span>
              <div className="related-label">ARTICLE<span className="cs-badge">近日公開</span></div>
              <div className="related-title">タロット入門ガイド</div>
            </a>
          </div>
        </div>
      </section>

      <footer className="room-footer">
        <div className="footer-links">
          <a href="https://twinkle-lab.jp/privacy">プライバシーポリシー</a>
          <a href="https://twinkle-lab.jp/tokusho">特定商取引法に基づく表記</a>
          <a href="https://twinkle-lab.jp/tos">利用規約</a>
          <a href="https://twinkle-lab.jp/contact">お問い合わせ</a>
        </div>
        <p className="copyright">運営：<a href="https://twinkle-lab.jp" style={{ textDecoration: 'underline' }}>Twinkle Lab</a>　|　© 2026 Twinkle Star Oracle</p>
      </footer>
    </>
  )
}

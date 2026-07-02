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

        .menu-section{
          position:relative;
          background:
            linear-gradient(115deg, transparent 30%, rgba(109,76,181,0.12) 48%, rgba(212,175,55,0.05) 52%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 20% 10%, rgba(109,76,181,0.25), transparent),
            radial-gradient(ellipse 50% 35% at 85% 90%, rgba(48,19,75,0.5), transparent),
            linear-gradient(180deg,#081030,#0a0f2e 50%,#081030);
          overflow:hidden;
        }
        .menu-section::before{
          content:'';position:absolute;top:0;left:0;pointer-events:none;
          width:2px;height:2px;border-radius:50%;
          box-shadow:
            10vw 8vh 0 0 rgba(246,240,250,.8), 25vw 20vh 1px 0 rgba(212,175,55,.6),
            40vw 5vh 0 0 rgba(246,240,250,.5), 60vw 15vh 1px 0 rgba(246,240,250,.7),
            75vw 28vh 0 0 rgba(212,175,55,.5), 88vw 10vh 0 0 rgba(246,240,250,.6),
            15vw 38vh 1px 0 rgba(246,240,250,.4), 50vw 42vh 0 0 rgba(246,240,250,.6),
            82vw 45vh 1px 0 rgba(109,76,181,.8), 33vw 52vh 0 0 rgba(246,240,250,.5),
            5vw 25vh 0 0 rgba(246,240,250,.5), 68vw 35vh 1px 0 rgba(212,175,55,.4),
            93vw 30vh 0 0 rgba(246,240,250,.5), 45vw 28vh 0 0 rgba(246,240,250,.4);
          animation:twinkle 4s ease-in-out infinite;
        }
        @keyframes twinkle{0%,100%{opacity:0.5;}50%{opacity:1;}}
        .menu-grid{position:relative;z-index:1;display:grid;grid-template-columns:repeat(4,1fr);gap:16px;}
        @media(max-width:900px){.menu-grid{grid-template-columns:repeat(2,1fr) !important;gap:12px;}}
        .menu-card{
          display:block;border-radius:18px;overflow:hidden;
          box-shadow:0 4px 20px rgba(0,0,0,.5);
          transition:transform .3s ease, box-shadow .3s ease;
          line-height:0;
        }
        .menu-card:hover{transform:translateY(-6px);box-shadow:0 0 26px rgba(212,175,55,.3),0 20px 40px rgba(0,0,0,.55);}
        .menu-card-premium{box-shadow:0 0 22px rgba(212,175,55,.22),0 4px 20px rgba(0,0,0,.5);}
        .menu-card img{width:100%;aspect-ratio:1/1;object-fit:cover;display:block;}
        .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;}

        .msg-section{background:linear-gradient(135deg,var(--tcd) 0%,var(--tc) 100%);text-align:center;}

        .line-banner-wrap{padding:0 24px 70px;background:linear-gradient(180deg,#081030,#0a0f2e);}
        .line-banner{
          position:relative;max-width:900px;margin:0 auto;overflow:hidden;
          border-radius:16px;border:1px solid rgba(212,175,55,0.5);
          background:
            radial-gradient(ellipse 70% 60% at 15% 20%, rgba(109,76,181,0.3), transparent),
            radial-gradient(ellipse 60% 50% at 90% 85%, rgba(212,175,55,0.08), transparent),
            linear-gradient(90deg,#070913 0%,#0F132A 50%,#070913 100%);
          padding:44px 32px;text-align:center;
          box-shadow:0 0 40px rgba(212,175,55,0.08);
        }
        .line-banner::before{
          content:'';position:absolute;inset:0;pointer-events:none;
          width:2px;height:2px;border-radius:50%;
          box-shadow:
            8% 20% 0 0 rgba(246,240,250,.7), 18% 70% 1px 0 rgba(212,175,55,.5),
            30% 15% 0 0 rgba(246,240,250,.5), 45% 80% 0 0 rgba(246,240,250,.6),
            60% 25% 1px 0 rgba(212,175,55,.5), 75% 65% 0 0 rgba(246,240,250,.5),
            88% 20% 0 0 rgba(246,240,250,.6), 95% 75% 1px 0 rgba(212,175,55,.4);
        }
        .line-banner-corner{position:absolute;font-size:14px;color:var(--gold);opacity:0.6;}
        .line-banner-corner.tl{top:12px;left:14px;}
        .line-banner-corner.tr{top:12px;right:14px;}
        .line-banner-corner.bl{bottom:12px;left:14px;}
        .line-banner-corner.br{bottom:12px;right:14px;}
        .line-eyebrow{position:relative;font-family:'Cinzel',serif;font-size:10px;letter-spacing:0.35em;color:var(--gold);margin-bottom:14px;}
        .line-catch{position:relative;font-size:clamp(19px,3vw,26px);color:var(--cream);letter-spacing:0.04em;margin-bottom:8px;font-weight:600;}
        .line-sub{position:relative;font-family:'Cinzel',serif;font-size:11px;letter-spacing:0.15em;color:rgba(212,175,55,0.8);margin-bottom:18px;}
        .line-lead{position:relative;max-width:520px;margin:0 auto 28px;font-size:13px;line-height:1.9;color:rgba(246,240,250,0.65);}
        .line-btn{
          position:relative;display:inline-flex;align-items:center;gap:8px;
          padding:15px 34px;border-radius:999px;text-decoration:none;
          font-size:13.5px;font-weight:600;letter-spacing:0.06em;color:var(--cream);
          background:linear-gradient(120deg,#3D2566,#6D4CB5 55%,#8a6a20);
          border:1px solid rgba(212,175,55,0.6);
          box-shadow:0 0 24px rgba(212,175,55,0.25);
          transition:box-shadow .3s ease, transform .3s ease;
        }
        .line-btn:hover{box-shadow:0 0 34px rgba(212,175,55,0.45);transform:translateY(-2px);}
        .msg-en{font-family:'Cinzel',serif;font-size:10px;letter-spacing:0.4em;color:rgba(255,255,255,0.6);margin-bottom:24px;}
        .msg-box{max-width:640px;margin:0 auto;background:rgba(255,255,255,0.1);border:1px solid rgba(212,175,55,0.3);border-radius:20px;padding:48px 40px;backdrop-filter:blur(8px);}
        .msg-char-name{font-size:12px;color:rgba(255,255,255,0.7);letter-spacing:0.2em;margin-bottom:24px;}
        .msg-text{font-size:clamp(18px,3vw,24px);color:#fff;font-weight:300;line-height:1.9;letter-spacing:0.06em;}
        .msg-date{font-size:10px;color:rgba(255,255,255,0.45);margin-top:24px;letter-spacing:0.2em;}

        .quiz-section{background:linear-gradient(180deg,#0c0632,var(--indigo));}

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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/menu/tso-menu-1.jpg" alt="無料タロット占い。タップするだけ、2秒で始まる神秘のメッセージ。無料。今すぐ占う。" />
              <span className="sr-only">無料タロット占いを今すぐ占う</span>
            </a>
            <a href="https://twinkle-lab.jp/star?reading=destiny&from=tso" className="menu-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/menu/tso-menu-2.jpg" alt="魂の才能・使命診断。数秘術で紐解く、あなたが生まれてきた本当の意味。一部無料、詳細¥980。使命を知る。" />
              <span className="sr-only">魂の才能・使命診断で使命を知る</span>
            </a>
            <a href="https://twinkle-lab.jp/star?reading=compatibility&from=tso" className="menu-card">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/menu/tso-menu-3.jpg" alt="AI相性診断。あの人の本音と、二人の運命が重なり合う愛のストーリー。¥980。二人の運命を読む。" />
              <span className="sr-only">AI相性診断で二人の運命を読む</span>
            </a>
            <a href="https://twinkle-lab.jp/star?reading=premium&from=tso" className="menu-card menu-card-premium">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/menu/tso-menu-4.jpg" alt="Premium AI総合鑑定。タロット・数秘・ホロスコープを融合した完全解析レポート。¥3,980。完全版を受ける。" />
              <span className="sr-only">Premium AI総合鑑定を受ける</span>
            </a>
          </div>
        </div>
      </section>

      <div className="line-banner-wrap">
        <div className="line-banner">
          <span className="line-banner-corner tl">✦</span>
          <span className="line-banner-corner tr">✦</span>
          <span className="line-banner-corner bl">✦</span>
          <span className="line-banner-corner br">✦</span>
          <p className="line-eyebrow">✦ OFFICIAL LINE ✦</p>
          <h3 className="line-catch">星々の囁きを、あなたの日常に。</h3>
          <p className="line-sub">Twinkle Star Oracle 公式LINEアカウント</p>
          <p className="line-lead">
            今なら友だち追加で、あなたの運命をさらに深く読み解く【今月の星の導きシート】＆【有料鑑定で使える特別招待クーポン】をプレゼント。
          </p>
          <a href="https://lin.ee/REPLACE_WITH_LINE_URL" className="line-btn">
            💬 LINEで神秘のメッセージを受け取る →
          </a>
        </div>
      </div>

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

import LuminaQuiz from './LuminaQuiz'

export default function LuminaRoom() {
  return (
    <>
      <style>{`
        :root{
          --indigo:#081030;
          --purple-deep:#30134B;
          --purple:#6D4CB5;
          --gold:#D4AF37;
          --cream:#F6F0FA;
        }
        *{margin:0;padding:0;box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{
          background:var(--indigo);
          color:var(--cream);
          font-family:'Noto Serif JP',serif;
          min-height:100vh;
        }
        a{color:inherit;}

        .hero{
          position:relative;
          min-height:100svh;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:center;
          text-align:center;
          padding:40px 24px;
          overflow:hidden;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(109,76,181,0.35), transparent 60%),
            linear-gradient(180deg, var(--indigo) 0%, var(--purple-deep) 65%, var(--indigo) 100%);
        }
        .stars{position:absolute;inset:0;z-index:0;}
        .star{position:absolute;background:var(--cream);border-radius:50%;opacity:0.7;animation:twinkle 3.5s ease-in-out infinite;}
        @keyframes twinkle{0%,100%{opacity:0.2;}50%{opacity:0.9;}}

        .constellation{position:absolute;top:8%;left:50%;transform:translateX(-50%);width:min(520px,90vw);opacity:0.55;z-index:0;pointer-events:none;}

        .hero-content{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;}
        .badge{font-family:'Cinzel',serif;font-size:11px;letter-spacing:0.4em;color:var(--gold);margin-bottom:22px;}
        .hero-title{font-family:'Cinzel',serif;font-size:clamp(32px,8vw,54px);font-weight:600;letter-spacing:0.06em;color:var(--cream);line-height:1.3;text-shadow:0 0 24px rgba(212,175,55,0.35);}
        .hero-title span{display:block;color:var(--gold);font-size:0.5em;letter-spacing:0.5em;margin-top:14px;}
        .gold-line{width:70px;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);margin:26px auto;}
        .hero-lead{font-size:15px;line-height:2;color:rgba(246,240,250,0.75);max-width:340px;margin-bottom:44px;}
        .hero-lead strong{color:var(--cream);font-weight:600;}

        .cta-btn{
          display:inline-flex;align-items:center;gap:10px;
          font-family:'Cinzel',serif;font-size:13px;letter-spacing:0.15em;
          padding:18px 38px;border-radius:999px;text-decoration:none;
          background:linear-gradient(135deg,#8a6ab8,var(--purple) 60%,#4d2f8a);
          color:var(--cream);
          box-shadow:0 0 0 1px rgba(212,175,55,0.4), 0 10px 30px rgba(109,76,181,0.5);
          animation:pulse 2.8s ease-in-out infinite;
        }
        @keyframes pulse{0%,100%{box-shadow:0 0 0 1px rgba(212,175,55,0.4),0 10px 30px rgba(109,76,181,0.5);}50%{box-shadow:0 0 0 1px rgba(212,175,55,0.7),0 10px 40px rgba(109,76,181,0.75);}}

        .scroll-hint{position:absolute;bottom:28px;left:50%;transform:translateX(-50%);font-size:10px;letter-spacing:0.3em;color:rgba(246,240,250,0.4);z-index:1;}
        .scroll-hint::after{content:'';display:block;width:1px;height:26px;background:linear-gradient(180deg,var(--gold),transparent);margin:8px auto 0;}

        .quiz-section{
          padding:70px 0 90px;
          background:linear-gradient(180deg,var(--indigo) 0%,#0c0632 100%);
          position:relative;
        }
        .quiz-intro{text-align:center;margin-bottom:36px;padding:0 24px;}
        .quiz-eyebrow{font-family:'Cinzel',serif;font-size:10px;letter-spacing:0.3em;color:var(--gold);margin-bottom:10px;}
        .quiz-heading{font-size:19px;color:var(--cream);font-weight:600;margin-bottom:10px;}
        .quiz-sub{font-size:12.5px;color:rgba(246,240,250,0.55);}

        footer{text-align:center;padding:36px 24px 44px;font-size:10.5px;color:rgba(246,240,250,0.3);letter-spacing:0.05em;}
        footer a{text-decoration:underline;color:rgba(246,240,250,0.4);}
      `}</style>

      <section className="hero">
        <div className="stars">
          {Array.from({ length: 42 }).map((_, i) => {
            const size = Math.random() * 2 + 1
            return (
              <span
                key={i}
                className="star"
                style={{
                  width: size,
                  height: size,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3.5}s`,
                }}
              />
            )
          })}
        </div>

        <svg className="constellation" viewBox="0 0 400 200" fill="none">
          <g stroke="#D4AF37" strokeWidth="0.6" opacity="0.6">
            <line x1="40" y1="150" x2="110" y2="80" />
            <line x1="110" y1="80" x2="200" y2="40" />
            <line x1="200" y1="40" x2="290" y2="90" />
            <line x1="290" y1="90" x2="360" y2="60" />
            <line x1="110" y1="80" x2="180" y2="130" />
          </g>
          <g fill="#F6F0FA">
            <circle cx="40" cy="150" r="2" />
            <circle cx="110" cy="80" r="2.6" />
            <circle cx="200" cy="40" r="3.2" />
            <circle cx="290" cy="90" r="2.2" />
            <circle cx="360" cy="60" r="1.8" />
            <circle cx="180" cy="130" r="1.6" />
          </g>
        </svg>

        <div className="hero-content">
          <div className="badge">✦ THE LIBRARY OF STARS ✦</div>
          <h1 className="hero-title">
            Twinkle Star Oracle
            <span>― 星詠みの案内人 ルミナ ―</span>
          </h1>
          <div className="gold-line" />
          <p className="hero-lead">
            星は嘘をつかない。<br />
            <strong>あなたの魂がすでに知っていること</strong>を、<br />
            星が教えてくれるのです。
          </p>
          <a href="#quiz" className="cta-btn">扉を開く ✦</a>
        </div>

        <div className="scroll-hint">SCROLL</div>
      </section>

      <section className="quiz-section" id="quiz">
        <div className="quiz-intro">
          <div className="quiz-eyebrow">✦ FREE READING ✦</div>
          <h2 className="quiz-heading">ルミナに、3つだけ問いかけられてください</h2>
          <p className="quiz-sub">文字入力は不要です。直感でタップするだけ。</p>
        </div>
        <LuminaQuiz />
      </section>

      <footer>
        運営：Twinkle Lab　|　<a href="https://twinkle-lab.jp">twinkle-lab.jp</a>
      </footer>
    </>
  )
}

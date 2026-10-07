/* اسألني — وحدة الحماية (جهة المتصفح). انظر SECURITY.md للحدود والمتطلبات الخادمية. */
(() => {
  'use strict';
  const d = document, root = d.documentElement;
  const LOG = 'askme.sec.log.v1', LOCK = 'askme.sec.lock.v1', SALT = 'askme.sec.salt.v1', MAX_BYTES = 450000;

  // 1) منع التضمين داخل إطار (Clickjacking): يُخفى المحتوى ويُحاول الخروج من الإطار
  try { if (window.top !== window.self) { root.classList.add('sec-framed'); window.top.location.href = window.self.location.href; } }
  catch { root.classList.add('sec-framed'); }

  const rd = (k, f) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? f; } catch { return f; } };
  const wr = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch { return false; } };
  const log = (type, detail) => { const l = rd(LOG, []); l.push({ t: Date.now(), type, detail: String(detail || '').slice(0, 80) }); wr(LOG, l.slice(-50)); };
  const notify = m => { const t = d.getElementById('toast'); if (!t) return; t.textContent = m; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 3200); };

  // 2) فحص المحتوى: روابط، دعاية، تكرار، حروف مبالغ فيها، نسخ مطابقة
  const norm = s => String(s || '').normalize('NFKC').toLowerCase()
    .replace(/[\u200B-\u200F\u2060\uFEFF\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[\u0660-\u0669\u06F0-\u06F9]/g, c => String(c.charCodeAt(0) & 15))
    .replace(/[إأآ]/g, 'ا').replace(/ى/g, 'ي').replace(/ة/g, 'ه');
  const LINK = /(https?:\/\/|\bwww\.|\b[a-z0-9-]{2,}\.(?:com|net|org|io|me|ly|tk|ru|xyz|top|info|co|app|link|click|cc|ws|gg)\b|\bt\.me\/|\bwa\.me\/|\bbit\.ly)/i;
  const SPAM_AR = ['كازينو', 'مراهنات', 'رهانات', 'ربح سريع', 'اربح الان', 'ارباح مضمونه', 'استثمار مضمون', 'شراء متابعين', 'بيع متابعين', 'تواصل معي', 'راسلني خاص', 'كلمني خاص', 'ارسل رقمك', 'سكس', 'اباحي', 'بورن'];
  const SPAM_LATIN = /\b(casino|porn|xxx|viagra|forex|giveaway|click here|free money|dm me|loan offer)\b/i;
  const EXTRA_BLOCKED = []; // أضف هنا أي كلمات تريد حظرها (بعد التطبيع: بدون تشكيل، ا بدل أ/إ/آ)
  const key = s => norm(s).replace(/[^\p{L}\p{N}]/gu, '');
  const no = reason => ({ ok: false, reason });
  function inspect(text, existing = []) {
    const raw = String(text || ''), n = norm(raw), flat = n.replace(/\s/g, '');
    if (LINK.test(n)) return no('لا يُسمح بالروابط أو عناوين المواقع في المحتوى.');
    if (SPAM_AR.concat(EXTRA_BLOCKED).some(w => n.includes(w)) || SPAM_LATIN.test(n)) return no('يحتوي النص على عبارات تُشبه المحتوى الدعائي أو المخالف.');
    if (/(\S)\1{6,}/u.test(n)) return no('يحتوي النص على تكرار مبالغ فيه للأحرف.');
    const words = n.split(/\s+/).filter(Boolean);
    if (words.length >= 6) { const c = {}; let top = 0; words.forEach(w => { top = Math.max(top, c[w] = (c[w] || 0) + 1); }); if (top / words.length > 0.5) return no('يحتوي النص على تكرار مبالغ فيه للكلمات.'); }
    if (flat.length >= 20 && new Set([...flat]).size / flat.length < 0.2) return no('النص غير مفهوم أو مكرر.');
    const sym = (flat.match(/[^\p{L}\p{N}]/gu) || []).length; if (flat.length >= 10 && sym / flat.length > 0.4) return no('يحتوي النص على رموز كثيرة.');
    const lat = (raw.match(/[a-z]/gi) || []).length; if (lat >= 15 && (raw.match(/[A-Z]/g) || []).length / lat > 0.7) return no('تجنّب كتابة النص بحروف كبيرة بالكامل.');
    const k = key(raw); if (k.length >= 8 && existing.some(e => key(e) === k)) return no('يوجد محتوى مطابق لهذا من قبل.');
    return { ok: true, reason: '' };
  }

  // 3) تحديد المعدّل مع تصعيد الحظر المؤقت (1 د ← 5 د ← 30 د) ونسخة في الذاكرة تصمد أمام مسح التخزين
  const LIM = { question: [1, 30000], answer: [3, 60000], react: [12, 60000] }, STEP = [60, 300, 1800];
  const mem = { ts: {}, lock: {}, strikes: {} };
  function rate(a) {
    const [lim, win] = LIM[a] || [5, 60000], now = Date.now(), st = rd(LOCK, {});
    const until = Math.max(st[a] || 0, mem.lock[a] || 0);
    if (until > now) return { ok: false, wait: Math.ceil((until - now) / 1000) };
    const k = 'askme.rate.' + a, saved = rd(k, []);
    const ts = [...new Set([...(Array.isArray(saved) ? saved : []), ...(mem.ts[a] || [])].filter(t => Number.isFinite(t) && now - t < win))];
    if (ts.length >= lim) {
      const s = mem.strikes[a] = (mem.strikes[a] || 0) + 1;
      if (s >= 3) { const sec = STEP[Math.min(s - 3, 2)], u = now + sec * 1000; mem.lock[a] = u; st[a] = u; wr(LOCK, st); log('lockout', a + ':' + sec + 's'); return { ok: false, wait: sec }; }
      log('rate', a); return { ok: false, wait: Math.max(1, Math.ceil((win - (now - Math.min(...ts))) / 1000)) };
    }
    ts.push(now); mem.ts[a] = ts; wr(k, ts); return { ok: true, wait: 0 };
  }

  // 4) سلامة البيانات المحلية: توقيع + حد للحجم (يكشف التعديل اليدوي البسيط والتلف، وليس بديلًا عن الخادم)
  function h(s) { let a = 0xdeadbeef, b = 0x41c6ce57; for (let i = 0; i < s.length; i++) { const c = s.charCodeAt(i); a = Math.imul(a ^ c, 2654435761); b = Math.imul(b ^ c, 1597334677); } a = Math.imul(a ^ (a >>> 16), 2246822507) ^ Math.imul(b ^ (b >>> 13), 3266489909); b = Math.imul(b ^ (b >>> 16), 2246822507) ^ Math.imul(a ^ (a >>> 13), 3266489909); return (4294967296 * (2097151 & b) + (a >>> 0)).toString(36); }
  function salt() { let s = rd(SALT, ''); if (typeof s !== 'string' || s.length < 16) { const b = new Uint8Array(16); crypto.getRandomValues(b); s = Array.from(b, x => x.toString(16).padStart(2, '0')).join(''); wr(SALT, s); } return s; }
  const sig = p => h(salt() + p + salt());
  function seal(k, json) { if (json.length > MAX_BYTES) return false; try { localStorage.setItem(k, json); localStorage.setItem(k + '.sig', sig(json)); return true; } catch { return false; } }
  function verify(k) {
    try { const v = localStorage.getItem(k), s = localStorage.getItem(k + '.sig'); if (v === null || s === null || s === sig(v)) return true; log('tamper', k); localStorage.removeItem(k); return false; }
    catch { return true; }
  }

  // 5) عدّ المشاهدات مرة واحدة لكل سؤال في الجلسة (يمنع تضخيم الأرقام)
  const seen = new Set();
  function viewOnce(id) { if (seen.has(id)) return false; seen.add(id); try { const k = 'askme.sec.views', a = JSON.parse(sessionStorage.getItem(k) || '[]'); if (a.includes(id)) return false; a.push(id); sessionStorage.setItem(k, JSON.stringify(a.slice(-200))); } catch {} return true; }

  // 6) حماية النماذج من البوتات: حقل مصيدة + زمن كتابة أدنى + أحداث موثوقة فقط
  const born = new WeakMap();
  d.addEventListener('input', e => { if (!e.isTrusted) return; const f = e.target.closest && e.target.closest('form'); if (f && !born.has(f)) born.set(f, Date.now()); }, true);
  d.addEventListener('reset', e => born.delete(e.target), true);
  function honeypot(f) { if (f.querySelector('.hp-field')) return; const w = d.createElement('div'), i = d.createElement('input'); w.className = 'hp-field'; w.setAttribute('aria-hidden', 'true'); i.type = 'text'; i.name = 'website'; i.tabIndex = -1; i.autocomplete = 'off'; w.appendChild(i); f.appendChild(w); }
  const scan = () => d.querySelectorAll('#askForm,[data-answer-form]').forEach(honeypot);
  d.addEventListener('DOMContentLoaded', () => { scan(); new MutationObserver(scan).observe(d.body, { childList: true, subtree: true }); });
  d.addEventListener('submit', e => {
    const f = e.target; if (!(f instanceof HTMLFormElement)) return;
    const ask = f.id === 'askForm', ans = f.hasAttribute('data-answer-form'); if (!ask && !ans) return;
    const hp = f.querySelector('.hp-field input'), t0 = born.get(f); let why = '';
    if (!e.isTrusted) why = 'untrusted'; else if (hp && hp.value) why = 'honeypot'; else if (!t0 || Date.now() - t0 < (ask ? 2500 : 1200)) why = 'too-fast';
    if (why) { e.preventDefault(); e.stopImmediatePropagation(); log('blocked-submit', why); notify('تعذّر الإرسال. اكتب المحتوى بنفسك ثم أعد المحاولة.'); }
  }, true);

  // 7) حماية الروابط: https فقط للخارج + rel آمن
  d.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href]'); if (!a) return; let u;
    try { u = new URL(a.getAttribute('href'), location.href); } catch { e.preventDefault(); return; }
    if (u.origin !== location.origin && u.protocol !== 'https:') { e.preventDefault(); log('blocked-link', u.protocol); return; }
    if (a.target === '_blank') a.rel = 'noopener noreferrer';
  }, true);

  // 8) تسجيل انتهاكات CSP + تحذير Self-XSS
  d.addEventListener('securitypolicyviolation', e => log('csp', e.violatedDirective + ' ' + (e.blockedURI || '')));
  try { console.log('%cتوقّف!', 'color:#d75b30;font-size:28px;font-weight:700'); console.log('%cلا تلصق هنا أي شيفرة يطلبها منك شخص آخر؛ قد تُستخدم لسرقة بياناتك.', 'font-size:14px'); } catch {}

  // 9) منع نسخ النص وتحديده وسحبه (يُستثنى حقول الإدخال ليتمكن الزائر من الكتابة واللصق)
  const editable = t => t.closest && t.closest('input,textarea,select,[contenteditable="true"]');
  ['copy', 'cut', 'dragstart', 'selectstart', 'contextmenu'].forEach(ev => d.addEventListener(ev, e => { if (!editable(e.target)) e.preventDefault(); }, true));

  Object.defineProperty(window, 'AskSecurity', { value: Object.freeze({ inspect, rate, seal, verify, viewOnce, status: () => ({ log: rd(LOG, []), locks: rd(LOCK, {}) }) }), writable: false, configurable: false });
})();

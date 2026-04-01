/* ============================================================
   GLOBAL CARGO SOLUTIONS — INTRANET DEMO SCRIPT
   Verzia pre Damiána — vrátane Doručenej pošty
   ============================================================ */

// ===== REFERENCIE NA ELEMENTY =====
const loginScreen     = document.getElementById('login-screen');
const dashboardScreen = document.getElementById('dashboard-screen');
const emailInput      = document.getElementById('email');
const passwordInput   = document.getElementById('password');
const loginBtn        = document.getElementById('login-btn');
const loginError      = document.getElementById('login-error');
const logoutBtn       = document.getElementById('logout-btn');
const pollBtn         = document.getElementById('poll-btn');
const pollMsg         = document.getElementById('poll-msg');
const mailBtn         = document.getElementById('mail-btn');
const mailMsg         = document.getElementById('mail-msg');

// Inbox elementy
const inboxList           = document.getElementById('inbox-list');
const emailDetailDamian   = document.getElementById('email-detail-damian');
const backToInboxDamian   = document.getElementById('back-to-inbox-damian');
const detailHeader        = document.getElementById('detail-header');
const detailSubject       = document.getElementById('detail-subject');
const detailBody          = document.getElementById('detail-body');

// ===== TESTOVACIE PRIHLASOVACIE ÚDAJE (len pre demo) =====
const DEMO_EMAIL    = 'damian@globalcargosolutions.ltd';
const DEMO_PASSWORD = 'Demo1234';

// ===== DÁTA E-MAILOV (obsah jednotlivých správ) =====
const emailData = {
  hr: {
    avatar: 'HR',
    from: 'HR Oddelenie',
    email: 'hr@globalcargosolutions.ltd',
    to: 'damian.kovac@globalcargosolutions.ltd',
    time: 'Dnes, 09:30',
    subject: 'Aktualizácia home office pravidiel',
    body: '<p>Vážení kolegovia,</p><p>od pondelka 7. 4. 2026 platia aktualizované pravidlá pre prácu z domu. Maximálny počet home office dní sa zvyšuje na 3 dni v týždni.</p><p>Podrobnosti nájdete v sekcii Dokumenty na intranete.</p><p>S pozdravom,<br>HR Oddelenie</p>'
  },
  manager: {
    avatar: 'SB',
    from: 'Samuel Bojanovský',
    email: 'samuel.bojanovsky@globalcargosolutions.ltd',
    to: 'damian.kovac@globalcargosolutions.ltd',
    time: 'Včera, 15:20',
    subject: 'Podklady k Q3 rozpočtu',
    body: '<p>Ahoj Damián,</p><p>vieš mi prosím poslať aktualizovanú revíziu rozpočtu za Q3? Potrebujem to mať do piatku na poradu s vedením.</p><p>Ak to máš hotové, nahraj to na cloud alebo mi to pošli cez interný mail.</p><p>Vďaka,<br>Samuel</p>'
  },
  it: {
    avatar: 'IT',
    from: 'IT Podpora',
    email: 'it-support@globalcargosolutions.ltd',
    to: 'all-staff@globalcargosolutions.ltd',
    time: 'Včera, 11:00',
    subject: 'Plánovaná údržba VPN — piatok 18:00',
    body: '<p>Vážení kolegovia,</p><p>informujeme vás, že v piatok 4. 4. 2026 od 18:00 do 22:00 prebehne plánovaná údržba VPN prístupu. Počas tejto doby nebude možné pripojenie cez VPN.</p><p>Za porozumenie ďakujeme,<br>IT Podpora</p>'
  }
};


// ========== 1. PRIHLÁSENIE ==========
loginBtn.addEventListener('click', function () {
  loginError.textContent = '';
  const email = emailInput.value.trim();
  const pass  = passwordInput.value;

  if (email === DEMO_EMAIL && pass === DEMO_PASSWORD) {
    loginScreen.classList.add('hidden');
    dashboardScreen.classList.remove('hidden');
  } else {
    loginError.textContent = 'Nesprávny e-mail alebo heslo. Skúste to znova.';
  }
});

passwordInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') loginBtn.click();
});
emailInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') loginBtn.click();
});


// ========== 2. PREPÍNANIE ZÁLOŽIEK ==========
const tabs        = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(function (tab) {
  tab.addEventListener('click', function () {
    tabs.forEach(function (t) { t.classList.remove('active'); });
    tabContents.forEach(function (tc) { tc.classList.remove('active'); });

    tab.classList.add('active');
    const targetId = 'tab-' + tab.getAttribute('data-tab');
    document.getElementById(targetId).classList.add('active');

    // Keď sa prepne na inbox, reset na zoznam (skryť detail)
    if (tab.getAttribute('data-tab') === 'inbox') {
      emailDetailDamian.classList.add('hidden');
      inboxList.style.display = '';
    }
  });
});


// ========== 3. DORUČENÁ POŠTA — kliknutie na e-mail ==========
var inboxItems = document.querySelectorAll('.inbox-item');

inboxItems.forEach(function (item) {
  item.addEventListener('click', function () {
    var mailKey = item.getAttribute('data-mail');
    var data = emailData[mailKey];
    if (!data) return;

    // Naplníme detail
    detailHeader.innerHTML =
      '<div class="email-avatar">' + data.avatar + '</div>' +
      '<div>' +
        '<strong>' + data.from + '</strong>' +
        '<span class="email-meta"> &lt;' + data.email + '&gt;</span><br>' +
        '<span class="email-meta">Komu: ' + data.to + '</span><br>' +
        '<span class="email-meta">' + data.time + '</span>' +
      '</div>';

    detailSubject.textContent = data.subject;
    detailBody.innerHTML = data.body;

    // Skryjeme zoznam, ukážeme detail
    inboxList.style.display = 'none';
    emailDetailDamian.classList.remove('hidden');
  });
});

// Tlačidlo späť
backToInboxDamian.addEventListener('click', function () {
  emailDetailDamian.classList.add('hidden');
  inboxList.style.display = '';
});


// ========== 4. ANKETA (demo) ==========
pollBtn.addEventListener('click', function () {
  var selected = document.querySelector('input[name="coffee"]:checked');

  if (!selected) {
    pollMsg.style.color = '#c0392b';
    pollMsg.textContent = 'Vyberte jednu z možností pred odoslaním.';
    return;
  }

  pollMsg.style.color = '#27ae60';
  pollMsg.textContent = '✓ Váš hlas bol zaznamenaný. Ďakujeme! (demo režim)';
});


// ========== 5. ODOSLANIE MAILU (demo) ==========
mailBtn.addEventListener('click', function () {
  mailMsg.textContent = '✓ E-mail bol odoslaný (demo režim — žiadny reálny e-mail nebol odoslaný).';
});


// ========== 6. ODHLÁSENIE ==========
logoutBtn.addEventListener('click', function () {
  dashboardScreen.classList.add('hidden');
  loginScreen.classList.remove('hidden');

  emailInput.value    = '';
  passwordInput.value = '';
  loginError.textContent = '';
  pollMsg.textContent = '';
  mailMsg.textContent = '';

  var checkedRadio = document.querySelector('input[name="coffee"]:checked');
  if (checkedRadio) checkedRadio.checked = false;

  // Reset inbox
  emailDetailDamian.classList.add('hidden');
  inboxList.style.display = '';

  // Reset záložiek
  tabs.forEach(function (t) { t.classList.remove('active'); });
  tabContents.forEach(function (tc) { tc.classList.remove('active'); });
  tabs[0].classList.add('active');
  tabContents[0].classList.add('active');
});

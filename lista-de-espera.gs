/**
 * Deadman: lista de espera
 * Cole este código em Extensões › Apps Script, dentro da planilha Google
 * onde você quer ver os emails. Depois publique como "App da Web".
 */
const ABA = 'Lista de espera';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const p = (e && e.parameter) || {};
    if (p.website) return resposta({ ok: true });            // campo invisível preenchido = robô

    const email = String(p.email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
      return resposta({ ok: false, erro: 'email inválido' });
    }

    const aba = pegarAba();
    const ultima = aba.getLastRow();
    const existentes = ultima > 1
      ? aba.getRange(2, 2, ultima - 1, 1).getValues().map(function (l) { return String(l[0]).replace(/^'/, ''); })
      : [];
    if (existentes.indexOf(email) === -1) {
      aba.appendRow([new Date(), seguro(email), seguro(p.lang), seguro(p.source), seguro(p.page)]);
    }
    return resposta({ ok: true });
  } finally {
    lock.releaseLock();
  }
}

// Abrir a URL do app no navegador mostra só o total (os emails ficam só na planilha)
function doGet() {
  const aba = pegarAba();
  return resposta({ ok: true, total: Math.max(aba.getLastRow() - 1, 0) });
}

function pegarAba() {
  const planilha = SpreadsheetApp.getActiveSpreadsheet();
  let aba = planilha.getSheetByName(ABA);
  if (!aba) {
    aba = planilha.insertSheet(ABA);
    aba.appendRow(['Data', 'Email', 'Idioma', 'Origem', 'Página']);
    aba.setFrozenRows(1);
  }
  return aba;
}

// Evita que um texto começando com = + - @ vire fórmula na planilha
function seguro(v) {
  const s = String(v || '').slice(0, 300);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function resposta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

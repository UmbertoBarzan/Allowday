export function PrivacyPage() {
  return (
    <article className="prose max-w-3xl text-sm text-slate-600">
      <h1 className="text-3xl font-bold text-slate-800">Informativa privacy</h1>
      <p>
        Ai sensi del Regolamento (UE) 2016/679 (“GDPR”), Allowday tratta i dati personali esclusivamente per fornire il
        servizio di pianificazione finanziaria. I dati inseriti non vengono ceduti a terzi né utilizzati per finalità di marketing senza consenso esplicito.
      </p>
      <h2>Basi giuridiche</h2>
      <ul>
        <li>Esecuzione del contratto (art. 6.1.b) per la fornitura del servizio.</li>
        <li>Adempimento di obblighi legali (art. 6.1.c) per eventuali richieste delle autorità.</li>
        <li>Consenso esplicito (art. 6.1.a) per comunicazioni facoltative.</li>
      </ul>
      <h2>Conservazione dati</h2>
      <p>
        I dati vengono conservati per il tempo necessario all’erogazione del servizio e cancellati entro 30 giorni dalla richiesta di eliminazione. Backup cifrati sono mantenuti per 7 giorni e poi eliminati.
      </p>
      <h2>Diritti dell’interessato</h2>
      <p>
        Puoi esercitare i diritti di accesso, rettifica, cancellazione, portabilità e opposizione scrivendo a <a href="mailto:privacy@allowday.it">privacy@allowday.it</a>.
      </p>
      <h2>Trasferimenti extra UE</h2>
      <p>
        I server sono ospitati nell’Unione Europea. Qualsiasi eventuale trasferimento extra UE avviene nel rispetto delle Clausole Contrattuali Standard approvate dalla Commissione Europea.
      </p>
    </article>
  );
}

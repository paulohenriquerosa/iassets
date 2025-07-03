import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos de Uso | iAssets News – Regras e responsabilidades",
  description:
    "Confira as condições de uso, licenças, limitações de responsabilidade e demais disposições aplicáveis ao portal iAssets News.",
  alternates: { canonical: "https://news.iassets.com.br/termos" },
};

export default function TermosPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 prose prose-slate dark:prose-invert">
      <h1>Termos de Uso</h1>

      {/* Introdução */}
      <section aria-labelledby="aceitacao">
        <h2 id="aceitacao">1. Aceitação dos termos</h2>
        <p>
          Ao acessar o <strong>iAssets News</strong> (<em>&quot;Site&quot;</em>), você concorda em cumprir
          estes Termos de Uso e todas as leis e regulamentos aplicáveis. Se não
          concordar com alguma condição, solicitamos que não utilize o Site.
        </p>
      </section>

      {/* Licença de uso */}
      <section aria-labelledby="licenca">
        <h2 id="licenca">2. Licença de uso</h2>
        <p>
          É concedida permissão para baixar temporariamente uma cópia do conteúdo
          exclusivamente para visualização pessoal e não&nbsp;comercial. Esta é uma
          licença, não uma transferência de título, e, sob esta licença, você
          não pode:
        </p>
        <ul>
          <li>Modificar ou copiar o material;</li>
          <li>Usá-lo para finalidade comercial ou exibição pública;</li>
          <li>Realizar engenharia reversa de qualquer software do Site;</li>
          <li>Remover direitos autorais ou marcas de propriedade;</li>
          <li>Transferir o material para terceiros ou espelhá-lo em outro
            servidor.</li>
        </ul>
        <p>
          Esta licença é rescindida automaticamente em caso de violação destes
          termos.
        </p>
      </section>

      {/* Isenção de responsabilidade */}
      <section aria-labelledby="disclaimer">
        <h2 id="disclaimer">3. Isenção de responsabilidade</h2>
        <p>
          O conteúdo do Site é fornecido &quot;no estado em que se encontra&quot;. O
          iAssets News não oferece garantias, expressas ou implícitas, e se isenta
          de responsabilidade por danos decorrentes do uso das informações.
        </p>
      </section>

      {/* Limitações */}
      <section aria-labelledby="limitacoes">
        <h2 id="limitacoes">4. Limitações de responsabilidade</h2>
        <p>
          Em nenhuma hipótese o iAssets News será responsável por perdas ou danos
          (incluindo perda de dados ou interrupção de negócios) decorrentes do
          uso ou incapacidade de usar o Site.
        </p>
      </section>

      {/* Precisão */}
      <section aria-labelledby="precisao">
        <h2 id="precisao">5. Precisão das informações</h2>
        <p>
          Os materiais podem conter erros técnicos ou tipográficos. O iAssets
          News não garante que o conteúdo seja preciso ou atualizado, podendo
          alterá-lo a qualquer momento sem aviso prévio.
        </p>
      </section>

      {/* Links externos */}
      <section aria-labelledby="links">
        <h2 id="links">6. Links externos</h2>
        <p>
          O iAssets News não revisa todos os sites vinculados e não se
          responsabiliza pelo conteúdo de terceiros. O uso de links externos é
          por conta e risco do usuário.
        </p>
      </section>

      {/* Modificações */}
      <section aria-labelledby="modificacoes">
        <h2 id="modificacoes">7. Modificações dos termos</h2>
        <p>
          Podemos revisar estes Termos de Uso a qualquer momento. Ao continuar a
          utilizar o Site, você concorda em se submeter à versão mais recente.
        </p>
      </section>

      {/* Lei aplicável */}
      <section aria-labelledby="lei">
        <h2 id="lei">8. Lei aplicável e foro</h2>
        <p>
          Estes termos são regidos pelas leis brasileiras. Fica eleito o foro da
          comarca de São&nbsp;Paulo, SP, para dirimir quaisquer controvérsias.
        </p>
      </section>

      {/* Contato */}
      <section aria-labelledby="contato">
        <h2 id="contato">9. Contato</h2>
        <address className="not-italic">
          Dúvidas sobre estes Termos? Escreva para
          <a href="mailto:legal@iassets.com.br" className="ml-1">legal@iassets.com.br</a>.
        </address>
      </section>
    </main>
  );
} 
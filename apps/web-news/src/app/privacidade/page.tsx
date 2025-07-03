import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | iAssets News – Como tratamos seus dados",
  description:
    "Saiba como o iAssets News coleta, usa, armazena e protege seus dados pessoais, além de informações sobre cookies e seus direitos sob a LGPD.",
  alternates: { canonical: "https://news.iassets.com.br/privacidade" },
};

const EFFECTIVE_DATE = "3 de julho de 2025";

export default function PrivacidadePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 prose prose-slate dark:prose-invert">
      <h1>Política de Privacidade</h1>

      <p>
        Sua privacidade é importante para nós. Esta política descreve como o
        <strong>iAssets News</strong> coleta, usa e protege seus dados pessoais ao utilizar
        nosso site <em>(&quot;Serviço&quot; ou &quot;Site&quot;)</em>.
      </p>

      {/* Coleta de informações */}
      <section aria-labelledby="coleta">
        <h2 id="coleta">1. Coleta de informações</h2>
        <p>
          Solicitamos dados pessoais somente quando realmente precisamos deles
          para fornecer um serviço. A coleta ocorre de forma justa e legal, com
          seu conhecimento e consentimento. Explicaremos sempre a finalidade da
          solicitação.
        </p>
      </section>

      {/* Uso das informações */}
      <section aria-labelledby="uso">
        <h2 id="uso">2. Uso das informações</h2>
        <p>
          Os dados coletados são usados exclusivamente para:
        </p>
        <ul>
          <li>Prestar suporte e entregar funcionalidades solicitadas;</li>
          <li>Melhorar a experiência de navegação e personalizar conteúdo;</li>
          <li>Enviar comunicações, mediante consentimento explícito;</li>
          <li>Cumprir obrigações legais ou regulatórias.</li>
        </ul>
      </section>

      {/* Retenção e segurança */}
      <section aria-labelledby="retencao">
        <h2 id="retencao">3. Retenção e segurança</h2>
        <p>
          Mantemos suas informações apenas pelo tempo necessário para cumprir as
          finalidades desta política. Empregamos padrões de segurança
          comercialmente aceitáveis para evitar perda, uso indevido ou acesso
          não autorizado.
        </p>
      </section>

      {/* Compartilhamento */}
      <section aria-labelledby="compartilhamento">
        <h2 id="compartilhamento">4. Compartilhamento com terceiros</h2>
        <p>
          Não compartilhamos dados de identificação pessoal publicamente, exceto
          quando exigido por lei ou mediante seu consentimento.
        </p>
      </section>

      {/* Cookies */}
      <section aria-labelledby="cookies">
        <h2 id="cookies">5. Cookies e tecnologias semelhantes</h2>
        <p>
          Utilizamos cookies para:
        </p>
        <ul>
          <li>Garantir funcionalidades essenciais do Site;</li>
          <li>Entender como você interage conosco e aprimorar a experiência;</li>
          <li>Veicular publicidade via Google AdSense.</li>
        </ul>
        <p>
          O <strong>cookie DoubleClick</strong> é empregado para apresentar anúncios mais
          relevantes e limitar a frequência de exibição.
        </p>
        <p>
          Consulte as <a href="https://support.google.com/adsense/answer/1348695?hl=pt-BR" target="_blank" rel="noopener noreferrer">FAQs oficiais sobre privacidade do Google AdSense</a>.
        </p>
      </section>

      {/* Publicidade comportamental */}
      <section aria-labelledby="publicidade-comportamental">
        <h2 id="publicidade-comportamental">6. Publicidade comportamental &amp; afiliados</h2>
        <p>
          Os cookies de publicidade comportamental rastreiam anonimamente seus
          interesses para exibir anúncios relevantes. Cookies de parceiros
          afiliados permitem identificar se você chegou ao Site por meio deles,
          viabilizando créditos e promoções.
        </p>
      </section>

      {/* Links externos */}
      <section aria-labelledby="links">
        <h2 id="links">7. Links para terceiros</h2>
        <p>
          Nosso Site pode conter links para sites externos não operados pelo
          iAssets News. Não nos responsabilizamos por suas práticas de
          privacidade. Recomendamos que você leia as políticas de cada site
          visitado.
        </p>
      </section>

      {/* Direitos do usuário */}
      <section aria-labelledby="direitos">
        <h2 id="direitos">8. Seus direitos</h2>
        <p>
          Conforme a <abbr title="Lei Geral de Proteção de Dados">LGPD</abbr>, você pode
          solicitar: confirmação de tratamento, acesso, correção, portabilidade,
          anonimização ou exclusão de dados. Envie um e-mail para
          <a href="mailto:privacidade@iassets.com.br">privacidade@iassets.com.br</a>.
        </p>
      </section>

      {/* Consentimento */}
      <section aria-labelledby="consentimento">
        <h2 id="consentimento">9. Consentimento &amp; alterações</h2>
        <p>
          O uso contínuo do Site será considerado como aceitação desta política.
          Podemos atualizar este documento periodicamente; a data de vigência
          está indicada abaixo.
        </p>
      </section>

      {/* Contato */}
      <section aria-labelledby="contato">
        <h2 id="contato">10. Contato</h2>
        <address className="not-italic">
          Dúvidas? Escreva para
          <a href="mailto:privacidade@iassets.com.br" className="ml-1">privacidade@iassets.com.br</a>.
        </address>
      </section>

      <p className="text-sm mt-8">Efetiva a partir de {EFFECTIVE_DATE}.</p>
    </main>
  );
} 
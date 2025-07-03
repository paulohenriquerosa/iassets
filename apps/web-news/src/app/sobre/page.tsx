import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre o iAssets News | Quem somos, missão e política editorial",
  description:
    "Conheça a missão, visão, valores e equipe do iAssets News. Transparência total sobre nossa política editorial, publicidade e canais de contato.",
  alternates: { canonical: "https://news.iassets.com.br/sobre" },
};

export default function SobrePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 prose prose-slate dark:prose-invert">
      {/* Título principal */}
      <h1>Sobre o iAssets News</h1>

      {/* Missão */}
      <section aria-labelledby="missao">
        <h2 id="missao">Nossa missão</h2>
        <p>
          O <strong>iAssets News</strong> nasceu com o propósito de democratizar o acesso a
          informações financeiras de qualidade. Acreditamos que educação e
          transparência são fundamentais para que pessoas e empresas tomem
          decisões mais conscientes sobre seus investimentos.
        </p>
      </section>

      {/* Visão e valores */}
      <section aria-labelledby="visao-valores">
        <h2 id="visao-valores">Visão &amp; valores</h2>
        <ul>
          <li><strong>Independência&nbsp;editorial:</strong> conteúdos livres de conflitos de interesse.</li>
          <li><strong>Precisão&nbsp;e&nbsp;velocidade:</strong> apuração rigorosa com atualização em tempo real.</li>
          <li><strong>Inclusão&nbsp;financeira:</strong> linguagem acessível para investidores de todos os perfis.</li>
          <li><strong>Ética&nbsp;e&nbsp;transparência:</strong> respeito às diretrizes jornalísticas e regulatórias.</li>
        </ul>
      </section>

      {/* Equipe */}
      <section aria-labelledby="equipe">
        <h2 id="equipe">Nossa equipe editorial</h2>
        <p>
          Contamos com jornalistas especializados, analistas de mercado e
          colaboradores externos com experiência em <em>asset management</em>,
          <em>macroeconomia</em> e <em>compliance</em>. Todos os textos passam por revisão
          dupla para garantir exatidão e neutralidade.
        </p>
      </section>

      {/* Política editorial */}
      <section aria-labelledby="politica-editorial">
        <h2 id="politica-editorial">Política editorial</h2>
        <p>
          Seguimos os princípios do <abbr title="Código de Ética dos Jornalistas Brasileiros">CEJB</abbr> e as boas práticas
          recomendadas pela <abbr title="Sociedade Interamericana de Imprensa">SIP</abbr>. Todas as fontes são checadas e sempre que
          houver potencial conflito de interesses, isso será declarado no texto.
        </p>
      </section>

      {/* Publicidade e AdSense */}
      <section aria-labelledby="publicidade">
        <h2 id="publicidade">Publicidade &amp; monetização</h2>
        <p>
          O <strong>iAssets News</strong> utiliza o Google AdSense para exibir anúncios que
          ajudam a manter o projeto gratuito para nossos leitores. Não
          permitimos anúncios com conteúdo inadequado ou que violem nossas
          diretrizes editoriais. Caso note alguma publicidade em desconformidade,
          entre em contato pelos canais abaixo.
        </p>
      </section>

      {/* Transparência de dados */}
      <section aria-labelledby="dados">
        <h2 id="dados">Privacidade &amp; segurança de dados</h2>
        <p>
          Respeitamos a <abbr title="Lei Geral de Proteção de Dados">LGPD</abbr>. Seus dados são coletados apenas com o seu
          consentimento e utilizados estritamente para melhorar sua experiência.
          Saiba mais em nossa <a href="/privacidade">Política de Privacidade</a>.
        </p>
      </section>

      {/* Contato */}
      <section aria-labelledby="contato">
        <h2 id="contato">Fale conosco</h2>
        <address className="not-italic">
          iAssets Tecnologia Financeira LTDA<br />
          Rua Exemplo, 123 – São Paulo, SP<br />
          CNPJ: 12.345.678/0001-90<br />
          <a href="mailto:contato@iassets.com.br">contato@iassets.com.br</a>
        </address>
      </section>
    </main>
  );
} 
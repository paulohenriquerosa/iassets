import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato | iAssets News – Editorial, Comercial e Privacidade",
  description:
    "Fale com o iAssets News: equipe editorial, departamento comercial, dúvidas sobre privacidade e denúncias de conteúdo. Estamos prontos para ajudar.",
  alternates: { canonical: "https://news.iassets.com.br/contato" },
};

export default function ContatoPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 prose prose-slate dark:prose-invert">
      <h1>Fale Conosco</h1>

      {/* Instruções gerais */}
      <p>
        Sua opinião é essencial para aprimorarmos nossos serviços. Caso tenha
        sugestões, dúvidas, correções ou denúncias de conteúdo inadequado,
        confira os canais abaixo e escolha o mais adequado.
      </p>

      {/* Contato Editorial */}
      <section aria-labelledby="editorial">
        <h2 id="editorial">Redação &amp; Editorial</h2>
        <p>
          Envie pautas, releases ou solicitações de correção jornalística para
          <a href="mailto:editorial@iassets.com.br">editorial@iassets.com.br</a>.
          Nosso time responde em até <strong>2 dias úteis</strong>.
        </p>
      </section>

      {/* Contato Comercial */}
      <section aria-labelledby="comercial">
        <h2 id="comercial">Anunciantes &amp; parcerias</h2>
        <p>
          Para mídia kit, parcerias comerciais ou dúvidas sobre publicidade Google
          AdSense, entre em contato pelo e-mail
          <a href="mailto:comercial@iassets.com.br" className="ml-1">comercial@iassets.com.br</a>.
        </p>
      </section>

      {/* Privacidade */}
      <section aria-labelledby="privacidade">
        <h2 id="privacidade">Privacidade &amp; dados pessoais</h2>
        <p>
          Caso deseje exercer seus direitos garantidos pela LGPD ou obter mais
          informações sobre o tratamento de dados, escreva para
          <a href="mailto:privacidade@iassets.com.br" className="ml-1">privacidade@iassets.com.br</a>.
          Consulte também nossa <a href="/privacidade">Política de Privacidade</a>.
        </p>
      </section>

      {/* Denúncia de Anúncios */}
      <section aria-labelledby="ads">
        <h2 id="ads">Denúncias de anúncios</h2>
        <p>
          Trabalhamos com rigor para assegurar que os anúncios exibidos através
          do Google AdSense respeitem nossas diretrizes. Se você identificar
          publicidade inadequada ou enganosa, encaminhe uma captura de tela para
          <a href="mailto:ads@iassets.com.br" className="ml-1">ads@iassets.com.br</a>.
        </p>
      </section>

      {/* Endereço */}
      <section aria-labelledby="endereco">
        <h2 id="endereco">Endereço postal</h2>
        <address className="not-italic">
          iAssets Tecnologia Financeira LTDA<br />
          Rua Exemplo, 123 – São Paulo, SP – 01234-000<br />
          CNPJ: 12.345.678/0001-90
        </address>
      </section>

      {/* Aviso de responsabilidade */}
      <section aria-labelledby="disclaimer">
        <h2 id="disclaimer">Aviso de responsabilidade</h2>
        <p>
          O conteúdo publicado pelo iAssets News tem caráter meramente
          informativo e <strong>não</strong> constitui recomendação de investimento. Antes
          de tomar decisões financeiras, consulte um profissional certificado.
        </p>
      </section>
    </main>
  );
} 
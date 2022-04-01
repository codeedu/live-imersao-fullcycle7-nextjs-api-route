import { GetServerSideProps, NextPage } from "next";
import bodyParser from "body-parser";
import util from "util";
import { FormEvent } from "react";
import axios from "axios";

const getBody = util.promisify(bodyParser.urlencoded());

type EmailPageProps = {
  name: string;
  success: boolean;
};
const EmailPage: NextPage<EmailPageProps> = (props) => {
  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const assunto = (document.getElementById("assunto") as HTMLInputElement)
      .value;
    const conteudo = (
      document.getElementById("conteudo") as HTMLTextAreaElement
    ).value;
    await axios.post("/api/email", {assunto, conteudo});
    alert('Email enviado');
  }

  return (
    <div>
      <h1>Formulário de envio de e-mail - {props.name}</h1>
      <form method="post" onSubmit={onSubmit}>
        <input type="text" name="assunto" id="assunto" />
        <textarea name="conteudo" id="conteudo" />
        <button type="submit">Enviar</button>
      </form>
      {/* <form method="post" action="/email">
        <input type="text" name="assunto" />
        <textarea name="conteudo" />
        <button type="submit">Enviar</button>
      </form> */}
    </div>
  );
};

export default EmailPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { req, res } = ctx;
  if (req.method === "POST") {
    await getBody(req, res);
    //envio de e-mail com o Node.js
    // return {
    //     redirect: '/pagina'
    // }
    return {
      props: { success: true },
    };
    console.log(req.body, req.method);
  }

  return {
    props: {
      name: "luiz carlos",
    },
  };
};

// enviar email
//

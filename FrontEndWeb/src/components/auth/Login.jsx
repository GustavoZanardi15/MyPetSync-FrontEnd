import Logo from "../../assets/Logo.png";

const Login = () => {
  return (
    <div>
      <div>
        <div>
          <p>Portal</p>
          <h1>Prestador de Serviço</h1>
          <img src={Logo} alt="Logo"></img>
        </div>
        <div>
          <h2>Entre na sua conta</h2>
          <form>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="Email" />
            </div>
            <div>
              <label htmlFor="senha">Senha</label>
              <input id="senha" type="password" placeholder="Senha"></input>
            </div>
            <a href="#">Esqueceu a senha?</a>
            <button type="submit">ENTRAR</button>
          </form>
          <div>
            <p>
              Não tem conta?
              <a href="#">Crie sua conta</a>
            </p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Login;

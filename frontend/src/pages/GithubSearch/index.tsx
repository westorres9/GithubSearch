import "./styles.css";
import ResultCard from "components/ResultCard";
import { useState } from "react";
import axios from "axios";

type FormData = {
  github: string;
};

type Address = {
  url: string;
  followers: string;
  name: string;
  location: string;
  avatar_url: string;
};

const GithubSearch = () => {
  const [formData, setFormData] = useState<FormData>({
    github: "",
  });

  const [address, setAddress] = useState<Address>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //  console.log('mudou para: ' + event.target.value); //pega o que está no input
    const name = event.target.name; //pega o nome do campo
    const value = event.target.value; //pega o valor digitado no campo

    setFormData({ ...formData, [name]: value }); //atualiza os dados digitados do campo
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); //evita que o formulario seja enviado da forma padrão

    axios
      .get(`https://api.github.com/users/${formData.github}`)
      .then((response) => {
        setAddress(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setAddress(undefined);
        window.alert("Você precisa colocar dados válidos");
      });
  };

  return (
    <div className="cep-search-container">
      <div className="container search-container">
        <h1 className="text-title">Encontre um perfil no Github</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <input
              type="text"
              name="github"
              value={formData.github}
              className="search-input"
              placeholder="Digite um perfil Github"
              onChange={handleChange}
            />

            <button type="submit" className="btn btn-primary search-button">
              Encontrar
            </button>
          </div>
        </form>
      </div>
      
        {address && (
          <>
          <div className="container card-github">
          <div className="card-img"> 
              <img src={address.avatar_url} alt={address.name}/>
          </div>
          <div className="card-info">
            <h6 className="text-primary">Informações</h6>
            <ResultCard title="Perfil: " description ={address?.url} />
            <ResultCard title="Seguidores: " description={address?.followers} />
            <ResultCard title="Localidade: " description={address?.location} />
            <ResultCard title="Nome: " description={address?.name} />
          </div>
          </div>
          </>
        )}
      
    </div>
  );
};

export default GithubSearch;
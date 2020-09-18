import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

useEffect(() => {
  api.get('repositories').then(response => {
    setRepositories(response.data)
  });
}, []);


  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Desafio03`,
      url: 'https://github.com/KelvinLopes/desafio03_conceitos_reactjs',
      techs: ['ReactJs', 'Node']
    });

    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);
  }


  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(
      repository => repository.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
        {
          repositories.map( repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }
  // handles submit
  handleSubmit = (event) => {
    event.preventDefault()
    // keeps new pokemon in format
    const newPokemon = {
      "name": this.state.name,
      "stats": [
        {
          "value": this.state.hp,
          "name": "hp"
        }
      ],
      "sprites": {
        "front": this.state.frontUrl,
        "back": this.state.backUrl
      }}

    // makes post request to server
    fetch("http://localhost:3000/pokemon", {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      }, 
      // padding in our new pokemon object
      body: JSON.stringify(newPokemon)
    })
    console.log(newPokemon)
    // call the passed down function
    this.props.changeState(newPokemon)
    this.resetPokemonForm()
  }

  // updates the state
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value})
  }

  // resets the pokemonForm
  resetPokemonForm = () => {
    document.getElementById("pokemon-form").reset();
  }

  render() {
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form id="pokemon-form" onSubmit={event => this.handleSubmit(event)}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" onChange={(event) => this.handleChange(event)}  />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" onChange={(event) => this.handleChange(event)} />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" onChange={(event) => this.handleChange(event)} />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" onChange={(event) => this.handleChange(event)} />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default PokemonForm

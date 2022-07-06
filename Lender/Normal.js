import React, { Component } from 'react';
import paginate from 'paginate-array';
import { View,Text,Button} from 'react-native'

function Normal() {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      size: 5,
      page: 1,
      currPage: null
    }

    this.previousPage = this.previousPage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentDidMount() {
    fetch(`https://jsonplaceholder.typicode.com/todos`)
      .then(response => response.json())
      .then(todos => {
        const { page, size } = this.state;

        const currPage = paginate(todos, page, size);

        this.setState({
          ...this.state,
          todos,
          currPage
        });
      });
  }

  previousPage() {
    const { currPage, page, size, todos } = this.state;

    if (page > 1) {
      const newPage = page - 1;
      const newCurrPage = paginate(todos, newPage, size);

      this.setState({
        ...this.state,
        page: newPage,
        currPage: newCurrPage
      });
    }
  }

  nextPage() {
    const { currPage, page, size, todos } = this.state;

    if (page < currPage.totalPages) {
      const newPage = page + 1;
      const newCurrPage = paginate(todos, newPage, size);
      this.setState({ ...this.state, page: newPage, currPage: newCurrPage });
    }
  }

  render() {
    const { page, size, currPage } = this.state;

    return (
      <View>
        <View>page: {page}</View>
        <View>size: {size}</View>
        {currPage &&
          <Text>
            {currPage.data.map(todo => <Text key={todo.id}>{todo.title}</Text>)}
          </Text>
        }
        <Button onClick={this.previousPage}>Previous Page</Button>
        <Button onClick={this.nextPage}>Next Page</Button>
      </View>
    )
  }
}

export default Normal;
